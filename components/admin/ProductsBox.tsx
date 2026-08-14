import { Card, CardContent } from "../ui/card"
import { FaLinesLeaning } from "react-icons/fa6"

function ProductsBox({ totalProducts }: { totalProducts: number }) {
  return (
    <Card className="bg-transparent ">
      <CardContent className="flex justify-between gap-6 ">
        <div className="flex flex-col gap-3">
          <p>Products</p>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <FaLinesLeaning size={20} />
      </CardContent>
    </Card>
  )
}
export default ProductsBox
