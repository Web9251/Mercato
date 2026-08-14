import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field"
import { selectInputValue } from "@/utils/types"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  placeholder?: string
  control: Control<T>
  disabled?: boolean
  selectValues: selectInputValue[]
  hideLabel?: boolean
}

function SelectInput<T extends FieldValues>({
  name,
  label,
  control,
  selectValues,
  hideLabel = false,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation="responsive"
          data-invalid={fieldState.invalid}
          className={`${hideLabel && "w-40"}`}
        >
          <FieldContent
            className={`${hideLabel ? "hidden" : "block"} capitalize`}
          >
            <FieldLabel htmlFor="form-rhf-select-language">
              {label || name}
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id="form-rhf-select-language"
              aria-invalid={fieldState.invalid}
              className="min-w-30 capitalize dark:bg-transparent"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {selectValues.map((item) => {
                return (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="capitalize"
                  >
                    {typeof item.label === "string" ? (
                      item.label
                    ) : (
                      <>
                        {item.value}{" "}
                        {Array.from({ length: Number(item.value) }).map(
                          (_, i) => {
                            return (
                              <span key={i}>
                                <item.label fill="orange" />
                              </span>
                            )
                          }
                        )}
                      </>
                    )}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  )
}
export default SelectInput
