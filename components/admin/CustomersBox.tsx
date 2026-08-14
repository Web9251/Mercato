import { Card, CardContent } from "../ui/card"
import { HiMiniUsers } from "react-icons/hi2"

function CustomersBox({ totalCustomers }: { totalCustomers: number }) {
  return (
    <Card className="bg-transparent ">
      <CardContent className="flex justify-between gap-6 ">
        <div className="flex flex-col gap-3">
          <p>Customers</p>
          <p className="text-2xl font-bold">{totalCustomers}</p>
        </div>
        <HiMiniUsers size={20} />
      </CardContent>
    </Card>
  )
}
export default CustomersBox
