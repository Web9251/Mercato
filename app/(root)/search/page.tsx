import ProductContainer from "@/components/home/Product"
import SideFilter from "@/components/search/SideFilter"
import { Button } from "@/components/ui/button"
import { getAllProducts } from "@/actions/productActions"
import Link from "next/link"
import Sort from "@/components/search/Sort"
import PaginationContainer from "@/components/user/PaginationContainer"

type Props = {
  searchParams: Promise<{
    search?: string
    price?: string
    category?: string
    sort?: string
    page?: string
    rating?: string
  }>
}

async function SearchPage({ searchParams }: Props) {
  const { search, price, category, sort, page, rating } = await searchParams

  const { products, totalPages } = await getAllProducts({
    search,
    price,
    category,
    sort,
    page,
    rating,
  })

  const filters = { search, price, category, rating }

  const visibleFilters = Object.entries(filters).filter(
    ([_, value]) => value && value !== "all"
  )

  return (
    <section className="md:grid md:grid-cols-4 w-full">
      <div className="col-span-1 ">
        <SideFilter />
      </div>
      <div className="md:col-span-3 mt-6 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center">
          <div className="flex gap-2 items-center justify-center ">
            <p>
              {visibleFilters.map(([key, value]) => (
                <span key={key}>
                  <span className="capitalize font-semibold">{key}: </span>
                  {value}{" "}
                </span>
              ))}
            </p>
            {visibleFilters.length !== 0 && (
              <Button variant="link" asChild>
                <Link href="/search">Clear</Link>
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <p className="capitalize ">sort by</p>
            <Sort />
          </div>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {products.map((product, index) => {
            return <ProductContainer key={index} product={product} />
          })}
        </div>

        <div className="my-10">
          <PaginationContainer
            totalPages={totalPages}
            page={Number(page) || 1}
          />
        </div>
      </div>
    </section>
  )
}
export default SearchPage
