"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ReviewForm from "../review/ReviewForm"
import { Review } from "@/generated/prisma/client"
import { createReview, updateReview } from "@/actions/reviewAction"
import { useParams, useRouter } from "next/navigation"
import {
  OnReviewChange,
  ReviewFieldsInput,
  ReviewWithUser,
} from "@/utils/types"
import { toast } from "sonner"
import { useState } from "react"
import { MessageSquarePlus, Pencil } from "lucide-react"

type Props = {
  userReview: Review | null
  onReviewChange: OnReviewChange
}

export default function ReviewModal({ userReview, onReviewChange }: Props) {
  const [open, setOpen] = useState(false)
  const params = useParams<{ slug: string }>()

  const submitHandler = async (formData: ReviewFieldsInput) => {
    // creating state
    if (!userReview && onReviewChange) {
      const result = await createReview(formData, params.slug)
      if (!result.success) {
        toast.error(result.message)
        return
      } else {
        setOpen(false)
        toast.success(result.message)
        onReviewChange({
          newReview: result.data as ReviewWithUser,
          state: "create",
        })
        // router.refresh() does work because its rendering reviews from local state
      }
    } else {
      // updating state
      const result = await updateReview(formData, params.slug)
      if (!result.success) {
        toast.error(result.message)
        return
      } else {
        setOpen(false)
        toast.success(result.message)
        onReviewChange({
          newReview: result.data as ReviewWithUser,
          state: "edit",
        })
      }
    }
  }

  return (
    // onOpenChange => set true/false value to the state
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {userReview ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs gap-1"
          >
            <Pencil size={11} />
            Edit
          </Button>
        ) : (
          <Button className=" gap-2">
            <MessageSquarePlus size={15} />
            Write a Review
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts with other customers
          </DialogDescription>
        </DialogHeader>

        {/*  ─── Review Form ─────────────────────────────────────────────────────────────── */}
        <ReviewForm userReview={userReview} submitHandler={submitHandler} />

        <DialogFooter className="dark:bg-transparent"></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
