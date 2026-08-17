import Container from "../global/Container"
import { Separator } from "../ui/separator"
import CartButton from "./CartButton"
import Logo from "./Logo"
import { ModeToggle } from "./ModeToggle"

import Search from "./Search"
import NavLinks from "@/components/navbar/NavLink"

function Navbar() {
  return (
    <div className="mb-5">
      <Container className="flex justify-between py-6">
        <div className="flex items-center justify-center gap-4">
          <Logo />
        </div>
        <div className="hidden md:flex">
          <Search />
        </div>
        <div className="flex gap-3">
          <ModeToggle />
          <CartButton />
          <NavLinks />
        </div>
      </Container>
      <Separator />
    </div>
  )
}
export default Navbar
