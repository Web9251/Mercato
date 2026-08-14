import { type Product } from "@/generated/prisma/client"
import { Badge } from "../ui/badge"
import ProductStatus from "./ProductStatus"
import SingleProductImage from "./SingleProductImage"
import { formatPriceUi } from "@/utils/utils"
import { UploadImage } from "@/utils/types"
import { Rating } from "../review/rating"

type Props = {
  product: Product
  stock: number
}

function SingleProduct({ product, stock }: Props) {
  const { name, rating, price, numReviews, description, images, id } = product
  const imageUrls = (images as UploadImage[]).map((i) => i.url)

  const [whole, decimal] = formatPriceUi(price).split(".")

  return (
    <div className="grid md:grid-cols-5 gap-4 ">
      <div className="md:col-span-2">
        <SingleProductImage images={imageUrls} />
      </div>
      <div className="md:col-span-2 space-y-5">
        <p className="text-lg">{name}</p>
        <p className="text-2xl font-semibold">{name}</p>
        <Rating
          showScore
          rate={Number(rating)}
          description={`from ${numReviews} reviews`}
        />
        <p>{!numReviews && "No reviews yet"}</p>
        <Badge className="bg-emerald-500/80 text-white text-2xl px-4 py-6 flex gap-px">
          <sup className="text-xs relative -top-1 font-light">$</sup>
          {whole}
          <sup className="text-xs relative -top-1 font-light">.{decimal}</sup>
        </Badge>
        <div className="mt-4">
          <p className="font-semibold">Description</p>
          <p>{description}</p>
        </div>
      </div>
      <div className="md:col-span-1">
        <ProductStatus
          whole={whole}
          decimal={decimal}
          productId={id}
          stock={stock}
        />
      </div>
    </div>
  )
}
export default SingleProduct
