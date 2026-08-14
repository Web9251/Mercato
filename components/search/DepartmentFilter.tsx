"use client"
import { categoryFilterTable } from "@/utils/constants"
import { generateSearchLink } from "@/utils/utils"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function DepartmentFilter() {
  const searchParams = useSearchParams()
  const currentValue = searchParams.get("category")

  return (
    <table className="border-separate border-spacing-1 flex flex-col items-start">
      <thead>
        <tr>
          <td className="text-xl">Department</td>
        </tr>
      </thead>
      <tbody>
        {categoryFilterTable.map((data) => {
          const { label, value } = data
          return (
            <tr key={label}>
              <td>
                <Link
                  href={generateSearchLink("category", value, searchParams)}
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
export default DepartmentFilter
