import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '@/components/Icons'
import { personalInfo, roles, socialLinks } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

/* ===== Icon Map ===== */
const iconMap = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  mail: Mail,
} as const

/* ===== Typing / Role Cycling Hook ===== */
function useRoleCycler(items: string[], reduced: boolean) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')

  useEffect(() => {
    // If reduced motion, just cycle the full text instantly
    if (reduced) {
      setDisplayText(items[currentIndex])
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
      }, 3000)
      return () => clearInterval(interval)
    }

    const current = items[currentIndex]

    if (phase === 'typing') {
      if (displayText.length < current.length) {
        const timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1))
        }, 60)
        return () => clearTimeout(timeout)
      }
      // Done typing — pause
      const timeout = setTimeout(() => setPhase('pause'), 1800)
      return () => clearTimeout(timeout)
    }

    if (phase === 'pause') {
      const timeout = setTimeout(() => setPhase('deleting'), 100)
      return () => clearTimeout(timeout)
    }

    if (phase === 'deleting') {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 35)
        return () => clearTimeout(timeout)
      }
      // Done deleting — move to next
      setCurrentIndex((prev) => (prev + 1) % items.length)
      setPhase('typing')
    }
  }, [displayText, phase, currentIndex, items, reduced])

  // Sync displayText when index changes in reduced mode
  useEffect(() => {
    if (reduced) {
      setDisplayText(items[currentIndex])
    }
  }, [currentIndex, items, reduced])

  return displayText
}

/* ===== Neural Network Visualization ===== */
interface Node {
  cx: number
  cy: number
  r: number
  delay: number
  color: 'purple' | 'blue' | 'mixed'
}

interface Edge {
  x1: number
  y1: number
  x2: number
  y2: number
}

// 12 nodes positioned in a neural-network-like arrangement
const NODES: Node[] = [
  // Input layer (left)
  { cx: 60, cy: 80, r: 5, delay: 0, color: 'purple' },
  { cx: 55, cy: 180, r: 4, delay: 0.8, color: 'purple' },
  { cx: 65, cy: 280, r: 6, delay: 1.6, color: 'purple' },
  { cx: 50, cy: 370, r: 4.5, delay: 0.4, color: 'purple' },
  // Hidden layer 1
  { cx: 200, cy: 120, r: 6, delay: 1.2, color: 'mixed' },
  { cx: 190, cy: 240, r: 5, delay: 0.6, color: 'mixed' },
  { cx: 210, cy: 350, r: 5.5, delay: 1.8, color: 'mixed' },
  // Hidden layer 2
  { cx: 340, cy: 100, r: 5, delay: 1.4, color: 'blue' },
  { cx: 330, cy: 220, r: 7, delay: 0.2, color: 'blue' },
  { cx: 350, cy: 330, r: 4.5, delay: 1.0, color: 'blue' },
  // Output layer (right)
  { cx: 450, cy: 170, r: 5.5, delay: 0.3, color: 'blue' },
  { cx: 440, cy: 290, r: 5, delay: 1.5, color: 'blue' },
]

// Generate edges connecting layers
function generateEdges(nodes: Node[]): Edge[] {
  const inputLayer = nodes.slice(0, 4)
  const hidden1 = nodes.slice(4, 7)
  const hidden2 = nodes.slice(7, 10)
  const outputLayer = nodes.slice(10, 12)

  const edges: Edge[] = []

  // Input → Hidden1 (selective connections for aesthetics)
  const ih1Pairs = [
    [0, 0], [0, 1], [1, 0], [1, 1], [1, 2],
    [2, 1], [2, 2], [3, 1], [3, 2],
  ]
  ih1Pairs.forEach(([i, h]) => {
    edges.push({ x1: inputLayer[i].cx, y1: inputLayer[i].cy, x2: hidden1[h].cx, y2: hidden1[h].cy })
  })

  // Hidden1 → Hidden2
  const h1h2Pairs = [
    [0, 0], [0, 1], [1, 0], [1, 1], [1, 2],
    [2, 1], [2, 2],
  ]
  h1h2Pairs.forEach(([a, b]) => {
    edges.push({ x1: hidden1[a].cx, y1: hidden1[a].cy, x2: hidden2[b].cx, y2: hidden2[b].cy })
  })

  // Hidden2 → Output
  const h2oPairs = [
    [0, 0], [1, 0], [1, 1], [2, 1],
  ]
  h2oPairs.forEach(([h, o]) => {
    edges.push({ x1: hidden2[h].cx, y1: hidden2[h].cy, x2: outputLayer[o].cx, y2: outputLayer[o].cy })
  })

  return edges
}

