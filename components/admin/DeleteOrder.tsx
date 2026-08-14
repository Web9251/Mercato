"use client"

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { deleteOrderAction } from "@/actions/orderActions"

function DeleteOrder({ id }: { id: string }) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const submitHandler = async () => {
    await deleteOrderAction(id)
    toast.success("Order deleted successfully")
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Button
        type="submit"
        className="bg-red-900 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Deleting..." : "Delete"}
      </Button>
    </form>
  )
}
export default DeleteOrder
