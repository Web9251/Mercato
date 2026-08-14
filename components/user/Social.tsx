"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { FaGithub } from "react-icons/fa6"
import { authClient } from "@/lib/auth-client"
import { Separator } from "../ui/separator"
import { FieldSeparator } from "../ui/field"

function Social() {
  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }
  const githubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    })
  }

  return (
    <div>
      <FieldSeparator className="mt-3">Or continue with</FieldSeparator>
      <div className="grid grid-cols-2 items-center w-full gap-x-2 mt-8">
        <Button variant="outline" size="lg" onClick={googleSignIn}>
          <FcGoogle className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="lg" onClick={githubSignIn}>
          <FaGithub className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
export default Social
