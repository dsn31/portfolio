import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { useScrollSpy } from '@/hooks/useAnimations'

const sectionIds = ['home', 'about', 'skills', 'projects', 'research', 'education', 'contact']

export default function App() {
  const activeSection = useScrollSpy(sectionIds)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
