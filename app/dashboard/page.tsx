"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NotificationCenter } from "@/components/notification-center"
import { Leaf, Plus, TrendingUp, Package, DollarSign, Clock, CheckCircle, Truck, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [notifications] = useState([
    { id: 1, message: "Tomatoes #TOM001 sold for ₹18,500", type: "payment" },
    { id: 2, message: "Corn #CRN003 in transit", type: "status" },
  ])

  const [recentProducts] = useState([
    { id: "TOM001", name: "Organic Tomatoes", status: "sold", value: "₹18,500", date: "2 days ago" },
    { id: "CRN003", name: "Sweet Corn", status: "transit", value: "₹13,600", date: "1 week ago" },
    { id: "LET002", name: "Fresh Lettuce", status: "pending", value: "₹7,200", date: "3 days ago" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sold":
        return "bg-green-100 text-green-800 border-green-200"
      case "transit":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sold":
        return <CheckCircle className="w-4 h-4" />
      case "transit":
        return <Truck className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Good morning, Rajesh</h1>
              <p className="text-sm text-muted-foreground">Krishna Valley Farm</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <NotificationCenter notifications={notifications} />
            <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="border-border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push("/earnings")}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">₹2,14,400</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push("/products")}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Active Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start py-6 text-left"
              size="lg"
              onClick={() => router.push("/add-product")}
            >
              <Plus className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Add New Product</p>
                <p className="text-sm text-primary-foreground/80">Register fresh produce</p>
              </div>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="py-4 flex-col h-auto bg-transparent"
                onClick={() => router.push("/products")}
              >
                <Package className="w-5 h-5 mb-2" />
                <span className="text-sm">My Products</span>
              </Button>
              <Button
                variant="outline"
                className="py-4 flex-col h-auto bg-transparent"
                onClick={() => router.push("/earnings")}
              >
                <TrendingUp className="w-5 h-5 mb-2" />
                <span className="text-sm">Earnings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Your latest product updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                onClick={() => router.push("/products")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-border">
                    {getStatusIcon(product.status)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{product.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <p className="text-sm text-foreground flex-1">{notification.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          <Button variant="ghost" className="flex-col py-3 px-6 h-auto" onClick={() => router.push("/dashboard")}>
            <Leaf className="w-5 h-5 mb-1 text-primary" />
            <span className="text-xs text-primary">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col py-3 px-6 h-auto" onClick={() => router.push("/products")}>
            <Package className="w-5 h-5 mb-1" />
            <span className="text-xs">Products</span>
          </Button>
          <Button variant="ghost" className="flex-col py-3 px-6 h-auto" onClick={() => router.push("/earnings")}>
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="text-xs">Earnings</span>
          </Button>
          <Button variant="ghost" className="flex-col py-3 px-6 h-auto" onClick={() => router.push("/settings")}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
