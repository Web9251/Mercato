"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import TextInput from "../form/TextInput"
import { UpdateUserFields } from "@/utils/types"
import SelectInput from "../form/SelectInput"
import SubmitButton from "../form/SubmitButton"
import { userUpdateSelectInputs } from "@/utils/constants"
import { User } from "@/generated/prisma/client"
import { updateUserAction } from "@/actions/userActions"
import { toast } from "sonner"

function UpdateUserForm({ user, id }: { user: User; id: string }) {
  const { name, email, role } = user
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm<UpdateUserFields>({
    defaultValues: {
      name,
      email,
      role: role as "user" | "admin",
    },
  })

  const submitHandler: SubmitHandler<UpdateUserFields> = async (formData) => {
    const result = await updateUserAction(formData, id)
    if (result.success) {
      toast.success(result.message)
      return
    }
    toast.error(result.message)
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
      <TextInput control={control} type="email" name="email" />
      <TextInput control={control} name="name" />
      <SelectInput
        name="role"
        control={control}
        selectValues={userUpdateSelectInputs}
      />
      <SubmitButton
        text="update user"
        loadingText="updating user..."
        className="w-full"
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
export default UpdateUserForm
