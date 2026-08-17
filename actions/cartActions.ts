"use server"

import {
  getAuthUser,
  getSingleProductById,
  renderError,
} from "./productActions"
import { headers } from "next/headers"
import { currentUser } from "@/hooks/currentUser"
import prisma from "@/lib/prisma"
import { CartItem } from "@/generated/prisma/client"
import { revalidatePath } from "next/cache"
import { round2, validateWithZod } from "../utils/utils"
import { cartItemSchema } from "../utils/schemas"
import { UploadImage } from "@/utils/types"
import { auth } from "@/lib/auth"

const calculatePrice = (cartItems: CartItem[]) => {
  const itemsPrice = round2(
    cartItems.reduce((total, current) => {
      return total + Number(current.price) * current.qty
    }, 0)
  )

  const taxPrice = round2(0.15 * itemsPrice)
  const shippingPrice = itemsPrice > 100 ? 10 : 0
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

  return {
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  }
}

export const addToCartAction = async (productId: string) => {
  try {
    const product = await getSingleProductById(productId)
    if (!product) throw new Error("Product not found")
    if (!product.stock) throw new Error("Product is out of stock")

    const cart = await getOrCreateCart()

    const { name, slug, price, images } = product
    const image = (images as UploadImage[])[0].url

    const item = {
      name,
      slug,
      price,
      image: image,
      qty: 1,
      productId,
      cartId: cart.id,
    }

    const validatedItems = await validateWithZod(item, cartItemSchema)

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    if (!existingItem) {
      const cartItem = await prisma.cartItem.create({
        data: {
          ...validatedItems,
          cartId: cart.id,
        },
      })

      const cartItems = await prisma.cartItem.findMany({
        where: {
          cartId: cart.id,
        },
      })

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          ...calculatePrice(cartItems),
        },
      })
      revalidatePath(`/product/${cartItem.slug}`)
      revalidatePath("/cart")
      return { success: true, message: `${cartItem.name} added to the cart` }
    } else {
      const inStock = product.stock >= existingItem?.qty + 1
      if (!inStock) {
        throw new Error("Product is out of stock")
      }

      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingItem?.id,
        },
        data: {
          qty: { increment: 1 },
        },
      })

      const cartItems = await prisma.cartItem.findMany({
        where: {
          cartId: cart.id,
        },
      })

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          ...calculatePrice(cartItems),
        },
      })
      revalidatePath(`/product/${updatedCartItem.slug}`)
      revalidatePath("/cart")
      return {
        success: true,
        message: `${updatedCartItem.name} is updated to the cart`,
      }
    }
  } catch (error) {
    return renderError(error)
  }
}

export const decrementItemAction = async (
  productId: string,
  cartId: string
) => {
  try {
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    })
    if (!existingItem) throw new Error("Cart item not found")

    if (existingItem.qty === 1) {
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      })
      revalidatePath(`/product/${existingItem.slug}`)
      revalidatePath("/cart")
      return {
        success: true,
        message: `${existingItem.name} removed from cart`,
      }
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          productId,
          cartId,
        },
      },
      data: {
        qty: {
          decrement: 1,
        },
      },
    })

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId,
      },
    })

    await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        ...calculatePrice(cartItems),
      },
    })

    revalidatePath(`/product/${cartItem.slug}`)
    revalidatePath("/cart")
    return { success: true, message: `${cartItem.name} updated in cart` }
  } catch (error) {
    return renderError(error)
  }
}

async function getOrCreateCart() {
  const user = await currentUser()

  if (user) {
    let cart = await prisma.cart.findFirst({
      where: { userId: user.id },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
          itemsPrice: 0,
          totalPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
        },
      })
    }
    return cart
  } else {
    const newUser = await auth.api.signInAnonymous({
      headers: await headers(),
    })

    const newUserId = newUser.user.id

    return await prisma.cart.create({
      data: {
        userId: newUserId,
        itemsPrice: 0,
        totalPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
      },
    })
  }
}

export const getCart = async () => {
  const user = await currentUser()

  const userId = await user?.id

  if (!user) {
    return null
  }
  return await prisma.cart.findFirst({
    where: { userId },
    include: {
      cartItems: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })
}

export const getUserCart = async () => {
  const user = await getAuthUser()

  return await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    include: { cartItems: true },
  })
}

export const getCartItems = async (cartId: string | undefined) => {
  return await prisma.cartItem.findMany({
    where: { cartId },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const mergeCartsAction = async (userId: string, guestUserId: string) => {
  await prisma.$transaction(async (tx) => {
    const guestCart = await tx.cart.findUnique({
      where: {
        userId: guestUserId,
      },
      include: { cartItems: true },
    })

    if (!guestCart) return

    if (guestCart.cartItems.length === 0) {
      await tx.cart.delete({
        where: {
          id: guestCart.id,
        },
      })
      return
    }

    let userCart = await tx.cart.findUnique({
      where: {
        userId,
      },
      include: { cartItems: true },
    })

    if (!userCart) {
      userCart = await tx.cart.create({
        data: {
          userId,
          itemsPrice: 0,
          totalPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
        },
        include: {
          cartItems: true,
        },
      })
    }

    for (const guestItem of guestCart.cartItems) {
      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: guestItem.productId,
          },
        },
        create: {
          cartId: userCart.id,
          productId: guestItem.productId,
          name: guestItem.name,
          slug: guestItem.slug,
          price: guestItem.price,
          qty: guestItem.qty,
          image: guestItem.image,
        },
        update: {
          qty: {
            increment: guestItem.qty,
          },
        },
      })
    }

    const userCartItems = await tx.cartItem.findMany({
      where: {
        cartId: userCart.id,
      },
    })

    await tx.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        ...calculatePrice(userCartItems),
      },
    })

    await tx.cart.delete({
      where: {
        id: guestCart.id,
      },
    })
  })
}

export const getCartTotalQuantity = async () => {
  const user = await currentUser()
  if (!user) return 0

  const cart = await prisma.cart.findUnique({
    where: {
      userId: user?.id,
    },
  })

  let sum
  if (cart) {
    sum = await prisma.cartItem.aggregate({
      _sum: { qty: true },
      where: { cartId: cart.id },
    })
  }
  return sum?._sum.qty ?? 0
}
