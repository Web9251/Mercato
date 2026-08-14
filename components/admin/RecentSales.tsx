import { LatestSales } from "@/utils/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import dayjs from "dayjs"
import { formatPrice } from "@/utils/utils"
import { Button } from "../ui/button"
import Link from "next/link"

function RecentSales({ recentSales }: { recentSales: LatestSales[] }) {
  return (
    <Card className="bg-transparent h-full w-full">
      <CardHeader>
        <h2 className="text-2xl font-bold">Recent Sales</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="[&_th]:text-muted-foreground">
              <TableHead>BUYER</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSales.map((sale, index) => {
              const { createdAt, user, totalPrice, id } = sale
              const date = dayjs(createdAt).format("MMM D, YYYY, h:m A")

              return (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{formatPrice(totalPrice)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="dark:bg-transparent"
                      asChild
                    >
                      <Link href={`/admin/orders/${id}`}>Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
export default RecentSales
