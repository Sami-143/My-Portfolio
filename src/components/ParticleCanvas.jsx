import { useEffect, useRef } from 'react'

export default function ParticleCanvas({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let mouse = { x: undefined, y: undefined }
    let animationId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.5 + 0.1
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (mouse.x !== undefined) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const force = (150 - dist) / 150
            this.x -= (dx / dist) * force * 2
            this.y -= (dy / dist) * force * 2
          }
        }
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }
      draw() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        const alpha = isDark ? this.opacity : this.opacity * 0.4
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function initParticles() {
      particles = []
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * (isDark ? 0.15 : 0.08)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      connectParticles()
      animationId = requestAnimationFrame(animate)
    }

    const handleMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const handleLeave = () => { mouse.x = undefined; mouse.y = undefined }

    document.addEventListener('mousemove', handleMouse)
    document.addEventListener('mouseleave', handleLeave)

    initParticles()
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', handleMouse)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
