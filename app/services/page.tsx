'use client'

import { motion } from 'framer-motion'

export default function Services() {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-15 md:gap-28 lg:py-20 xl:flex-col">
      <div className="flex flex-col w-full flexCenter">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
          }}
          className="w-full lg:w-1/2"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-bold text-logoblue-30 flexCenter mb-10 mt-8 text-5xl"
          >
            Our Services
          </motion.h1>
        </motion.div>
      </div>
    </section>
  )
}
