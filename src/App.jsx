import { useEffect, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PlansSection from './components/PlansSection'
import ReferralSection from './components/ReferralSection'
import MinhaNet7Section from './components/MinhaNet7Section'
import AdvantagesSection from './components/AdvantagesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FAQModal from './components/FAQModal'
import ScrollEffects from './components/ScrollEffects'
import CookieConsentBanner from './components/CookieConsentBanner'

export default function App() {
  const [faqOpen, setFaqOpen] = useState(false)
  const openFaq = useCallback(() => setFaqOpen(true), [])
  const closeFaq = useCallback(() => setFaqOpen(false), [])
  // Garante que ao abrir a aplicação sem interação o scroll começa no topo.
  useEffect(() => {
    // Se houver hash residual (#indique) remove e força topo.
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
      // pequeno delay para garantir que o layout montou antes do scroll
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      // (Opcional) se quiser manter comportamento de voltar: history.pushState(null,'',original)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <>
      <Navbar onOpenFAQ={openFaq} />
      <main>
        <Hero />
        <PlansSection />
        <ReferralSection />
  <MinhaNet7Section />
        <AdvantagesSection />
        <ContactSection />
      </main>
    <Footer onOpenFAQ={openFaq} />
    <ScrollEffects />
      <FAQModal open={faqOpen} onClose={closeFaq} />
      <CookieConsentBanner />
    </>
  )
}
