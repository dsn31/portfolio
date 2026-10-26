'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/Icons'
import { useReducedMotion } from '@/hooks/useAnimations'
import type { Project } from '@/data/portfolio'

/* ===== Visual Illustrations ===== */

function CvPlatformVisual() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#060A12]">
      {/* Grid background */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cv-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cv-grid)" />
      </svg>

      {/* Main detection viewport */}
      <svg className="relative z-10" width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Camera feed mockup */}
        <rect x="10" y="10" width="180" height="120" rx="4" fill="rgba(13,18,32,0.8)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />

        {/* Detection bounding box 1 — person */}
        <rect x="30" y="30" width="36" height="60" rx="2" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 2" />
        <rect x="30" y="24" width="40" height="10" rx="2" fill="rgba(139,92,246,0.25)" />
        <text x="34" y="31" fill="#8B5CF6" fontSize="6" fontFamily="monospace">PERSON</text>

        {/* Detection bounding box 2 — object */}
        <rect x="100" y="50" width="30" height="28" rx="2" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 2" />
        <rect x="100" y="44" width="32" height="10" rx="2" fill="rgba(56,189,248,0.2)" />
        <text x="103" y="51" fill="#38BDF8" fontSize="6" fontFamily="monospace">BAG</text>

        {/* Detection bounding box 3 */}
        <rect x="140" y="35" width="32" height="55" rx="2" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 2" />
        <rect x="140" y="29" width="40" height="10" rx="2" fill="rgba(139,92,246,0.25)" />
        <text x="143" y="36" fill="#8B5CF6" fontSize="6" fontFamily="monospace">PERSON</text>

        {/* Pose skeleton lines */}
        <line x1="48" y1="40" x2="48" y2="55" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
        <line x1="40" y1="48" x2="56" y2="48" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
        <line x1="44" y1="55" x2="40" y2="72" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
        <line x1="52" y1="55" x2="56" y2="72" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
        <circle cx="48" cy="38" r="3" fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />

        {/* Scan line */}
        <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />

        {/* Side panel — stats */}
        <rect x="200" y="10" width="70" height="120" rx="4" fill="rgba(13,18,32,0.9)" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />

        {/* Status indicators */}
        <circle cx="212" cy="24" r="3" fill="#22C55E" />
        <rect x="220" y="21" width="36" height="6" rx="2" fill="rgba(139,92,246,0.15)" />
        <circle cx="212" cy="38" r="3" fill="#8B5CF6" />
        <rect x="220" y="35" width="28" height="6" rx="2" fill="rgba(139,92,246,0.15)" />
        <circle cx="212" cy="52" r="3" fill="#38BDF8" />
        <rect x="220" y="49" width="32" height="6" rx="2" fill="rgba(56,189,248,0.1)" />

        {/* Mini chart */}
        <polyline points="208,90 218,82 228,86 238,74 248,78 258,70" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
        <rect x="208" y="100" width="54" height="4" rx="1" fill="rgba(139,92,246,0.2)" />
        <rect x="208" y="108" width="40" height="4" rx="1" fill="rgba(56,189,248,0.15)" />
        <rect x="208" y="116" width="48" height="4" rx="1" fill="rgba(139,92,246,0.12)" />

        {/* "LIVE" badge */}
        <rect x="16" y="16" width="28" height="12" rx="3" fill="rgba(239,68,68,0.2)" />
        <circle cx="24" cy="22" r="2.5" fill="#EF4444" />
        <text x="29" y="25" fill="#EF4444" fontSize="6" fontFamily="monospace">REC</text>

        {/* Timestamp */}
        <text x="16" y="125" fill="rgba(139,92,246,0.4)" fontSize="5" fontFamily="monospace">CAM-01 | 00:12:34</text>
      </svg>

      {/* Corner accents */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[var(--accent-purple)] opacity-30" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[var(--accent-purple)] opacity-30" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[var(--accent-blue)] opacity-30" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[var(--accent-blue)] opacity-30" />
    </div>
  )
}

