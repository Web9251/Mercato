import Link from "next/link"
import { Button } from "../ui/button"
import { type Product } from "@/generated/prisma/client"
import ProductContainer from "./Product"

function Featured({ products }: { products: Product[] }) {
  return (
    <div className="mt-8 flex flex-col ">
      <h2 className="mb-4 text-3xl font-bold capitalize">newest arrivals</h2>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => {
          if (!product.isFeatured) return
          return <ProductContainer key={index} product={product} />
        })}
      </div>
      <Button
        className="capitalize w-fit mx-auto h-10 px-4 mt-8"
        size="lg"
        asChild
      >
        <Link href="/search">view all products</Link>
      </Button>
    </div>
  )
}
export default Featured
