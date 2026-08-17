"use client"

import { Card, CardContent } from "../ui/card"
import SuperJSON from "superjson"
import { Order } from "@/utils/types"
import { PayPalButton } from "../paypal/PayPalButton"
import PriceRow from "../orders/PriceRow"

type Props = {
  orderStr: string
  isPaid: boolean
  paymentMethod: string
  dbOrderId: string
  showPaypal?: boolean
}

function OrderSummary({
  orderStr,
  isPaid,
  paymentMethod,
  dbOrderId,
  showPaypal = true,
}: Props) {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    SuperJSON.parse<Order>(orderStr)

  return (
    <Card className="dark:bg-transparent">
      <CardContent className="space-y-3">
        <PriceRow text="items" price={itemsPrice} />
        <PriceRow text="tax" price={taxPrice} />
        <PriceRow text="shipping" price={shippingPrice} />
        <PriceRow text="total" price={totalPrice} />

        {showPaypal && !isPaid && paymentMethod === "PayPal" && (
          <PayPalButton orderId={dbOrderId} />
        )}
      </CardContent>
    </Card>
  )
}
export default OrderSummary
