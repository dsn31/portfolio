interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-secondary)] md:text-lg">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)]" />
    </div>
  )
}
