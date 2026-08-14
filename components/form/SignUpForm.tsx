"use client"

import CardWrapper from "@/components/user/CardWrapper"
import FormError from "@/components/form/FormError"
import FormSuccess from "@/components/form/FormSuccess"
import SubmitButton from "@/components/form/SubmitButton"
import TextInput from "@/components/form/TextInput"
import { FieldGroup } from "@/components/ui/field"
import { signUpSchema } from "@/utils/schemas"
import { signUpFields } from "@/utils/types"
import { signUpAction } from "@/actions/userActions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { signUpDefaultValues } from "@/utils/constants"

function SignUpForm() {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<signUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  })

  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")

  const submitHandler = async (formData: signUpFields) => {
    setError("")
    setSuccess("")
    const result = await signUpAction(formData)
    if (result.success) {
      toast.message(result.success)
      redirect("/sign-in")
    } else {
      setError(result.message)
    }
  }
  return (
    <CardWrapper
      headerTitle="create account"
      headerSubText="Enter your information below to sign up"
      footerText="Already have an account?"
      footerLink="/sign-in"
      footerLinkLabel="sign in"
      showSocial
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
        <FieldGroup>
          <TextInput name="name" control={control} />
          <TextInput name="email" control={control} />
          <TextInput
            name="password"
            type="password"
            control={control}
            fieldDescription="Must be at least 8 characters long."
          />
          <TextInput
            name="confirmPassword"
            type="password"
            label="confirm password"
            control={control}
            fieldDescription="Please confirm your password."
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <SubmitButton
            text="sign up"
            className="w-full"
            isSubmitting={isSubmitting}
            loadingText="signing up..."
          />
        </FieldGroup>
      </form>
    </CardWrapper>
  )
}
export default SignUpForm
