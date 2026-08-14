import { generateAccessToken, paypal } from "../lib/paypal"

test("generate token from paypal", async () => {
  const tokenResponse = await generateAccessToken()
  console.log("🚀 ~ tokenResponse:", tokenResponse)
  expect(typeof tokenResponse).toBe("string")
  expect(tokenResponse.length).toBeGreaterThan(0)
})

test("creates a paypal order", async () => {
  const token = await generateAccessToken()
  const price = 10

  const orderResponse = await paypal.createOrder(price)
  console.log("🚀 ~ orderResponse:", orderResponse)
  expect(orderResponse).toHaveProperty("id")
  expect(orderResponse).toHaveProperty("status")
  expect(orderResponse.status).toBe("CREATED")
})

test("simulate capturing a payment from an order", async () => {
  const orderId = "100"

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    })
  const captureResponse = await paypal.capturePayment(orderId)
  console.log("🚀 ~ captureResponse:", captureResponse)
  expect(captureResponse).toHaveProperty("status", "COMPLETED")

  mockCapturePayment.mockRestore()
})
