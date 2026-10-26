import { motion } from 'framer-motion'
import { BookOpen, Calendar, MapPin } from 'lucide-react'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { publication } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

export default function Research() {
  const reduced = useReducedMotion()

  return (
    <SectionWrapper id="research">
      <SectionHeading title="Research & Publications" />

      <motion.div
        className="mx-auto max-w-3xl"
        initial={reduced ? {} : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <article className="glass-card overflow-hidden">
          {/* Accent top border */}
          <div className="h-1 w-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)]" />

          <div className="p-6 md:p-8">
            {/* Icon and label */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-purple-dim)]">
                <BookOpen className="h-6 w-6 text-[var(--accent-purple)]" />
              </div>
              <span className="rounded-full border border-[var(--accent-purple)] bg-[var(--accent-purple-dim)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent-purple)]">
                Conference Paper
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-4 text-xl font-bold leading-snug text-[var(--text-primary)] md:text-2xl">
              {publication.title}
            </h3>

            {/* Meta info */}
            <div className="mb-6 flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--accent-blue)]" />
                <span>{publication.date}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
                <span>{publication.conference}</span>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
                <span>{publication.institution}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                {publication.summary}
              </p>
            </div>
          </div>
        </article>
      </motion.div>
    </SectionWrapper>
  )
}
