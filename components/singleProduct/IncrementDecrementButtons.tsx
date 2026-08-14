"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { Minus, Plus, Trash } from "lucide-react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  clickHandler: (type: "increment" | "decrement") => Promise<void>
  isPending: boolean
  qty: number | undefined
}

function IncrementDecrementButtons({
  children,
  clickHandler,
  className,
  isPending,
  qty,
}: Props) {
  return (
    <div className={cn(`flex gap-4 items-center justify-center ${className}`)}>
      {/* Minus button */}
      <Button
        variant="outline"
        className="dark:bg-transparent"
        onClick={() => clickHandler("decrement")}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : qty === 1 ? <Trash /> : <Minus />}
      </Button>

      {children}

      {/* Plus button */}
      <Button
        variant="outline"
        className="dark:bg-transparent"
        onClick={() => clickHandler("increment")}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : <Plus />}
      </Button>
    </div>
  )
}
export default IncrementDecrementButtons
