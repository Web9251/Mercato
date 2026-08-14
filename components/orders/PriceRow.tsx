import { formatPrice } from "@/utils/utils"

type Props = {
  text: string
  price: number
}

function PriceRow({ text, price }: Props) {
  return (
    <div className="flex justify-between">
      <p className="capitalize">{text}</p>
      <p>{formatPrice(price)}</p>
    </div>
  )
}
export default PriceRow
