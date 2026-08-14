import { ReactNode } from "react"
import { Card, CardHeader } from "../ui/card"
import Header from "./Header"
import Footer from "./Footer"
import Social from "./Social"

type Props = {
  children: ReactNode
  headerTitle: string
  headerSubText: string
  footerText: string
  footerLink: string
  footerLinkLabel: string
  showSocial?: boolean
}

function CardWrapper({
  children,
  headerTitle,
  headerSubText,
  footerText,
  footerLinkLabel,
  footerLink,
  showSocial,
}: Props) {
  return (
    <Card className="dark:bg-transparent px-12 w-100 md:w-120 mb-6">
      <CardHeader>
        <Header headerTitle={headerTitle} headerSubText={headerSubText} />
      </CardHeader>
      {children}
      {showSocial && <Social />}
      <Footer
        footerText={footerText}
        footerLink={footerLink}
        footerLinkLabel={footerLinkLabel}
      />
    </Card>
  )
}
export default CardWrapper
