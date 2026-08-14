import Container from "../global/Container"
import { Separator } from "../ui/separator"
import CartButton from "./CartButton"
import Logo from "./Logo"
import { ModeToggle } from "./ModeToggle"
import NavLinksAdmin from "./NavLinksAdmin"
import { BsThreeDotsVertical } from "react-icons/bs"

import NavLinks from "@/components/navbar/NavLink"
import SearchAdmin from "./SearchAdmin"

function NavbarAdmin() {
  return (
    <div className="mb-5">
      <Container className="flex justify-between py-6">
        <div className="flex items-center justify-center gap-4">
          <Logo type="hideText" />
          <NavLinksAdmin />
        </div>
        <div className="flex items-center gap-3">
          <SearchAdmin />
          <div className="hidden md:flex items-center justify-center gap-3">
            <ModeToggle />
            <CartButton />
            <NavLinks />
          </div>
          <div className="md:hidden">
            <BsThreeDotsVertical />
          </div>
        </div>
      </Container>
      <Separator />
    </div>
  )
}
export default NavbarAdmin
