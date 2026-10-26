import { motion } from 'framer-motion'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

export default function Projects() {
  const reduced = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.15,
      },
    },
  }

  return (
    <SectionWrapper id="projects" className="relative">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--accent-purple)] opacity-10 blur-3xl" 
        aria-hidden="true" 
      />

      <SectionHeading
        title="Featured Projects"
        subtitle="Engineering practical solutions through full-stack development and AI."
      />

      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
