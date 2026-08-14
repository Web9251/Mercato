import Link from "next/link"
import { Button } from "../ui/button"
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "../ui/table"
import { Order } from "@/generated/prisma/client"
import { formatId, formatPrice } from "@/utils/utils"
import { ShippingAddress } from "@/utils/types"
import dayjs from "dayjs"
import DeleteAlert from "./DeleteAlert"
import SuperJSON from "superjson"

function AdminOrdersContainer({ ordersStr }: { ordersStr: string }) {
  const orders = SuperJSON.parse<Order[]>(ordersStr)
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="[&_th]:text-muted-foreground">
          <TableHead>ID</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>BUYER</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>PAID</TableHead>
          <TableHead>DELIVERED</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const {
            id,
            createdAt,
            shippingAddress,
            totalPrice,
            isPaid,
            isDelivered,
          } = order

          const { fullName } = shippingAddress as ShippingAddress
          const date = dayjs(createdAt).format("MMM D, YYYY, h:m A")

          return (
            <TableRow key={id}>
              <TableCell>{formatId(id)}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{fullName}</TableCell>
              <TableCell>{formatPrice(Number(totalPrice))}</TableCell>
              <TableCell>{isPaid ? "Paid" : "Not Paid"}</TableCell>
              <TableCell>
                {isDelivered ? "Delivered" : "Not Delivered"}
              </TableCell>
              <TableCell className="flex gap-3">
                <Button
                  variant="outline"
                  className="dark:bg-transparent"
                  asChild
                >
                  <Link href={`/admin/orders/${id}`}>Details</Link>
                </Button>
                <DeleteAlert id={id} path="orders" />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default AdminOrdersContainer
