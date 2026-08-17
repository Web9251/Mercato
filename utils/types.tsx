import z from "zod"
import {
  cartItemSchema,
  cartSchema,
  orderItemSchema,
  orderSchema,
  paymentMethodSchema,
  productSchema,
  reviewSchema,
  shippingAddressSchema,
  updateUserSchema,
  userProfileSchema,
} from "@/utils/schemas"
import { Prisma } from "@/generated/prisma/client"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"
import { auth } from "@/lib/auth"

export type productFields = z.input<typeof productSchema>
export type CartItemInput = z.input<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>
export type ShippingAddress = z.input<typeof shippingAddressSchema>
export type PaymentMethods = z.input<typeof paymentMethodSchema>
export type Order = z.infer<typeof orderSchema>
export type OrderItemInput = z.input<typeof orderItemSchema>
export type UserProfile = z.input<typeof userProfileSchema>
export type UpdateUserFields = z.input<typeof updateUserSchema>
export type ReviewFieldsInput = z.input<typeof reviewSchema>

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
}) => void

export type SessionUser = typeof auth.$Infer.Session.user
