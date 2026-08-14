import { Spinner } from "@/components/ui/spinner"

function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="size-14" />
    </div>
  )
}
export default loading
