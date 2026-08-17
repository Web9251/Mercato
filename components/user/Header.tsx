import { RiShoppingBag4Fill } from "react-icons/ri"

type Props = {
  headerTitle: string
  headerSubText: string
}

function Header({ headerTitle, headerSubText }: Props) {
  return (
    <div className="flex flex-col items-center">
      <RiShoppingBag4Fill size={70} className="mb-2" />
      <p className="text-2xl capitalize font-semibold">{headerTitle}</p>
      <p className="text-muted-foreground mt-2">{headerSubText}</p>
    </div>
  )
}
export default Header
