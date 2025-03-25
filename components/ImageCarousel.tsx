'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const baseImages = [
  '/carousel-1.png',
  '/carousel-2.png',
  '/carousel-3.png',
  '/carousel-4.png',
  '/carousel-5.png',
  '/carousel-6.png',
  '/carousel-7.png',
]

const captions = [
  'Residential Window Cleaning',
  'Litter/Garbage Removal',
  'Gutter Cleaning',
  'Decluttering Storage Units & Garages',
  'Estate Cleaning',
  'Office Cleaning',
  'Dead Animal Removal',
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
  }, [nextImage, isTransitioning]) // Add nextImage as a dependency here

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
        {images.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt={`Slide ${index + 1}`}
            width={600}
            height={400}
            priority={index === currentIndex} // Prioritize current image
            className={`absolute top-0 left-0 object-cover w-full h-full rounded-lg transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <p className="text-center mt-3 text-lg font-medium font-inter">
        {captions[currentIndex]}
      </p>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white disabled:opacity-50"
        onClick={prevImage}
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white disabled:opacity-50"
        onClick={nextImage}
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

export default ImageCarousel
