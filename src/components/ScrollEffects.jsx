import { useEffect } from 'react'

export default function ScrollEffects() {
  useEffect(() => {
    // Reveal animations
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.18 })
    revealEls.forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [])
  return null
}
