import Image from "next/image"
import img from "@/public/images/sample-products/p3-2.jpg"
import { Button } from "../ui/button"
import Link from "next/link"

function SpecialOffer() {
  return (
    <div className="mt-20 grid md:grid-cols-2 gap-4 justify-between">
      {/* <div className="flex flex-col justify-center gap-2">
        <h2 className="text-3xl font-bold capitalize">deal has ended</h2>
        <p>
          This deal is no longer available. Check out our latest promotions!
        </p>
        <div className="flex justify-center">
          <Button className="capitalize w-fit" asChild>
            <Link href="/search">view products</Link>
          </Button>
        </div>
      </div> */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold capitalize">deal of the month</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione iste
          eum repellat voluptates labore maiores hic maxime atque, perspiciatis
          accusantium veniam, natus ipsum nisi dolorem minus id. Consectetur
          delectus minus maxime rerum earum nemo, facilis ratione voluptas, quis
          ullam voluptatem! 🎁🛒
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