const EDGES = generateEdges(NODES)

function NeuralNetworkVisual({ reduced }: { reduced: boolean }) {
  const nodeColor = (n: Node) => {
    if (n.color === 'purple') return 'var(--accent-purple)'
    if (n.color === 'blue') return 'var(--accent-blue)'
    return 'url(#node-gradient)'
  }

  const nodeGlow = (n: Node) => {
    if (n.color === 'purple') return 'rgba(139, 92, 246, 0.4)'
    if (n.color === 'blue') return 'rgba(56, 189, 248, 0.4)'
    return 'rgba(139, 92, 246, 0.3)'
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Ambient glow behind the network */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, rgba(56,189,248,0.05) 50%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 500 440"
        className="w-full max-w-[500px] h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-purple)" />
            <stop offset="100%" stopColor="var(--accent-blue)" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.2)" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {EDGES.map((edge, i) => (
          <line
            key={`edge-${i}`}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="url(#line-gradient)"
            strokeWidth="1"
            opacity="0.5"
          >
            {!reduced && (
              <animate
                attributeName="opacity"
                values="0.3;0.6;0.3"
                dur={`${3 + (i % 4)}s`}
                begin={`${(i * 0.3) % 3}s`}
                repeatCount="indefinite"
              />
            )}
          </line>
        ))}

        {/* Nodes with glow */}
        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Outer glow */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r * 3}
              fill={nodeGlow(node)}
              opacity="0.15"
            >
              {!reduced && (
                <animate
                  attributeName="opacity"
                  values="0.08;0.2;0.08"
                  dur={`${3.5 + node.delay}s`}
                  begin={`${node.delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>

            {/* Node body */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={nodeColor(node)}
              opacity="0.85"
            >
              {!reduced && (
                <>
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur={`${3 + node.delay}s`}
                    begin={`${node.delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${node.cy};${node.cy - 6};${node.cy}`}
                    dur={`${4 + node.delay * 0.5}s`}
                    begin={`${node.delay}s`}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </circle>
          </g>
        ))}

        {/* Decorative floating small particles */}
        {!reduced &&
          [
            { cx: 130, cy: 60, dur: 5 },
            { cx: 280, cy: 400, dur: 6 },
            { cx: 400, cy: 50, dur: 4.5 },
            { cx: 100, cy: 340, dur: 5.5 },
            { cx: 380, cy: 380, dur: 4 },
            { cx: 250, cy: 30, dur: 6.5 },
          ].map((p, i) => (
            <circle key={`particle-${i}`} cx={p.cx} cy={p.cy} r="2" fill="var(--accent-purple)" opacity="0.3">
              <animate
                attributeName="opacity"
                values="0.1;0.4;0.1"
                dur={`${p.dur}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${p.cy};${p.cy - 12};${p.cy}`}
                dur={`${p.dur}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
      </svg>
    </div>
  )
}

function HeroPortrait({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex items-center justify-center py-4">
      {/* Background Neural Network / Ambient Aura */}
      <div
        className="absolute inset-0 -m-8 sm:-m-16 flex items-center justify-center opacity-45 pointer-events-none scale-90 sm:scale-100"
        aria-hidden="true"
      >
        <NeuralNetworkVisual reduced={reduced} />
      </div>

      {/* Futuristic Portrait Card */}
      <div className="relative group z-10">
        {/* Animated Gradient Glow Aura behind photo */}
        <div
          className="absolute -inset-1.5 rounded-3xl opacity-75 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--accent-purple), #6366f1, var(--accent-blue))',
            animation: reduced ? 'none' : 'pulse-glow 4s ease-in-out infinite',
          }}
          aria-hidden="true"
        />

        {/* Outer gradient border */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[var(--accent-purple)] via-indigo-500/30 to-[var(--accent-blue)] shadow-2xl">
          {/* Inner image container */}
          <div className="relative overflow-hidden rounded-[22px] bg-[var(--bg-secondary)] w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-96">
            <img
              src={personalInfo.avatar}
              alt={`${personalInfo.name} - ${personalInfo.title}`}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />

            {/* Subtle tech gradient overlay at bottom for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B14]/80 via-transparent to-transparent pointer-events-none" />

            {/* Corner Tech Brackets (HUD cyber style) */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-blue)] pointer-events-none opacity-80" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-purple)] pointer-events-none opacity-80" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-purple)] pointer-events-none opacity-80" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-blue)] pointer-events-none opacity-80" />

            {/* Scanning line animation */}
            {!reduced && (
              <div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent opacity-60 pointer-events-none"
                style={{
                  animation: 'float 4s ease-in-out infinite',
                }}
              />
            )}
          </div>
        </div>

        {/* Floating Badge 1 - Status Indicator (Bottom-Left) */}
        <motion.div
          animate={reduced ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-6 glass px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-[var(--border-subtle)] shadow-xl flex items-center gap-2 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-[var(--text-primary)]">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Floating Badge 2 - Tech Specialty (Top-Right) */}
        {/* <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-6 glass px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[var(--border-subtle)] shadow-xl flex items-center gap-1.5 backdrop-blur-md"
        >
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--accent-blue)] font-semibold">
            ⚡ Full Stack + AI
          </span>
        </motion.div> */}
      </div>
    </div>
  )
}

