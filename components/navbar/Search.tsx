"use client"

import { CiSearch } from "react-icons/ci"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Controller, useForm, useWatch } from "react-hook-form"
import { Field, FieldError } from "../ui/field"
import SelectInput from "../form/SelectInput"
import { ProductSearchUser } from "@/utils/types"
import { productCategories } from "@/utils/constants"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

function Search() {
  const searchParams = useSearchParams()

  /* ─── useForm ─────────────────────────────────────────────────────────────── */

  const { control, handleSubmit } = useForm<ProductSearchUser>({
    defaultValues: {
      category: searchParams.get("category") || "all",
      search: searchParams.get("search") || "",
    },
  })

  /* ─── hooks & watches ─────────────────────────────────────────────────────────────── */

  const router = useRouter()
  const pathName = usePathname()
  const categoryWatch = useWatch({ control, name: "category" })
  const searchWatch = useWatch({ control, name: "search" })

  /* ─── useEffect for on change handling ─────────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!pathName.startsWith("/search")) return // onChange search for search page only
    const timer = setTimeout(() => {
      router.replace(`/search?category=${categoryWatch}&search=${searchWatch}`)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchWatch, categoryWatch, pathName, router])

  /* ─── onSubmit Handler ─────────────────────────────────────────────────────────────── */

  const submitHandler = async () => {
    router.replace(`/search?category=${categoryWatch}&search=${searchWatch}`)
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex items-center justify-center gap-2"
    >
      {/* ─── Category ───────────────────────────────────────────────────────────────  */}

      <SelectInput
        name="category"
        control={control}
        selectValues={productCategories}
        hideLabel={true}
      />

      {/* ─── Search Input ───────────────────────────────────────────────────────────────  */}

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
      <Button type="submit">
        <CiSearch />
      </Button>
    </form>
  )
}
export default Search
