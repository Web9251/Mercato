import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { ShippingAddress } from "@/utils/types"
import { Badge } from "../ui/badge"

type Props = {
  address: ShippingAddress
  type?: "orderPage" | "preOrderPage"
  isDelivered?: boolean
}

function ShippingAddressCard({
  address,
  isDelivered,
  type = "preOrderPage",
}: Props) {
  const { fullName, streetAddress, city, country, postalCode } = address
  return (
    <Card className="dark:bg-transparent ">
      <CardContent className="space-y-3">
        <h2 className="text-lg capitalize">shipping address</h2>
        <div>
          <p className="">{fullName} </p>
          <p className="capitalize">
            {streetAddress}, {city} {postalCode}, {country}
          </p>
        </div>
        {type === "preOrderPage" ? (
          <Button variant="outline" className="dark:bg-transparent" asChild>
            <Link href="/shipping-address">Edit</Link>
          </Button>
        ) : isDelivered ? (
          <Badge className="bg-emerald-50 text-emerald-700">Delivered</Badge>
        ) : (
          <Badge variant="destructive">Not Delivered</Badge>
        )}
      </CardContent>
    </Card>
  )
}
export default ShippingAddressCard
