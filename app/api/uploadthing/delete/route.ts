import { UTApi } from "uploadthing/server"
import { NextResponse } from "next/server"

const utapi = new UTApi()

export async function POST(req: Request) {
  try {
    const { bannerKey, imageKeys } = await req.json()

    if (!bannerKey && imageKeys) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 })
    }

    const keys = [bannerKey, ...(imageKeys ?? [])].filter(Boolean) as string[]

    if (keys.length > 0) {
      await utapi.deleteFiles(keys)
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
