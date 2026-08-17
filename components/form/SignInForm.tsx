"use client"

import CardWrapper from "@/components/user/CardWrapper"

function SignInForm({ callbackUrl }: { callbackUrl: string | undefined }) {
  return (
    <CardWrapper
      headerTitle="Welcome to Mercato"
      headerSubText="Sign in to continue"
      callbackUrl={callbackUrl}
    />
  )
}
export default SignInForm
