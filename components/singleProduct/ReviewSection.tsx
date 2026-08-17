"use client"

import SectionTitle from "../global/SectionTitle"
import { Button } from "../ui/button"
import SignInButton from "../form/SignInButton"
import { Review } from "@/generated/prisma/client"
import { getAllReviews } from "@/actions/reviewAction"
import { SessionUser } from "@/utils/types"
import ReviewsContainer from "@/components/review/ReviewsContainer"

type Props = {
  userReview: Review | null
  initialReviews: Awaited<ReturnType<typeof getAllReviews>>
  user: SessionUser | undefined
  productRating: number
}

function ReviewSection({
  userReview,
  initialReviews,
  user,
  productRating,
}: Props) {
  return (
    <div className="mt-10">
      <SectionTitle text="customer reviews" />

      {initialReviews.totalReviews === 0 && (
        <p className="mt-6">No reviews yet</p>
      )}

      {user?.isAnonymous ||
        (!user && (
          <div className="mt-4">
            Please
            <SignInButton asChild mode="modal">
              <Button variant="link" className="text-blue-500">
                Sign In
              </Button>
            </SignInButton>
            to write a review
          </div>
        ))}

      <div className="mt-4 ">
        <ReviewsContainer
          productRating={productRating}
          initialReviews={initialReviews}
          userReview={userReview}
          user={user}
        />
      </div>
    </div>
  )
}
export default ReviewSection
