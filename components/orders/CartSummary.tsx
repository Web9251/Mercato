"use client"

import { Card, CardContent } from "../ui/card"
import SuperJSON from "superjson"
import { Cart } from "@/utils/types"
import PriceRow from "./PriceRow"
import PlaceOrderButton from "./PlaceOrderButton"

function CartSummary({ cartStr }: { cartStr: string }) {
  const { itemsPrice, totalPrice, taxPrice, shippingPrice } =
    SuperJSON.parse<Cart>(cartStr)

  return (
    <Card className="dark:bg-transparent">
      <CardContent className="space-y-3">
        <PriceRow text="items" price={itemsPrice} />
        <PriceRow text="tax" price={taxPrice} />
        <PriceRow text="shipping" price={shippingPrice} />
        <PriceRow text="total" price={totalPrice} />

        <PlaceOrderButton />
      </CardContent>
    </Card>
  )
}
export default CartSummary
