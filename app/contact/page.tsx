import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Contact Window Cleaning Experts | Starlight BPM Brampton & GTA',
  description:
    'Contact Starlight Building Maintenance for professional window cleaning services in Brampton and GTA. Also offering gutter cleaning, waste removal, and property maintenance. Family-owned business with 15+ years experience.',
  keywords:
    'window cleaning contact Brampton, GTA window cleaning company, professional window cleaners contact, Starlight BPM window cleaning, Brampton window washing contact, gutter cleaning contact, property maintenance contact GTA',
  openGraph: {
    title: 'Contact Window Cleaning Experts | Starlight BPM Brampton & GTA',
    description:
      'Contact us for professional window cleaning services in Brampton and GTA. Also offering gutter cleaning, waste removal, and property maintenance.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <motion.div
      className="flex flexCenter mt-10 lg:mt-0 p-5 m-5"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="p-3 bg-site-bg opacity-90 flex-col shadow-lg">
        <div className="mt-2 pt-2 mb-5 pb-5">
          <Suspense fallback={<div>Loading...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </motion.div>
  )
}
