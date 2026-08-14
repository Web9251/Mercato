import OrderDetail from "@/components/orders/OrderDetail"

async function AdminOrderDetail(props: { params: Promise<{ id: string }> }) {
  return <OrderDetail params={props.params} />
}
export default AdminOrderDetail
