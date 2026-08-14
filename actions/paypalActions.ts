"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const PAYPAL_API =
  process.env.NODE_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com"

/* ─── Helper function ─────────────────────────────────────────────────────────────── */

const handleResponse = async (response: Response) => {
  if (response.ok) return response.json()

  // PayPal sometimes returns JSON errors, sometimes plain text
  const contentType = response.headers.get("content-type")
  if (contentType?.includes("application/json")) {
    const err = await response.json()
    throw new Error(err.message ?? JSON.stringify(err))
  }

  const errorMessage = await response.text()
  throw new Error(errorMessage)
}

/* ─── Get PayPalToken ─────────────────────────────────────────────────────────────── */

async function getPayPalToken() {
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_APP_SECRET}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  })

  const data = await handleResponse(res) // ✅
  return data.access_token
}

/* ─── Create PayPal Order ─────────────────────────────────────────────────────────────── */

export async function createPayPalOrder(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } })
  if (!order) throw new Error("Order not found")

  const token = await getPayPalToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: order.totalPrice.toString() },
        },
      ],
    }),
  })

  const data = await handleResponse(res) // ✅
  return data.id
}

/* ─── Capture PayPal Order ─────────────────────────────────────────────────────────────── */

export async function capturePayPalOrder(
  paypalOrderId: string,
  dbOrderId: string
) {
  const token = await getPayPalToken()

  const res = await fetch(
    `${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await handleResponse(res) // ✅

  if (data.status === "COMPLETED") {
    await prisma.order.update({
      where: { id: dbOrderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
          id: data.id,
          status: data.status,
          email_address: data.payer.email_address,
          pricePaid: data.purchase_units[0]?.payments?.captures?.amount?.value,
        },
      },
    })
    revalidatePath(`/order/${dbOrderId}`)
  }

  return data
}
