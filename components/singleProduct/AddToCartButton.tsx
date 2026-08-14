"use client"

import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

type Props = {
  isPending: boolean
  clickHandler: (type: "increment" | "decrement") => Promise<void>
}

function AddToCartButton({ isPending, clickHandler }: Props) {
  return (
    <Button
      type="submit"
      className="capitalize w-full"
      onClick={() => clickHandler("increment")}
      disabled={isPending}
    >
      {isPending ? (
        <span className="flex justify-center items-center gap-2">
          <Spinner />
          add to cart
        </span>
      ) : (
        <span className="flex justify-center items-center gap-2">
          <Plus />
          add to cart
        </span>
      )}
    </Button>
  )
}
export default AddToCartButton
