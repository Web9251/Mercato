import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Order } from "@/generated/prisma/client"
import { formatId, formatPrice } from "@/utils/utils"
import dayjs from "dayjs"
import { Button } from "../ui/button"
import Link from "next/link"
function UserOrders({ data }: { data: Order[] }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="[&_th]:text-muted-foreground">
          <TableHead>ID</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>PAID</TableHead>
          <TableHead>DELIVERED</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order) => {
          const { id, createdAt, totalPrice, isPaid, isDelivered } = order
          const paid = isPaid ? "Paid" : "Not Paid"
          const delivered = isDelivered ? "Delivered" : "Not Delivered"
          const date = dayjs(createdAt).format("MMM D, YYYY, h:m A")

          return (
            <TableRow key={id}>
              <TableCell>{formatId(id)}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{formatPrice(totalPrice)}</TableCell>
              <TableCell>{paid}</TableCell>
              <TableCell>{delivered}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="dark:bg-transparent"
                  asChild
                >
                  <Link href={`/user/orders/${id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default UserOrders
