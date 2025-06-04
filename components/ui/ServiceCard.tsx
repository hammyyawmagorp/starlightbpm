import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  link?: string
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  link = '/estimator',
}) => {
  const isWindowCleaning = title.toLowerCase().includes('window')

  // Map service titles to their FAQ IDs
  const getServiceId = (title: string) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('window')) return 'windows'
    if (titleLower.includes('litter')) return 'litter'
    if (titleLower.includes('gutter')) return 'gutters'
    if (titleLower.includes('solar')) return 'solar'
    if (titleLower.includes('dead animal')) return 'dead-animal'
    if (titleLower.includes('decluttering')) return 'decluttering'
    if (titleLower.includes('estate')) return 'estate'
    if (titleLower.includes('office')) return 'office'
    return ''
  }

  const serviceId = getServiceId(title)

  return (
    <motion.div
      className="w-full max-w-xl h-service-card min-[service-card]:h-service-card-sm min-[service-card-sm]:h-service-card-md min-[service-card-md]:h-service-card-lg min-[service-card-lg]:h-service-card-xl min-[service-card-xl]:h-service-card-2xl bg-logoblue-light border border-logoblue-30 p-8 flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="mb-6">
          <p className="mb-1.5 text-sm font-light uppercase text-neutral-700">
            Service
          </p>
          <hr className="border-neutral-700" />
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-neutral-800 mb-4">{title}</h3>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </div>
      </div>
      <div>
        <hr className="border-neutral-300 mb-6" />
        {isWindowCleaning ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={link} className="flex-1">
              <motion.button
                className="w-full px-6 py-2 bg-logoblue-30 text-yellow-logo transition-all shadow-lg hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logobrown-10 hover:text-logoblue-light font-semibold uppercase group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>
                  Free
                  <br />
                  Estimate
                </span>
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-yellow-logo transition-all duration-100 group-hover:w-full" />
                <span className="absolute right-0 top-0 w-[2px] h-0 bg-yellow-logo transition-all delay-100 duration-100 group-hover:h-full" />
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-yellow-logo transition-all delay-200 duration-100 group-hover:w-full" />
                <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-yellow-logo transition-all delay-300 duration-100 group-hover:h-full" />
              </motion.button>
            </Link>
            <Link href="/FAQs?service=windows" className="flex-1">
              <motion.button
                className="w-full px-6 py-2 bg-logoblue-50 text-logoblue-light transition-all shadow-lg hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-10 hover:text-black font-semibold uppercase group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>
                  Learn
                  <br />
                  More
                </span>
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-black transition-all duration-100 group-hover:w-full" />
                <span className="absolute right-0 top-0 w-[2px] h-0 bg-black transition-all delay-100 duration-100 group-hover:h-full" />
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-black transition-all delay-200 duration-100 group-hover:w-full" />
                <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-black transition-all delay-300 duration-100 group-hover:h-full" />
              </motion.button>
            </Link>
          </div>
        ) : (
          <Link href={`/FAQs?service=${serviceId}`}>
            <motion.button
              className="w-full px-6 py-2 bg-logoblue-50 text-logoblue-light transition-all shadow-lg hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-10 hover:text-black font-semibold uppercase group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Learn More</span>
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-black transition-all duration-100 group-hover:w-full" />
              <span className="absolute right-0 top-0 w-[2px] h-0 bg-black transition-all delay-100 duration-100 group-hover:h-full" />
              <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-black transition-all delay-200 duration-100 group-hover:w-full" />
              <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-black transition-all delay-300 duration-100 group-hover:h-full" />
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  )
}
