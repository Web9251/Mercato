import Container from "@/components/global/Container"
import { ReactNode } from "react"

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="min-h-screen flex flex-col">{children}</Container>
  )
}
export default AuthLayout
