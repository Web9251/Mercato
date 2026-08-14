"use client"

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { deleteProductAction, getAdminProducts } from "@/actions/productActions"
import { toast } from "sonner"
import { deleteOrderAction, getAdminOrders } from "@/actions/orderActions"
import { pageSize } from "@/utils/constants"
import { useRouter, useSearchParams } from "next/navigation"
import { deleteUserAction, getAllUsers } from "@/actions/userActions"

export type Path = "products" | "orders" | "users"
type Props = {
  id: string
  path: Path
}

function DeleteForm({ id, path }: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const currentPage = Number(useSearchParams().get("page")) || 1
  const router = useRouter()

  const submitHandler = async () => {
    if (path === "products") {
      await deleteProductAction(id)
      // if last item from current page is deleted
      // Navigate to the previous page
      const { totalPages } = await getAdminProducts(pageSize, currentPage)
      const page =
        currentPage === 1
          ? 1
          : currentPage > totalPages
            ? currentPage - 1
            : currentPage
      router.push(`/admin/products?page=${page}`)
      toast.success("Product deleted successfully")
      return
    }
    if (path === "orders") {
      await deleteOrderAction(id)
      const { totalPages } = await getAdminOrders(pageSize, currentPage)
      const page =
        currentPage === 1
          ? 1
          : currentPage > totalPages
            ? currentPage - 1
            : currentPage
      router.push(`/admin/orders?page=${page}`)
      toast.success("Order deleted successfully")
    }
    if (path === "users") {
      await deleteUserAction(id)
      const { totalPages } = await getAllUsers(pageSize, currentPage)
      const page =
        currentPage === 1
          ? 1
          : currentPage > totalPages
            ? currentPage - 1
            : currentPage
      router.push(`/admin/users?page=${page}`)
      toast.success("User deleted successfully")
    }
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
export default DeleteForm
