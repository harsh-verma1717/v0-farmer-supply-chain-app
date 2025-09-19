"use client"

import { useState, useRef } from "react"

export function useCamera() {
  const [isOpen, setIsOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
        audio: false,
      })

      setStream(mediaStream)
      setIsOpen(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsOpen(false)
  }

  const capturePhoto = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!videoRef.current || !canvasRef.current) {
        resolve(null)
        return
      }

      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      if (!context) {
        resolve(null)
        return
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)

      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        "image/jpeg",
        0.8,
      )
    })
  }

  return {
    isOpen,
    videoRef,
    canvasRef,
    openCamera,
    closeCamera,
    capturePhoto,
  }
}
