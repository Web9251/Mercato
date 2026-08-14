import { Button } from "../ui/button"
import { CiUser } from "react-icons/ci"
import DropdownLinks from "./DropdownLinks"
import { currentUser } from "@/hooks/currentUser"
import SignInButton from "../form/SignInButton"

async function NavLinks() {
  const user = await currentUser()

  return (
    <div>
      {user && !user?.isAnonymous ? (
        <DropdownLinks user={user} />
      ) : (
        <SignInButton asChild mode="redirect">
          <Button>
            <CiUser />
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
export default NavLinks
