import Container from "@/components/global/Container"
import NavbarUser from "@/components/navbar/NavbarUser"
import { ReactNode } from "react"

function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavbarUser />
      <Container>{children}</Container>
    </div>
  )
}
export default UserLayout
