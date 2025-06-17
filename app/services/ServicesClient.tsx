'use client'

import { useEffect, useState } from 'react'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { motion } from 'framer-motion'

interface Service {
  id: number
  title: string
  description: string
}

export default function ServicesClient() {
  const [services, setServices] = useState<Service[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/getCardInfo')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()

        if (result.error) {
          throw new Error(result.error)
        }

        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('Invalid response format')
        }

        setServices(result.data)
      } catch (err) {
        console.error('Error fetching services:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to fetch services'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading services...
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="max-container padding-container py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-logoblue-30 text-center mb-8"
      >
        Our Services
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl text-gray-50 text-center mb-12 max-w-2xl mx-auto"
      >
        From windows to waste removal, we&apos;ve got you covered with our
        comprehensive range of services
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ServiceCard
              title={service.title}
              description={service.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
