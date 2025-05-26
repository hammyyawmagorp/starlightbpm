import React from 'react'

interface ServiceCardProps {
  title: string
  description: string
}

export const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <div className="h-96 w-72 rounded-xl bg-gradient-to-br from-logoblue-50 to-logoblue-30 p-4">
      <div className="h-full rounded-xl bg-gradient-to-b from-[rgb(242,237,221)] to-[rgba(230,244,241,1)] shadow-lg p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-inter font-bold text-center mb-4">
          {title}
        </h3>
        <p className="text-center text-gray-600">{description}</p>
      </div>
    </div>
  )
}
