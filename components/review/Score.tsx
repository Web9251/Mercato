import { Rating } from "./rating"

type Props = {
  productRating: number
  totalReviews: number
}

function Score({ productRating, totalReviews }: Props) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
        Customer Reviews
      </p>
      <div className="flex items-end gap-2">
        <span className="text-5xl font-bold tracking-tight">
          {productRating}
        </span>
        <span className="text-muted-foreground mb-1 text-sm">/ 5</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        {/* <Stars
                  value={Math.round(parseFloat(productRating.toString()))}
                  size={15}
                /> */}
        <Rating rate={productRating} />
        <span className="text-xs text-muted-foreground">
          {totalReviews.toLocaleString()} reviews
        </span>
      </div>
    </div>
  )
}
export default Score
