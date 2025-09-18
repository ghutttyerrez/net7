import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function ModalPortal({ children, id = 'modal-root' }) {
  const elRef = useRef(null)
  if (!elRef.current && typeof document !== 'undefined') {
    const div = document.createElement('div')
    div.setAttribute('data-portal-id', id)
    elRef.current = div
  }

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    document.body.appendChild(el)
    return () => { document.body.removeChild(el) }
  }, [])

  if (!elRef.current) return null
  return createPortal(children, elRef.current)
}
