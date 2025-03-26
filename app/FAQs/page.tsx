'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface faqs {
  id: number
  title: string
  content: string
}

export default function Blog() {
  const [faqs, setFaqs] = useState<faqs[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const fetchFAQs = async () => {
      const response = await fetch('/api/faqs')
      const data = await response.json()
      const sortedData = data.sort((a: faqs, b: faqs) => a.id - b.id)
      const isValidSequence = sortedData.every(
        (faq: faqs, index: number) => faq.id === index + 1
      )
      if (!isValidSequence) {
        console.warn('FAQ IDs are not sequential starting from 1')
      }
      setFaqs(sortedData)
    }
    fetchFAQs()
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-3xl font-bold mb-6 pb-10 mt-10 pt-10 text-center text-logoblue-30"
      >
        Frequently Asked Questions
      </motion.h1>
      <motion.div
        className="mt-4 w-full max-w-2xl p-3 bg-site-bg opacity-90 flex-col shadow-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="mb-6"
          >
            <h2
              className="flex justify-between items-center font-bold text-xl cursor-pointer p-2 border-b text-center font-inter text-logoblue-30"
              onClick={() => toggleAccordion(index)}
            >
              <span className="flex-1 text-center">{faq.title}</span>
              <span
                className={`transform transition-transform text-logobrown-10 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </h2>
            {openIndex === index && (
              <p className="p-2 mt-3 font-normal font-inter text-lg text-logobrown-10 leading-relaxed">
                {faq.content}
              </p>
            )}
          </motion.div>
        ))}{' '}
      </motion.div>
    </motion.div>
  )
}
