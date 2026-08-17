import { Geist, Geist_Mono } from "next/font/google"

import "@/app/globals.css"
import { cn } from "@/lib/utils"
import Providers from "./Providers"
import { Metadata } from "next"
import { APP_DESCRIPTION } from "@/utils/constants"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    template: `%s | Mercato`,
    default: process.env.APP_NAME || "Mercato",
  },
  description: APP_DESCRIPTION,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
