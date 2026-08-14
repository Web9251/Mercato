"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { day: "Monday", revenue: 186 },
  { day: "Tuesday", revenue: 305 },
  { day: "Wednesday", revenue: 237 },
  { day: "Thursday", revenue: 73 },
  { day: "Friday", revenue: 209 },
  { day: "Saturday", revenue: 214 },
  { day: "Sunday", revenue: 111 },
]

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function ChartAdmin() {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Overview</CardTitle>
        <CardDescription>Daily Revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" className="fill-primary" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
