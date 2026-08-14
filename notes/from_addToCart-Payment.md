## Add to cart

- add to cart button adds item to a cart

**Add To Cart Action**

- get single product by id, if no product throw error
- get or create cart
- construct cart item object
  -- composed of product fields + cartId
  -- then validate
- check if cart item exist in cart
- if item is not in the cart
  -- create new cart item
  -- get all cartItems
  -- update cart / set the calculated item prices to the cart
  -- revalidate path & return with success message
- else if item is in the cart
  -- check if product is in stock, if out of stock throw error `existingItemQty + 1 > productStock`
  -- increment the item
  -- get all cartItems
  -- update cart / set the calculated item prices to the cart
  -- revalidate path & return with success message

**Get or Create Cart**

- check if user exist
- if user exist => anonymous / signedIn user
  - find user cart
  - if no cart create one
  - return cart
- if no user
  - sign in anonymous
  - create cart
  - return cart

**Decrement Item Action**

- check if cart item exist,if no cart item throw error
  if cart item exist
  - if cart item quantity equals 1
    -- remove cart item
    -- revalidate & return success message
  - else
    -- decrement cart item
    -- get cart items
    -- update cart
    -- revalidate & return success message

**Calculate Item Prices**
return
-> items price, - tax price, - shipping price - total price

- items price => all items price \* items qty
- tax price => 0.15 \* items price
- shipping price => if items price is >100 becomes 10 else its 0
- total price => sum of the three

## Proceed to checkout

- in cart page when proceed to checkout button clicked
  -- if not signed in redirects to sign-in page with callback
  -- after signIn redirect to `shipping-address` page
  -- fill form and update shipping address field on user model
  -- move to `payment-method` page
  -- select payment method and update payment method field on user model
  -- move to `place-order` page

## Place order

- when place order button is clicked -> `createOrderAction` invoked
  -- dbOrder and order items are created
  -- cartItems removed, cart is cleared/reset
  -- redirect to order page

**Create Order Action**

- get user cart
- if no user cart return with a message
- check users payment method & shipping address
  -- if no payment method & shipping address return with a message
- construct order object
  -- composed of dbUser & cart fields
  -- then validate
- run `transaction`
  -- to create order
  -- orderItem - `orderItem.createMany`,
  -- remove cart items `deleteMany`
  -- clear/reset cart
  -- return orderId
- if no orderId throw an error
- else return with message & redirectUrl

## Order page

-- pay with the selected payment method
-- if payment is successful set isPaid field on the order model to true

## overall steps

addToCart
-> proceedToCheckout
-> fill shipping address form
-> select payment method
-> place order
-- here are your shipping address, payment method & cart items
-- do you want to create dbOrder -> place order
-> order page
-- here are your shipping address, payment method & order items
-- do you want to pay?
-- if payment is successful set isPaid field on the order model to true
