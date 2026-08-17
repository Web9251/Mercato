import { faker } from "@faker-js/faker"
import { Logs, User } from "lucide-react"
import { FaStar } from "react-icons/fa"
import { GrUserAdmin } from "react-icons/gr"

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Mercato"
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern e-commerce store built with Next.js"
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS?.split(", ") || [
  "PayPal",
]

export const pageSize = Number(process.env.PAGE_SIZE) || 5

export const userUpdateSelectInputs = [
  { value: "user", label: "user" },
  { value: "admin", label: "admin" },
]

export const productCategories = [
  { label: "All", value: "all" },
  { label: `Men's Sweatshirts`, value: "men-sweatshirts" },
  { label: `Men's Trousers`, value: "men-trousers" },
]

export const categoryFilterTable = [
  { label: "Any", value: "all" },
  { label: `Men's Sweatshirts`, value: `men-sweatshirts` },
  { label: `Men's Trousers`, value: `men-trousers` },
]
export const priceFilterTable = [
  { label: "Any", value: "all" },
  { label: "$1 to $50", value: "1-50" },
  { label: "$51 to $100", value: "51-100" },
  { label: "$101 to $200", value: "101-200" },
  { label: "$201 to $500", value: "201-500" },
  { label: "Above $500", value: "501-0" },
]

export const ratingFilterTable = [
  { label: "Any", value: "all" },
  { label: "4 stars & up", value: "4" },
  { label: "3 stars & up", value: "3" },
  { label: "2 stars & up", value: "2" },
  { label: "1 stars & up", value: "1" },
]

export const sortValues = [
  { label: "newest", value: "newest" },
  { label: "lowest", value: "lowest" },
  { label: "highest", value: "highest" },
  { label: "rating", value: "rating" },
]

const name = faker.commerce.productName()
const category = faker.commerce.department()
const brand = faker.company.name()
const description = faker.commerce.productDescription()

export const createProductDefaultValues = {
  name,
  category,
  brand,
  price: "258.99",
  stock: 100,
  images: [],
  isFeatured: false,
  description,
  slug: "",
}

export const shippingDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
}

export const signInDefaultValues = {
  email: "",
  password: "",
}

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export const ratings = [
  { label: FaStar, value: "1" },
  { label: FaStar, value: "2" },
  { label: FaStar, value: "3" },
  { label: FaStar, value: "4" },
  { label: FaStar, value: "5" },
]

export const navLinks = [
  { label: "user profile", url: "/user/profile", icon: User },
  { label: "order history", url: "/user/orders", icon: Logs },
  { label: "admin", url: "/admin/overview", icon: GrUserAdmin },
]
