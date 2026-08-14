import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import Image from "next/image"
import UpdateCartItemButton from "./UpdateCartItemButton"
import { getSingleProduct } from "@/actions/productActions"
import type { CartItem } from "@/generated/prisma/client"

async function CartItemsContainer({
  cartItems,
  cartId,
}: {
  cartItems: CartItem[]
  cartId: string
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="[&_th]:text-muted-foreground">
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map(async (item) => {
          const { name, price, qty, image, slug } = item
          const product = await getSingleProduct(slug)
          const productId = product?.id as string

          return (
            <TableRow key={item.productId}>
              <TableCell className="flex gap-4  items-center">
                <Image
                  src={image}
                  alt="product image"
                  width={400}
                  height={400}
                  unoptimized
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
                  className="size-12 object-cover rounded-md"
                />
                {name}
              </TableCell>
              <TableCell>
                <UpdateCartItemButton
                  productId={productId}
                  cartId={cartId}
                  qty={qty}
                  className="justify-start"
                />
              </TableCell>
              <TableCell>${Number(price)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default CartItemsContainer
