import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Checkbox } from "../ui/checkbox"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  control: Control<T>
  defaultChecked?: boolean
}

function CheckboxInput<T extends FieldValues>({
  name,
  label,
  control,
  defaultChecked,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} orientation="horizontal">
            <Checkbox
              id={name}
              aria-invalid={fieldState.invalid}
              onCheckedChange={(checked) => {
                field.onChange(checked)
              }}
              defaultChecked={defaultChecked}
              className="dark:bg-transparent"
            />
            <FieldLabel htmlFor={name} className="capitalize">
              {label || name}
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
export default CheckboxInput
