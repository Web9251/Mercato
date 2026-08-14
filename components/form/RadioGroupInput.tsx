import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

function RadioGroupInput() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}
export default RadioGroupInput
