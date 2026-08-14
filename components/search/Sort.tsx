"use client"
import { sortValues } from "@/utils/constants"
import { generateSearchLink } from "@/utils/utils"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function Sort() {
  const searchParams = useSearchParams()
  const currentValue = searchParams.get("sort")

  return (
    <>
      {sortValues.map((sort) => {
        return (
          <Link
            key={sort.value}
            href={generateSearchLink("sort", sort.value, searchParams)}
            className={`${currentValue === sort.value && "font-semibold"}`}
          >
            {sort.value}
          </Link>
        )
      })}
    </>
  )
}
export default Sort
