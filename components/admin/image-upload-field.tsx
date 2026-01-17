"use client"

import type React from "react"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadFieldProps {
  label: string
  description?: string
  currentImage?: string | null
  onImageChange: (imageUrl: string | null) => void
}

export function ImageUploadField({ label, description, currentImage, onImageChange }: ImageUploadFieldProps) {
  const { toast } = useToast()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "خطأ في الملف",
        description: "يرجى اختيار ملف صورة",
        variant: "destructive",
      })
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "حجم كبير",
        description: "حجم الصورة يجب أن يكون أقل من 2 ميجابايت",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      onImageChange(base64String)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <Label htmlFor="image-upload" className="block mb-2">
        {label}
      </Label>
      {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="text-right" />
          <Upload className="w-5 h-5 text-gray-400" />
        </div>
        {currentImage && (
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Preview"
            className="mt-2 w-full h-48 object-cover rounded border"
          />
        )}
        <p className="text-sm text-gray-500">اختر صورة جديدة (الحد الأقصى: 2 ميجابايت)</p>
      </div>
    </div>
  )
}

export default ImageUploadField
