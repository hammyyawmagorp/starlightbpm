import React from 'react'
import { MotionConfig, motion } from 'framer-motion'

const Hamburger = ({
  toggleMenu,
  isOpen,
}: {
  toggleMenu: () => void
  isOpen: boolean
}) => {
  return (
    <MotionConfig transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <motion.button
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        onClick={toggleMenu}
        className="relative h-12 w-12 rounded-full bg-transparent transition-colors hover:bg-logoblue-60"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-8 bg-black"
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-8 bg-black"
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-8 bg-black"
          style={{ x: '-50%', y: '50%', bottom: '35%', left: '50%' }}
        />
      </motion.button>
    </MotionConfig>
  )
}

const VARIANTS = {
  top: {
    open: { rotate: ['0deg', '0deg', '45deg'], top: ['35%', '50%', '50%'] },
    closed: { rotate: ['45deg', '0deg', '0deg'], top: ['50%', '50%', '35%'] },
  },
  middle: {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: '50%',
    },
  },
}

export default Hamburger
