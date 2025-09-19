"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCamera } from "@/hooks/use-camera"
import { Camera, X } from "lucide-react"

interface CameraModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (file: File) => void
}

export function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const { videoRef, canvasRef, openCamera, closeCamera, capturePhoto } = useCamera()

  const handleCapture = async () => {
    const blob = await capturePhoto()
    if (blob) {
      const file = new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" })
      onCapture(file)
      closeCamera()
      onClose()
    }
  }

  const handleOpen = async () => {
    await openCamera()
  }

  const handleClose = () => {
    closeCamera()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Take Photo</h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleOpen} variant="outline" className="flex-1 bg-transparent">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
              <Button onClick={handleCapture} className="flex-1">
                Capture Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
