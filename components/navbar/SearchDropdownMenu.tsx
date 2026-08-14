import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { IoChevronDownSharp } from "react-icons/io5"

function SearchDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center justify-center gap-6 dark:bg-transparent"
        asChild
      >
        <Button variant="outline">
          All
          <IoChevronDownSharp />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
export default SearchDropdownMenu
