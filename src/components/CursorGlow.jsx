import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    let glowX = 0, glowY = 0, currentX = 0, currentY = 0
    let rafId

    const handleMove = (e) => { glowX = e.clientX; glowY = e.clientY }

    function update() {
      currentX += (glowX - currentX) * 0.08
      currentY += (glowY - currentY) * 0.08
      if (glowRef.current) {
        glowRef.current.style.left = currentX + 'px'
        glowRef.current.style.top = currentY + 'px'
      }
      rafId = requestAnimationFrame(update)
    }

    document.addEventListener('mousemove', handleMove)
    update()

    return () => {
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" />
}
