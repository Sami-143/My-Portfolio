import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const directions = {
  up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
}

export default function AnimatedSection({ children, className = '', direction = 'up', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const variants = directions[direction] || directions.up

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
