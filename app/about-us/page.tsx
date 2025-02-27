'use client'

import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import ContactImages from '@/components/ContactImages'

export default function AboutUs() {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-col">
      <div className="flex flex-wrap items-center justify-between w-full">
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
            className="font-bold text-logoblue-10 flexCenter mb-10 mt-10 text-5xl"
          >
            Who Are We?
          </motion.h1>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="font-ubuntu font-medium italic flexCenter pb-4 text-2xl"
          >
            Built on Trust—Committed to Excellence
          </motion.h2>
          <div className="text-2xl">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
              className="mb-5 mt-3"
            >
              Founded in 2009, our family business has been built on trust,
              quality, and dedication. My dad started this company with a
              commitment to providing top-tier cleaning services, and as a
              family, we all played a role in securing contracts with businesses
              and the City of Brampton. When he faced medical complications in
              2012, I stepped in to continue his legacy—honoring existing client
              relationships while building new ones along the way.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
              className="mb-5"
            >
              With <strong> over 15 years</strong> in business, we take pride in
              delivering dependable, high-quality cleaning services that our
              clients can count on. Whether it’s maintaining a commercial
              property, cleaning up after construction, or organizing a
              cluttered space, we approach every job with care and
              professionalism.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
              className="mb-5"
            >
              When you work with us, you’re in trusted hands! Because for us,
              cleaning isn’t just a service, it’s a family tradition.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 1.5 }}
              className="text-logobrown-10 flexCenter"
            >
              <strong className="pr-2">Areas Serviced:</strong>
              <em> Brampton, Toronto & Surrounding Greater Toronto Areas</em>
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          className="w-full lg:w-1/2 flexCenter text-center"
        >
          <ContactForm />
        </motion.div>
      </div>
      <div className="flex justify-center">
        <ContactImages />
      </div>
    </section>
  )
}
