'use client'

import { useEffect, useState } from 'react'
import { TiltCard } from '@/components/ui/TiltCard'

interface Service {
  id: number
  title: string
  description: string
  btn: string
}

export default function ServicesPage() {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 pb-10 mt-6 pt-6 text-center">
        Our Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {services.map((service) => (
          <TiltCard
            key={service.id}
            title={service.title}
            description={service.description}
            btn={service.btn}
          />
        ))}
      </div>
    </div>
  )
}
