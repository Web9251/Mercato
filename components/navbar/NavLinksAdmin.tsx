"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

function NavLinksAdmin() {
  const pathName = usePathname()
  const path = pathName.split("/").pop()

  const overview = path === "overview" && "text-primary"
  const products = path === "products" && "text-primary"
  const orders = path === "orders" && "text-primary"
  const users = path === "users" && "text-primary"

  return (
    <div className="flex gap-4">
      <Link
        href="/admin/overview"
        className={`text-sm md:text-lg text-muted-foreground hover:text-primary ${overview}`}
      >
        Overview
      </Link>
      <Link
        href="/admin/products"
        className={`text-sm md:text-lg text-muted-foreground hover:text-primary ${products}`}
      >
        Products
      </Link>
      <Link
        href="/admin/orders"
        className={`text-sm md:text-lg text-muted-foreground hover:text-primary ${orders}`}
      >
        Orders
      </Link>
      <Link
        href="/admin/users"
        className={`text-sm md:text-lg text-muted-foreground hover:text-primary ${users}`}
      >
        Users
      </Link>
    </div>
  )
}
export default NavLinksAdmin
