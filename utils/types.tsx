import z from "zod"
import {
  cartItemSchema,
  cartSchema,
  orderItemSchema,
  orderSchema,
  paymentMethodSchema,
  paymentResultSchema,
  productSchema,
  reviewSchema,
  shippingAddressSchema,
  signInSchema,
  signUpSchema,
  updateUserSchema,
  userProfileSchema,
} from "@/utils/schemas"
import { Prisma } from "@/generated/prisma/client"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"
import { auth } from "@/lib/auth"

/* ─── schema types ─────────────────────────────────────────────────────────────── */

export type signInFields = z.infer<typeof signInSchema>
export type signUpFields = z.infer<typeof signUpSchema>
export type productFields = z.input<typeof productSchema>
export type productFields2 = z.input<typeof productSchema>
export type CartItemInferred = z.infer<typeof cartItemSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type CartItemInput = z.input<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>
export type CartInferred = z.infer<typeof cartSchema>
export type ShippingAddress = z.input<typeof shippingAddressSchema>
export type PaymentMethods = z.input<typeof paymentMethodSchema>
export type Order = z.infer<typeof orderSchema>
export type OrderItem = z.infer<typeof orderItemSchema>
export type OrderItemInput = z.input<typeof orderItemSchema>
export type PaymentResult = z.infer<typeof paymentResultSchema>
export type UserProfile = z.input<typeof userProfileSchema>
export type UpdateUserFields = z.input<typeof updateUserSchema>
export type ReviewFields = z.infer<typeof reviewSchema>
export type ReviewFieldsInput = z.input<typeof reviewSchema>

/* ─── modified prisma types ─────────────────────────────────────────────────────────────── */

export type selectInputValue = {
  value: string
  label: string | LucideIcon | IconType
}

export type UploadImage = {
  key: string
  url: string
  name: string
  size: number
}

export type Banner = {
  key: string
  url: string
}

export type MonthlyRevenue = {
  month: string
  revenue: number
}

export type ProductSearchAdmin = {
  search: string
}

export type ProductSearchUser = {
  search: string
  category: string
}

export type ProductCategory = {
  label: string
  value: string
}

/* ─── modified prisma types ─────────────────────────────────────────────────────────────── */

export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: {
    user: {
      select: { name: true; image: true; id: true }
    }
  }
}>

export type LatestSales = Prisma.OrderGetPayload<{
  select: {
    id: true
    user: {
      select: { name: true }
    }
    createdAt: true
    totalPrice: true
  }
}>

export type RatingData = {
  stars: number
  count: number
  color: string
}[]

export type OnReviewChange = (data: {
  newReview: ReviewWithUser
  state: "create" | "edit"
}) => void // callback prop

export type SessionUser = typeof auth.$Infer.Session.user // ✅ includes role
