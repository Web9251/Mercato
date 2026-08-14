import { getAllProducts } from "@/actions/productActions"
import ProductsContainerAdmin from "@/components/admin/ProductsContainerAdmin"
import EmptyPage from "@/components/global/EmptyPage"
import EmptyProducts from "@/components/global/EmptyProducts"
import SectionTitle from "@/components/global/SectionTitle"
import { Button } from "@/components/ui/button"
import PaginationContainer from "@/components/user/PaginationContainer"
import { pageSize } from "@/utils/constants"
import Link from "next/link"
import SuperJSON from "superjson"

type Props = {
  searchParams: Promise<{
    page: string
    search: string
  }>
}

async function AdminProductsPage({ searchParams }: Props) {
  const page = (await searchParams).page || "1" // function takes page as a string
  const search = (await searchParams).search
  const products = await getAllProducts({ page, search })

  const { totalPages } = products
  const productsStr = SuperJSON.stringify(products.products)

  if (totalPages === 0) return <EmptyProducts />
  return (
    <section>
      <div className="flex justify-between">
        <SectionTitle text="products" />
        <Button size="lg" asChild>
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>

      <ProductsContainerAdmin productsStr={productsStr} />
      <div className="my-10">
        <PaginationContainer totalPages={totalPages} page={Number(page)} />
      </div>
    </section>
  )
}
export default AdminProductsPage
