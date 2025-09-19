"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, DollarSign, Truck, AlertCircle } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "payment" | "status" | "alert" | "info"
  timestamp: Date
  read: boolean
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Payment Received",
      message: "Tomatoes #TOM001 sold for $245",
      type: "payment",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
    },
    {
      id: "2",
      title: "Product In Transit",
      message: "Corn #CRN003 is now in transit to buyer",
      type: "status",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: false,
    },
    {
      id: "3",
      title: "Quality Check Complete",
      message: "Lettuce #LET002 passed quality inspection",
      type: "info",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
    },
  ])

  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign className="w-4 h-4 text-green-600" />
      case "status":
        return <Truck className="w-4 h-4 text-blue-600" />
      case "alert":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  useEffect(() => {
    // Simulate receiving new notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        // 20% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: "New Update",
          message: "Your product status has been updated",
          type: "info",
          timestamp: new Date(),
          read: false,
        }
        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (!isOpen) {
    return (
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-16 p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Notifications</CardTitle>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatTime(notification.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
