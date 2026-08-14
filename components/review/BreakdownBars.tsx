import { RatingData } from "@/utils/types"
import { Star } from "lucide-react"

type Props = {
  ratingData: RatingData
  totalReviews: number
}

function BreakdownBars({ ratingData, totalReviews }: Props) {
  return (
    <div className="space-y-2">
      {ratingData.map(({ stars, count, color }) => {
        const pct = Math.round((count / totalReviews) * 100)
        return (
          <div key={stars} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-16 shrink-0">
              <span className="text-sm font-medium w-3 text-right">
                {stars}
              </span>
              <Star size={12} className="fill-amber-400 text-amber-400" />
            </div>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${color} transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-10 text-right shrink-0">
              {pct}%
            </span>
          </div>
        )
      })}
    </div>
  )
}
export default BreakdownBars
