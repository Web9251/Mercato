"use client"

import { ThemeProvider } from "@/app/theme-provider"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { ReactNode } from "react"
import { Toaster } from "sonner"

function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "USD",
        }}
      >
        <Toaster />
        <ThemeProvider>{children}</ThemeProvider>
      </PayPalScriptProvider>
    </>
  )
}
export default Providers
