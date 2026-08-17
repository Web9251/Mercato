"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { FaGithub } from "react-icons/fa6"
import { authClient } from "@/lib/auth-client"

function Social({ callbackUrl }: { callbackUrl: string | undefined }) {
  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    })
  }
  const githubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: callbackUrl,
    })
  }

  return (
    <div>
      <div className="flex flex-col w-full gap-y-5 my-8">
        <Button variant="outline" size="lg" onClick={googleSignIn}>
          Sign in with Google
          <FcGoogle className="h-5 w-5 ml-2" />
        </Button>
        <Button variant="outline" size="lg" onClick={githubSignIn}>
          Sign in with GitHub
          <FaGithub className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
export default Social
