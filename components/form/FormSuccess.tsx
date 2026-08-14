import { CheckCircleIcon } from "lucide-react"

function FormSuccess({ message }: { message?: string }) {
  if (!message) return
  return (
    <div className="bg-emerald-500/15 text-center flex justify-center items-center p-2 gap-2 rounded-md capitalize">
      <CheckCircleIcon size={17} />
      {message}
    </div>
  )
}
export default FormSuccess
