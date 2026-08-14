import Link from "next/link"
import { Button } from "../ui/button"
import { IoMdCart } from "react-icons/io"
import { Badge } from "../ui/badge"
import { getCartTotalQuantity } from "@/actions/cartActions"

async function CartButton() {
  const sum = await getCartTotalQuantity()
  return (
    <Button
      className="flex items-center justify-center gap-2 dark:bg-transparent"
      variant="outline"
      asChild
    >
      <Link href="/cart">
        <div className="relative">
          <IoMdCart />
          <Badge className="absolute -top-4 -right-2 text-[8px] size-4">
            {sum}
          </Badge>
        </div>
        <p>Cart</p>
      </Link>
    </Button>
  )
}
export default CartButton
