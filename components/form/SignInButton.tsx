"use client"

import { ReactNode } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import SignInForm from "./SignInForm"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  children: ReactNode
  mode?: "redirect" | "modal"
  asChild?: boolean
}

function SignInButton({ children, asChild, mode = "redirect" }: Props) {
  const router = useRouter()
  const pathName = usePathname()

  const onClick = () => {
    router.push(`/sign-in?callbackUrl=${pathName}`)
  }

  if (mode === "modal")
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-fit h-fit min-w-none p-0 shadow-none border-none ring-0 gap-0 overflow-hidden">
          <DialogTitle className="hidden">Sign in form</DialogTitle>
          <SignInForm callbackUrl={pathName} />
        </DialogContent>
      </Dialog>
    )

  return <span onClick={onClick}>{children}</span>
}
export default SignInButton
