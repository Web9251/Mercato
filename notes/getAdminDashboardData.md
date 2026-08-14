# **Get Admin Dashboard Data**

_GOAL_
return
-- total customers -- totalProducts -- totalOrders -- totalSales
-- recentSales -- totalRevenue -- monthlyRevenue

_get_
total customers => totalUsers-nonCustomerUsers
total products => all products count
total orders => all orders
total sales => all paid orders
recent sales => 10 last paid orders
total revenue => sum of all paid order prices
paidOrders => select `createdAt` & `totalPrice` - for chart / to return monthly revenue

## get monthly revenue for the chart

_GOAL_
return
-- an Array of object of month & revenue
-- [ { month: 'Jun 2026', revenue: 667.32 },... ]

_steps_

- get all paid orders
  -- select only the date & price
- create a new map instance
- for each order
  - create a month label / format the date
  - set the month label as key in the map
  - for the value
    - check if the key has already a value if it doesn't set it as 0 & add current price to it
- gives { 'Jun 2026' => 667.32,... }
- change the map to an array of objects
  [ { month: 'Jun 2026', revenue: 667.32 },... ]
