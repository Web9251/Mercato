"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { navLinks } from "@/utils/constants"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { SessionUser } from "@/utils/types"

function DropdownLinks({ user }: { user: SessionUser }) {
  const router = useRouter()

  const letter = user?.name?.split("")[0]
  const clickHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.image!} alt="user" />
            <AvatarFallback className="capitalize">{letter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="space-y-1 w-50"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuLabel className="flex gap-3">
          <Avatar>
            <AvatarImage src={user.image!} alt="user" />
            <AvatarFallback className="capitalize">{letter}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-primary capitalize text-sm">{user.name}</p>
            {user.email}
          </div>
        </DropdownMenuLabel>
        {navLinks.map((link) => {
          if (user.role === "user" && link.label === "admin") return
          const Icon = link.icon
          return (
            <DropdownMenuItem key={link.label}>
              <Link
                href={link.url}
                className="capitalize flex justify-center items-center gap-3"
              >
                <Icon />
                {link.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
        <Separator />
        <DropdownMenuItem
          variant="destructive"
          className="capitalize gap-3"
          onClick={clickHandler}
        >
          <LogOut />
          sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default DropdownLinks
