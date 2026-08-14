"use client"

import { createOrderAction } from "@/actions/orderActions"
import { useTransition } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

function PlaceOrderButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleClick = async () => {
    startTransition(async () => {
      const result = await createOrderAction()
      if (!result.success) {
        if (!result.redirectTo) {
          toast.error(result.message)
          return
        }
        toast.error(result.message)
        router.push(result.redirectTo)
      } else {
        toast.success(result.message)
        router.push(result.redirectTo!)
      }
    })
  }

  return (
    <Button className="w-full" onClick={() => handleClick()}>
      {isPending ? (
        <>
          <Spinner />
          Place Order
        </>
      ) : (
        <>
          <Check />
          Place Order
        </>
      )}
    </Button>
  )
}
export default PlaceOrderButton
