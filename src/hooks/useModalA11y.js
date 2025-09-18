import { useEffect } from 'react'
import { trackEvent } from '../utils/analytics'

// Reutiliza lógica de: bloquear scroll, foco inicial, ESC, trap de Tab.
export function useModalA11y({ open, onClose, containerRef, firstFocusRef, escEventName }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(()=>firstFocusRef?.current?.focus())

    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (escEventName) trackEvent(escEventName)
        onClose?.()
      }
      if (e.key === 'Tab') {
        const root = containerRef?.current
        if (!root) return
        const focusable = root.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const list = Array.from(focusable).filter(el => !el.hasAttribute('disabled'))
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, containerRef, firstFocusRef, escEventName])
}
