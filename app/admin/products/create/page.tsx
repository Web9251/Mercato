import ProductForm from "@/components/form/ProductForm"
import SectionTitle from "@/components/global/SectionTitle"

async function CreateProductPage() {
  return (
    <div className="space-y-4 mb-10">
      <SectionTitle text="create product" />
      <ProductForm />
    </div>
  )
}
export default CreateProductPage
