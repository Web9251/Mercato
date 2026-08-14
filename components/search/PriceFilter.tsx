"use client"
import { priceFilterTable } from "@/utils/constants"
import { generateSearchLink } from "@/utils/utils"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function PriceFilter() {
  const searchParams = useSearchParams()
  const currentValue = searchParams.get("price")

  return (
    <table className="border-separate border-spacing-1 flex flex-col items-start">
      <thead>
        <tr>
          <td className="text-xl">Price</td>
        </tr>
      </thead>
      <tbody>
        {priceFilterTable.map((data) => {
          const { label, value } = data
          return (
            <tr key={label}>
              <td>
                <Link
                  href={generateSearchLink("price", value, searchParams)}
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
export default PriceFilter
