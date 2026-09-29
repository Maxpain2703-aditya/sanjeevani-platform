"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Activity, 
  Truck, 
  Layers, 
  LogOut, 
  ShieldCheck,
  Search,
  Bell
} from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  // Hide on login screen
  if (pathname === "/") return null

  const handleLogout = () => {
    sessionStorage.removeItem("cmo_auth")
    router.push("/")
  }

  const navItems = [
    { name: "Overview & Surges", href: "/dashboard", icon: Activity },
    { name: "Transit Corridors", href: "/transit", icon: Truck },
    { name: "Stock Inventory", href: "/inventory", icon: Layers },
  ]

  return (
    <header className="border-b border-[#EAEBED] bg-white sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FA5E2D] flex items-center justify-center text-white shadow-sm shadow-[#FA5E2D]/30">
              <Activity className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-[#19100B] block leading-tight">Adon Health</span>
              <span className="text-[10px] text-[#8C8A87] font-medium tracking-wide uppercase">Nadia Cluster</span>
            </div>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4F5F7] p-1 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white text-[#19100B] shadow-sm font-bold"
                      : "text-[#6B6865] hover:text-[#19100B] hover:bg-white/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#FA5E2D]" : "text-[#8C8A87]"}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#F4F5F7] text-xs px-3 py-1.5 rounded-xl border border-[#EAEBED]">
            <ShieldCheck className="w-4 h-4 text-[#3D8761]" />
            <span className="text-[#6B6865]">CMO:</span>
            <span className="text-[#19100B] font-semibold">Dr. S. K. Roy</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-[#8C8A87] hover:text-[#FA5E2D] bg-[#F4F5F7] hover:bg-[#FA5E2D]/10 px-3 py-1.5 rounded-xl transition font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}