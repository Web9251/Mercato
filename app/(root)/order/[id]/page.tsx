import OrderDetail from "@/components/orders/OrderDetail"

async function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  return <OrderDetail params={props.params} />
}
export default OrderDetailPage
