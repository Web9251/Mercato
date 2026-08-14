import { Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

function Categories() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="dark:bg-transparent">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
export default Categories
