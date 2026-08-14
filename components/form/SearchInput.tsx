import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormSetValue,
} from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  placeholder?: string
  control: Control<T>
  disabled?: boolean
  setValue: UseFormSetValue<T>
}

function SearchInput<T extends FieldValues>({
  name,
  placeholder,
  control,
  disabled,
  setValue,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className="w-56">
            <Input
              {...field}
              id={name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className="dark:bg-transparent focus:bg-transparent"
              disabled={disabled}
              // onChange={(e) => {
              //   setValue(name, e.target.value as PathValue<T, typeof name>)
              //   // console.log("🚀 ~ SearchInput ~ name:", vau)
              // }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
export default SearchInput
