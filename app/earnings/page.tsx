"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PaymentTracker } from "@/components/payment-tracker"
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export default function EarningsPage() {
  const router = useRouter()
  const [timeFilter, setTimeFilter] = useState("month")

  const [earnings] = useState({
    total: 2840,
    thisMonth: 680,
    pending: 275,
    growth: 12.5,
  })

  const [transactions] = useState([
    {
      id: "TXN001",
      productId: "TOM001",
      productName: "Organic Tomatoes",
      amount: 245,
      date: "2024-01-20",
      status: "completed",
      buyer: "Fresh Market Co.",
      blockchainTx: "0x1a2b3c4d...",
    },
    {
      id: "TXN002",
      productId: "POT005",
      productName: "Potatoes",
      amount: 160,
      date: "2024-01-18",
      status: "completed",
      buyer: "City Grocers",
      blockchainTx: "0x5e6f7g8h...",
    },
    {
      id: "TXN003",
      productId: "CRN003",
      productName: "Sweet Corn",
      amount: 180,
      date: "2024-01-15",
      status: "pending",
      buyer: "Valley Foods",
      blockchainTx: "Pending...",
    },
    {
      id: "TXN004",
      productId: "LET002",
      productName: "Fresh Lettuce",
      amount: 95,
      date: "2024-01-12",
      status: "pending",
      buyer: "Green Grocers",
      blockchainTx: "Pending...",
    },
  ])

  const chartData = [
    { month: "Sep", earnings: 420 },
    { month: "Oct", earnings: 580 },
    { month: "Nov", earnings: 720 },
    { month: "Dec", earnings: 640 },
    { month: "Jan", earnings: 680 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
            <h1 className="text-xl font-bold text-foreground ml-3">Earnings</h1>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">${earnings.total.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">${earnings.thisMonth}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">${earnings.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  {earnings.growth > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">+{earnings.growth}%</p>
                  <p className="text-sm text-muted-foreground">Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <PaymentTracker />

        {/* Earnings Chart */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Earnings Trend</CardTitle>
                <CardDescription>Monthly earnings over time</CardDescription>
              </div>
              <div className="flex space-x-2">
                {["week", "month", "year"].map((period) => (
                  <Button
                    key={period}
                    variant={timeFilter === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeFilter(period)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Transaction History</CardTitle>
                <CardDescription>Recent payments and blockchain transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.productId} • {transaction.buyer}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">${transaction.amount}</p>
                  <Badge variant="outline" className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {transaction.blockchainTx.length > 20
                      ? `${transaction.blockchainTx.substring(0, 12)}...`
                      : transaction.blockchainTx}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
