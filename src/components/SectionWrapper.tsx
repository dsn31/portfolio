import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView, useReducedMotion } from '@/hooks/useAnimations'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const [ref, inView] = useInView()
  const reduced = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section-padding ${className}`}
      initial={reduced ? {} : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : reduced ? {} : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </motion.section>
  )
}
