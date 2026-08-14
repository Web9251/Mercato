# get all review action

## Parameters

```ts
{
  ;(page, slug)
}
```

## Purpose

- fetch all reviews of a given page
- fetch all review counts of a given page
- fetch single product's specific rating count 5/4/3/2/1 ratings count
- return hasMore if more review are left

# Single Product Page

- to the **Review Section** fetch and pass down
  -- userReview
  -- initialReviews
  -- productRating
  -- sessionUser

# Review Section

- contains
  -- displays `no review yet` text if no reviews
  -- if no user `signIn to write a review` button
  -- if user - render `reviewsContainer`

- to the **Reviews Container** pass down
  -- userReview
  -- initialReviews
  -- productRating
  -- sessionUser

# Reviews Container

- setup local states
  -- reviews - set the initialReviews as an initial state
  -- hasMore - set reviews hasMore value as an initial state
  -- set useRef value of 1 to modify the page
