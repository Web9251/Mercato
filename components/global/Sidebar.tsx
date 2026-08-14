import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export default function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex justify-end mr-4 mt-4">
        <SidebarTrigger className="" />
      </div>
      <SidebarHeader className="mt-6">Select A Category</SidebarHeader>
      <SidebarMenu className="flex items-start ml-4">
        <SidebarMenuItem>
          <Button className="w-full " variant="ghost" asChild>
            <Link href="/search">Men`s Sweatshirts (1)</Link>
          </Button>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Button className="w-full" variant="ghost" asChild>
            <Link href="/search">Men`s Dress Shirts (10)</Link>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  )
}
