import * as z from "zod"
import { PAYMENT_METHODS } from "./constants"

export const signInSchema = z.object({
  email: z.email({ message: "Email required" }),
  password: z.string().min(1, { message: "Password required" }),
})

export const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "At least 2 characters required" }),

    email: z.email({ message: "Email required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"], // error appears on confirmPassword field
  })

const maxSizeMB = 4
const types = ["image/jpeg", "image/png", "image/webp"]
const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= maxSizeMB * 1024 * 1024, {
    message: `Max image size is ${maxSizeMB}`,
  })
  .refine((file) => types.includes(file.type), {
    message: "Unsupported file type",
  })

const currency = z.coerce
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, {
    message: "Price must be at most 2 decimal places",
  })
  .transform(Number)

export const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters" }),
  brand: z.string().min(3, { message: "Brand must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  // price: z.coerce.number().refine((val) => Number.isInteger(val * 100), {
  //   message: "Price must be at most 2 decimal places",
  // }),
  price: currency,
  stock: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Stoke must be a positive number" })
    .min(1, { message: "Stoke is required" }),
  isFeatured: z.boolean(),
  banner: z
    .object({
      key: z.string().min(1, { message: "Image key is required" }),
      url: z.url({ message: "Invalid image url" }),
    })
    .nullable()
    .optional(),
  images: z
    .array(
      z.object({
        key: z.string().min(1, { message: "Image key is required" }),
        url: z.url({ message: "Invalid image url" }),
        name: z.string().min(1, { message: "Image name is required" }),
        size: z.number().int(),
      })
    )
    .min(1, { message: "Product must have at least 1 image" })
    .max(5, { message: "Maximum 5 images are allowed" }),
})

export const cartItemSchema = z.object({
  productId: z.string().min(1, { message: "Product is required" }),
  cartId: z.string().min(1, { message: "Cart is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  qty: z
    .number()
    .int()
    .nonnegative({ message: "Quantity must be a positive number" }),
  image: z.string().min(1, { message: "Image is required" }),
  price: currency,
})

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
})

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  streetAddress: z
    .string()
    .min(3, { message: "Street address must be at least 3 characters" }),
  city: z.string().min(3, { message: "City must be at least 3 characters" }),
  postalCode: z
    .string()
    .min(3, { message: "Postal code must be at least 3 characters" }),
  country: z
    .string()
    .min(3, { message: "Country must be at least 3 characters" }),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

export const paymentMethodSchema = z.object({
  types: z
    .string()
    .min(1, { message: "Type is required" })
    .refine((value) => PAYMENT_METHODS.includes(value), {
      message: "Invalid payment method",
    }),
})

export const orderSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z
    .string()
    .min(1, { message: "Type is required" })
    .refine((value) => PAYMENT_METHODS.includes(value), {
      message: "Invalid payment method",
    }),
  shippingAddress: shippingAddressSchema,
})

export const orderItemSchema = z.object({
  qty: z.number().min(1, { message: "Quantity is required" }),
  price: currency,
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  productId: z.string().min(1, { message: "Product is required" }),
  orderId: z.string().min(1, { message: "Order is required" }),
})

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
})

export const userProfileSchema = z.object({
  email: z.email({ message: "Email is required" }),
  name: z.string().min(2, { message: "Name required" }),
})

export const updateUserSchema = z.object({
  email: z.email({ message: "Email is required" }),
  name: z.string().min(2, { message: "At least 2 characters required" }),
  role: z.union([z.literal("user"), z.literal("admin")]),
  // role: z.string().min(1, { message: "Role is required" }),
})

export const reviewSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters" })
    .max(500, { message: "Comment must be at most 500 characters" }),
  rating: z.coerce
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at least 5" }),
})
