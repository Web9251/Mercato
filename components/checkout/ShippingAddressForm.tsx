"use client"
import { useForm } from "react-hook-form"
import TextInput from "../form/TextInput"
import { ShippingAddress } from "@/utils/types"
import { FieldGroup } from "../ui/field"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { updateUserData } from "@/actions/orderActions"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import { useRouter } from "next/navigation"
import { shippingDefaultValues } from "@/utils/constants"

function ShippingAddressForm({ address }: { address: ShippingAddress }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: address || shippingDefaultValues,
  })

  const router = useRouter()
  const submitHandler = async (formData: ShippingAddress) => {
    const result = await updateUserData(formData)
    if (!result.success) {
      toast.error(result.message)
      return
    }
    router.push("/payment-method")
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup>
        <TextInput control={control} name="fullName" label="full name" />
        <TextInput control={control} name="streetAddress" label="address" />
        <TextInput control={control} name="city" />
        <TextInput
          control={control}
          type="number"
          name="postalCode"
          label="postal code"
        />
        <TextInput control={control} name="country" />
        <Button className="w-1/3" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner /> Continue
            </>
          ) : (
            <>
              <ArrowRight /> Continue
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
export default ShippingAddressForm
