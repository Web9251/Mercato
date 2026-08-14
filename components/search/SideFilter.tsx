import DepartmentFilter from "./DepartmentFilter"
import PriceFilter from "./PriceFilter"
import RatingFilter from "./RatingFilter"

function SideFilter() {
  return (
    <div className="space-y-4">
      <DepartmentFilter />
      <PriceFilter />
      <RatingFilter />
    </div>
  )
}
export default SideFilter
