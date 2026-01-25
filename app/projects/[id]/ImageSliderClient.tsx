'use client'

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    const [isFullscreen, setIsFullscreen] = useState(false)

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

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    if (projectImages.length === 0) return null

    return (
        <>
            {/* Main Slider Section */}
            <section className="py-6 md:py-10">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                    <div
                        dir="ltr"
                        className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-4/3 md:aspect-video lg:aspect-21/9 py-4">
                            <div
                                className="flex h-full transition-transform duration-500 ease-out"
                                style={{
                                    width: `${projectImages.length * 100}%`,
                                    transform: `translateX(-${currentIndex * (100 / projectImages.length)}%)`,
                                }}
                            >
                                {projectImages.map((img) => (
                                    <div
                                        key={img.id}
                                        className="h-full shrink-0 relative cursor-pointer"
                                        style={{ width: `${100 / projectImages.length}%` }}
                                        onClick={() => setIsFullscreen(true)}
                                    >
                                        <img
                                            src={img.image_url || "/placeholder.svg"}
                                            alt={img.caption || projectTitle}
                                            className="w-full h-full object-contain md:object-cover"
                                        />
                                        {/* Caption Overlay */}
                                        {img.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 md:p-6">
                                                <p className="text-white text-sm md:text-base text-center">
                                                    {img.caption}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            {projectImages.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={prev}
                                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-gray-800" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={next}
                                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-gray-800" />
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                {currentIndex + 1} / {projectImages.length}
                            </div>
                        </div>

                        {/* Dots Indicator */}
                        {projectImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {projectImages.map((_, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${index === currentIndex
                                            ? "bg-white scale-125"
                                            : "bg-white/50 hover:bg-white/75"
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thumbnails for Desktop */}
                    {projectImages.length > 1 && (
                        <div className="hidden md:flex gap-3 mt-4 justify-center overflow-x-auto pb-2">
                            {projectImages.map((img, index) => (
                                <button
                                    type="button"
                                    key={img.id}
                                    onClick={() => goToSlide(index)}
                                    className={`shrink-0 w-20 h-14 lg:w-24 lg:h-16 rounded-lg overflow-hidden transition-all ${index === currentIndex
                                        ? "ring-3 ring-primary ring-offset-2 scale-105"
                                        : "opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img
                                        src={img.image_url || "/placeholder.svg"}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={() => setIsFullscreen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center text-2xl z-10"
                        aria-label="Close fullscreen"
                    >
                        ×
                    </button>

                    <img
                        src={projectImages[currentIndex].image_url || "/placeholder.svg"}
                        alt={projectImages[currentIndex].caption || projectTitle}
                        className="max-w-full max-h-full object-contain p-4"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {projectImages.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); prev(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-14 h-14 rounded-full flex items-center justify-center"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-8 h-8 text-white" />
                            </button>

                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); next(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-14 h-14 rounded-full flex items-center justify-center"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-8 h-8 text-white" />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                        {currentIndex + 1} / {projectImages.length}
                    </div>
                </div>
            )}
        </>
    )
}
