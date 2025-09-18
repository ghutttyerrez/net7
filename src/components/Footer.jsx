import { useState, useEffect, useRef } from 'react'
import { trackEvent } from '../utils/analytics'
import SupportHoursModal from './SupportHoursModal'
import PrivacyModal from './PrivacyModal'
import TermsModal from './TermsModal'
import CookiesModal from './CookiesModal'

export default function Footer({ onOpenFAQ }) {
  const year = new Date().getFullYear()
  const [hoursOpen, setHoursOpen] = useState(false)
  const [status, setStatus] = useState({ state: 'operational', updated: Date.now() })
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [cookiesOpen, setCookiesOpen] = useState(false)
  const [history, setHistory] = useState([{ state: 'operational', updated: Date.now() }]) // newest first, max 3
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const historyBtnRef = useRef(null)
  const historyPanelRef = useRef(null)

  // Simulated periodic silent refresh every 60s
  useEffect(() => {
    const id = setInterval(() => {
      setStatus(s => ({ ...s, updated: Date.now() }))
    }, 60000)
    return () => clearInterval(id)
  }, [])

  const manualRefresh = () => {
    if (loadingStatus) return
    trackEvent('footer_status_refresh')
    setLoadingStatus(true)
    setTimeout(() => {
      // Randomly simulate a minor degradation 1 in 12 refreshes
      const degraded = Math.random() < (1/12)
      const next = { state: degraded ? 'degraded' : 'operational', updated: Date.now() }
      setStatus(next)
      setHistory(h => {
        // Only push if state actually changed compared to last entry
        if (h[0]?.state === next.state) {
          // update timestamp of latest state
            return [{ ...next }, ...h.slice(1)]
        }
        const arr = [{ ...next }, ...h]
        return arr.slice(0,3)
      })
      trackEvent('footer_status_result', { state: next.state })
      setLoadingStatus(false)
    }, 900)
  }

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  // Close history on outside click or ESC
  useEffect(() => {
    if (!showHistory) return
    const onDown = (e) => {
      if (e.key === 'Escape') {
        setShowHistory(false)
        trackEvent('footer_status_history_close', { reason: 'esc' })
        historyBtnRef.current?.focus()
      }
    }
    const onClick = (e) => {
      if (!historyPanelRef.current) return
      if (historyPanelRef.current.contains(e.target) || historyBtnRef.current?.contains(e.target)) return
      setShowHistory(false)
      trackEvent('footer_status_history_close', { reason: 'outside' })
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('mousedown', onClick)
    }
  }, [showHistory])

  // Focus panel when opened
  useEffect(() => {
    if (showHistory) {
      setTimeout(() => historyPanelRef.current?.focus(), 10)
    }
  }, [showHistory])
  return (
    <footer data-reveal data-reveal-delay="100" className="mt-28 relative text-sm border-t border-transparent dark:border-white/10 bg-gradient-to-b from-white via-white to-neutral-50 dark:from-[#0b1118] dark:via-[#0b1118] dark:to-[#0b1118]">
      {/* Fade superior para transição suave entre seções */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-white/0 via-white/60 to-white dark:from-[#0b1118]/0 dark:via-[#0b1118]/70 dark:to-[#0b1118]" />
      {/* CTA superior */}
      <div className="container-section -translate-y-1/2">
        <div className="group relative rounded-2xl glass px-6 py-8 md:px-10 md:py-10 overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-brand-lime/10 to-brand-blue/10 transition-opacity" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-brand-light">Pronto para turbinar sua conexão?</h3>
              <p className="mt-3 text-neutral-600 dark:text-brand-light/70 leading-relaxed">Planos de alta performance, suporte humano e programa de indicação que recompensa você. Comece agora em poucos cliques.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="#contato" onClick={()=>trackEvent('footer_cta_fale_conosco')} className="btn-primary justify-center">Fale Conosco</a>
              <a href="#indique" onClick={()=>trackEvent('footer_cta_indique')} className="btn-outline justify-center">Indique e Ganhe</a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid principal */}
      <div className="container-section pt-32 pb-14">
        <div className="grid gap-10 md:gap-12 md:grid-cols-5">
          {/* Coluna Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-brand-blue dark:text-brand-lime text-lg">
              <span className="inline-block w-2 h-6 bg-gradient-to-b from-brand-blue to-brand-lime dark:from-brand-lime dark:to-brand-blue rounded-sm" /> Net7
            </div>
            <p className="text-neutral-600 dark:text-brand-light/60 leading-relaxed text-sm">Conectando pessoas e negócios com fibra de alta performance, baixíssima latência e suporte que resolve.</p>
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/net7tecnologia/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" onClick={()=>trackEvent('footer_social_instagram')} className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 text-neutral-600 dark:text-brand-light/70 hover:text-brand-blue hover:border-brand-blue dark:hover:text-brand-lime dark:hover:border-brand-lime transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
          {/* Coluna Navegação */}
          <div>
            <h4 className="font-semibold mb-3 text-neutral-800 dark:text-brand-light/80">Navegação</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-brand-light/65">
              <li><a href="#hero" className="link-hover" onClick={()=>trackEvent('footer_nav_inicio')}>Início</a></li>
              <li><a href="#planos" className="link-hover" onClick={()=>trackEvent('footer_nav_planos')}>Planos</a></li>
              <li><a href="#vantagens" className="link-hover" onClick={()=>trackEvent('footer_nav_vantagens')}>Vantagens</a></li>
              <li><a href="#indique" className="link-hover" onClick={()=>trackEvent('footer_nav_indique')}>Indique e Ganhe</a></li>
              <li><a href="#contato" className="link-hover" onClick={()=>trackEvent('footer_nav_contato')}>Contato</a></li>
              <li><button type="button" onClick={()=>{ trackEvent('footer_nav_faq'); onOpenFAQ?.() }} className="link-hover">FAQ</button></li>
            </ul>
          </div>
          {/* Coluna Suporte */}
          <div>
            <h4 className="font-semibold mb-3 text-neutral-800 dark:text-brand-light/80">Suporte</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-brand-light/65">
              <li><span className="text-neutral-500 dark:text-brand-light/40 text-xs uppercase tracking-wide">WhatsApp</span><br/>(67) 99325-9746</li>
              <li><span className="text-neutral-500 dark:text-brand-light/40 text-xs uppercase tracking-wide">E-mail</span><br/>contato@net7.com.br</li>
              <li><span className="text-neutral-500 dark:text-brand-light/40 text-xs uppercase tracking-wide">Suporte</span><br/>suporte@net7.com.br</li>
              <li><button onClick={()=>{ trackEvent('footer_support_horarios'); setHoursOpen(true) }} className="mt-1 text-xs underline decoration-dotted link-hover">Horários de atendimento</button></li>
            </ul>
          </div>
          {/* Coluna Indicação */}
          <div>
            <h4 className="font-semibold mb-3 text-neutral-800 dark:text-brand-light/80">Programa de Indicação</h4>
            <p className="text-neutral-600 dark:text-brand-light/65 text-sm leading-relaxed">Ganhe descontos e bônus de velocidade indicando amigos. Sem limite mensal de indicações válidas.</p>
            <div className="mt-4 flex flex-col gap-2">
              <a href="#indique" onClick={()=>trackEvent('footer_indicacao_cta')} className="btn-outline justify-center text-xs py-2">Indicar Agora</a>
              <button onClick={()=>{ trackEvent('footer_indicacao_regras'); onOpenFAQ?.() }} className="text-[11px] text-neutral-500 dark:text-brand-light/50 underline decoration-dotted self-start link-hover">Regras & Perguntas</button>
            </div>
          </div>
          {/* Coluna Status em Tempo Real */}
          <div>
            <h4 className="font-semibold mb-3 text-neutral-800 dark:text-brand-light/80">Status em Tempo Real</h4>
            <div className="flex items-center gap-2 mb-2" aria-live="polite">
              {status.state === 'operational' && (
                <>
                  <span className="relative inline-flex w-3 h-3" title="Operacional">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full w-3 h-3 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Operacional</span>
                </>
              )}
              {status.state === 'degraded' && (
                <>
                  <span className="relative inline-flex w-3 h-3" title="Degradação Parcial">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                    <span className="relative inline-flex rounded-full w-3 h-3 bg-amber-500" />
                  </span>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Degradação Parcial</span>
                </>
              )}
            </div>
            <p className="text-neutral-600 dark:text-brand-light/65 text-xs leading-relaxed min-h-[2.5rem]">
              {status.state === 'operational' && 'Rede funcionando normalmente. Sem incidentes significativos.'}
              {status.state === 'degraded' && 'Monitorando instabilidade leve em segmento específico. Equipe já atuando.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 items-center relative">
              <button onClick={manualRefresh} disabled={loadingStatus} className={`btn-outline text-[11px] py-2 px-3 ${loadingStatus ? 'opacity-70 cursor-wait' : ''}`}>{loadingStatus ? 'Atualizando...' : 'Atualizar'}</button>
              <div className="relative">
                <button
                  ref={historyBtnRef}
                  aria-haspopup="dialog"
                  aria-expanded={showHistory}
                  aria-controls="status-history-panel"
                  onClick={() => {
                    setShowHistory(v => {
                      const next = !v
                      trackEvent(next ? 'footer_status_history_open' : 'footer_status_history_close')
                      return next
                    })
                  }}
                  className="text-[11px] underline decoration-dotted text-neutral-500 dark:text-brand-light/50 link-hover"
                >Histórico</button>
                {showHistory && (
                  <div
                    ref={historyPanelRef}
                    id="status-history-panel"
                    role="dialog"
                    aria-label="Histórico de status"
                    tabIndex={-1}
                    className="absolute z-20 top-full left-0 mt-2 w-60 rounded-lg border border-black/10 dark:border-white/10 shadow-lg backdrop-blur-xl bg-white/90 dark:bg-[#0b1118]/90 p-3 animate-modal-in"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-neutral-700 dark:text-brand-light/70">Últimos estados</p>
                      <button
                        onClick={() => { setShowHistory(false); trackEvent('footer_status_history_close') }}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-brand-light/80 transition-colors"
                        aria-label="Fechar histórico"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {history.map((h,i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] text-neutral-600 dark:text-brand-light/60">
                          {h.state === 'operational' && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Operacional" />}
                          {h.state === 'degraded' && <span className="w-2.5 h-2.5 rounded-full bg-amber-500" title="Degradação" />}
                          <span className="capitalize">{h.state === 'operational' ? 'Operacional' : 'Degradação Parcial'}</span>
                          <span className="ml-auto tabular-nums text-[10px] text-neutral-400 dark:text-brand-light/40">{formatTime(h.updated)}</span>
                        </li>
                      ))}
                      {history.length === 0 && (
                        <li className="text-[11px] text-neutral-400">Sem histórico</li>
                      )}
                    </ul>
                    <p className="mt-2 text-[10px] text-neutral-400 dark:text-brand-light/40">Mantemos os últimos 3 eventos de alteração de estado.</p>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-3 text-[10px] text-neutral-500 dark:text-brand-light/40">Última atualização: {formatTime(status.updated)}</p>
          </div>
        </div>

        {/* Linha legal */}
        <div className="mt-14 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs text-neutral-500 dark:text-brand-light/50">
          <div className="flex items-center gap-2">
            <span>© {year} Net7</span>
            <span className="hidden md:inline-block">•</span>
            <span>Todos os direitos reservados.</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button onClick={()=>{ trackEvent('footer_link_privacidade'); setPrivacyOpen(true) }} className="link-hover">Privacidade</button>
            <button onClick={()=>{ trackEvent('footer_link_termos'); setTermsOpen(true) }} className="link-hover">Termos</button>
            <button onClick={()=>{ trackEvent('footer_link_cookies'); setCookiesOpen(true) }} className="link-hover">Cookies</button>
            <button onClick={()=>trackEvent('footer_link_status')} className="link-hover">Status da Rede</button>
          </div>
        </div>
      </div>
  {hoursOpen && <SupportHoursModal open={hoursOpen} onClose={()=>setHoursOpen(false)} />}
  {privacyOpen && <PrivacyModal open={privacyOpen} onClose={()=>setPrivacyOpen(false)} />}
  {termsOpen && <TermsModal open={termsOpen} onClose={()=>setTermsOpen(false)} />}
  {cookiesOpen && <CookiesModal open={cookiesOpen} onClose={()=>setCookiesOpen(false)} />}
    </footer>
  )
}

// Outside click & ESC handling for history popover
// (Placed after component to maintain original return clarity)

