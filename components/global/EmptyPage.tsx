import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { GrOrderedList } from "react-icons/gr"

function EmptyPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GrOrderedList />
        </EmptyMedia>
        <EmptyTitle>No Data Found</EmptyTitle>
        <EmptyDescription>All Data wil appear here</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Add data</Button>
      </EmptyContent>
    </Empty>
  )
}
export default EmptyPage
