"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { BottomNavigation } from "@/components/bottom-navigation"
import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    farmName: "Green Valley Farm",
    address: "123 Farm Road, Valley County, CA 95123",
    bankAccount: "**** **** **** 1234",
  })

  const [notifications, setNotifications] = useState({
    sales: true,
    payments: true,
    marketing: false,
    updates: true,
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field as keyof typeof prev]: !prev[field as keyof typeof prev] }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground ml-3">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Profile Section */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>Manage your personal and farm details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Photo */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileUpdate("email", e.target.value)}
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  value={profile.farmName}
                  onChange={(e) => handleProfileUpdate("farmName", e.target.value)}
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Farm Address
                </Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleProfileUpdate("address", e.target.value)}
                  className="py-3"
                />
              </div>
            </div>

            <Button className="w-full py-3">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </CardTitle>
            <CardDescription>Manage your bank account for payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Bank Account</p>
                  <p className="text-sm text-muted-foreground">{profile.bankAccount}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Sales Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when your products are sold</p>
              </div>
              <Switch checked={notifications.sales} onCheckedChange={() => handleNotificationToggle("sales")} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Payment Alerts</p>
                <p className="text-sm text-muted-foreground">Receive alerts for payment confirmations</p>
              </div>
              <Switch checked={notifications.payments} onCheckedChange={() => handleNotificationToggle("payments")} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Marketing Updates</p>
                <p className="text-sm text-muted-foreground">Promotional offers and market insights</p>
              </div>
              <Switch checked={notifications.marketing} onCheckedChange={() => handleNotificationToggle("marketing")} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">App Updates</p>
                <p className="text-sm text-muted-foreground">New features and important announcements</p>
              </div>
              <Switch checked={notifications.updates} onCheckedChange={() => handleNotificationToggle("updates")} />
            </div>
          </CardContent>
        </Card>

        {/* Other Options */}
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-between py-4 px-4 h-auto">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-3" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Separator />

              <Button variant="ghost" className="w-full justify-between py-4 px-4 h-auto">
                <div className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-3" />
                  <span>Help & Support</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Separator />

              <Button variant="ghost" className="w-full justify-between py-4 px-4 h-auto text-destructive">
                <div className="flex items-center">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Sign Out</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>FarmChain v1.0.0</p>
          <p>© 2024 Agricultural Supply Chain</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
