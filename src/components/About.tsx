import { motion, type Variants } from 'framer-motion'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { personalInfo, highlightCards } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

export default function About() {
  const reduced = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.12 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.5 },
    },
  }

  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl"
          >
            {personalInfo.aboutText}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-sm text-[var(--text-secondary)]">Open to opportunities</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-purple)]" />
              <span className="text-sm text-[var(--text-secondary)]">MCA Graduate</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Highlight Cards */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {highlightCards.map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className="glass-card p-5 text-center md:p-6"
            >
              <div className="mb-3 text-3xl" role="img" aria-hidden="true">
                {card.icon}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)] md:text-base">
                {card.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] md:text-sm">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
