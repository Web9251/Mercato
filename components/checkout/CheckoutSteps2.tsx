"use client"

import { usePathname } from "next/navigation"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"

function CheckoutSteps2() {
  const currentPath = usePathname()

  const className = (pathName: string) => {
    return currentPath === pathName ? "px-6" : "px-0"
  }

  const changeVariant = (pathName: string) => {
    return currentPath === pathName ? "secondary" : "noEffect"
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between items-center max-w-5xl px-6 mx-auto mt-4">
      <Badge
        className={`py-3 px-0 text-sm ${className("/user-login")}`}
        variant={`${changeVariant("/user-login")}`}
      >
        User Login
      </Badge>
      <Separator orientation="horizontal" className="w-10!" />
      <Badge
        className={`py-3 px-0 text-sm ${className("/shipping-address")}`}
        variant={`${changeVariant("/shipping-address")}`}
      >
        Shipping Address
      </Badge>
      <Separator orientation="horizontal" className="w-10!" />

      <Badge
        className={`py-3 px-0 text-sm ${className("/payment-method")}`}
        variant={`${changeVariant("/payment-method")}`}
      >
        Payment Method
      </Badge>
      <Separator orientation="horizontal" className="w-10!" />

      <Badge
        className={`py-3 px-0 text-sm ${className("/place-order")}`}
        variant={`${changeVariant("/place-order")}`}
      >
        Place Order
      </Badge>
    </div>
  )
}
export default CheckoutSteps2
