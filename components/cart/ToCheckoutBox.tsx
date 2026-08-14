"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { ArrowRight } from "lucide-react"
import { useTransition } from "react"
import { Spinner } from "../ui/spinner"
import { formatPrice } from "@/utils/utils"
import SuperJSON from "superjson"
import { Decimal } from "@prisma/client/runtime/client"

function ToCheckoutBox({
  priceStr,
  subTotals,
}: {
  priceStr: string
  subTotals: number
}) {
  const price = SuperJSON.parse<Decimal>(priceStr)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  return (
    <Card className="flex flex-col justify-center items-center dark:bg-transparent">
      <h2 className="text-xl">
        Subtotal ({subTotals}):{" "}
        <span className="font-semibold">{formatPrice(price)}</span>
      </h2>
      <Button
        onClick={() =>
          startTransition(async () => router.push("/shipping-address"))
        }
      >
        {isPending ? (
          <>
            <Spinner />
            Proceed To Checkout
          </>
        ) : (
          <>
            <ArrowRight />
            Proceed To Checkout
          </>
        )}
      </Button>
    </Card>
  )
}
export default ToCheckoutBox
