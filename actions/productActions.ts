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
        // Prisma does NOT accept plain JS null directly for JSON fields.
        //
        banner: (validatedData.isFeatured && validatedData.banner) || undefined,
        // set is featured to true only if banner exist
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

// Todo: return redirect or not?
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

    // Always update by Id
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        ...updateData,

        // b/c null assignable to jsonValue
        banner:
          updateData.isFeatured && updateData.banner
            ? updateData.banner
            : Prisma.JsonNull,
        // if no banner set is featured to false
        isFeatured: updateData.isFeatured && updateData.banner ? true : false,
        // only update slug if it actually changed
        // else unique error occurs
        ...(slug !== newSlug && { slug: newSlug }),
      },
    })
    // revalidatePath(`/products/${updatedProduct.slug}`)
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

  /* ─── build where ─────────────────────────────────────────────────────────────── */

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
    const [min, max] = price.split("-").map(Number) // ✅ numbers not strings
    conditions.push({
      price: {
        gte: min,
        ...(max !== 0 && { lte: max }), // ✅ 0 means no upper limit
      },
    })
  }

  if (rating && rating !== "all") {
    conditions.push({
      rating: { gte: Number(rating) }, // ✅ convert to number
    })
  }

  const where = conditions.length ? { AND: conditions } : {}
  // where: AND:[{},{},{},...] where syntax

  /* ─── build sort ─────────────────────────────────────────────────────────────── */

  // orderBy: [{ price: "asc" }, { rating: "asc" }], orderBy syntax
  const orderBy = {
    newest: [{ createdAt: "desc" as const }],
    lowest: [
      { price: "asc" as const },
      { rating: "desc" as const }, // tiebreaker — best rated if same price
    ],
    highest: [
      { price: "desc" as const },
      { rating: "desc" as const }, // tiebreaker — best rated if same price
    ],
    rating: [
      { rating: "desc" as const },
      { createdAt: "desc" as const }, // tiebreaker — newest if same rating
    ],
  }[sort] ?? [{ createdAt: "desc" as const }]

  /* ─── get products & count ─────────────────────────────────────────────────────────────── */

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
    totalCount, // total products
    totalPages: Math.ceil(totalCount / PRODUCTS_PER_PAGE),
  }
}

export const updateProductRating = async (productId: string) => {
  // invoked when creating & updating product review

  // increment approach — fragile
  // rating = (rating * numReviews + newRating) / (numReviews + 1)

  // recalculate from ALL reviews in DB
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
