"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Camera, Calendar, MapPin, Package, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { CameraModal } from "@/components/camera-modal"
import { useGeolocation } from "@/hooks/use-geolocation"

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cropName: "",
    variety: "",
    quantity: "",
    unit: "",
    harvestDate: "",
    description: "",
    photo: null as File | null,
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const { latitude, longitude, error, loading, getCurrentLocation } = useGeolocation()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = (file: File) => {
    setFormData((prev) => ({ ...prev, photo: file }))
    const reader = new FileReader()
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUseCurrentLocation = () => {
    getCurrentLocation()
  }

  const handleSubmit = () => {
    // In a real app, this would generate blockchain ID and save to database
    const productId = `${formData.cropName.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-3)}`
    console.log("Product registered:", { ...formData, id: productId })

    // Show success and navigate back
    alert(`Product registered successfully! ID: ${productId}`)
    router.push("/dashboard")
  }

  const cropOptions = [
    "Rice",
    "Wheat",
    "Sugarcane",
    "Cotton",
    "Maize",
    "Bajra",
    "Jowar",
    "Pulses",
    "Tomatoes",
    "Onions",
    "Potatoes",
    "Cauliflower",
    "Cabbage",
    "Okra",
    "Brinjal",
    "Other",
  ]

  const unitOptions = ["kg", "lbs", "tons", "boxes", "crates", "bunches"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground ml-3">Add New Product</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Product Photo */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Product Photo
            </CardTitle>
            <CardDescription>Take a photo of your produce or upload from gallery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt="Product preview"
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setPhotoPreview(null)
                      setFormData((prev) => ({ ...prev, photo: null }))
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No photo selected</p>
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => setShowCamera(true)}>
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                    <div className="relative">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload from Gallery
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cropName">Crop Name</Label>
              <Select onValueChange={(value) => handleInputChange("cropName", value)}>
                <SelectTrigger className="text-lg py-3">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropOptions.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="variety">Variety (Optional)</Label>
              <Input
                id="variety"
                placeholder="e.g., Cherry, Roma, Beefsteak"
                value={formData.variety}
                onChange={(e) => handleInputChange("variety", e.target.value)}
                className="text-lg py-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  className="text-lg py-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select onValueChange={(value) => handleInputChange("unit", value)}>
                  <SelectTrigger className="text-lg py-3">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvestDate" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Harvest Date
              </Label>
              <Input
                id="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={(e) => handleInputChange("harvestDate", e.target.value)}
                className="text-lg py-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Additional details about your produce..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Farm Location */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Farm Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground">Krishna Valley Farm</p>
                <p className="text-sm text-muted-foreground">Village Rampur, Sonipat, Haryana</p>
                {latitude && longitude ? (
                  <p className="text-xs text-muted-foreground mt-1">
                    GPS: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">GPS: Not available</p>
                )}
              </div>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleUseCurrentLocation}
                disabled={loading}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {loading ? "Getting Location..." : "Use Current Location"}
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full py-4 text-lg"
          disabled={!formData.cropName || !formData.quantity || !formData.unit || !formData.harvestDate}
        >
          Register Product
        </Button>
      </div>

      {/* Camera Modal */}
      <CameraModal isOpen={showCamera} onClose={() => setShowCamera(false)} onCapture={handleCameraCapture} />
    </div>
  )
}