function GroceryStoreVisual() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#060A12]">
      {/* Subtle dot pattern */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grocery-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="rgba(139,92,246,0.12)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grocery-dots)" />
      </svg>

      <svg className="relative z-10" width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top nav bar */}
        <rect x="10" y="8" width="260" height="18" rx="4" fill="rgba(13,18,32,0.9)" stroke="rgba(139,92,246,0.12)" strokeWidth="0.5" />
        <circle cx="22" cy="17" r="4" fill="rgba(139,92,246,0.3)" />
        <rect x="32" y="14" width="60" height="6" rx="2" fill="rgba(139,92,246,0.15)" />

        {/* Category pills */}
        <rect x="110" y="12" width="30" height="10" rx="5" fill="rgba(139,92,246,0.25)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
        <rect x="144" y="12" width="26" height="10" rx="5" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" />
        <rect x="174" y="12" width="32" height="10" rx="5" fill="rgba(139,92,246,0.1)" />

        {/* Cart icon */}
        <rect x="240" y="11" width="22" height="12" rx="3" fill="rgba(139,92,246,0.2)" />
        <path d="M246 14 L248 14 L250 21 L258 21 L259 16 L251 16" stroke="#8B5CF6" strokeWidth="1" fill="none" />
        <circle cx="252" cy="23" r="1" fill="#8B5CF6" />
        <circle cx="257" cy="23" r="1" fill="#8B5CF6" />

        {/* Product card 1 */}
        <rect x="14" y="34" width="78" height="108" rx="6" fill="rgba(13,18,32,0.8)" stroke="rgba(139,92,246,0.12)" strokeWidth="0.5" />
        <rect x="20" y="40" width="66" height="44" rx="4" fill="rgba(139,92,246,0.06)" />
        {/* Product image placeholder — fruit */}
        <circle cx="53" cy="58" r="12" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
        <circle cx="53" cy="58" r="6" fill="rgba(139,92,246,0.25)" />
        <rect x="20" y="90" width="50" height="5" rx="1.5" fill="rgba(255,255,255,0.15)" />
        <rect x="20" y="100" width="30" height="5" rx="1.5" fill="rgba(139,92,246,0.3)" />
        <rect x="20" y="110" width="66" height="10" rx="3" fill="rgba(139,92,246,0.2)" />
        <rect x="58" y="100" width="28" height="8" rx="4" fill="rgba(56,189,248,0.2)" />
        <text x="62" y="106" fill="#38BDF8" fontSize="5" fontFamily="monospace">ADD</text>

        {/* Product card 2 */}
        <rect x="100" y="34" width="78" height="108" rx="6" fill="rgba(13,18,32,0.8)" stroke="rgba(56,189,248,0.12)" strokeWidth="0.5" />
        <rect x="106" y="40" width="66" height="44" rx="4" fill="rgba(56,189,248,0.06)" />
        {/* Product image placeholder — box */}
        <rect x="127" y="48" width="24" height="20" rx="3" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
        <line x1="127" y1="54" x2="151" y2="54" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" />
        <rect x="106" y="90" width="46" height="5" rx="1.5" fill="rgba(255,255,255,0.15)" />
        <rect x="106" y="100" width="34" height="5" rx="1.5" fill="rgba(56,189,248,0.3)" />
        <rect x="106" y="110" width="66" height="10" rx="3" fill="rgba(56,189,248,0.15)" />
        <rect x="144" y="100" width="28" height="8" rx="4" fill="rgba(139,92,246,0.2)" />
        <text x="148" y="106" fill="#8B5CF6" fontSize="5" fontFamily="monospace">ADD</text>

        {/* Product card 3 */}
        <rect x="186" y="34" width="78" height="108" rx="6" fill="rgba(13,18,32,0.8)" stroke="rgba(139,92,246,0.12)" strokeWidth="0.5" />
        <rect x="192" y="40" width="66" height="44" rx="4" fill="rgba(139,92,246,0.06)" />
        {/* Product image placeholder — bottle */}
        <rect x="216" y="46" width="12" height="24" rx="3" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
        <rect x="219" y="42" width="6" height="6" rx="2" fill="rgba(139,92,246,0.2)" />
        <rect x="192" y="90" width="54" height="5" rx="1.5" fill="rgba(255,255,255,0.15)" />
        <rect x="192" y="100" width="26" height="5" rx="1.5" fill="rgba(139,92,246,0.3)" />
        <rect x="192" y="110" width="66" height="10" rx="3" fill="rgba(139,92,246,0.2)" />
        <rect x="230" y="100" width="28" height="8" rx="4" fill="rgba(56,189,248,0.2)" />
        <text x="234" y="106" fill="#38BDF8" fontSize="5" fontFamily="monospace">ADD</text>

        {/* Promo badge */}
        <rect x="14" y="34" width="24" height="12" rx="3" fill="rgba(139,92,246,0.4)" />
        <text x="18" y="42" fill="#F8FAFC" fontSize="5" fontFamily="monospace">NEW</text>
      </svg>

      {/* Corner accents */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[var(--accent-purple)] opacity-30" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[var(--accent-purple)] opacity-30" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[var(--accent-blue)] opacity-30" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[var(--accent-blue)] opacity-30" />
    </div>
  )
}

