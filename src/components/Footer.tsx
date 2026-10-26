import { Mail, ArrowUp } from 'lucide-react'
import { LinkedinIcon } from '@/components/Icons'
import { personalInfo, navLinks } from '@/data/portfolio'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-block text-2xl font-bold"
              aria-label="Back to top"
            >
              <span className="gradient-text">DS.</span>
            </a>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {personalInfo.title}
            </p>
            <p className="mt-3 max-w-xs text-xs text-[var(--text-muted)]">
              Building scalable web applications and intelligent AI solutions.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-purple)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-purple)]"
              >
                <Mail className="h-4 w-4" />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-purple)]"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 md:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-all hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
