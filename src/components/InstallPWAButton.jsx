import { useEffect, useState } from 'react'
import { trackEvent } from '../utils/analytics'

export default function InstallPWAButton({ className = '' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
      trackEvent('pwa_beforeinstallprompt')
    }
    const onAppInstalled = () => {
      setInstalled(true)
      setVisible(false)
      trackEvent('pwa_installed')
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onAppInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const handleClick = async () => {
    if (!deferredPrompt) return
    trackEvent('pwa_install_click')
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    trackEvent('pwa_install_choice', { outcome: choice.outcome })
    setDeferredPrompt(null)
    if (choice.outcome !== 'accepted') {
      // Re-exibir botão em tentativa futura? Depende da UX.
      setTimeout(()=>setVisible(true), 8000)
    }
  }

  if (installed || !visible) return null

  return (
    <button type="button" onClick={handleClick} className={`btn-outline text-xs px-3 py-1.5 ${className}`}>Instalar App</button>
  )
}
