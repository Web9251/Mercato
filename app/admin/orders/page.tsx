import { getAdminOrders } from "@/actions/orderActions"
import AdminOrdersContainer from "@/components/admin/AdminOrdersContainer"
import EmptyPage from "@/components/global/EmptyPage"
import SectionTitle from "@/components/global/SectionTitle"
import PaginationContainer from "@/components/user/PaginationContainer"
import { pageSize } from "@/utils/constants"
import SuperJSON from "superjson"

type Props = {
  searchParams: Promise<{
    page: string
  }>
}

async function AdminOrdersPage({ searchParams }: Props) {
  const page = (await searchParams).page || 1
  const orders = await getAdminOrders(pageSize, Number(page))
  const ordersStr = SuperJSON.stringify(orders.data)
  const { totalPages } = orders

  if (totalPages === 0) return <EmptyPage />

  return (
    <section>
      <SectionTitle text="orders" />
      <AdminOrdersContainer ordersStr={ordersStr} />
      <div className="my-10">
        <PaginationContainer totalPages={totalPages} page={Number(page)} />
      </div>
    </section>
  )
}
export default AdminOrdersPage
