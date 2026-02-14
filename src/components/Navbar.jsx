import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 200
      sections.forEach(section => {
        const top = section.offsetTop
        const height = section.offsetHeight
        const id = section.getAttribute('id')
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id)
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('home') }}>
          <span className="logo-name">Sami Ullah</span>
        </a>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ rotate: 30, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaMoon />
                </motion.span>
              ) : (
                <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaSun />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            className={`nav-hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
