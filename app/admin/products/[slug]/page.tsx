import { getAdminProductBySlug } from "@/actions/productActions"
import ProductForm from "@/components/form/ProductForm"
import { notFound } from "next/navigation"
import SuperJSON from "superjson"

type Params = {
  params: Promise<{
    slug: string
  }>
}

async function EditProductPage({ params }: Params) {
  const slug = (await params).slug
  const product = await getAdminProductBySlug(slug)
  if (!product) return notFound()
  const productStr = SuperJSON.stringify(product)

  return <section>{product && <ProductForm productStr={productStr} />}</section>
}
export default EditProductPage
