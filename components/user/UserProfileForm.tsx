"use client"
import { useForm } from "react-hook-form"
import TextInput from "../form/TextInput"
import SubmitButton from "../form/SubmitButton"
import { UserProfile } from "@/utils/types"
import { updateUserInfo } from "@/actions/userActions"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { userProfileSchema } from "@/utils/schemas"
import { User } from "@/generated/prisma/client"

function UserProfileForm({ user }: { user: User }) {
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name!,
      email: user.email!,
    },
  })

  const submitHandler = async (formData: UserProfile) => {
    const result = await updateUserInfo(formData)
    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success(result.message)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 ">
      <TextInput control={control} name="email" disabled={true} />
      <TextInput control={control} name="name" />
      <SubmitButton
        text="update profile"
        className="w-full"
        isSubmitting={isSubmitting}
        loadingText="updating..."
      />
    </form>
  )
}
export default UserProfileForm
