"use server"

import prisma from "@/lib/prisma"
import {
  getAdminUser,
  getAuthUser,
  renderError,
  renderErrorWithRedirect,
} from "./productActions"
import {
  orderSchema,
  paymentMethodSchema,
  shippingAddressSchema,
} from "../utils/schemas"
import { PaymentMethods, ShippingAddress } from "../utils/types"
import { getUserCart } from "./cartActions"
import { revalidatePath } from "next/cache"
import { validateWithZod } from "@/utils/utils"

export const updateUserData = async (formData: ShippingAddress) => {
  try {
    const user = await getAuthUser()

    const validatedData = await validateWithZod(formData, shippingAddressSchema)

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        address: {
          ...validatedData,
        },
      },
    })

    return {
      success: true,
      message: "Updated user successfully",
    }
  } catch (error) {
    return renderError(error)
  }
}

export const updatePaymentType = async (formData: PaymentMethods) => {
  try {
    const user = await getAuthUser()

    const validatedData = await validateWithZod(formData, paymentMethodSchema)

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        paymentMethod: validatedData.types,
      },
    })
    return { success: true, message: "successfully changed type" }
  } catch (error) {
    return renderError(error)
  }
}

export const createOrderAction = async () => {
  try {
    const user = await getAuthUser()

    const cart = await getUserCart()

    if (!cart || cart.cartItems.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      }
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } })

    if (!dbUser?.paymentMethod) {
      return {
        success: false,
        message: "Payment Method required",
        redirectTo: "/payment-method",
      }
    }

    if (!dbUser?.address) {
      return {
        success: false,
        message: "Shipping address is required",
        redirectTo: "/shipping-address",
      }
    }

    const orderObject = {
      userId: user.id,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      paymentMethod: dbUser.paymentMethod,
      shippingAddress: dbUser.address,
    }

    const validatedOrderObject = await validateWithZod(orderObject, orderSchema)

    const orderId = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: validatedOrderObject,
      })

      await tx.orderItem.createMany({
        data: cart.cartItems.map((item) => ({
          orderId: order.id,
          qty: item.qty,
          price: item.price,
          name: item.name,
          slug: item.slug,
          productId: item.productId,
          image: item.image,
        })),
      })

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      })

      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      })

      return order.id
    })

    if (!orderId) throw new Error("Order not created")

    revalidatePath(`/order/${orderId}`)
    return {
      success: true,
      message: "Order created successfully",
      redirectTo: `/order/${orderId}`,
    }
  } catch (error) {
    return renderErrorWithRedirect(error)
  }
}

export const getUserOrders = async (limit: number, page: number) => {
  const user = await getAuthUser()

  const order = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    skip: (page - 1) * limit,
    take: limit,
  })

  const count = await prisma.order.count({
    where: { userId: user.id },
  })

  return {
    data: order,
    totalPages: Math.ceil(count / limit),
  }
}

export const getOrderById = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: true,
    },
  })
}

export const getAdminOrders = async (limit: number, page: number) => {
  await getAdminUser()

  const [orders, count] = await Promise.all([
    await prisma.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    await prisma.order.count(),
  ])

  return {
    data: orders,
    totalPages: Math.ceil(count / limit),
  }
}

export const deleteOrderAction = async (id: string) => {
  await getAdminUser()
  await prisma.order.delete({
    where: { id },
  })
  revalidatePath("/admin/orders")
}

export const getAdminDashboardData = async () => {
  const [
    totalCustomers,
    totalProducts,
    totalOrders,
    totalSales,
    recentSales,
    totalRevenue,
    paidOrders,
  ] = await Promise.all([
    (await prisma.user.count()) - Number(process.env.NON_COSTUMER_USERS),
    await prisma.product.count(),
    await prisma.order.count(),
    await prisma.order.count({
      where: { isPaid: true },
    }),
    await prisma.order.findMany({
      where: {
        isPaid: true,
      },
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        user: {
          select: { name: true },
        },
        createdAt: true,
        totalPrice: true,
      },
    }),
    await prisma.order.aggregate({
      where: { isPaid: true },
      _sum: { totalPrice: true },
    }),

    await prisma.order.findMany({
      where: { isPaid: true },
      select: { createdAt: true, totalPrice: true },
      orderBy: { createdAt: "asc" },
    }),
  ])

  const monthlyMap = new Map<string, number>()
  paidOrders.forEach((order) => {
    const monthLabel = new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })

    monthlyMap.set(
      monthLabel,
      (monthlyMap.get(monthLabel) ?? 0) + Number(order.totalPrice)
    )
  })

  const monthlyRevenue = Array.from(monthlyMap, ([month, revenue]) => ({
    month,
    revenue,
  }))

  return {
    totalCustomers,
    totalOrders,
    totalProducts,
    recentSales,
    totalRevenue: totalRevenue._sum ?? 0,
    totalSales,
    monthlyRevenue,
  }
}
