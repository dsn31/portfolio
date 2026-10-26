import { motion, type Variants } from 'framer-motion'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { skillCategories } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

export default function Skills() {
  const reduced = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.08 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.4 },
    },
  }

  return (
    <SectionWrapper id="skills" className="bg-[var(--bg-secondary)]">
      <SectionHeading title="Technologies I Work With" />

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skillCategories.map((category) => {
          const Icon = category.icon
          return (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="glass-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-purple-dim)]">
                  <Icon className="h-5 w-5 text-[var(--accent-purple)]" />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-purple)] hover:text-[var(--text-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
