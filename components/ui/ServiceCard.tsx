import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  link?: string
  linkText?: string
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  link = '/estimator',
  linkText = 'Free Window Cleaning Estimate',
}) => {
  const isWindowCleaning = title.toLowerCase().includes('window')
  const isLitterRemoval = title.toLowerCase().includes('litter')

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
          <Link href={link}>
            <motion.button
              className="w-full px-6 py-2 bg-logoblue-50 text-logoblue-light transition-all shadow-lg hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-10 hover:text-black font-semibold uppercase"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {linkText}
            </motion.button>
          </Link>
        ) : isLitterRemoval ? (
          <Link href="/FAQs?service=litter">
            <motion.button
              className="w-full px-6 py-2 bg-logoblue-50 text-logoblue-light transition-all shadow-lg hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-10 hover:text-black font-semibold uppercase"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </Link>
        ) : (
          <motion.button
            className="w-full px-6 py-2 bg-logoblue-50 text-logoblue-light transition-all shadow-lg hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-10 hover:text-black font-semibold uppercase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
