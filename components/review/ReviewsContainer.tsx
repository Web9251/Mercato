"use client"

import { useRef, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"
import { OnReviewChange, SessionUser } from "@/utils/types"
import { getAllReviews } from "@/actions/reviewAction"
import { useParams } from "next/navigation"
import { Review } from "@/generated/prisma/client"
import RatingSummary from "./RatingSummary"
import ReviewModal from "../singleProduct/ReviewModal"
import ReviewCard from "./ReviewCard"

type Props = {
  userReview: Review | null
  initialReviews: Awaited<ReturnType<typeof getAllReviews>>
  productRating: number
  user: SessionUser | undefined
}

export default function ReviewsContainer({
  initialReviews,
  productRating,

  userReview,
  user,
}: Props) {
  /* ─── states ─────────────────────────────────────────────────────────────── */
  const [reviews, setReviews] = useState(initialReviews.reviews)
  const [hasMore, setHasMore] = useState(initialReviews.hasMore)
  const pageRef = useRef(1)

  /* ─── hooks & others ─────────────────────────────────────────────────────────────── */

  const [isPending, startTransition] = useTransition()
  const params = useParams<{ slug: string }>()

  /* ─── loadMore func ─────────────────────────────────────────────────────────────── */
  const loadMore = () => {
    startTransition(async () => {
      pageRef.current += 1

      const data = await getAllReviews({
        slug: params.slug,
        page: pageRef.current,
      })

      setReviews((prev) => [...prev, ...data.reviews]) // previous reviews + nextPage reviews combined
      setHasMore(data.hasMore)
    })
  }

  /* ─── onReviewChange func ─────────────────────────────────────────────────────────────── */

  //  called from ReviewModal after successful submit
  const onReviewChange: OnReviewChange = ({ newReview, state }) => {
    if (state === "create") {
      setReviews((prev) => [newReview, ...prev])
    } else {
      setReviews((prev) =>
        prev.map((review) => (review.id === newReview.id ? newReview : review))
      )
    }
  }

  const { totalReviews, ratingData } = initialReviews
  return (
    <section>
      {/* // if there is user & no reviews show write review button/modal */}
      {reviews.length === 0 && user && !user?.isAnonymous && (
        <div className="mt-4">
          <ReviewModal
            userReview={userReview}
            onReviewChange={onReviewChange} // the reason local states are here
          />
        </div>
      )}
      <div className="py-10">
        {initialReviews.totalReviews > 0 && ( // if there are reviews display
          <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-12 lg:items-start">
            {/* ─── Left / top: Rating summary ───────────────────────────────────────────────────────────────  */}

            <RatingSummary
              totalReviews={totalReviews}
              ratingData={ratingData}
              onReviewChange={onReviewChange}
              userReview={userReview}
              productRating={productRating}
              user={user}
            />

            <Separator className="my-8 lg:hidden" />

            {/* ───  Reviews & loadMore button  ───────────────────────────────────────────────────────────────  */}

            <div>
              <div className="flex flex-col">
                {/* ───  Review items separated by dividers  ───────────────────────────────────────────────────────────────  */}

                {reviews.map((review) => {
                  const isOwn = review.userId === user?.id
                  return (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      onReviewChange={onReviewChange}
                      isOwn={isOwn}
                      userReview={userReview}
                    />
                  )
                })}

                {/* ───  loadMore Button  ───────────────────────────────────────────────────────────────  */}

                {hasMore && (
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      // onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      onClick={loadMore}
                    >
                      {isPending ? (
                        "..."
                      ) : (
                        <>
                          <ChevronDown size={15} />
                          Load More Reviews
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
