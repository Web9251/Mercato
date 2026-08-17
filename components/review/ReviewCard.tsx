"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { OnReviewChange, ReviewWithUser } from "@/utils/types"
import { Rating } from "./rating"
import dayjs from "dayjs"
import { Separator } from "../ui/separator"
import ReviewModal from "../singleProduct/ReviewModal"
import { Review } from "@/generated/prisma/client"

type Props = {
  review: ReviewWithUser
  isOwn: boolean
  userReview: Review | null
  onReviewChange: OnReviewChange
}

function ReviewCard({ review, isOwn, onReviewChange, userReview }: Props) {
  const {
    updatedAt,
    rating,
    comment,
    title,
    user: { name, image },
  } = review
  const date = dayjs(updatedAt).format("MMM D, YYYY, h:m A")
  const letter = review.user.name.slice(0, 2).toUpperCase()
  return (
    <article className="py-5 first:pt-0">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={image!} alt={name} />
            <AvatarFallback className="text-xs">{letter}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium leading-none">{name}</p>
              {isOwn && (
                <span className="text-[10px] bg-muted text-muted-foreground rounded px-1.5 py-0.5 leading-none">
                  You
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Rating rate={rating} />
          {isOwn && (
            <ReviewModal
              onReviewChange={onReviewChange}
              userReview={userReview}
            />
          )}
        </div>
      </div>

      <p className="text-sm font-medium mb-1">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{comment}</p>

      <Separator className="my-3" />
    </article>
  )
}

export default ReviewCard
