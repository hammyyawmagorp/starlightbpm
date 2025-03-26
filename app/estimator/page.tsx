'use client'
import { motion } from 'framer-motion'
import Estimator from '@/components/Estimator'

export default function EstimatorPage() {
  return (
    <div className="flex flex-col items-center pt-4 mt-4">
      <motion.div
        className="flex mt-4 w-full max-w-2xl p-3 bg-site-bg opacity-90 flex-col shadow-lg text-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <Estimator />
      </motion.div>
    </div>
  )
}
