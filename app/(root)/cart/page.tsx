import CartItemsContainer from "@/components/cart/CartItemsContainer"
import ToCheckoutBox from "@/components/cart/ToCheckoutBox"
import SectionTitle from "@/components/global/SectionTitle"
import { getCart } from "@/actions/cartActions"
import SuperJSON from "superjson"

async function CartPage() {
  const cart = await getCart()
  const cartItems = cart?.cartItems

  if (!cartItems || cartItems.length === 0)
    return (
      <section>
        <SectionTitle text="shopping cart" />
        <h2 className="mt-6 text-xl">Empty Cart</h2>
      </section>
    )

  // total number of cartItems
  const subTotals =
    cartItems?.reduce((acc, item) => {
      return acc + item.qty
    }, 0) ?? 0

  const priceStr = SuperJSON.stringify(cart.itemsPrice)

  return (
    <section>
      <SectionTitle text="shopping cart" />
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-3 ">
          {cart && (
            <CartItemsContainer cartItems={cartItems} cartId={cart.id} />
          )}
        </div>
        <div className="md:col-span-1">
          <ToCheckoutBox priceStr={priceStr} subTotals={subTotals} />
        </div>
      </div>
    </section>
  )
}
export default CartPage
