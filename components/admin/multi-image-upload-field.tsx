"use client"

import React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Upload } from "lucide-react"

interface MultiImageUploadFieldProps {
    label: string
    images: string[]
    onImagesChange: (images: string[]) => void
    maxImages?: number
}

export function MultiImageUploadField({
    label,
    images,
    onImagesChange,
    maxImages = 10,
}: MultiImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        // Check if adding these files would exceed max
        if (images.length + files.length > maxImages) {
            alert(`يمكنك رفع ${maxImages} صور كحد أقصى`)
            return
        }

        setUploading(true)

        try {
            const newImages: string[] = []

            for (let i = 0; i < files.length; i++) {
                const file = files[i]

                // Validate file size (2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert(`الصورة ${file.name} أكبر من 2 ميجابايت`)
                    continue
                }

                // Convert to base64
                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.readAsDataURL(file)
                })

                newImages.push(base64)
            }

            onImagesChange([...images, ...newImages])
        } catch (error) {
            console.error("Error uploading images:", error)
            alert("فشل رفع الصور")
        } finally {
            setUploading(false)
            // Reset input
            e.target.value = ""
        }
    }

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        onImagesChange(newImages)
    }

    return (
        <div className="space-y-3">
            <Label>{label}</Label>

            {/* Upload Button */}
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={uploading || images.length >= maxImages}
                    onClick={() => document.getElementById("multi-image-input")?.click()}
                >
                    <Upload className="ml-2 h-4 w-4" />
                    {uploading ? "جاري الرفع..." : "اختر صور"}
                </Button>
                <span className="text-sm text-muted-foreground">
                    ({images.length}/{maxImages}) - الحد الأقصى: 2 ميجابايت لكل صورة
                </span>
            </div>

            <Input
                id="multi-image-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Display Uploaded Images */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden border">
                            <img
                                src={img || "/placeholder.svg"}
                                alt={`صورة ${index + 1}`}
                                className="w-full h-32 object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                                صورة {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
