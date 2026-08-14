import SignUpForm from "@/components/form/SignUpForm"
import { currentUser } from "@/hooks/currentUser"
import { redirect } from "next/navigation"

async function SignUpPage() {
  const user = await currentUser()

  if (user && !user.isAnonymous) {
    redirect("/")
  }
  return (
    <div className="flex flex-1 items-center justify-center pt-8">
      <SignUpForm />
    </div>
  )
}
export default SignUpPage
