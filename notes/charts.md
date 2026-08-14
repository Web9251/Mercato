## Step 1 — Create an Empty Map

```ts
const monthlyMap = new Map<string, number>()
// Map is like an object but better for dynamic keys
// string → the month label  e.g. "Jan 2024"
// number → the revenue total e.g. 149.98
```

Think of it as an empty spreadsheet with two columns: month and revenue.

## Step 2 — Loop Through Every Order

```ts
paidOrders.forEach((order) => {})
```

## 2a — Extract the Month Label

```ts
const monthLabel = new Date(order.createdAt).toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
})
// 2024-01-15 → "Jan 2024"
// 2024-01-28 → "Jan 2024"  (same label!)
// 2024-02-10 → "Feb 2024"
```

## 2b — Get Existing Revenue for That Month

```ts
monthlyMap.get(monthLabel) ?? 0
// "Jan 2024" → doesn't exist yet → 0
// "Jan 2024" → already has 99.99 → 99.99
```

## 2c — Add Current Order to That Month

```ts
monthlyMap.set(
  monthLabel,
  (monthlyMap.get(monthLabel) ?? 0) + Number(order.totalPrice)
)

// iteration 1: "Jan 2024" → 0      + 99.99  = 99.99
// iteration 2: "Jan 2024" → 99.99  + 49.99  = 149.98
// iteration 3: "Feb 2024" → 0      + 199.99 = 199.99
```

## Step 3 — Map After the Loop

```ts
// monthlyMap now looks like:
Map {
  "Jan 2024" → 149.98,
  "Feb 2024" → 199.99,
}
```

## Step 4 — Convert Map to Array

- A Map is not directly usable by Recharts — we need a plain array of objects.

Array.from() — What it Does

- Array.from() converts anything iterable into an array. When used on a Map it gives you each entry as a [key, value] pair:

```ts
Array.from(monthlyMap)
// gives you:
[
  ["Jan 2024", 149.98],  // [key, value]
  ["Feb 2024", 199.99],  // [key, value]
]
```

The Second Argument — Transformation Function
Instead of getting raw [key, value] pairs, we pass a function to shape each entry:

```ts
Array.from(monthlyMap, ([month, revenue]) => ({
  month,
  revenue,
}))
```

Breaking it down:

```ts
// ([month, revenue]) → destructure each ["Jan 2024", 149.98] pair
//                         ↓           ↓
//                       month      revenue

// => ({ month, revenue }) → builds a new object from them
```

```ts
// iteration 1
;["Jan 2024", 149.98][
  // destructure to → month = "Jan 2024", revenue = 149.98
  // returns → { month: "Jan 2024", revenue: 149.98 }

  // iteration 2
  ("Feb 2024", 199.99)
]
// destructure to → month = "Feb 2024", revenue = 199.99
// returns → { month: "Feb 2024", revenue: 199.99 }
```

Final Result

```ts
const monthlyRevenue = [
  { month: "Jan 2024", revenue: 149.98 },
  { month: "Feb 2024", revenue: 199.99 },
]
```

This is exactly the shape Recharts expects:

```tsx
<BarChart data={monthlyRevenue}>
  <XAxis dataKey="month" /> // → "Jan 2024", "Feb 2024"
  <Bar dataKey="revenue" /> // → 149.98, 199.99
</BarChart>
```

Why Not Just Use Object.entries()?

```ts
// alternative — works but less clean
Object.entries(Object.fromEntries(monthlyMap)).map(([month, revenue]) => ({
  month,
  revenue,
}))

// ✅ Array.from() does it all in one step
Array.from(monthlyMap, ([month, revenue]) => ({ month, revenue }))
```

Array.from() with a Map is the cleanest one-step way to convert and transform at the same time.
