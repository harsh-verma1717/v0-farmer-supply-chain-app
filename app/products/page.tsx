"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft, Search, Package, Clock, CheckCircle, Truck, Eye, MoreVertical, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProductsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [products] = useState([
    {
      id: "TOM001",
      name: "Organic Tomatoes",
      variety: "Cherry",
      quantity: "50 kg",
      harvestDate: "2024-01-15",
      status: "sold",
      value: "$245",
      buyer: "Fresh Market Co.",
      photo: "/ripe-tomatoes.png",
    },
    {
      id: "CRN003",
      name: "Sweet Corn",
      variety: "Golden",
      quantity: "100 kg",
      harvestDate: "2024-01-10",
      status: "transit",
      value: "$180",
      buyer: "Valley Foods",
      photo: "/field-of-ripe-corn.png",
    },
    {
      id: "LET002",
      name: "Fresh Lettuce",
      variety: "Romaine",
      quantity: "25 kg",
      harvestDate: "2024-01-18",
      status: "pending",
      value: "$95",
      buyer: "Pending",
      photo: "/fresh-lettuce.png",
    },
    {
      id: "CAR004",
      name: "Organic Carrots",
      variety: "Baby",
      quantity: "75 kg",
      harvestDate: "2024-01-12",
      status: "listed",
      value: "$120",
      buyer: "Not assigned",
      photo: "/bunch-of-carrots.png",
    },
    {
      id: "POT005",
      name: "Potatoes",
      variety: "Russet",
      quantity: "200 kg",
      harvestDate: "2024-01-08",
      status: "sold",
      value: "$160",
      buyer: "City Grocers",
      photo: "/pile-of-potatoes.png",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sold":
        return "bg-green-100 text-green-800 border-green-200"
      case "transit":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "listed":
        return "bg-purple-100 text-purple-800 border-purple-200"
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
      case "listed":
        return <Package className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || product.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const statusCounts = {
    all: products.length,
    listed: products.filter((p) => p.status === "listed").length,
    pending: products.filter((p) => p.status === "pending").length,
    transit: products.filter((p) => p.status === "transit").length,
    sold: products.filter((p) => p.status === "sold").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground ml-3">My Products</h1>
          </div>
          <Button size="sm" onClick={() => router.push("/add-product")}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="whitespace-nowrap"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </Button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={product.photo || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.variety} • {product.quantity}
                        </p>
                        <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(product.status)}>
                          {getStatusIcon(product.status)}
                          <span className="ml-1">{product.status}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{product.value}</p>
                        <p className="text-xs text-muted-foreground">{product.buyer}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Harvested: {new Date(product.harvestDate).toLocaleDateString()}
                      </p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filter"
                : "Start by adding your first product"}
            </p>
            <Button onClick={() => router.push("/add-product")}>Add Product</Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
