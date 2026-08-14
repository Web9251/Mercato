# **Get All Products**

- takes
  `search` - `category` - `price` - `rating` => w/c are filtering inputs
  `sort` - `page` => w/c are display options of the filter result

## Filtering

```tsx
await prisma.product({ where: {} })
```

- create an empty array called `conditions`
- run conditional statement for each filtering inputs
  - if present `push filtering statement wrapped in an object` to the array

- `where clause` is an object
- OR/AND are an array of objects

```tsx
const where = conditions.length ? { AND: conditions } : {}
```

```tsx
await prisma.product.findMany({
  where: { AND: [{}, {}, {}, {}] },
})
```

## Sorting

- orderBy
  - is an object for ordering with single value
  - is an array of objects for ordering with multiple values

  ```tsx
  orderBy:{} or
  orderBy: [{},{}],
  ```

- construct an object of orderBy
  - with key being the 'sort' argument value
  - with value being orderBy statement

    ```ts
    const orderBy = {
      newest: [{ createdAt: "desc" as const }],
      highest:[{}],...
    }[sort] ?? [{ createdBy: "desc" as const }]
    ```

## Overall

- `get all products` with
  - where, orderBy, take, skip values
- `get count` of products with the where value
- return _products_, _totalCount_, _totalPages_
