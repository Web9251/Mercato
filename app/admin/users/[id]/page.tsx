import { getSingleUser } from "@/actions/userActions"
import UpdateUserForm from "@/components/admin/UpdateUserForm"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{
    id: string
  }>
}

async function UpdateUserPage({ params }: Props) {
  const id = await (await params).id
  const user = await getSingleUser(id)
  if (!user) notFound()

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="space-y-4">
        <p className="text-3xl font-bold">Update User</p>
        <UpdateUserForm user={user} id={id} />
      </div>
    </div>
  )
}
export default UpdateUserPage
