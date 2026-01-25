'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface ImageSliderProps {
    projectImages: {
        id: number | string
        image_url: string
        caption?: string | null
    }[]
    projectTitle: string
}

export default function ImageSliderClient({
    projectImages,
    projectTitle,
}: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prev = () => {
        setCurrentIndex((i) =>
            i === 0 ? projectImages.length - 1 : i - 1
        )
    }

    const next = () => {
        setCurrentIndex((i) =>
            i === projectImages.length - 1 ? 0 : i + 1
        )
    }

    if (projectImages.length === 0) return null

    return (
        <section className="py-4 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* 👇 الحل هنا */}
                <div
                    dir="ltr"
                    className="relative overflow-hidden rounded-xl h-105"
                >
                    <div
                        className="flex h-full transition-transform duration-700 ease-in-out"
                        style={{
                            width: `${projectImages.length * 100}%`,
                            transform: `translateX(-${currentIndex * (100 / projectImages.length)}%)`,
                        }}
                    >
                        {projectImages.map((img) => (
                            <div
                                key={img.id}
                                className="h-full shrink-0"
                                style={{ width: `${100 / projectImages.length}%` }}
                            >
                                <Card className="h-full overflow-hidden">
                                    <img
                                        src={img.image_url}
                                        alt={img.caption || projectTitle}
                                        className="w-full h-full object-cover"
                                    />
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Previous */}
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow flex items-center justify-center text-xl"
                    >
                        ‹
                    </button>

                    {/* Next */}
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow flex items-center justify-center text-xl"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    )
}
