import SignInForm from "@/components/form/SignInForm"
import { currentUser } from "@/hooks/currentUser"
import { redirect } from "next/navigation"

type Props = {
  searchParams: Promise<{
    callbackUrl: string
  }>
}

async function SignInPage({ searchParams }: Props) {
  const callbackUrl = (await searchParams).callbackUrl

  const user = await currentUser()

  if (user && !user.isAnonymous) {
    redirect("/")
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  )
}
export default SignInPage
