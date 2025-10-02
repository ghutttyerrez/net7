import { useState, useEffect } from 'react'
import { WHATSAPP_BASE_URL } from '../config/whatsapp'

const navLinks = [
  { href: '#hero', label: 'Início' },
  { href: '#planos', label: 'Planos' },
  { href: '#indique', label: 'Indique e Ganhe' },
  { href: '#vantagens', label: 'Vantagens' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar({ onOpenFAQ }) {
  const [open, setOpen] = useState(false)

  // Força o tema escuro e ignora qualquer preferência anterior
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('dark')) root.classList.add('dark')
  try { localStorage.removeItem('theme') } catch { /* ignore errors clearing stored theme */ }
  }, [])

  useEffect(() => {
    const lockScroll = (lock) => {
      if (lock) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = ''
    }
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  // Classes CSS reutilizáveis (navbar segue padrão escuro da marca)
  const linkCls = "text-sm font-medium text-brand-light/90 hover:text-brand-lime transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md px-2 py-1"
  const mobileLinkCls = "text-base font-medium text-brand-light/90 hover:text-brand-lime transition-colors py-2 border-b border-transparent hover:border-brand-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md"
  // Removido botão de tema

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/95 text-brand-light border-b border-white/10 backdrop-blur-md`}>
  <div className="container-section flex items-center justify-between py-3.5 max-[600px]:py-3 min-[571px]:max-[799px]:py-3">
        {/* Logo */}
        <a href="#hero" aria-label="Net7" className="flex items-center gap-2 group text-brand-light/90 hover:text-brand-lime transition-colors">
          {/* Barra vertical com gradiente (vertical). Em hover, fica sólida em lime. */}
          <span className="inline-block w-2 h-6 rounded-sm bg-gradient-to-b from-brand-lime to-brand-blue group-hover:from-brand-lime group-hover:to-brand-lime transition-colors" />
          {/* Imagem SVG como logo */}
          <img
            src="/net7-logo.svg"
            alt="Net7"
            className="h-6 sm:h-7 w-auto select-none"
            draggable="false"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className={linkCls}>
              {link.label}
            </a>
          ))}
        </div>

  {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://sistema.net7.com.br/central-assinante/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            Área do Cliente
          </a>
          <button
            type="button"
            onClick={onOpenFAQ}
            className={linkCls}
          >FAQ</button>
          {/* Instagram Icon */}
          <a
            href="https://instagram.com/net7tecnologia"
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
            aria-label="Siga-nos no Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.017 0C8.396 0 7.896.011 6.589.058 2.579.227.213 2.588.058 6.590.01 7.896 0 8.396 0 12.017c0 3.622.01 4.122.058 5.427.155 4.002 2.516 6.363 6.518 6.518 1.294.048 1.794.058 5.415.058 3.622 0 4.122-.01 5.427-.058 4.002-.155 6.363-2.516 6.518-6.518.048-1.305.058-1.805.058-5.427 0-3.621-.01-4.121-.058-5.426C23.981 2.588 21.62.227 17.618.058 16.314.01 15.814 0 12.192 0h-.175zm-.105 5.854a6.162 6.162 0 110 12.324 6.162 6.162 0 010-12.324zm0 1.621a4.541 4.541 0 100 9.082 4.541 4.541 0 000-9.082zm7.846-3.405a1.441 1.441 0 11-2.883 0 1.441 1.441 0 012.883 0z" clipRule="evenodd" />
            </svg>
          </a>
          {/* WhatsApp Icon */}
          <a
            href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os planos de internet da Net7.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
            aria-label="Entre em contato via WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
            </svg>
          </a>
          {/** Botão de alternância de tema removido **/}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg"
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`md:hidden backdrop-blur border-t bg-black/92 border-white/10`}>
          <div className="container-section flex flex-col py-4 gap-4">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className={mobileLinkCls}>
                {l.label}
              </a>
            ))}
            <a
              href="https://sistema.net7.com.br/central-assinante/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={()=>setOpen(false)}
              className={mobileLinkCls}
            >
              Área do Cliente
            </a>
            <button onClick={()=>{ setOpen(false); onOpenFAQ?.() }} className={`${mobileLinkCls} text-left`}>
              FAQ
            </button>
            <div className={`pt-3 mt-2 border-t flex items-center gap-4 border-white/10`}>
              {/* Instagram Icon */}
              <a
                href="https://instagram.com/net7tecnologia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-brand-light/90 hover:text-brand-lime transition-colors"
                aria-label="Siga-nos no Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.896.011 6.589.058 2.579.227.213 2.588.058 6.590.01 7.896 0 8.396 0 12.017c0 3.622.01 4.122.058 5.427.155 4.002 2.516 6.363 6.518 6.518 1.294.048 1.794.058 5.415.058 3.622 0 4.122-.01 5.427-.058 4.002-.155 6.363-2.516 6.518-6.518.048-1.305.058-1.805.058-5.427 0-3.621-.01-4.121-.058-5.426C23.981 2.588 21.62.227 17.618.058 16.314.01 15.814 0 12.192 0h-.175zm-.105 5.854a6.162 6.162 0 110 12.324 6.162 6.162 0 010-12.324zm0 1.621a4.541 4.541 0 100 9.082 4.541 4.541 0 000-9.082zm7.846-3.405a1.441 1.441 0 11-2.883 0 1.441 1.441 0 012.883 0z" clipRule="evenodd" />
                </svg>
              </a>
              {/* WhatsApp Icon */}
              <a
                href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os planos de internet da Net7.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-brand-light/90 hover:text-brand-lime transition-colors"
                aria-label="Entre em contato via WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                </svg>
              </a>
              {/** Botão de alternância de tema removido **/}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}