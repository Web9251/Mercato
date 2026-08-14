"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getPagination } from "@/utils/utils"
import { useRouter, useSearchParams } from "next/navigation"

function PaginationContainer({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) {
  const searchParams = useSearchParams()

  const constructUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    return `?${params.toString()}`
  }

  const paginationNumbers = getPagination(page, totalPages)
  const router = useRouter()
  const handleNextAndPrevious = (type: "next" | "previous") => {
    if (type === "next") {
      const next = page === totalPages ? totalPages : page + 1
      router.push(constructUrl(next))
    }
    if (type === "previous") {
      const previous = page === 1 ? 1 : page - 1
      router.push(constructUrl(previous))
    }
  }

  return (
    <Pagination className={totalPages < 2 ? "hidden" : "flex"}>
      <PaginationContent>
        <PaginationItem onClick={() => handleNextAndPrevious("previous")}>
          <PaginationPrevious />
        </PaginationItem>
        {paginationNumbers.map((number) => {
          return (
            <PaginationItem key={number}>
              <PaginationLink
                isActive={page === number}
                onClick={() => {
                  router.push(constructUrl(number))
                }}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handleNextAndPrevious("next")} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationContainer
