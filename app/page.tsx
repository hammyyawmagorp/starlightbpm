'use client'

import Link from 'next/link'
import ImageCarousel from '@/components/ImageCarousel'
import { motion } from 'framer-motion'
import OutlineBtn from '@/components/OutlineBtn'

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center max-w-screen-xl mx-auto p-6 pt-5 mt-5">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full md:w-1/2 p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl font-bebas pb-3"
        >
          Starlight Building Maintenance
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="text-2xl font-bold font-inter pb-3 text-gray-50 italic"
        >
          From windows to waste removal, we’ve got you covered
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          className="text-lg mt-4"
        >
          Whether you need spotless windows, thorough office cleaning, or
          reliable waste and carcass removal, our family-owned business offers a
          wide range of cleaning and maintenance services. With over 15 years of
          experience, we pride ourselves on being your go-to team for both
          routine cleaning and specialized property care. No job is too big or
          small—we approach every task with the same dedication and attention to
          detail that has earned us the trust of our clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
          className="flexCenter gap-4 pt-4"
        >
          <Link href="/estimator">
            <OutlineBtn>
              <div className="flexCenter gap-2 border btn_blue hover:underline">
                {' '}
                <label className="bold-16 whitespace-nowrap cursor-pointer">
                  What We Offer
                </label>
              </div>
            </OutlineBtn>
          </Link>
          <Link href="/about-us">
            <OutlineBtn>
              <div className="flexCenter gap-2 border btn_blue hover:underline">
                <label className="bold-16 whitespace-nowrap cursor-pointer">
                  Why Trust Us
                </label>
              </div>
            </OutlineBtn>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
        className="w-full md:w-1/2 p-6 rounded-lg"
      >
        <ImageCarousel />
      </motion.div>
    </section>
  )
}
