"use client"

import { Review } from "@/generated/prisma/client"
import ReviewModal from "../singleProduct/ReviewModal"
import { Separator } from "../ui/separator"
import { OnReviewChange, RatingData, SessionUser } from "@/utils/types"
import BreakdownBars from "./BreakdownBars"
import Score from "./Score"

type Props = {
  productRating: number
  userReview: Review | null
  onReviewChange: OnReviewChange
  totalReviews: number
  ratingData: RatingData
  user: SessionUser | undefined
}

function RatingSummary({
  productRating,
  userReview,
  onReviewChange,
  totalReviews,
  ratingData,
  user,
}: Props) {
  return (
    <div className="lg:sticky lg:top-8">
      <div className="flex flex-col gap-5">
        <Score totalReviews={totalReviews} productRating={productRating} />

        <BreakdownBars ratingData={ratingData} totalReviews={totalReviews} />

        {user && !userReview && (
          <>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-3">
                Share your experience with others.
              </p>

              <ReviewModal
                onReviewChange={onReviewChange}
                userReview={userReview}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default RatingSummary
