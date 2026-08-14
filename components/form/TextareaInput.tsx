import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  placeholder?: string
  control: Control<T>
}

function TextareaInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name} className="capitalize">
              {label || name}
            </FieldLabel>

            <Textarea
              {...field}
              id={name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className="dark:bg-transparent focus:bg-transparent min-h-30"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
export default TextareaInput
