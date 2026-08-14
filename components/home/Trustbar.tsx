import { BiSupport } from "react-icons/bi"
import { BsFillCreditCard2BackFill } from "react-icons/bs"
import { LuDollarSign } from "react-icons/lu"
import { MdLocalShipping } from "react-icons/md"

function TrustBar() {
  return (
    <div className="border rounded-md px-6 mt-14 mb-4 py-4 flex justify-between flex-col md:flex-row gap-6">
      <div className="flex flex-col gap-1">
        <MdLocalShipping size={25} />
        <p className="capitalize font-bold">free shipping</p>
        <p className="text-sm text-muted-foreground ">
          Free shipping on orders above $100
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <LuDollarSign size={25} />
        <p className="capitalize font-bold">Money back guarantee</p>
        <p className="text-sm text-muted-foreground ">
          Within 30 days of purchase
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <BsFillCreditCard2BackFill size={25} />
        <p className="capitalize font-bold">Flexible Payment</p>
        <p className="text-sm text-muted-foreground ">
          Pay with credit card, PayPal or COD
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <BiSupport size={25} />
        <p className="capitalize font-bold">24/7 Support</p>
        <p className="text-sm text-muted-foreground ">
          Get support at any time
        </p>
      </div>
    </div>
  )
}
export default TrustBar
