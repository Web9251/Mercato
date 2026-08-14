import { CartItem } from "@/generated/prisma/client"
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
import { OrderItem, OrderItemInput } from "@/utils/types"

function OrderItemsDisplay({ orderItems }: { orderItems: OrderItemInput[] }) {
  return (
    <Card className="dark:bg-transparent">
      <CardContent>
        <h2 className="text-lg capitalize">order items</h2>
        <Table>
          <TableHeader>
            <TableRow className="[&_th]:text-muted-foreground">
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.map((item) => {
              const { image, name } = item
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
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{formatPrice(Number(item.price))}</TableCell>
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
export default OrderItemsDisplay
