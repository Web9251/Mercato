"use client"
import { Controller, useForm } from "react-hook-form"
import type { ProductSearchAdmin } from "@/utils/types"
import { Field, FieldError } from "../ui/field"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation"

function SearchAdmin() {
  const searchParams = useSearchParams()
  const { control, handleSubmit } = useForm<ProductSearchAdmin>({
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  })

  const router = useRouter()

  const submitHandler = async (formData: ProductSearchAdmin) => {
    router.push(`/admin/products?search=${formData.search}`)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="search"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid} className="w-56">
              <Input
                {...field}
                type="search"
                aria-invalid={fieldState.invalid}
                placeholder="search"
                className="dark:bg-transparent focus:bg-transparent"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )
        }}
      />
    </form>
  )
}
export default SearchAdmin
