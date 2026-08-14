import SectionTitle from "@/components/global/SectionTitle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Logo from "@/public/images/Icon2.png"
import Image from "next/image"
import Link from "next/link"

function NotFoundPage() {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="flex items-center justify-center px-20 py-10">
        <Image
          src={Logo}
          alt="logo"
          width={400}
          height={400}
          className="w-20 h-20 object-cover"
        />
        <SectionTitle text="not found" />
        <p className="text-destructive">Could not find requested page</p>
        <Button variant="outline" className="capitalize" asChild>
          <Link href="/">back to home</Link>
        </Button>
      </Card>
    </section>
  )
}
export default NotFoundPage
