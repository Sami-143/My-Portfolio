import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaPaperPlane, FaGithub, FaLinkedinIn, FaEnvelope, FaCode } from 'react-icons/fa'

const words = [
  'scalable web apps.',
  'MERN stack solutions.',
  'beautiful interfaces.',
  'REST APIs.',
  'cloud architecture.',
  'real-time features.'
]

function useTypingEffect(words) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.substring(0, text.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentWord.substring(0, text.length - 1)), 40)
      } else {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words])

  return text
}

function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        function update(now) {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(update)
          else setCount(target)
        }
        requestAnimationFrame(update)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref} className="stat-number">{count}</span>
}

function ThunderAnimation({ onComplete }) {
  const [bolts, setBolts] = useState([])
  const [flash, setFlash] = useState(false)

  const generateBoltPath = useCallback(() => {
    const points = []
    const startX = 120 + Math.random() * 160
    let x = startX
    let y = 0
    points.push({ x, y })
    const segments = 8 + Math.floor(Math.random() * 6)
    for (let i = 0; i < segments; i++) {
      x += (Math.random() - 0.5) * 60
      y += (400 / segments) + Math.random() * 20
      points.push({ x, y })
    }
    return points
  }, [])

  const pointsToPath = (points) => {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  }

  useEffect(() => {
    // First bolt
    const t1 = setTimeout(() => {
      setBolts([generateBoltPath()])
      setFlash(true)
      setTimeout(() => setFlash(false), 100)
    }, 300)

    // Second bolt
    const t2 = setTimeout(() => {
      setBolts(prev => [...prev, generateBoltPath()])
      setFlash(true)
      setTimeout(() => setFlash(false), 80)
    }, 700)

    // Third bolt (strongest)
    const t3 = setTimeout(() => {
      setBolts(prev => [...prev, generateBoltPath()])
      setFlash(true)
      setTimeout(() => setFlash(false), 150)
    }, 1000)

    // Fade out and complete
    const t4 = setTimeout(() => {
      onComplete()
    }, 1800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [generateBoltPath, onComplete])

  return (
    <motion.div
      className="thunder-overlay"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`thunder-flash ${flash ? 'active' : ''}`} />
      <svg className="thunder-svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        {bolts.map((bolt, i) => (
          <g key={i}>
            <path
              d={pointsToPath(bolt)}
              className="thunder-bolt-glow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <path
              d={pointsToPath(bolt)}
              className="thunder-bolt"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </g>
        ))}
      </svg>
      {/* Spark particles */}
      {flash && (
        <div className="thunder-sparks">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = ((i * 30) + Math.random() * 15) * (Math.PI / 180)
            const distance = 40 + Math.random() * 60
            return (
              <div
                key={i}
                className="spark"
                style={{
                  '--tx': `${Math.cos(angle) * distance}px`,
                  '--ty': `${Math.sin(angle) * distance}px`,
                  '--delay': `${Math.random() * 0.1}s`,
                  left: '50%',
                  top: '50%',
                }}
              />
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

export default function Hero() {
  const typedText = useTypingEffect(words)
  const [thunderDone, setThunderDone] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleThunderComplete = useCallback(() => {
    setThunderDone(true)
    setTimeout(() => setShowContent(true), 100)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
  }

  return (
    <section className="hero" id="home">
      <div className="hero-bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
        <div className="shape shape-5" />
      </div>

      <AnimatePresence>
        {!thunderDone && <ThunderAnimation onComplete={handleThunderComplete} />}
      </AnimatePresence>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? 'visible' : 'hidden'}
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-dot" />
            Available for opportunities
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="hero-greeting">Hello, I'm</span>
            <span className="hero-name glitch" data-text="Sami Ullah">Sami Ullah</span>
            <span className="hero-role">
              <span className="role-prefix">I build</span>
              <span className="typed-wrapper">
                <span>{typedText}</span>
                <span className="typed-cursor">|</span>
              </span>
            </span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            Software Engineer specializing in MERN Stack, crafting scalable web applications
            with clean code and exceptional user experiences.
          </motion.p>

          <motion.div className="hero-cta" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
              <FaArrowRight />
            </motion.button>
            <motion.button
              className="btn btn-outline"
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Hire Me</span>
              <FaPaperPlane />
            </motion.button>
          </motion.div>

          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat-item">
              <Counter target={7} /><span className="stat-plus">+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <Counter target={85} /><span className="stat-plus">+</span>
              <span className="stat-label">LeetCode Problems</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <Counter target={6} /><span className="stat-plus">+</span>
              <span className="stat-label">Certifications</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-socials">
        {[
          { href: 'https://github.com/Sami-143', icon: <FaGithub />, label: 'GitHub' },
          { href: 'https://www.linkedin.com/in/sami-ullah-950a0b2b6/', icon: <FaLinkedinIn />, label: 'LinkedIn' },
          { href: 'https://leetcode.com/u/samimalik_302/', icon: <FaCode />, label: 'LeetCode' },
          { href: 'mailto:samiullahglotar420@gmail.com', icon: <FaEnvelope />, label: 'Email' },
        ].map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="social-link"
            aria-label={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            whileHover={{ y: -4, color: '#6366f1' }}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

      <motion.a
        href="#about"
        className="scroll-indicator"
        onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="mouse"><div className="mouse-wheel" /></div>
        <span>Scroll Down</span>
      </motion.a>
    </section>
  )
}
