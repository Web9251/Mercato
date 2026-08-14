"use client"

import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../ui/field"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { PaymentMethods } from "@/utils/types"
import { PAYMENT_METHODS } from "@/utils/constants"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { updatePaymentType } from "@/actions/orderActions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"

function PaymentMethodForm({
  paymentMethod,
}: {
  paymentMethod: string | null
}) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PaymentMethods>({
    defaultValues: {
      types: paymentMethod || "Stripe",
    },
  })

  const submitHandler = async (formData: PaymentMethods) => {
    const result = await updatePaymentType(formData)
    if (!result?.success) {
      toast.error(result?.message)
      return
    }
    router.push("/place-order")
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup>
        <Controller
          name="types"
          control={control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldDescription>
                Please select a payment method
              </FieldDescription>
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                {PAYMENT_METHODS.map((types) => (
                  <FieldLabel
                    key={types}
                    htmlFor={`form-rhf-radiogroup-${types}`}
                  >
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <RadioGroupItem
                        value={types}
                        id={`form-rhf-radiogroup-${types}`}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldContent>
                        <FieldTitle>{types}</FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />

        {isSubmitting ? (
          <Button type="submit" className="w-1/3">
            <Spinner /> Continue
          </Button>
        ) : (
          <Button type="submit" className="w-1/3">
            <ArrowRight /> Continue
          </Button>
        )}
      </FieldGroup>
    </form>
  )
}
export default PaymentMethodForm
