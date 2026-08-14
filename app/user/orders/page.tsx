import { getUserOrders } from "@/actions/orderActions"
import PaginationContainer from "@/components/user/PaginationContainer"
import { pageSize } from "@/utils/constants"
import UserOrders from "@/components/user/UserOrders"

type Props = {
  searchParams: Promise<{
    page?: string
  }>
}

async function UserOrdersPage({ searchParams }: Props) {
  const page = (await searchParams).page || 1
  const orders = await getUserOrders(pageSize, Number(page))
  const { data, totalPages } = orders

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Orders</h2>
      <UserOrders data={data} />
      <div className="my-12">
        <PaginationContainer totalPages={totalPages} page={Number(page)} />
      </div>
    </section>
  )
}
export default UserOrdersPage
