import { getAdminDashboardData } from "@/actions/orderActions"
import CustomersBox from "@/components/admin/CustomersBox"
import ProductsBox from "@/components/admin/ProductsBox"
import RecentSales from "@/components/admin/RecentSales"
import RevenueBox from "@/components/admin/RevenueBox"
import { RevenueChart } from "@/components/admin/RevenueChart"
import SalesBox from "@/components/admin/SalesBox"
import SectionTitle from "@/components/global/SectionTitle"

async function AdminOverviewPage() {
  const {
    totalCustomers,
    totalProducts,
    totalSales,
    totalRevenue,
    recentSales,
    monthlyRevenue,
  } = await getAdminDashboardData()

  return (
    <div className="mb-20">
      <SectionTitle text="dashboard" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <RevenueBox totalRevenue={totalRevenue} />
        <SalesBox totalSales={totalSales} />
        <CustomersBox totalCustomers={totalCustomers} />
        <ProductsBox totalProducts={totalProducts} />
      </div>
      <div className="grid lg:grid-cols-5 gap-6 mt-6">
        <div className="lg:col-span-3">
          <RevenueChart data={monthlyRevenue} />
        </div>
        <div className="lg:col-span-2 ">
          <RecentSales recentSales={recentSales} />
        </div>
      </div>
    </div>
  )
}
export default AdminOverviewPage