function FileSharingVisual() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#060A12]">
      {/* Hex grid pattern */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="file-hex" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 15 0 L 30 8 L 30 22 L 15 30 L 0 22 L 0 8 Z" fill="none" stroke="rgba(56,189,248,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#file-hex)" />
      </svg>

      <svg className="relative z-10" width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sidebar */}
        <rect x="10" y="10" width="60" height="140" rx="6" fill="rgba(13,18,32,0.9)" stroke="rgba(56,189,248,0.12)" strokeWidth="0.5" />
        <rect x="18" y="20" width="44" height="8" rx="2" fill="rgba(56,189,248,0.15)" />
        <rect x="18" y="36" width="36" height="6" rx="2" fill="rgba(139,92,246,0.2)" />
        <rect x="18" y="48" width="40" height="6" rx="2" fill="rgba(139,92,246,0.1)" />
        <rect x="18" y="60" width="32" height="6" rx="2" fill="rgba(139,92,246,0.1)" />
        <rect x="18" y="72" width="38" height="6" rx="2" fill="rgba(139,92,246,0.1)" />

        {/* Storage indicator */}
        <rect x="18" y="118" width="44" height="6" rx="3" fill="rgba(13,18,32,0.8)" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" />
        <rect x="18" y="118" width="28" height="6" rx="3" fill="rgba(56,189,248,0.3)" />
        <text x="18" y="136" fill="rgba(56,189,248,0.4)" fontSize="5" fontFamily="monospace">64% used</text>

        {/* Main content area */}
        <rect x="78" y="10" width="192" height="140" rx="6" fill="rgba(13,18,32,0.5)" stroke="rgba(139,92,246,0.08)" strokeWidth="0.5" />

        {/* Upload zone */}
        <rect x="86" y="18" width="100" height="40" rx="6" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        <path d="M132 30 L132 42 M126 36 L132 30 L138 36" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="115" y="52" fill="rgba(139,92,246,0.35)" fontSize="5" fontFamily="monospace">Drop files here</text>

        {/* Upload progress bar */}
        <rect x="196" y="22" width="66" height="8" rx="2" fill="rgba(13,18,32,0.8)" />
        <rect x="196" y="22" width="44" height="8" rx="2" fill="rgba(139,92,246,0.3)" />
        <text x="196" y="40" fill="rgba(139,92,246,0.4)" fontSize="5" fontFamily="monospace">report.pdf — 67%</text>

        {/* File row 1 */}
        <rect x="86" y="66" width="176" height="22" rx="4" fill="rgba(13,18,32,0.7)" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
        {/* File icon */}
        <rect x="92" y="70" width="12" height="14" rx="2" fill="rgba(139,92,246,0.2)" />
        <path d="M100 70 L104 74" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
        <rect x="108" y="72" width="60" height="5" rx="1" fill="rgba(255,255,255,0.12)" />
        <rect x="108" y="79" width="36" height="4" rx="1" fill="rgba(139,92,246,0.1)" />
        {/* Sharing badge */}
        <rect x="220" y="71" width="34" height="12" rx="6" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.25)" strokeWidth="0.5" />
        <text x="226" y="79" fill="#38BDF8" fontSize="5" fontFamily="monospace">Shared</text>

        {/* File row 2 */}
        <rect x="86" y="94" width="176" height="22" rx="4" fill="rgba(13,18,32,0.7)" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
        <rect x="92" y="98" width="12" height="14" rx="2" fill="rgba(56,189,248,0.2)" />
        <rect x="108" y="100" width="50" height="5" rx="1" fill="rgba(255,255,255,0.12)" />
        <rect x="108" y="107" width="42" height="4" rx="1" fill="rgba(56,189,248,0.1)" />
        {/* Lock badge */}
        <rect x="220" y="99" width="34" height="12" rx="6" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.25)" strokeWidth="0.5" />
        <text x="224" y="107" fill="#8B5CF6" fontSize="5" fontFamily="monospace">Private</text>

        {/* File row 3 */}
        <rect x="86" y="122" width="176" height="22" rx="4" fill="rgba(13,18,32,0.7)" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
        <rect x="92" y="126" width="12" height="14" rx="2" fill="rgba(139,92,246,0.15)" />
        <rect x="108" y="128" width="54" height="5" rx="1" fill="rgba(255,255,255,0.12)" />
        <rect x="108" y="135" width="30" height="4" rx="1" fill="rgba(139,92,246,0.1)" />
        <rect x="220" y="127" width="34" height="12" rx="6" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.25)" strokeWidth="0.5" />
        <text x="226" y="135" fill="#38BDF8" fontSize="5" fontFamily="monospace">Shared</text>
      </svg>

      {/* Corner accents */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[var(--accent-blue)] opacity-30" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[var(--accent-blue)] opacity-30" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[var(--accent-purple)] opacity-30" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[var(--accent-purple)] opacity-30" />
    </div>
  )
}

