import { motion, type Variants } from 'framer-motion'
import { GraduationCap, BookOpen } from 'lucide-react'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { educationList } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

export default function Education() {
  const reduced = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: reduced ? 1 : 0, x: reduced ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduced ? 0 : 0.5 },
    },
  }

  return (
    <SectionWrapper id="education" className="bg-[var(--bg-secondary)]">
      <SectionHeading title="Education" />

      <motion.div
        className="mx-auto max-w-3xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {educationList.map((edu, index) => (
          <motion.div key={edu.degree} variants={itemVariants} className="relative">
            {/* Timeline connector */}
            {index < educationList.length - 1 && (
              <div className="absolute left-6 top-[4.5rem] hidden h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-[var(--accent-purple)] to-transparent md:block" />
            )}

            <article className="glass-card flex gap-5 p-6 md:p-8">
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-purple-dim)]">
                {edu.icon === 'master' ? (
                  <GraduationCap className="h-6 w-6 text-[var(--accent-purple)]" />
                ) : (
                  <BookOpen className="h-6 w-6 text-[var(--accent-blue)]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)] md:text-xl">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)] md:text-base">
                  {edu.institution}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--accent-purple-dim)] px-3 py-1 text-xs font-semibold text-[var(--accent-purple)]">
                    CGPA: {edu.cgpa}
                  </span>
                  {edu.period && (
                    <span className="text-xs text-[var(--text-muted)]">{edu.period}</span>
                  )}
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
