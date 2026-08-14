import Link from "next/link"
import { Button } from "../ui/button"

type Props = {
  footerText: string
  footerLink: string
  footerLinkLabel: string
}

function Footer({ footerText, footerLink, footerLinkLabel }: Props) {
  return (
    <div className="text-center">
      <span className="text-muted-foreground text-center">{footerText}</span>
      <Button variant="link" className="text-muted-foreground" asChild>
        <Link href={footerLink} className="capitalize">
          {footerLinkLabel}
        </Link>
      </Button>
    </div>
  )
}
export default Footer
