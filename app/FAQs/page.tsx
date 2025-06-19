'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ServiceInfo {
  id: number
  title: string
  main_para: string
  h1: string
  para_1: string
  h2: string
  para_2: string
  people_say1: string
  people_say2: string
  fact_1: string
  fact_2: string
}

interface TitleRecord {
  title: string
}

const services = [
  { id: 'windows', label: 'Window Cleaning' },
  { id: 'gutters', label: 'Gutter Cleaning' },
  { id: 'litter', label: 'Litter Pickup' },
  { id: 'dead-animal', label: 'Dead Animal Removal' },
  { id: 'decluttering', label: 'Decluttering' },
  { id: 'estate', label: 'Estate Cleaning' },
  { id: 'office', label: 'Office Cleaning' },
  { id: 'solar', label: 'Solar Panel Cleaning' },
]

export default function FAQs() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null)
  const [serviceInfo, setServiceInfo] = useState<ServiceInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check URL for service parameter
    const urlParams = new URLSearchParams(window.location.search)
    const serviceParam = urlParams.get('service')

    if (serviceParam) {
      const service = services.find((s) => s.id === serviceParam)
      if (service) {
        setSelectedService(service)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedService) {
      fetchServiceInfo(selectedService.label)
    }
  }, [selectedService])

  const fetchServiceInfo = async (title: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `/api/service-info?title=${encodeURIComponent(title)}`
      )
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 404 && data.availableTitles) {
          throw new Error(
            `Service not found. Available services: ${data.availableTitles
              .map((t: TitleRecord) => t.title)
              .join(', ')}`
          )
        }
        throw new Error(data.error || 'Failed to fetch service information')
      }

      if (!data || Object.keys(data).length === 0) {
        setError('No information available for this service.')
        return
      }

      setServiceInfo(data)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to load service information'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (service: (typeof services)[0]) => {
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
        <h1 className="text-3xl font-bold text-logoblue-30 text-center mb-8 mt-2">
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
              className="w-full px-4 py-2 text-left bg-transparent text-logobrown-10 hover:underline focus:outline-none font-inter text-xl font-semibold"
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
                    className="w-full px-4 py-2 text-left text-logoblue-30 hover:text-logobrown-10 focus:outline-none font-inter text-lg font-medium hover:bg-logobrown-20"
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
            className="mt-4 p-6 bg-logoblue-light border border-logoblue-30/10 rounded-sm shadow-md text-left"
          >
            <h2 className="text-2xl font-inter font-semibold text-logoblue-30 mb-6">
              Benefits of our {selectedService.label} Service
            </h2>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-logoblue-30 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading information...</p>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : !serviceInfo ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-inter font-semibold text-logoblue-30 mb-4">
                  Coming Soon!
                </h3>
                <p className="text-gray-600 leading-relaxed font-inter">
                  We&apos;re currently preparing detailed information about our{' '}
                  {selectedService.label} service. Please check back soon or
                  contact us directly for more information.
                </p>
                <div className="mt-6">
                  <Link href="/contact">
                    <button className="px-6 py-2 bg-logoblue-30 text-yellow-logo transition-all shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black font-semibold">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <p className="text-gray-600 leading-relaxed font-inter">
                    {serviceInfo.main_para}
                  </p>
                </div>

                {(serviceInfo.h1 || serviceInfo.para_1) && (
                  <div className="border-b border-gray-200 pb-6">
                    {serviceInfo.h1 && (
                      <h3 className="text-xl font-inter font-medium text-logobrown-10 mb-3">
                        {serviceInfo.h1}
                      </h3>
                    )}
                    {serviceInfo.para_1 && (
                      <p className="text-gray-600 leading-relaxed font-inter">
                        {serviceInfo.para_1}
                      </p>
                    )}
                  </div>
                )}

                {(serviceInfo.h2 || serviceInfo.para_2) && (
                  <div className="border-b border-gray-200 pb-6">
                    {serviceInfo.h2 && (
                      <h3 className="text-xl font-inter font-medium text-logobrown-10 mb-3">
                        {serviceInfo.h2}
                      </h3>
                    )}
                    {serviceInfo.para_2 && (
                      <p className="text-gray-600 leading-relaxed font-inter">
                        {serviceInfo.para_2}
                      </p>
                    )}
                  </div>
                )}

                {(serviceInfo.people_say1 || serviceInfo.people_say2) && (
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-inter font-medium text-logobrown-10 mb-3">
                      What People Say
                    </h3>
                    {serviceInfo.people_say1 && (
                      <p className="text-gray-600 leading-relaxed font-inter mb-3 italic">
                        &quot;{serviceInfo.people_say1}&quot;
                      </p>
                    )}
                    {serviceInfo.people_say2 && (
                      <p className="text-gray-600 leading-relaxed font-inter italic">
                        &quot;{serviceInfo.people_say2}&quot;
                      </p>
                    )}
                  </div>
                )}

                {(serviceInfo.fact_1 || serviceInfo.fact_2) && (
                  <div>
                    <h3 className="text-xl font-inter font-medium text-logobrown-10 mb-3">
                      Key Facts
                    </h3>
                    {serviceInfo.fact_1 && (
                      <p className="text-gray-600 leading-relaxed font-inter mb-3">
                        {serviceInfo.fact_1}
                      </p>
                    )}
                    {serviceInfo.fact_2 && (
                      <p className="text-gray-600 leading-relaxed font-inter">
                        {serviceInfo.fact_2}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
