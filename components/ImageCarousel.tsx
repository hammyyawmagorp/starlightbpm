'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const carouselImages = [
  {
    src: '/carousel-1.jpeg',
    alt: 'Professional window cleaning service in action',
  },
  {
    src: '/carousel-2.png',
    alt: 'Litter pick up service',
  },
  {
    src: '/carousel-3.png',
    alt: 'Residential gutter cleaning and maintenance',
  },
  {
    src: '/carousel-4.png',
    alt: 'Decluttering and organizing services',
  },
  {
    src: '/carousel-5.png',
    alt: 'House and estate cleaning',
  },
  {
    src: '/carousel-7.jpeg',
    alt: 'Local quality window cleaning in action',
  },
]

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState(carouselImages)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Add timestamp to images after component mounts
    const timestamp = Date.now()
    setImages(
      carouselImages.map((img) => ({
        ...img,
        src: `${img.src}?v=${timestamp}`,
      }))
    )
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
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
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
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-800 p-2 rounded-full text-white disabled:opacity-50 transition-colors"
        onClick={nextImage}
        disabled={isTransitioning}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

export default ImageCarousel
