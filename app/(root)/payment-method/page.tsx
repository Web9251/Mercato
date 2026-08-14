import CheckoutSteps from "@/components/checkout/CheckoutSteps"
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm"
import { getUserById } from "@/actions/userActions"
import { notFound } from "next/navigation"

async function PaymentMethodPage() {
  const dbUser = await getUserById()
  if (!dbUser) notFound()

  return (
    <section>
      <CheckoutSteps current={2} />
      <div className="flex justify-center mt-10">
        <div className="flex flex-col space-y-4 w-sm ">
          <h2 className="text-2xl md:text-3xl capitalize font-bold ">
            payment method
          </h2>
          <PaymentMethodForm paymentMethod={dbUser.paymentMethod} />
        </div>
      </div>
    </section>
  )
}
export default PaymentMethodPage
