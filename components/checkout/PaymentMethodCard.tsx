import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"

type Props = {
  paymentMethod: string
  type?: "orderPage" | "preOrderPage"
  isPaid?: boolean
}

function PaymentMethod({
  paymentMethod,
  isPaid,
  type = "preOrderPage",
}: Props) {
  return (
    <Card className="dark:bg-transparent ">
      <CardContent className="space-y-3">
        <h2 className="text-lg capitalize">payment method</h2>
        <div>
          <p className="capitalize">{paymentMethod}</p>
        </div>

        {type === "preOrderPage" ? (
          <Button variant="outline" className="dark:bg-transparent" asChild>
            <Link href="/payment-method">Edit</Link>
          </Button>
        ) : isPaid ? (
          <Badge className="bg-emerald-50 text-emerald-700">Paid</Badge>
        ) : (
          <Badge variant="destructive">Not Paid</Badge>
        )}
      </CardContent>
    </Card>
  )
}
export default PaymentMethod
