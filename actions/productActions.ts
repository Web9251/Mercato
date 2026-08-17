"use server"

import { Prisma } from "@/generated/prisma/client"
import { currentUser } from "@/hooks/currentUser"
import { UnauthorizedError } from "@/lib/errors"
import prisma from "@/lib/prisma"
import { productSchema } from "@/utils/schemas"
import { productFields } from "@/utils/types"
import { validateWithZod } from "@/utils/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const renderError = async (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    redirect("/sign-in")
  }
  const errorMessage =
    error instanceof Error ? error.message : "there was an error"
  console.log("🚀 ~ renderError ~ errorMessage:", errorMessage)
  return { success: false, message: errorMessage }
}

export const renderErrorWithData = async (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    redirect("/sign-in")
  }
  const errorMessage =
    error instanceof Error ? error.message : "there was an error"
  console.log("🚀 ~ renderError ~ errorMessage:", errorMessage)
  return { success: false, message: errorMessage, data: null }
}

export const renderErrorWithRedirect = async (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    redirect("/sign-in")
  }
  const errorMessage =
    error instanceof Error ? error.message : "there was an error"
  console.log("🚀 ~ renderError ~ errorMessage:", errorMessage)
  return { success: false, message: errorMessage, redirectTo: null }
}

export const getAdminUser = async () => {
  const user = await currentUser()
  if (user?.role !== "admin") {
    throw new UnauthorizedError()
  }
  return user
}

export const getAuthUser = async () => {
  const user = await currentUser()
  if (user?.isAnonymous || !user) {
    throw new UnauthorizedError()
  }
  return user
}

export const createProductAction = async (formData: productFields) => {
  try {
    await getAdminUser()

    const validatedData = await validateWithZod(formData, productSchema)

    const product = await prisma.product.create({
      data: {
        ...validatedData,

        banner: (validatedData.isFeatured && validatedData.banner) || undefined,
        isFeatured: validatedData.banner ? true : false,
      },
    })

    return { success: true, message: `${product.name} added to the database` }
  } catch (error) {
    return renderError(error)
  }
}

export const getAdminProducts = async (limit: number, page: number) => {
  await getAdminUser()

  const [products, count] = await Promise.all([
    await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    await prisma.product.count(),
  ])

  return {
    data: products,
    totalPages: Math.ceil(count / limit),
  }
}

export const getFeaturedProducts = async () => {
  return await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const getSingleProduct = async (slug: string) => {
  return await prisma.product.findFirst({
    where: {
      slug,
    },
  })
}

export const getSingleProductById = async (productId: string) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
    },
  })
}

export const getAdminProductBySlug = async (slug: string) => {
  await getAdminUser()
  const product = await prisma.product.findUnique({
    where: { slug },
  })
  return product
}

export const editProductAction = async (
  slug: string,
  formData: productFields
) => {
  try {
    await getAdminUser()

    const product = await prisma.product.findUnique({
      where: { slug },
    })
    if (!product) throw new Error("Product not found")

    const { slug: newSlug, ...updateData } = await validateWithZod(
      formData,
      productSchema
    )

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        ...updateData,

        banner:
          updateData.isFeatured && updateData.banner
            ? updateData.banner
            : Prisma.JsonNull,
        isFeatured: updateData.isFeatured && updateData.banner ? true : false,

        ...(slug !== newSlug && { slug: newSlug }),
      },
    })
    return {
      success: true,
      message: `${updatedProduct.name} updated successfully`,
      redirectTo: `/admin/products/${updatedProduct.slug}`,
    }
  } catch (error) {
    return renderErrorWithRedirect(error)
  }
}

export const deleteProductAction = async (id: string) => {
  await getAdminUser()
  await prisma.product.delete({
    where: { id },
  })
  revalidatePath("/admin/products")
}

export const getAllProducts = async ({
  search,
  category,
  sort = "newest",
  page = "1",
  price,
  rating,
}: {
  search?: string
  category?: string
  sort?: string
  page?: string
  price?: string
  rating?: string
}) => {
  const PRODUCTS_PER_PAGE = 12

  const conditions = []

  if (search) {
    conditions.push({
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { category: { contains: search, mode: "insensitive" as const } },
      ],
    })
  }

  if (category && category !== "all") {
    conditions.push({ category })
  }

  if (price && price !== "all") {
    const [min, max] = price.split("-").map(Number)
    conditions.push({
      price: {
        gte: min,
        ...(max !== 0 && { lte: max }),
      },
    })
  }

  if (rating && rating !== "all") {
    conditions.push({
      rating: { gte: Number(rating) },
    })
  }

  const where = conditions.length ? { AND: conditions } : {}

  const orderBy = {
    newest: [{ createdAt: "desc" as const }],
    lowest: [{ price: "asc" as const }, { rating: "desc" as const }],
    highest: [{ price: "desc" as const }, { rating: "desc" as const }],
    rating: [{ rating: "desc" as const }, { createdAt: "desc" as const }],
  }[sort] ?? [{ createdAt: "desc" as const }]

  const [products, totalCount] = await Promise.all([
    await prisma.product.findMany({
      where: where,
      orderBy: orderBy,
      take: PRODUCTS_PER_PAGE,
      skip: (Number(page) - 1) * PRODUCTS_PER_PAGE,
    }),
    await prisma.product.count({ where }),
  ])

  return {
    products,
    totalCount,
    totalPages: Math.ceil(totalCount / PRODUCTS_PER_PAGE),
  }
}

export const updateProductRating = async (productId: string) => {
  const ratingStats = await prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { rating: true },
  })

  await prisma.product.update({
    where: { id: productId },
    data: {
      rating: ratingStats._avg.rating ?? 0,
      numReviews: ratingStats._count.rating,
    },
  })
}
