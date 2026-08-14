# **Merge cart**

_transaction_

- takes userId & anonymousUserId
- find guest cart
  - if no guest cart return
  - if no item in the guest cart delete and return
- find user cart
  - if no user cart create one
- for every guest cart item => `upsert`
  - create new user item
  - if item exist increment qty
- get user cart items
- update user cart
- remove guest cart
