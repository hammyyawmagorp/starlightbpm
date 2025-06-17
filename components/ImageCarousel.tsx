'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const baseImages = [
  '/carousel-1.jpeg',
  '/carousel-2.png',
  '/carousel-3.png',
  '/carousel-4.png',
  '/carousel-5.png',
  '/carousel-7.jpeg',
]

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState(baseImages)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Add timestamp to images after component mounts
    const timestamp = Date.now()
    setImages(baseImages.map((img) => `${img}?v=${timestamp}`))
  }, [])

  // Memoizing nextImage to avoid unnecessary re-renders
  const nextImage = useCallback(() => {
    if (isTransitioning) return // Prevent rapid transitions
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 500) // Allow transitions after 500ms
  }, [isTransitioning, images.length])

  const prevImage = () => {
    if (isTransitioning) return // Prevent rapid transitions
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsTransitioning(false), 500) // Allow transitions after 500ms
  }

  useEffect(() => {
    const nextSlide = () => {
      if (!isTransitioning) {
        nextImage()
      }
    }

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextImage, isTransitioning])

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === currentIndex}
              className="object-cover"
              sizes="(max-width: 600px) 100vw, 600px"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-800 p-2 rounded-full text-white disabled:opacity-50 transition-colors"
        onClick={prevImage}
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-800 p-2 rounded-full text-white disabled:opacity-50 transition-colors"
        onClick={nextImage}
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

export default ImageCarousel
