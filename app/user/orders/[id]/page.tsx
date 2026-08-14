import OrderDetail from "@/components/orders/OrderDetail"

async function UserOrderDetail(props: { params: Promise<{ id: string }> }) {
  return <OrderDetail params={props.params} />
}
export default UserOrderDetail
