'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface ServiceOption {
  id: string
  label: string
}

const services: ServiceOption[] = [
  { id: 'litter', label: 'Litter Pickup' },
  { id: 'windows', label: 'Window Cleaning' },
  { id: 'gutters', label: 'Gutter Cleaning' },
  { id: 'solar', label: 'Solar Panel Cleaning' },
]

export default function FAQs() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')

  const handleSelect = (service: ServiceOption) => {
    setSelectedService(service.label)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col items-center pt-4 mt-4">
      <motion.div
        className="flex mt-4 w-full max-w-2xl p-3 bg-site-bg opacity-90 flex-col shadow-lg text-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <h1 className="text-3xl font-bold text-logoblue-30 text-center mb-8">
          Frequently Asked Questions
        </h1>
        <p className="pb-5 mb-5">
          Let&apos;s face it garbage/dirt is everywhere and unfortunately it
          seems to keep growing and growing. How can we help?
        </p>

        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-lg font-semibold text-logoblue-30">
            What are the benefits of...
          </span>
          <div className="relative w-64">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-2 text-left bg-transparent text-logobrown-10 hover:underline focus:outline-none font-semibold"
            >
              {selectedService || 'Select a Service'}
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-logoblue-light shadow-lg rounded-sm">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleSelect(service)}
                    className="w-full px-4 py-2 text-left text-logoblue-30 hover:text-logobrown-10 focus:outline-none font-semibold hover:bg-logobrown-20"
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-4 bg-white rounded-sm shadow-md"
          >
            <h2 className="text-xl font-semibold text-logoblue-30 mb-4">
              {selectedService} FAQs
            </h2>
            <p className="text-gray-600">
              Select a service to view related frequently asked questions.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
