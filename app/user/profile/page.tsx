import UserProfileForm from "@/components/user/UserProfileForm"
import { getUserById } from "@/actions/userActions"
import { notFound } from "next/navigation"

async function UserProfilePage() {
  const user = await getUserById()
  if (!user) notFound()
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-sm space-y-4">
        <p className="text-3xl font-bold">Profile</p>
        <UserProfileForm user={user} />
      </div>
    </div>
  )
}
export default UserProfilePage
