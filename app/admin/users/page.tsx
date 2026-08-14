import { getAllUsers } from "@/actions/userActions"
import UsersContainer from "@/components/admin/UsersContainer"
import EmptyPage from "@/components/global/EmptyPage"
import SectionTitle from "@/components/global/SectionTitle"
import PaginationContainer from "@/components/user/PaginationContainer"
import { pageSize } from "@/utils/constants"

type Props = {
  searchParams: Promise<{
    page: string
  }>
}

async function AdminUsersPage({ searchParams }: Props) {
  const page = (await searchParams).page || 1
  const users = await getAllUsers(pageSize, Number(page))
  const { data, totalPages } = users

  if (totalPages === 0) return <EmptyPage />

  return (
    <section>
      <SectionTitle text="users" />
      <UsersContainer users={data} />
      <div className="my-10">
        <PaginationContainer totalPages={totalPages} page={Number(page)} />
      </div>
    </section>
  )
}
export default AdminUsersPage
