import { Card, CardContent } from "../ui/card"
import { MdCreditScore } from "react-icons/md"

function SalesBox({ totalSales }: { totalSales: number }) {
  return (
    <Card className="bg-transparent ">
      <CardContent className="flex justify-between gap-6 ">
        <div className="flex flex-col gap-3">
          <p>Sales</p>
          <p className="text-2xl font-bold">{totalSales}</p>
        </div>
        <MdCreditScore size={20} />
      </CardContent>
    </Card>
  )
}
export default SalesBox
