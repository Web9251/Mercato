import Container from "@/components/global/Container"
import NavbarAdmin from "@/components/navbar/NavbarAdmin"
import { ReactNode } from "react"

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavbarAdmin />
      <Container>{children}</Container>
    </div>
  )
}
export default AdminLayout
