import ShippingAddressForm from "@/components/checkout/ShippingAddressForm"
import { currentUser } from "@/hooks/currentUser"
import { ShippingAddress } from "@/utils/types"
import { getCart, getCartItems } from "@/actions/cartActions"
import { getUserById } from "@/actions/userActions"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import CheckoutSteps from "@/components/checkout/CheckoutSteps"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "Shipping Address",
}

async function ShippingAddressPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session && session.user.isAnonymous) {
    redirect("/sign-in?callbackUrl=/shipping-address")
  }

  const cart = await getCart()
  const cartItems = await getCartItems(cart?.id)
  if (!cart || cartItems.length === 0) redirect("/cart")

  const user = await currentUser()
  const userId = user?.id
  if (!userId) throw new Error("No user found")

  const dbUser = await getUserById()
  if (!dbUser) notFound()

  return (
    <section>
      <CheckoutSteps current={1} />
      <div className="flex justify-center mt-10 ">
        <div className="flex flex-col space-y-3 w-sm">
          <h2 className="text-2xl md:text-3xl capitalize font-bold">
            shipping address
          </h2>
          <p className="text-sm text-muted-foreground">
            Please enter and address to ship to
          </p>
          <ShippingAddressForm address={dbUser.address as ShippingAddress} />
        </div>
      </div>
    </section>
  )
}
export default ShippingAddressPage
