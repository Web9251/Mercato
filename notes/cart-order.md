## Add To Cart

## Proceed to checkout

Checkout steps

1. Shipping Address

shipping address form

- fetch user fom DB
  -- if user already have shipping address prepopulate it on the form
  -- else update user data by creating new shipping address
  -- if successful move to payment method

2. Payment Method

payment method form

- fetch user from DB
  -- if user already have payment method prepopulate it on the form
  -- else update user data by selecting payment method
  -- if successful move to place-order page

3. Place Order

- here order and orderItems in db are created

in createOrderAction

- check if user,cart,paymentMethod,shippingAddress exist
- construct order object from userInfo and cart and validate
- run prisma transaction to
  -- create order in db
  -- create orderItems
  -- clear cart and cartItems

Here's a concise step-by-step breakdown:

---

## PayPal Integration in Next.js

**1. Install the package**
Install `@paypal/react-paypal-js` from npm.

**2. Set up env variables**
Add `PAYPAL_CLIENT_ID`, `PAYPAL_APP_SECRET`, and `NEXT_PUBLIC_PAYPAL_CLIENT_ID` to `.env.local`.

**3. Create the PayPal helper file**
Create `lib/paypal.ts` with `handleResponse`, `getPayPalToken`, `createPayPalOrder`, and `capturePayPalOrder` functions.

**4. Create server actions**
Wrap `createPayPalOrder` and `capturePayPalOrder` in a `"use server"` file so they run securely on the server.

**5. Create `PrintLoadingState` component**
A simple spinner or skeleton that mimics the PayPal button shape to prevent layout shift.

**6. Create `PayPalButton` component**
A `"use client"` component that uses `usePayPalScriptReducer` for load state, `useTransition` for pay state, and renders `<PayPalButtons>` with `createOrder` and `onApprove` handlers.

**7. Create `PaymentSection` component**
Wraps `PayPalScriptProvider` and `PayPalButton` together — keeps the provider close to where it's needed, not in the root layout.

**8. Use `PaymentSection` in the order page**
Import and render `PaymentSection` only when the order is not yet paid.

**9. Handle errors**
Use `handleResponse` in all fetch calls, catch errors in `createOrder` and `onApprove`, and show them via `toast`.

**10. Test with sandbox**
Use `sb` as a temporary client ID to verify the SDK loads, then switch to your real sandbox credentials from the PayPal Developer Dashboard.
