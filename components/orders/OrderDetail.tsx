import PaymentMethod from "@/components/checkout/PaymentMethodCard"
import ShippingAddressCard from "@/components/checkout/ShippingAddressCard"
import { getOrderById } from "@/actions/orderActions"
import { getUserById } from "@/actions/userActions"
import { ShippingAddress } from "@/utils/types"
import { notFound } from "next/navigation"
import { formatId } from "@/utils/utils"
import SuperJSON from "superjson"
import ItemsList from "@/components/checkout/ItemsList"
import OrderSummary from "@/components/checkout/OrderSummary"
import { headers } from "next/headers"

type Props = {
  params: Promise<{
    id: string
  }>
}

async function OrderDetail({ params }: Props) {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname")

  const isAdminPath = pathname?.startsWith("/admin")

  const { id: orderId } = await params

  const [dbUser, order] = await Promise.all([
    await getUserById(),
    await getOrderById(orderId),
  ])

  if (!dbUser || !order) notFound()

  const address = dbUser.address as ShippingAddress
  const orderStr = SuperJSON.stringify(order)

  return (
    <section>
      <p className="text-2xl">Order {formatId(orderId)}</p>
      <div className="grid md:grid-cols-3 gap-6 mt-10 ">
        <div className="md:col-span-2 space-y-5 ">
          <PaymentMethod
            paymentMethod={dbUser.paymentMethod!}
            isPaid={order.isPaid}
            type="orderPage"
          />
          <ShippingAddressCard
            address={address}
            type="orderPage"
            isDelivered={order.isDelivered}
          />
          <ItemsList items={order.orderItems} path="order" />
        </div>
        <div className="md:col-span-1 ">
          <OrderSummary
            orderStr={orderStr}
            isPaid={order.isPaid}
            paymentMethod={order.paymentMethod}
            dbOrderId={order.id}
            showPaypal={!isAdminPath && true}
          />
        </div>
      </div>
    </section>
  )
}
export default OrderDetail
