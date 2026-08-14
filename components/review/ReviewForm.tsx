"use client"

import { reviewSchema } from "@/utils/schemas"
import { ReviewFieldsInput } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FieldGroup } from "../ui/field"
import TextInput from "../form/TextInput"
import TextareaInput from "../form/TextareaInput"
import SelectInput from "../form/SelectInput"
import SubmitButton from "../form/SubmitButton"
import { ratings } from "@/utils/constants"
import { createReview } from "@/actions/reviewAction"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { Review } from "@/generated/prisma/client"

type Props = {
  userReview: Review | null
  submitHandler: (date: ReviewFieldsInput) => Promise<void>
}

function ReviewForm({ userReview, submitHandler }: Props) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ReviewFieldsInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: userReview?.title || "",
      comment: userReview?.comment || "",
      rating: userReview?.rating.toString() || 0,
    },
  })

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup>
        <TextInput name="title" control={control} />
        <TextareaInput name="comment" control={control} />
        <SelectInput name="rating" control={control} selectValues={ratings} />
        <SubmitButton
          text={userReview ? "update" : "submit"}
          className="w-full"
          isSubmitting={isSubmitting}
          loadingText={userReview ? "updating..." : "submitting..."}
        />
      </FieldGroup>
    </form>
  )
}
export default ReviewForm
