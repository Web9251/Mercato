import PaymentMethod from "@/components/checkout/PaymentMethodCard"
import ShippingAddressCard from "@/components/checkout/ShippingAddressCard"
import CheckoutSteps from "@/components/checkout/CheckoutSteps"
import { getUserById } from "@/actions/userActions"
import { ShippingAddress } from "@/utils/types"
import { notFound, redirect } from "next/navigation"
import { getCart } from "@/actions/cartActions"
import { SuperJSON } from "superjson"
import ItemsList from "@/components/checkout/ItemsList"
import CartSummary from "@/components/orders/CartSummary"

async function PlaceOrderPage() {
  const dbUser = await getUserById()
  if (!dbUser) notFound()

  const address = dbUser.address as ShippingAddress

  const cart = await getCart()
  if (!cart) redirect("/")

  const cartStr = SuperJSON.stringify(cart)
  return (
    <section>
      <CheckoutSteps current={3} />
      <div className="grid md:grid-cols-3 gap-6 mt-10 ">
        <div className="md:col-span-2 space-y-5 ">
          <ShippingAddressCard address={address} />
          <PaymentMethod paymentMethod={dbUser.paymentMethod!} />
          <ItemsList items={cart.cartItems} />
        </div>
        <div className="md:col-span-1 ">
          <CartSummary cartStr={cartStr} />
        </div>
      </div>
    </section>
  )
}
export default PlaceOrderPage
