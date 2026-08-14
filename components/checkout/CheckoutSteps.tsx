import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import React from "react"

function CheckoutSteps({ current = 0 }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between items-center max-w-5xl px-6 mx-auto mt-4">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => {
          return (
            <React.Fragment key={index}>
              <Badge
                className={`py-3 px-0 text-sm ${current === index ? "px-6" : ""}`}
                variant={`${current === index ? "secondary" : "noEffect"}`}
              >
                {step}
              </Badge>
              {step !== "Place Order" && (
                <Separator orientation="horizontal" className="w-10!" />
              )}
            </React.Fragment>
          )
        }
      )}
    </div>
  )
}
export default CheckoutSteps
