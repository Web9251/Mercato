import { Card, CardContent } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import Image from "next/image"
import { formatPrice } from "@/utils/utils"
import { CartItemInput, OrderItemInput } from "@/utils/types"
import { Decimal } from "@prisma/client/runtime/client"

type Props = {
  items: OrderItemInput[] | CartItemInput[]
  path?: "preOrder" | "order"
}

function ItemsList({ items, path = "preOrder" }: Props) {
  return (
    <Card className="dark:bg-transparent">
      <CardContent>
        <h2 className="text-lg capitalize">
          {path === "order" ? "order items" : "cart items"}
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="[&_th]:text-muted-foreground">
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const { image, name } = item
              return (
                <TableRow key={item.slug}>
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
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{formatPrice(item.price as Decimal)}</TableCell>
                </TableRow>
              )
            })}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
export default ItemsList
