"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Package, TrendingUp, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Leaf, label: "Home", path: "/dashboard" },
    { icon: Package, label: "Products", path: "/products" },
    { icon: TrendingUp, label: "Earnings", path: "/earnings" },
    { icon: User, label: "Profile", path: "/settings" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Button
              key={item.path}
              variant="ghost"
              className="flex-col py-3 px-6 h-auto"
              onClick={() => router.push(item.path)}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-primary" : ""}`} />
              <span className={`text-xs ${isActive ? "text-primary" : ""}`}>{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
