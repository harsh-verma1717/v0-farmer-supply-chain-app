"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, MapPin, User, Phone } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    farmName: "",
    location: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleComplete = () => {
    // In a real app, this would save to blockchain/database
    console.log("Farmer registered:", formData)
    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">FarmChain</h1>
          </div>
          <p className="text-muted-foreground text-balance">Welcome to the future of agricultural supply chain</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        {/* Onboarding Steps */}
        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {step === 1 && "Personal Information"}
              {step === 2 && "Farm Details"}
              {step === 3 && "Location Setup"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about yourself"}
              {step === 2 && "Share your farm information"}
              {step === 3 && "Set your farm location"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-lg py-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="text-lg py-3"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <Label htmlFor="farmName" className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4" />
                  <span>Farm Name</span>
                </Label>
                <Input
                  id="farmName"
                  placeholder="Enter your farm name"
                  value={formData.farmName}
                  onChange={(e) => handleInputChange("farmName", e.target.value)}
                  className="text-lg py-3"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Farm Location</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="Village, Tehsil, District, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="text-lg py-3"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full py-3 bg-transparent"
                  onClick={() => {
                    // In a real app, this would use GPS
                    handleInputChange("location", "Current GPS Location")
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>
            )}

            <div className="pt-4">
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  className="w-full py-3 text-lg"
                  disabled={(step === 1 && (!formData.name || !formData.phone)) || (step === 2 && !formData.farmName)}
                >
                  Continue
                </Button>
              ) : (
                <Button onClick={handleComplete} className="w-full py-3 text-lg" disabled={!formData.location}>
                  Complete Setup
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
