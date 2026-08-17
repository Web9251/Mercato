"use client"

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { createPayPalOrder, capturePayPalOrder } from "actions/paypalActions"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

function PrintLoadingState() {
  return (
    <div className="space-y-2">
      <div className="h-11.25 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-11.25 w-full animate-pulse rounded-md bg-muted" />
    </div>
  )
}

export function PayPalButton({ orderId }: { orderId: string }) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer()
  const [isPaying, startTransition] = useTransition()
  const router = useRouter()

  if (isPending) return <PrintLoadingState />
  if (isRejected) return <p>Failed to load PayPal</p>

  return (
    <div className="relative">
      {isPaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/60 dark:bg-black/50">
          <PrintLoadingState />
        </div>
      )}

      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={isPaying}
        createOrder={async () => {
          try {
            return await createPayPalOrder(orderId)
          } catch (err) {
            toast.error(
              err instanceof Error ? err.message : "Failed to create order"
            )
            throw err
          }
        }}
        onApprove={async (data) => {
          startTransition(async () => {
            try {
              await capturePayPalOrder(data.orderID, orderId)
              toast.success("Payment successful!")
              router.refresh()
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Payment failed")
            }
          })
        }}
        onError={(err) => {
          toast.error("PayPal error occurred")
          console.error(err)
        }}
      />
    </div>
  )
}
