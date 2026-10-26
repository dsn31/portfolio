import { motion, type Variants } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { certifications } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

export default function Certifications() {
  const reduced = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.15 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.4 },
    },
  }

  return (
    <SectionWrapper id="certifications">
      <SectionHeading title="Certifications & Learning" />

      <motion.div
        className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {certifications.map((cert) => (
          <motion.div key={cert.title} variants={itemVariants}>
            <article className="glass-card flex items-start gap-4 p-5 md:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-blue-dim)]">
                <Award className="h-5 w-5 text-[var(--accent-blue)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] md:text-base">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {cert.issuer}
                </p>
                {cert.score && (
                  <span className="mt-2 inline-block rounded-full bg-[var(--accent-purple-dim)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-purple)]">
                    Score: {cert.score}
                  </span>
                )}
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
