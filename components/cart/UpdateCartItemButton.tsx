"use client"

import { addToCartAction, decrementItemAction } from "@/actions/cartActions"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import AddToCartButton from "../singleProduct/AddToCartButton"
import IncrementDecrementButtons from "../singleProduct/IncrementDecrementButtons"

type Props = {
  cartId: string | undefined
  productId: string
  className?: string
  qty: number | undefined
}

function UpdateCartItemButton({ cartId, productId, className, qty }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  /*  ─── Click handler ─────────────────────────────────────────────────────────────── */
  const clickHandler = async (type: "increment" | "decrement") => {
    startTransition(async () => {
      let result

      if (type === "increment") {
        result = await addToCartAction(productId)
      } else if (type === "decrement") {
        result = await decrementItemAction(productId, cartId!)
      }

      if (result?.success) {
        // for cart page toast without button
        if (pathname === "/cart") {
          toast.success(result.message)
          return
        } else {
          // for other pages toast with button
          toast.success(result.message, {
            action: {
              label: "Go To Cart",
              onClick: () => router.push("/cart"),
            },
          })
          return
        }
      } else {
        toast.error(result?.message)
      }
    })
  }

  /*  ─── Add to cart button ─────────────────────────────────────────────────────────────── */
  if (!qty) {
    return <AddToCartButton isPending={isPending} clickHandler={clickHandler} />
  }

  /*  ─── Plus & Minus buttons ─────────────────────────────────────────────────────────────── */
  return (
    <IncrementDecrementButtons
      isPending={isPending}
      qty={qty}
      clickHandler={clickHandler}
      className={className}
    >
      {qty}
    </IncrementDecrementButtons>
  )
}
export default UpdateCartItemButton
