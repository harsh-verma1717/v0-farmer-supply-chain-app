"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, DollarSign } from "lucide-react"

interface PaymentStatus {
  id: string
  productId: string
  amount: number
  status: "pending" | "processing" | "completed" | "failed"
  transactionHash?: string
  timestamp: Date
  estimatedCompletion?: Date
}

export function PaymentTracker() {
  const [payments, setPayments] = useState<PaymentStatus[]>([
    {
      id: "pay_001",
      productId: "TOM001",
      amount: 245,
      status: "completed",
      transactionHash: "0x1234...5678",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "pay_002",
      productId: "CRN003",
      amount: 180,
      status: "processing",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 10 * 60 * 1000),
    },
    {
      id: "pay_003",
      productId: "LET002",
      amount: 95,
      status: "pending",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getProgress = (status: string) => {
    switch (status) {
      case "completed":
        return 100
      case "processing":
        return 60
      case "pending":
        return 20
      default:
        return 0
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Payment Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(payment.status)}
                <div>
                  <p className="font-medium">Product #{payment.productId}</p>
                  <p className="text-sm text-muted-foreground">${payment.amount}</p>
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(payment.status)}>
                {payment.status}
              </Badge>
            </div>

            <Progress value={getProgress(payment.status)} className="h-2" />

            {payment.transactionHash && <p className="text-xs text-muted-foreground">TX: {payment.transactionHash}</p>}

            {payment.estimatedCompletion && payment.status === "processing" && (
              <p className="text-xs text-muted-foreground">
                Est. completion: {payment.estimatedCompletion.toLocaleTimeString()}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
