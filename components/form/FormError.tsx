import { BsExclamationTriangle } from "react-icons/bs"

function FormError({ message }: { message?: string }) {
  if (!message) return
  return (
    <div className="bg-destructive/15 text-center flex justify-center items-center p-2 gap-2 rounded-md capitalize">
      <BsExclamationTriangle size={17} />
      {message}
    </div>
  )
}
export default FormError
