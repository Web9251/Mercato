"use server"

import { ReviewFieldsInput } from "@/utils/types"
import {
  getSingleProduct,
  getAuthUser,
  renderErrorWithData,
  updateProductRating,
} from "./productActions"
import { validateWithZod } from "@/utils/utils"
import { reviewSchema } from "@/utils/schemas"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const createReview = async (
  formData: ReviewFieldsInput,
  slug: string
) => {
  try {
    const user = await getAuthUser()

    const product = await getSingleProduct(slug)
    if (!product) throw new Error("Product not found")

    const reviewExist = await prisma.review.findFirst({
      where: {
        userId: user.id,
        productId: product.id,
      },
    })

    if (reviewExist) throw new Error("You have already reviewed this product")

    const { title, comment, rating } = await validateWithZod(
      formData,
      reviewSchema
    )

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        productId: product.id,
        title,
        comment,
        rating,
      },
      include: { user: { select: { name: true, image: true, id: true } } },
    })
    await updateProductRating(product.id)
    revalidatePath(`/product/${slug}`)
    return {
      success: true,
      message: "Review created successfully",
      data: review,
    }
  } catch (error) {
    return renderErrorWithData(error)
  }
}

export const getUserReview = async (userId: string, productId: string) => {
  return await prisma.review.findFirst({
    where: {
      userId,
      productId,
    },
  })
}

export const getAllReviews = async ({
  slug,
  page = 1,
}: {
  slug: string
  page: number
}) => {
  const REVIEWS_PER_PAGE = 4

  const product = await getSingleProduct(slug)
  if (!product) throw new Error("Product not found")

  const [reviews, totalReviews, rating5, rating4, rating3, rating2, rating1] =
    await Promise.all([
      await prisma.review.findMany({
        where: {
          productId: product.id,
        },
        orderBy: { createdAt: "desc" },
        take: REVIEWS_PER_PAGE,
        skip: (page - 1) * REVIEWS_PER_PAGE,
        include: {
          user: { select: { name: true, image: true, id: true } },
        },
      }),
      await prisma.review.count({ where: { productId: product.id } }),
      await prisma.review.count({
        where: { productId: product.id, rating: 5 },
      }),
      await prisma.review.count({
        where: { productId: product.id, rating: 4 },
      }),
      await prisma.review.count({
        where: { productId: product.id, rating: 3 },
      }),
      await prisma.review.count({
        where: { productId: product.id, rating: 2 },
      }),
      await prisma.review.count({
        where: { productId: product.id, rating: 1 },
      }),
    ])

  // const allRatingCounts = [rating5, rating4, rating3, rating4, rating5]
  const ratingData = [
    { stars: 5, count: rating5, color: "bg-emerald-500" },
    { stars: 4, count: rating4, color: "bg-green-400" },
    { stars: 3, count: rating3, color: "bg-yellow-400" },
    { stars: 2, count: rating2, color: "bg-orange-400" },
    { stars: 1, count: rating1, color: "bg-red-400" },
  ]

  return {
    reviews,
    totalReviews,
    hasMore: page * REVIEWS_PER_PAGE < totalReviews, // tells client if more exist
    ratingData,
  }
}

export const updateReview = async (
  formData: ReviewFieldsInput,
  slug: string
) => {
  try {
    const user = await getAuthUser()

    const product = await getSingleProduct(slug)
    if (!product) throw new Error("Product not found")

    const validatedData = await validateWithZod(formData, reviewSchema)

    const review = await getUserReview(user.id, product.id)
    if (!review) throw new Error("Review not found")

    const updatedReview = await prisma.review.update({
      where: { id: review.id },
      data: {
        ...validatedData,
      },
      include: { user: { select: { name: true, image: true, id: true } } },
    })
    revalidatePath(`/product/${slug}`)
    await updateProductRating(product.id)
    return {
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    }
  } catch (error) {
    return renderErrorWithData(error)
  }
}
