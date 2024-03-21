import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import Head from 'next/head';
import Providers from "./provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kickpages Designer Admin Panel",
  description: "Admin panel for desginers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <Head>
        <title>Kp Designer Admin Panel</title>
        <meta name="description" content="Admin panel for designers" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
          <SonnerToaster />
        </Providers>
      </body>
    </html>
  )
}
