'use client'

import { useState, useCallback, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { navLinks } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reducedMotion = useReducedMotion()

  /* ── Track scroll to intensify backdrop ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* ── Smooth-scroll handler ── */
  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false)
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
      }
    },
    [reducedMotion],
  )

  /* ── Close mobile menu on Escape key ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── Helpers ── */
  const isActive = (href: string) =>
    activeSection === href.replace('#', '')

  /* ── Framer Motion variants for mobile menu ── */
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.3,
        staggerChildren: reducedMotion ? 0 : 0.06,
      },
    },
    exit: {
      opacity: 0,
      y: reducedMotion ? 0 : -20,
      transition: { duration: reducedMotion ? 0 : 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -16 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-lg shadow-purple-900/10'
          : ''
      }`}
      style={{
        backgroundColor: scrolled
          ? 'var(--glass-bg, rgba(10, 10, 20, 0.82))'
          : 'var(--bg-primary, rgba(10, 10, 20, 0.6))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--glass-border, rgba(139, 92, 246, 0.15))',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
            className="relative z-10 text-2xl font-bold tracking-tight select-none"
            aria-label="Dhinesh Swaminathan — Home"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--accent-purple, #a855f7), var(--accent-blue, #3b82f6))',
              }}
            >
              DS.
            </span>
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? ''
                      : 'hover:text-white'
                  }`}
                  style={{
                    color: active
                      ? 'var(--accent-purple, #a855f7)'
                      : 'var(--text-secondary, #94a3b8)',
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, var(--accent-purple, #a855f7), var(--accent-blue, #3b82f6))',
                      }}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 350, damping: 30 }
                      }
                    />
                  )}
                </a>
              )
            })}

            {/* ── Download Resume button ── */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-100"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--accent-purple, #a855f7), var(--accent-blue, #3b82f6))',
              }}
              aria-label="Download resume PDF"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          {/* ── Mobile hamburger button ── */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-10 inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-white/10 md:hidden"
            style={{ color: 'var(--text-primary, #f1f5f9)' }}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={reducedMotion ? {} : { rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={reducedMotion ? {} : { rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={reducedMotion ? {} : { rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={reducedMotion ? {} : { rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile menu panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 top-16 border-b md:hidden"
            style={{
              backgroundColor: 'var(--glass-bg, rgba(10, 10, 20, 0.95))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: 'var(--glass-border, rgba(139, 92, 246, 0.15))',
            }}
            role="menu"
          >
            <div className="space-y-1 px-4 pb-6 pt-4">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={itemVariants}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${
                      active ? '' : 'hover:bg-white/5'
                    }`}
                    style={{
                      color: active
                        ? 'var(--accent-purple, #a855f7)'
                        : 'var(--text-secondary, #94a3b8)',
                      backgroundColor: active
                        ? 'rgba(139, 92, 246, 0.1)'
                        : undefined,
                      borderLeft: active
                        ? '3px solid var(--accent-purple, #a855f7)'
                        : '3px solid transparent',
                    }}
                    role="menuitem"
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </motion.a>
                )
              })}

              {/* ── Mobile download resume ── */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--accent-purple, #a855f7), var(--accent-blue, #3b82f6))',
                }}
                role="menuitem"
                aria-label="Download resume PDF"
              >
                <Download className="h-5 w-5" />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
