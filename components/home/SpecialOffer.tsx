import Image from "next/image"
import img from "@/public/images/p4-2.jpg"
import { Button } from "../ui/button"
import Link from "next/link"

function SpecialOffer() {
  return (
    <div className="mt-20 grid md:grid-cols-2 gap-4 justify-between">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold capitalize">
          🔥 Special Offer — Limited Time Only!
        </h2>
        <p>
          Shop now and enjoy exclusive discounts before the offer ends. Hurry —
          great deals don’t last forever! 🎁🛒
        </p>
        <div className="flex justify-center">
          <Button className="capitalize w-fit h-10 gap-3 px-4 " asChild>
            <Link href="/search">view products</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src={img}
          alt=""
          width={300}
          height={300}
          className="rounded-md object-cover "
        />
      </div>
    </div>
  )
}
export default SpecialOffer
