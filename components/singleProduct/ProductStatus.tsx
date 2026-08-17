import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { getCart } from "@/actions/cartActions"
import UpdateCartItemButton from "../cart/UpdateCartItemButton"

type Props = {
  whole: string
  decimal: string
  productId: string
  stock: number
}

async function ProductStatus({ whole, decimal, productId, stock }: Props) {
  const cart = await getCart()

  const qty = cart?.cartItems.find((item) => item.productId === productId)?.qty

  return (
    <Card className="dark:bg-transparent px-5">
      <div className="flex justify-between items-center">
        <p className="text-lg">Price</p>
        <p className="text-2xl font-semibold flex">
          <sup className="text-xs relative top-0.5 font-light">$</sup>
          {whole}
          <sup className="text-xs relative top-0.5 font-light">.{decimal}</sup>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg">Status</p>
        {stock ? (
          <Badge>In Stock</Badge>
        ) : (
          <Badge className="capitalize bg-red-900 text-white whitespace-normal wrap-break-word p-4">
            Out of stoke
          </Badge>
        )}
      </div>

      {stock && (
        <UpdateCartItemButton
          productId={productId}
          cartId={cart?.id}
          qty={qty}
        />
      )}
    </Card>
  )
}
export default ProductStatus
