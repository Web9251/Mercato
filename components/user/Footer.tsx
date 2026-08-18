import Link from "next/link"
import { Button } from "../ui/button"

type Props = {
  footerLink: string
  footerLinkLabel: string
}

function Footer({ footerLink, footerLinkLabel }: Props) {
  return (
    <div className='text-center'>
      <Button variant='link' className='text-muted-foreground' asChild>
        <Link href={footerLink} className=''>
          {footerLinkLabel}
        </Link>
      </Button>
    </div>
  )
}
export default Footer
