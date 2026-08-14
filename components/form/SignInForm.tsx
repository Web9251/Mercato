"use client"

import CardWrapper from "@/components/user/CardWrapper"
import SubmitButton from "@/components/form/SubmitButton"
import { FieldGroup } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import TextInput from "@/components/form/TextInput"
import { signInFields } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/utils/schemas"
import { signInAction } from "@/actions/userActions"
import { useState } from "react"
import FormSuccess from "@/components/form/FormSuccess"
import FormError from "@/components/form/FormError"
import { useRouter } from "next/navigation"
import { signInDefaultValues } from "@/utils/constants"

function SignInForm({ callbackUrl }: { callbackUrl: string | undefined }) {
  /* ─── useForm ─────────────────────────────────────────────────────────────── */

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValues,
  })

  /* ─── states ─────────────────────────────────────────────────────────────── */

  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")

  /* ─── hooks & others ─────────────────────────────────────────────────────────────── */

  const router = useRouter()

  /* ─── submit handler ─────────────────────────────────────────────────────────────── */

  const submitHandler = async (formData: signInFields) => {
    setError("")
    setSuccess("")
    const result = await signInAction(formData, callbackUrl)
    if (result.success) {
      setSuccess(result.message)
      router.push(result.redirectTo!)
    } else {
      setError(result.message)
    }
  }

  return (
    <CardWrapper
      headerTitle="sign in"
      headerSubText="Sign in to your account"
      footerText="Don`t have an account?"
      footerLink="/sign-up"
      footerLinkLabel="sign up"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <FieldGroup>
          <TextInput
            name="email"
            type="email"
            control={control}
            placeholder="user@example.com"
          />
          <TextInput
            name="password"
            type="password"
            control={control}
            placeholder="******"
          />
          <SubmitButton
            text="sign in"
            isSubmitting={isSubmitting}
            loadingText="signing in..."
          />
          <FormSuccess message={success} />
          <FormError message={error} />
        </FieldGroup>
      </form>
    </CardWrapper>
  )
}
export default SignInForm
