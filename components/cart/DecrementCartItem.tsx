"use client"

import { Minus } from "lucide-react"
import { Button } from "../ui/button"
import { decrementItemAction } from "@/actions/cartActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Spinner } from "../ui/spinner"

type Props = {
  cartId: string
  productId: string
  type: "increment" | "decrement"
}

function DecrementCartItem({ cartId, productId, type }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const clickHandler = () => {
    startTransition(async () => {
      const result = await decrementItemAction(cartId, productId)

      if (!result.success) {
        toast.error(result.message)
        return
      }

      toast.success(result.message, {
        action: {
          label: "Go To Cart",
          onClick: () => router.push("/cart"),
        },
      })
    })
  }

  return (
    <Button
      variant="outline"
      className="dark:bg-transparent"
      onClick={() => clickHandler()}
      disabled={pending}
    >
      {pending ? <Spinner /> : <Minus />}
    </Button>
  )
}
export default DecrementCartItem