const visualComponents: Record<Project['visual'], React.FC> = {
  'cv-platform': CvPlatformVisual,
  'grocery-store': GroceryStoreVisual,
  'file-sharing': FileSharingVisual,
}

/* ===== ProjectCard Component ===== */

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const reduced = useReducedMotion()

  const VisualComponent = visualComponents[project.visual]

  return (
    <motion.article
      className="glass-card flex flex-col overflow-hidden"
      initial={reduced ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.5, delay: index * 0.1, ease: 'easeOut' }
      }
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* Visual illustration */}
      <VisualComponent />

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category */}
        <span
          className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-purple)]"
          aria-label={`Category: ${project.category}`}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold leading-tight text-[var(--text-primary)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>

        {/* View Details toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group mb-4 flex items-center gap-1.5 self-start rounded-md px-0 py-1 text-sm font-medium text-[var(--accent-purple)] transition-colors hover:text-[var(--accent-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)]"
          aria-expanded={isExpanded}
          aria-controls={`contributions-${project.id}`}
        >
          View Details
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>

        {/* Expandable contributions */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={`contributions-${project.id}`}
              role="region"
              aria-label={`Key contributions for ${project.title}`}
              initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="mb-4 space-y-2 pl-1">
                {project.contributions.map((contribution, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-purple)]"
                      aria-hidden="true"
                    />
                    {contribution.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer to push tags & links to bottom */}
        <div className="mt-auto" />

        {/* Tech tags */}
        <div className="mb-4 flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--accent-purple-dim)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent-purple)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links — coming soon */}
        <div className="flex items-center gap-4 border-t border-[var(--border-subtle)] pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Demo coming soon
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Source code coming soon
          </span>
        </div>
      </div>
    </motion.article>
  )
}
