import { useEffect, useRef } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Nav scroll
    const nav = document.querySelector('.site-nav') as HTMLElement
    const navLinks = document.querySelectorAll('.site-nav-links a')
    const allSections = ['hero','about','projects','capabilities','contact'].map(id => document.getElementById(id))

    function updateNav() {
      const scrollY = window.scrollY
      if (nav) nav.classList.toggle('scrolled', scrollY > 80)
      let current = 0
      allSections.forEach((sec, i) => {
        if (sec) {
          const top = sec.offsetTop - 120
          const bottom = top + sec.offsetHeight
          if (scrollY >= top && scrollY < bottom) current = i
        }
      })
      navLinks.forEach((link, i) => link.classList.toggle('active', i === current))
    }
    window.addEventListener('scroll', updateNav, { passive: true })
    window.addEventListener('resize', updateNav)
    updateNav()

    // Motion Observer
    const motionSections = document.querySelectorAll('.motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('motion-ready')
          entry.target.classList.add('motion-animate')
        }
      })
    }, { threshold: 0.12 })
    motionSections.forEach(section => observer.observe(section))
    setTimeout(() => {
      document.querySelectorAll('.motion-ready').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.remove('motion-ready')
          el.classList.add('motion-animate')
        }
      })
    }, 100)

    // Skills ↔ Projects linkage
    document.querySelectorAll('.skill-card').forEach(skill => {
      skill.addEventListener('mouseenter', function() {
        const relates = (this as HTMLElement).dataset.relate ? (this as HTMLElement).dataset.relate!.split(',') : []
        document.querySelectorAll('.project-card-inner').forEach(proj => {
          const tags = (proj as HTMLElement).dataset.tags ? (proj as HTMLElement).dataset.tags!.split(',') : []
          const match = relates.some(r => tags.includes(r))
          ;(proj as HTMLElement).style.transition = 'opacity 0.3s, transform 0.3s'
          ;(proj as HTMLElement).style.opacity = match ? '1' : '0.25'
          ;(proj as HTMLElement).style.transform = match ? 'scale(1)' : 'scale(0.97)'
        })
      })
      skill.addEventListener('mouseleave', function() {
        document.querySelectorAll('.project-card-inner').forEach(proj => {
          ;(proj as HTMLElement).style.opacity = '1'
          ;(proj as HTMLElement).style.transform = ''
        })
      })
    })

    return () => {
      window.removeEventListener('scroll', updateNav)
      window.removeEventListener('resize', updateNav)
      observer.disconnect()
    }
  }, [])

  return (
    <div>
      <svg className="hidden-svg" aria-hidden="true">
        <defs>
          <clipPath id="about-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.02,0.08 C0.02,0.04 0.06,0.01 0.12,0.01 C0.20,0.01 0.26,0.02 0.34,0.01 C0.42,0.00 0.50,0.01 0.58,0.02 C0.66,0.03 0.72,0.02 0.80,0.04 C0.88,0.06 0.95,0.06 0.98,0.12 C1.01,0.18 0.99,0.24 0.98,0.30 C0.97,0.36 0.98,0.42 0.96,0.48 C0.94,0.54 0.92,0.60 0.88,0.66 C0.84,0.72 0.76,0.78 0.68,0.84 C0.60,0.90 0.52,0.96 0.44,0.98 C0.36,1.00 0.28,0.98 0.20,0.96 C0.12,0.94 0.06,0.92 0.02,0.84 C-0.02,0.76 0.00,0.68 0.00,0.60 C0.00,0.52 0.00,0.44 0.01,0.36 C0.02,0.28 0.02,0.20 0.02,0.08 Z"/>
          </clipPath>
        </defs>
      </svg>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
