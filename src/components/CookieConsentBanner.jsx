import { useEffect, useState } from 'react'
import { trackEvent } from '../utils/analytics'

// Keys: essential (always true), performance, functional
const LS_KEY = 'net7_cookie_consent_v1'

export default function CookieConsentBanner() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState({ performance: true, functional: true })
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || 'null')
      if (!saved) {
        setOpen(true)
      } else {
        setPrefs(saved.prefs)
      }
    } catch {
      setOpen(true)
    }
  }, [])

  const persist = (acceptedAll = false) => {
    const data = {
      version: 1,
      timestamp: Date.now(),
      acceptedAll,
      prefs: { performance: prefs.performance, functional: prefs.functional, essential: true }
    }
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch { /* ignore quota */ }
    trackEvent('cookies_consent_saved', data)
  }

  const acceptAll = () => {
    setPrefs({ performance: true, functional: true })
    persist(true)
    setOpen(false)
  }

  const saveSelected = () => {
    persist(false)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed left-0 right-0 bottom-0 z-[90] px-4 pb-4 pointer-events-none">
      <div className="max-w-3xl mx-auto glass border border-black/10 dark:border-white/10 rounded-xl p-4 md:p-5 shadow-lg backdrop-blur-md relative pointer-events-auto animate-modal-in">
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-3">
            <p className="text-sm text-neutral-700 dark:text-brand-light/80 leading-relaxed">Usamos cookies essenciais para funcionamento e opcionais para melhorar experiência. Você pode ajustar preferências.</p>
            <button onClick={()=>setExpanded(e=>!e)} className="text-[11px] underline decoration-dotted link-hover">
              {expanded ? 'Ocultar detalhes' : 'Ver detalhes'}
            </button>
            {expanded && (
              <div className="grid gap-4 md:grid-cols-3 pt-2">
                <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-white/70 dark:bg-white/[0.04]">
                  <h3 className="text-xs font-semibold mb-1 text-neutral-700 dark:text-brand-light/70 uppercase tracking-wide">Essenciais</h3>
                  <p className="text-[11px] text-neutral-600 dark:text-brand-light/60 leading-relaxed">Necessários para segurança, estabilidade e recursos básicos.</p>
                </div>
                <label className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-white/70 dark:bg-white/[0.04] cursor-pointer flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-700 dark:text-brand-light/70 uppercase tracking-wide">Desempenho</span>
                    <input type="checkbox" checked={prefs.performance} onChange={e=>setPrefs(p=>({...p, performance: e.target.checked}))} className="accent-brand-blue dark:accent-brand-lime" />
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-brand-light/60 leading-relaxed">Métricas agregadas anônimas para otimização.</p>
                </label>
                <label className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-white/70 dark:bg-white/[0.04] cursor-pointer flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-700 dark:text-brand-light/70 uppercase tracking-wide">Funcionais</span>
                    <input type="checkbox" checked={prefs.functional} onChange={e=>setPrefs(p=>({...p, functional: e.target.checked}))} className="accent-brand-blue dark:accent-brand-lime" />
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-brand-light/60 leading-relaxed">Lembram preferências como tema.</p>
                </label>
              </div>
            )}
          </div>
          <button onClick={()=>setOpen(false)} className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-brand-light/80" aria-label="Fechar aviso" title="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button onClick={acceptAll} className="btn-primary justify-center flex-1">Aceitar Todos</button>
          <button onClick={saveSelected} className="btn-outline justify-center flex-1">Salvar Seleção</button>
        </div>
        <p className="text-[10px] text-neutral-500 dark:text-brand-light/40 mt-3">Você pode revisar opções a qualquer momento abrindo a seção Cookies no rodapé.</p>
      </div>
    </div>
  )
}
