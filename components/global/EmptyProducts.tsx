import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link"
import { GrOrderedList } from "react-icons/gr"

function EmptyProducts() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GrOrderedList />
        </EmptyMedia>
        <EmptyTitle>No Product Found</EmptyTitle>
        <EmptyDescription>Products wil appear here</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/admin/products/create"> Create Product</Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
export default EmptyProducts
