'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
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
  'Carcass Removal',
]
const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }
  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={600}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-center mt-3 text-lg font-medium">
        {captions[currentIndex]}
      </p>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white"
        onClick={prevImage}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white"
        onClick={nextImage}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

export default ImageCarousel
