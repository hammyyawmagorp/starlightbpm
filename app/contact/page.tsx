'use client'
import ContactForm from '@/components/ContactForm'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <motion.div
      className="flex flexCenter mt-10 lg:mt-0 p-5 m-5"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="p-3 bg-site-bg opacity-90 flex-col shadow-lg">
        <div className="mt-10 pt-10 mb-5 pb-5">
          <ContactForm />
        </div>
      </div>
    </motion.div>
  )
}
