import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "PHC Care Operations & Logistics Command",
  description: "Unified Health Surveillance & Inter-PHC Logistics",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="bg-[#F8F9FA] text-[#19100B] min-h-screen flex flex-col font-sans antialiased selection:bg-[#FA5E2D]/20 selection:text-[#FA5E2D]"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  )
}