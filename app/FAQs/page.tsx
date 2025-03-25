'use client'

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
      console.log(data)
      setFaqs(data)
    }

    fetchFAQs()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 pb-10 mt-10 pt-10 text-center">
        Frequently Asked Questions
      </h1>

      {faqs.map((faq, index) => (
        <div key={faq.id} className="mt-4 w-full max-w-md">
          <h2
            className="flex justify-between items-center font-bold text-xl cursor-pointer p-2 border-b"
            onClick={() => toggleAccordion(index)}
          >
            <span>{faq.title}</span>
            <span
              className={`transform transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </h2>
          {openIndex === index && (
            <p className="text-gray-700 p-2">{faq.content}</p>
          )}
        </div>
      ))}
    </div>
  )
}
