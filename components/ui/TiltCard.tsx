import React, { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import Link from 'next/link'

const ROTATION_RANGE = 32.5
const HALF_ROTATION_RANGE = 32.5 / 2

interface TiltCardProps {
  title: string
  description: string
  btn: string
}

export const TiltCard = ({ title, description, btn }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x)
  const ySpring = useSpring(y)

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return [0, 0]

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1
    const rY = mouseX / width - HALF_ROTATION_RANGE

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const getButtonText = () => {
    return btn === 'estimator' ? 'Get Estimate' : 'Contact Us'
  }

  const getButtonLink = () => {
    return btn === 'estimator' ? '/estimator' : '/contact'
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-logoblue-50 to-logoblue-30"
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-gradient-to-b from-[rgb(242,237,221)] to-[rgba(230,244,241,1)] shadow-lg p-6"
      >
        <h3
          style={{
            transform: 'translateZ(75px)',
          }}
          className="text-2xl font-inter font-bold text-center mb-4"
        >
          {title}
        </h3>
        <p
          style={{
            transform: 'translateZ(25px)',
          }}
          className="text-center text-gray-600 mb-6"
        >
          {description}
        </p>
        <Link
          href={getButtonLink()}
          style={{
            transform: 'translateZ(50px)',
          }}
          className="inline-block px-6 py-2 bg-logoblue-30 text-white rounded-lg hover:bg-logoblue-50 transition-colors duration-200 text-center"
        >
          {getButtonText()}
        </Link>
      </div>
    </motion.div>
  )
}
