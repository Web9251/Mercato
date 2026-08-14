import { Decimal } from "@prisma/client/runtime/client"
import z from "zod"
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form"
import { ReadonlyURLSearchParams } from "next/navigation"

export const formatPrice = (price: Decimal | number | string) => {
  const value = price || 0
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value))
}

export const formatPriceUi = (price: Decimal) => {
  const [whole, decimal] = Number(price).toString().split(".")

  return decimal ? `${whole}.${decimal.padEnd(2, "0")}` : `${whole}.00`
}

export const round2 = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function getPagination(currentPage: number, totalPages: number) {
  const maxVisible = 10

  let startPage = Math.max(currentPage - Math.floor(maxVisible / 2), 1)

  let endPage = startPage + maxVisible - 1

  if (endPage > totalPages) {
    endPage = totalPages

    startPage = Math.max(endPage - maxVisible + 1, 1)
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
}

// Shorten UUID
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`
}

export const validateWithZod = async <T>(
  data: unknown,
  schema: z.ZodType<T>
): Promise<T> => {
  const validatedData = await schema.safeParse(data)
  if (!validatedData.success) {
    const errors = validatedData.error.issues.map((error) => error.message)
    throw new Error(errors.join(","))
  }
  return validatedData.data
}

export function formatFileSize(bytes: number) {
  if (!bytes) return "0 Bytes"

  const units = ["Bytes", "KB", "MB", "GB", "TB"]
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  )

  const size = bytes / 1024 ** exponent

  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(size)} ${units[exponent]}`
}

export function getExtension(name: string): string {
  return (name.split(".").pop() ?? "file").toUpperCase()
}

// Generate slug
export const generateSlug = <T extends FieldValues>(
  name: string,
  setValue: UseFormSetValue<T>,
  slug: Path<T>
) => {
  const generatedSlug = name.trim().toLocaleLowerCase().split(/\s+/).join("-")
  setValue(slug, generatedSlug as PathValue<T, Path<T>>)
}

export const generateSearchLink = (
  filter: string,
  value: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams)
  params.set(filter, value)
  params.set("page", "1") // always set to page 1
  return `search?${params.toString()}`
}
