"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

function NavLinksUser() {
  const pathName = usePathname()
  const path = pathName.split("/").pop()

  const profile = path === "profile" && "text-primary"
  const orders = path === "orders" && "text-primary"
  return (
    <div className="flex gap-6">
      <Link
        href="/user/profile"
        className={`text-muted-foreground hover:text-primary ${profile}`}
      >
        Profile
      </Link>
      <Link
        href="/user/orders"
        className={`text-muted-foreground hover:text-primary ${orders}`}
      >
        Orders
      </Link>
    </div>
  )
}
export default NavLinksUser