/* ===== Framer Motion Variants ===== */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const fadeRightVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.4 },
  },
}

const reducedVariant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

/* ===== Hero Component ===== */
export default function Hero() {
  const reduced = useReducedMotion()
  const typedRole = useRoleCycler(roles, reduced)

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }, [reduced])

  const item = reduced ? reducedVariant : fadeUpVariant

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-grid-pattern overflow-hidden"
    >
      {/* Top radial gradient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.12) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left Column: Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Intro label */}
            <motion.p
              variants={item}
              className="text-sm tracking-[0.25em] uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-purple)',
              }}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {personalInfo.name}
            </motion.h1>

            {/* Professional title */}
            <motion.p
              variants={item}
              className="gradient-text text-xl font-semibold sm:text-2xl"
            >
              {personalInfo.title}
            </motion.p>

            {/* Typing role */}
            <motion.div
              variants={item}
              className="flex items-center gap-2 text-lg sm:text-xl"
              style={{ color: 'var(--text-secondary)' }}
              aria-live="polite"
              aria-label={`Current role: ${typedRole}`}
            >
              <span
                className="inline-block h-5 w-0.5 shrink-0"
                style={{ background: 'var(--accent-purple)' }}
                aria-hidden="true"
              />
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {typedRole}
                <span
                  className="ml-0.5 inline-block h-5 w-[2px] align-middle"
                  style={{
                    background: 'var(--accent-purple)',
                    animation: reduced ? 'none' : 'pulse-glow 1s step-end infinite',
                  }}
                  aria-hidden="true"
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={item}
              className="max-w-lg text-base leading-relaxed sm:text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              {personalInfo.heroDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, '#projects')}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)]"
                style={{
                  background: 'var(--gradient-purple-blue)',
                }}
              >
                Explore My Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)]"
                style={{
                  borderColor: 'var(--border-hover)',
                  color: 'var(--text-primary)',
                }}
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={item}
              className="flex items-center gap-5 pt-4"
            >
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon]
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== 'mail' ? '_blank' : undefined}
                    rel={link.icon !== 'mail' ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    className="group rounded-full p-2 transition-colors duration-300 hover:bg-white/5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Icon
                      size={20}
                      className="transition-colors duration-300 group-hover:text-[var(--accent-purple)]"
                    />
                  </a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* ── Right Column: Photo & Neural Network Visual ── */}
          <motion.div
            variants={reduced ? reducedVariant : fadeRightVariant}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center order-first lg:order-last"
          >
            <HeroPortrait reduced={reduced} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!reduced && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              Scroll
            </span>
            <div
              className="h-8 w-[1px]"
              style={{
                background: 'linear-gradient(to bottom, var(--accent-purple), transparent)',
              }}
            />
          </motion.div>
        </div>
      )}
    </section>
  )
}
