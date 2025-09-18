import { useState, useEffect } from 'react'
import { useLocale } from '../context/LocaleContext'
import InstallPWAButton from './InstallPWAButton'

const navLinks = [
  { href: '#hero', label: 'Início' },
  { href: '#planos', label: 'Planos' },
  { href: '#indique', label: 'Indique e Ganhe' },
  { href: '#vantagens', label: 'Vantagens' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar({ onOpenFAQ }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const { locale, setLocale } = useLocale()

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const lockScroll = (lock) => {
      if (lock) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = ''
    }
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const headerCls = theme === 'dark'
    ? 'backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-white/10'
    : 'backdrop-blur bg-white/90 border-black/10'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b ${headerCls}`}>
      <nav className="container-section flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <span className="inline-block w-2 h-6 bg-gradient-to-b from-brand-lime to-brand-blue rounded-sm" />
          <span className={theme==='dark' ? 'text-brand-lime' : 'text-brand-blue'}>Net7</span>
        </a>
  <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={
                theme === 'dark'
                  ? 'text-sm font-medium text-brand-light/80 link-hover'
                  : 'text-sm font-medium text-neutral-800 link-hover'
              }
            >
              {l.label}
            </a>
          ))}
          <select aria-label="Idioma" value={locale} onChange={e=>setLocale(e.target.value)} className={theme==='dark' ? 'text-xs bg-black/40 border border-white/10 rounded px-2 py-1 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-lime' : 'text-xs bg-white/60 border border-black/10 rounded px-2 py-1 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-blue'}>
            <option value="pt-BR">PT-BR</option>
            <option value="en-US">EN-US</option>
          </select>
          <InstallPWAButton />
          <button
            type="button"
            onClick={onOpenFAQ}
            className={theme==='dark' ? 'text-sm font-medium text-brand-light/80 link-hover' : 'text-sm font-medium text-neutral-800 link-hover'}
          >FAQ</button>
          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/net7tecnologia/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 inline-flex items-center justify-center rounded-md border transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              theme === 'dark'
                ? 'border-white/10 text-brand-light/70 hover:text-brand-lime hover:border-brand-lime focus-visible:ring-brand-lime focus-visible:ring-offset-black'
                : 'border-black/10 text-neutral-700 hover:text-brand-blue hover:border-brand-blue focus-visible:ring-brand-blue focus-visible:ring-offset-white'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className={`p-2 rounded-md border transition-colors ${
              theme === 'dark'
                ? 'border-white/10 hover:border-brand-lime text-brand-light/80 hover:text-brand-lime'
                : 'border-black/10 hover:border-brand-blue text-brand-blue hover:text-brand-blue/80'
            }`}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Alternar tema" className={`p-2 rounded-md border transition-colors ${theme==='dark' ? 'border-white/10 hover:border-brand-lime text-brand-light/80 hover:text-brand-lime' : 'border-black/10 hover:border-brand-blue text-brand-blue hover:text-brand-blue/80'}`}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(o=>!o)} className={`p-2 rounded-md border transition-colors ${theme==='dark' ? 'border-white/10 text-brand-light/80 hover:text-brand-lime hover:border-brand-lime' : 'border-black/10 text-neutral-600 hover:text-brand-blue hover:border-brand-blue'}` }>
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </nav>
      {open && (
        <div className={`md:hidden backdrop-blur border-t ${theme==='dark' ? 'bg-black/90 border-white/10' : 'bg-white/95 border-black/10'}`}>
          <div className="container-section flex flex-col py-4 gap-4">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className={theme==='dark' ? 'text-base font-medium text-brand-light/90 link-hover' : 'text-base font-medium text-neutral-800 link-hover'}>
                {l.label}
              </a>
            ))}
            <select aria-label="Idioma" value={locale} onChange={e=>setLocale(e.target.value)} className={theme==='dark' ? 'text-sm bg-black/40 border border-white/10 rounded px-2 py-1 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-lime' : 'text-sm bg-white/60 border border-black/10 rounded px-2 py-1 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-blue'}>
              <option value="pt-BR">PT-BR</option>
              <option value="en-US">EN-US</option>
            </select>
            <InstallPWAButton className="self-start" />
            <button onClick={()=>{ setOpen(false); onOpenFAQ?.() }} className={theme==='dark' ? 'text-base font-medium text-brand-light/90 link-hover text-left' : 'text-base font-medium text-neutral-800 link-hover text-left'}>
              FAQ
            </button>
            <div className={`pt-3 mt-2 border-t flex items-center gap-4 ${theme==='dark' ? 'border-white/10' : 'border-black/10'}`}>
              <a
                href="https://www.instagram.com/net7tecnologia/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 inline-flex items-center justify-center rounded-md border transition-colors ${
                  theme === 'dark'
                    ? 'border-white/10 text-brand-light/70 hover:text-brand-lime hover:border-brand-lime'
                    : 'border-black/10 text-neutral-700 hover:text-brand-blue hover:border-brand-blue'
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
