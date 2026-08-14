import { Separator } from "../ui/separator"

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="py-6 flex flex-col items-center justify-center mt-auto">
      <Separator className="mb-4" />
      <p>{year} Mercato. All Rights Reserved</p>
    </footer>
  )
}
export default Footer
