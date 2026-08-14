import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

type Props = {
  text: string
  isSubmitting?: boolean
  className?: string
  loadingText?: string
}

function SubmitButton({ text, isSubmitting, loadingText, className }: Props) {
  return (
    <Button
      className={cn(`capitalize`, className)}
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? (
        <span className="flex gap-2 justify-center items-center">
          <Spinner />
          {loadingText || "Submitting..."}
        </span>
      ) : (
        text
      )}
    </Button>
  )
}
export default SubmitButton
