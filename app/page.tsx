'use client'

import Link from 'next/link'
import ImageCarousel from '@/components/ImageCarousel'
import { motion } from 'framer-motion'
import OutlineBtn from '@/components/OutlineBtn'
import ContactForm from '@/components/ContactForm'
import { useInView } from 'react-intersection-observer'

export default function Home() {
  const { ref: whoAreWeRef, inView: isWhoAreWeInView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Triggers when 20% of the section is in view
  })

  return (
    <section className="max-w-screen-xl mx-auto p-6 pt-5 mt-5">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center">
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
            reliable waste and carcass removal, our family-owned business offers
            a wide range of cleaning and maintenance services. With over 15
            years of experience, we pride ourselves on being your go-to team for
            both routine cleaning and specialized property care.
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
                  <label className="bold-16 whitespace-nowrap cursor-pointer">
                    What We Offer
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
      </div>

      {/* About Us Section - Appears on Scroll */}
      <div ref={whoAreWeRef} className="mt-16">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={isWhoAreWeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Who Are We - Left Side on Large Screens */}
          <div className="w-full lg:w-1/2 px-6">
            <motion.h1 className="font-bold text-logoblue-30 flexCenter mb-10 mt-10 text-5xl">
              Who Are We?
            </motion.h1>
            <motion.h2 className="font-ubuntu font-medium italic flexCenter pb-4 text-2xl">
              Built on Trust—Committed to Excellence
            </motion.h2>
            <div className="text-2xl">
              <motion.p className="mb-5 mt-3">
                Founded in 2009, our family business has been built on trust,
                quality, and dedication. My dad started this company with a
                commitment to providing top-tier cleaning services. When he
                faced medical complications in 2012, I stepped in to continue
                his legacy.
              </motion.p>
              <motion.p className="mb-5">
                With <strong>over 15 years</strong> in business, we take pride
                in delivering dependable, high-quality cleaning services.
                Whether it’s maintaining a commercial property, cleaning up
                after construction, or organizing a cluttered space, we approach
                every job with care and professionalism.
              </motion.p>
              <motion.p className="mb-5">
                When you work with us, you’re in trusted hands! Because for us,
                cleaning isn’t just a service, it’s a family tradition.
              </motion.p>
              <motion.p className="text-logobrown-10 flexCenter">
                <strong className="pr-2">Areas Serviced:</strong>
                <em>Brampton, Toronto & Surrounding Greater Toronto Areas</em>
              </motion.p>
            </div>
          </div>

          <motion.div className="w-full lg:w-1/2 flex flexCenter mt-10 lg:mt-0">
            <div className="w-full max-w-lg p-3 bg-site-bg opacity-90 flexCenter shadow-lg">
              <ContactForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
