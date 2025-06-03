'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface ServiceOption {
  id: string
  label: string
  faqs: FAQ[]
}

interface FAQ {
  question: string
  answer: string
}

const services: ServiceOption[] = [
  {
    id: 'litter',
    label: 'Litter Pickup',
    faqs: [
      {
        question: 'What areas do you service for litter pickup?',
        answer:
          'We provide litter pickup services throughout the Greater Vancouver area, including residential neighborhoods, commercial properties, and public spaces. Contact us to confirm service availability in your specific location.',
      },
      {
        question: 'How often can I schedule litter pickup services?',
        answer:
          'We offer flexible scheduling options including one-time cleanups, weekly, bi-weekly, or monthly service. We can customize a schedule that best fits your needs and budget.',
      },
      {
        question: 'What types of litter do you handle?',
        answer:
          'We handle all types of litter including general trash, recyclables, organic waste, and hazardous materials (with proper handling). Our team is equipped to safely collect and dispose of various types of waste.',
      },
    ],
  },
  {
    id: 'windows',
    label: 'Window Cleaning',
    faqs: [
      {
        question: 'How often should I have my windows cleaned?',
        answer:
          'For residential properties, we recommend professional window cleaning every 3-6 months. Commercial properties may require more frequent cleaning, typically every 1-3 months, depending on location and environmental factors.',
      },
      {
        question: 'Do you clean both interior and exterior windows?',
        answer:
          'Yes, we offer both interior and exterior window cleaning services. You can choose either service or opt for a complete cleaning package that covers both sides of your windows.',
      },
      {
        question: 'What cleaning methods do you use?',
        answer:
          'We use eco-friendly cleaning solutions and professional equipment including water-fed poles for high windows, squeegees, and microfiber cloths. Our methods are safe for all window types and the environment.',
      },
    ],
  },
  {
    id: 'gutters',
    label: 'Gutter Cleaning',
    faqs: [
      {
        question: 'How often should gutters be cleaned?',
        answer:
          'We recommend cleaning gutters at least twice a year, typically in spring and fall. However, properties with many trees may require more frequent cleaning to prevent clogs and water damage.',
      },
      {
        question: "What happens if I don't clean my gutters?",
        answer:
          "Neglected gutters can lead to water damage, foundation issues, roof damage, and pest infestations. Regular cleaning helps prevent these costly problems and maintains your property's structural integrity.",
      },
      {
        question: 'Do you offer gutter repair services?',
        answer:
          "Yes, we can identify and repair common gutter issues such as leaks, sagging, and loose fasteners. We'll assess the damage and provide appropriate solutions during our service visit.",
      },
    ],
  },
  {
    id: 'solar',
    label: 'Solar Panel Cleaning',
    faqs: [
      {
        question: 'How often should solar panels be cleaned?',
        answer:
          'We recommend cleaning solar panels every 6-12 months, depending on your location and environmental conditions. Regular cleaning helps maintain optimal energy efficiency.',
      },
      {
        question: 'What cleaning methods do you use for solar panels?',
        answer:
          'We use specialized equipment and eco-friendly cleaning solutions that are safe for solar panels. Our methods effectively remove dirt, dust, and debris without damaging the panels or their protective coating.',
      },
      {
        question: 'Will cleaning improve my solar panel efficiency?',
        answer:
          'Yes, regular cleaning can improve solar panel efficiency by up to 15-20%. Clean panels absorb more sunlight, leading to better energy production and potential savings on your energy bills.',
      },
    ],
  },
]

export default function FAQs() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null
  )

  const handleSelect = (service: ServiceOption) => {
    setSelectedService(service)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col items-center pt-4 mt-4">
      <motion.div
        className="flex mt-4 w-full max-w-4xl p-3 bg-site-bg opacity-90 flex-col shadow-lg text-center"
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
          <span className="text-xl font-inter font-medium text-logoblue-30">
            What are the benefits of...
          </span>
          <div className="relative w-64">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-2 text-left bg-transparent text-logobrown-10 hover:underline focus:outline-none font-inter text-lg"
            >
              {selectedService?.label || 'Select a Service'}
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-logoblue-light shadow-lg rounded-sm">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleSelect(service)}
                    className="w-full px-4 py-2 text-left text-logoblue-30 hover:text-logobrown-10 focus:outline-none font-inter text-base hover:bg-logobrown-20"
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
            className="mt-4 p-6 bg-white rounded-sm shadow-md text-left"
          >
            <h2 className="text-2xl font-inter font-semibold text-logoblue-30 mb-6">
              {selectedService.label} FAQs
            </h2>
            <div className="space-y-8">
              {selectedService.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <h3 className="text-xl font-inter font-medium text-logobrown-10 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-inter">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
