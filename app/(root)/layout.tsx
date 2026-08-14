import Container from "@/components/global/Container"
import Footer from "@/components/global/Footer"
import Navbar from "@/components/navbar/Navbar"
import { ReactNode } from "react"

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex flex-1">
        <Container className="flex-1">{children}</Container>
      </div>
      <Footer />
    </div>
  )
}
export default layout
