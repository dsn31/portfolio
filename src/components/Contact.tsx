import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { personalInfo } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useAnimations'
import { Mail, Send, MapPin, CheckCircle } from 'lucide-react'
import { LinkedinIcon } from '@/components/Icons'

/* ───── Types ───── */

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

/* ───── Helpers ───── */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.subject.trim()) {
    errors.subject = 'Subject is required.'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.'
  }

  return errors
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

/* ───── Contact Info Row ───── */

interface ContactInfoRowProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

function ContactInfoRow({ icon, label, value, href }: ContactInfoRowProps) {
  const content = (
    <div className="glass-card flex items-center gap-4 p-4 transition-colors duration-200 hover:border-[var(--border-hover)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-purple-dim)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)] md:text-base">
          {value}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)] rounded-xl"
        aria-label={`${label}: ${value}`}
      >
        {content}
      </a>
    )
  }

  return content
}

/* ───── Form Field ───── */

interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email'
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isTextarea?: boolean
  placeholder?: string
  required?: boolean
}

function FormField({
  id,
  label,
  type = 'text',
  value,
  error,
  onChange,
  isTextarea = false,
  placeholder,
  required = false,
}: FormFieldProps) {
  const sharedClasses = [
    'w-full rounded-lg border bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)]',
    'placeholder:text-[var(--text-muted)]',
    'transition-colors duration-200',
    'focus:border-[var(--accent-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/30',
    error
      ? 'border-red-500/60'
      : 'border-[var(--border-subtle)]',
  ].join(' ')

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
      >
        {label}
        {required && <span className="ml-0.5 text-red-400" aria-hidden="true">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${sharedClasses} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={sharedClasses}
        />
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}

/* ───── Main Component ───── */

export default function Contact() {
  const reduced = useReducedMotion()

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  /* ── animation variants ── */

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.5 } },
  }

  /* ── handlers ── */

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear the field error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Prevent duplicate submissions
    if (isSubmitting) return

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // Construct mailto link with form data
    const subject = encodeURIComponent(formData.subject.trim())
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`
    )
    const mailtoLink = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`

    // Open the mail client
    window.open(mailtoLink, '_self')

    // Show success state & clear form
    setTimeout(() => {
      setSubmitted(true)
      setFormData(initialFormData)
      setIsSubmitting(false)

      // Reset success message after a few seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 600)
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        title="Let's Build Something Great"
        subtitle={personalInfo.contactCta}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── LEFT: Contact Info ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          <motion.div variants={itemVariants}>
            <ContactInfoRow
              icon={<Mail className="h-5 w-5 text-[var(--accent-purple)]" />}
              label="Email"
              value={personalInfo.email}
              href={`mailto:${personalInfo.email}`}
            />
          </motion.div>

          {/* <motion.div variants={itemVariants}>
            <ContactInfoRow
              icon={<Phone className="h-5 w-5 text-[var(--accent-purple)]" />}
              label="Phone"
              value={personalInfo.phone}
            />
          </motion.div> */}

          <motion.div variants={itemVariants}>
            <ContactInfoRow
              icon={<LinkedinIcon className="h-5 w-5 text-[var(--accent-purple)]" />}
              label="LinkedIn"
              value="Dhinesh Swaminathan"
              href={personalInfo.linkedIn}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ContactInfoRow
              icon={<MapPin className="h-5 w-5 text-[var(--accent-purple)]" />}
              label="Location"
              value="India"
            />
          </motion.div>

          {/* Decorative gradient blob */}
          <motion.div
            variants={itemVariants}
            className="mt-4 hidden rounded-xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--accent-purple-dim)] to-[var(--accent-blue-dim)] p-6 lg:block"
          >
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Feel free to reach out — whether you have a project idea, a
              collaboration opportunity, or just want to connect. I'd love to
              hear from you.
            </p>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Contact Form ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? {} : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card flex flex-col items-center justify-center gap-4 p-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Message Prepared!
                </h3>
                <p className="max-w-sm text-sm text-[var(--text-secondary)]">
                  Your email client should have opened with the message details.
                  Thank you for reaching out — I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="glass-card space-y-5 p-6 md:p-8"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="name"
                    label="Name"
                    value={formData.name}
                    error={errors.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                  <FormField
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    error={errors.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <FormField
                  id="subject"
                  label="Subject"
                  value={formData.subject}
                  error={errors.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />

                <FormField
                  id="message"
                  label="Message"
                  value={formData.message}
                  error={errors.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea…"
                  isTextarea
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-purple)]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--accent-purple)]/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send message"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
