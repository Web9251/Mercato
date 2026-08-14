import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  type?: "text" | "email" | "password" | "number"
  placeholder?: string
  control: Control<T>
  disabled?: boolean
  fieldDescription?: string
}

function TextInput<T extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  control,
  disabled,
  fieldDescription,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className="min-w-75">
            <FieldLabel htmlFor={name} className="capitalize">
              {label || name}
            </FieldLabel>
            <Input
              {...field}
              id={name}
              type={type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className="dark:bg-transparent focus:bg-transparent"
              disabled={disabled}
            />
            <FieldDescription>{fieldDescription}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
export default TextInput
