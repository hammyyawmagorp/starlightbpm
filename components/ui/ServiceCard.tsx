import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
}

export const ServiceCard = ({ title, description }: ServiceCardProps) => {
  const isWindowCleaning = title.toLowerCase().includes('window')

  return (
    <motion.div
      className="w-full max-w-xl h-[340px] bg-logoblue-light border border-logoblue-30 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
      <hr className="border-neutral-300 mb-6" />
      <div>
        {isWindowCleaning ? (
          <Link href="/estimator">
            <motion.button
              className="w-full px-6 py-2 bg-logoblue-50 text-logoblue-light transition-all shadow-lg hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-10 hover:text-black font-semibold uppercase"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Free Window Cleaning Estimate
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
