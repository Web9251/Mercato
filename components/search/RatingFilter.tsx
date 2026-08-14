"use client"
import { ratingFilterTable } from "@/utils/constants"
import { generateSearchLink } from "@/utils/utils"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function RatingFilter() {
  const searchParams = useSearchParams()
  const currentValue = searchParams.get("rating")
  return (
    <table className="border-separate border-spacing-1 flex flex-col items-start">
      <thead>
        <tr>
          <td className="text-xl">Customer Ratings</td>
        </tr>
      </thead>
      <tbody>
        {ratingFilterTable.map((data) => {
          const { label, value } = data
          return (
            <tr key={label}>
              <td>
                <Link
                  href={generateSearchLink("rating", value, searchParams)}
                  className={`${currentValue === value && "font-bold"}`}
                >
                  {label}
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default RatingFilter
