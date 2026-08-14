import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Image from "next/image"
import { type Product } from "@/generated/prisma/client"
import Link from "next/link"
import { formatPrice, formatPriceUi } from "@/utils/utils"
import { UploadImage } from "@/utils/types"

function ProductContainer({ product }: { product: Product }) {
  const { name, brand, rating, price, images, slug } = product
  const productsImages = images as UploadImage[]
  const [whole, decimal] = formatPriceUi(price).split(".")

  return (
    <Card className="bg-transparent p-0 gap-0">
      <CardContent className="p-0 flex justify-center sm:block ">
        <div className="group overflow-hidden">
          <Link href={`/product/${slug}`} className="group-hover:scale-110 ">
            <div className="relative size-96 sm:size-auto sm:aspect-square">
              {productsImages && (
                <Image
                  src={productsImages[0].url}
                  alt="product image"
                  fill
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
                  className=" object-cover group-hover:scale-110 transition-transform ease-in-out duration-200"
                  unoptimized
                />
              )}
            </div>
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex w-full flex-col items-start gap-3 bg-transparent text-start">
        <p className="text-xs">{brand}</p>
        <p className="font-bold">{name}</p>
        <div className="flex w-full justify-between">
          <p className="text-2xl">
            <sup className="text-xs font-light relative -top-2">$</sup>
            {whole}
            <sup className="text-xs font-light relative -top-2">.{decimal}</sup>
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
export default ProductContainer
