import { Decimal } from "@prisma/client/runtime/client"
import { Card, CardContent } from "../ui/card"
import { LuBadgeDollarSign } from "react-icons/lu"
import { formatPrice } from "@/utils/utils"

type Props = {
  totalRevenue: {
    totalPrice: Decimal | null
  }
}

function RevenueBox({ totalRevenue }: Props) {
  return (
    <Card className="bg-transparent ">
      <CardContent className="flex justify-between gap-6 ">
        <div className="flex flex-col gap-3">
          <p>Total revenue</p>
          <p className="text-2xl font-bold">
            {formatPrice(totalRevenue.totalPrice ?? 0)}
          </p>
        </div>
        <LuBadgeDollarSign size={20} />
      </CardContent>
    </Card>
  )
}
export default RevenueBox
