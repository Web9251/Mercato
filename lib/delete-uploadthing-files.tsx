"use server"

import { UTApi } from "uploadthing/server"

const utapi = new UTApi()
export async function deleteUploadthingFiles(
  bannerKey?: string,
  imageKeys?: string[]
) {
  const keys = [bannerKey, ...(imageKeys ?? [])].filter(Boolean) as string[]

  if (keys.length > 0) {
    await utapi.deleteFiles(keys)
  }
}
