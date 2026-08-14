import Link from "next/link"
import { RiShoppingBag4Fill } from "react-icons/ri"

type Prop = {
  type?: "showText" | "hideText"
}

function Logo({ type = "showText" }: Prop) {
  const show = type === "showText" ? "block" : "hidden"
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
      <RiShoppingBag4Fill
        color="white"
        size={40}
        fill="black"
        className="dark:fill-white"
      />
      <h2 className={`text-2xl font-bold ${show}`}>Mercato</h2>
    </Link>
  )
}
export default Logo
