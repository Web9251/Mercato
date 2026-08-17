"use server"

import prisma from "@/lib/prisma"
import { updateUserSchema, userProfileSchema } from "@/utils/schemas"
import { UpdateUserFields, UserProfile } from "@/utils/types"
import { getAdminUser, getAuthUser, renderError } from "./productActions"
import { revalidatePath } from "next/cache"
import { validateWithZod } from "@/utils/utils"
import { isAPIError } from "better-auth/api"

export const renderAuthError = async (error: unknown) => {
  const errorMessage =
    isAPIError(error) || error instanceof Error
      ? error.message
      : "there was an error"
  return { success: false, message: errorMessage }
}

export const updateUserInfo = async (formData: UserProfile) => {
  try {
    const user = await getAuthUser()

    const validatedFields = await validateWithZod(formData, userProfileSchema)
    const { name, email } = validatedFields

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email,
      },
    })
    revalidatePath("/user/profile")
    return { success: true, message: "User updated successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const getAllUsers = async (limit: number, page: number) => {
  await getAdminUser()

  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  })

  const count = await prisma.user.count()

  return {
    data: users,
    totalPages: Math.ceil(count / limit),
  }
}

export const deleteUserAction = async (id: string) => {
  await getAdminUser()
  await prisma.user.delete({
    where: { id },
  })
  revalidatePath("/admin/users")
}

export const getUserById = async () => {
  const user = await getAuthUser()

  return await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  })
}

export const getSingleUser = async (id: string) => {
  await getAdminUser()
  return await prisma.user.findUnique({
    where: { id },
  })
}

export const updateUserAction = async (
  formData: UpdateUserFields,
  id: string
) => {
  await getAdminUser()

  try {
    const validatedFields = await validateWithZod(formData, updateUserSchema)
    await prisma.user.update({
      where: { id },
      data: {
        name: validatedFields.name,
        email: validatedFields.email,
        role: validatedFields.role,
      },
    })
    revalidatePath(`/admin/users/${id}`)
    return { success: true, message: "User updated successfully" }
  } catch (error) {
    return renderError(error)
  }
}
