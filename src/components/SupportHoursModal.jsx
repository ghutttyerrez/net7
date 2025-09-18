import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '../utils/analytics'
import { WHATSAPP_BASE_URL } from '../config/whatsapp'

const HOLIDAYS = [
  { date: '01/01', name: 'Confraternização Universal', note: 'Atendimento sob escala reduzida' },
  { date: '21/04', name: 'Tiradentes', note: 'Plantão prioritário' },
  { date: '01/05', name: 'Dia do Trabalho', note: 'Plantão técnico' },
  { date: '07/09', name: 'Independência do Brasil', note: 'Plantão técnico' },
  { date: '12/10', name: 'Nossa Senhora Aparecida', note: 'Plantão reduzido' },
  { date: '02/11', name: 'Finados', note: 'Plantão prioritário' },
  { date: '15/11', name: 'Proclamação da República', note: 'Plantão técnico' },
  { date: '25/12', name: 'Natal', note: 'Emergências críticas' },
]

export default function SupportHoursModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const firstRef = useRef(null)
  const [showHolidays, setShowHolidays] = useState(false)
  const [copied, setCopied] = useState(false)
  const liveRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => firstRef.current?.focus())
  const onKey = (e) => { if (e.key === 'Escape') { trackEvent('hours_close_esc'); onClose() } }
  document.addEventListener('keydown', onKey)
    // Focus trap
    const trap = (e) => {
      if (e.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])') || []
      if (!focusable.length) return
      const list = Array.from(focusable).filter(el => !el.hasAttribute('disabled'))
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', trap)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  const copyHours = async () => {
    const text = `Horários de Atendimento Net7\nSeg a Sex: 08:00 - 18:00\nSáb e Dom: 08:00 - 17:00 (Plantão)`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      liveRef.current && (liveRef.current.textContent = 'Horários copiados para a área de transferência.')
      trackEvent('hours_copy_success')
      setTimeout(()=>setCopied(false), 2500)
    } catch {
      liveRef.current && (liveRef.current.textContent = 'Falha ao copiar horários.')
      trackEvent('hours_copy_fail')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[75] flex items-start justify-center p-4 md:p-8 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-hours-title" aria-describedby="modal-hours-desc">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { trackEvent('hours_close_backdrop'); onClose() }} />
      <div ref={dialogRef} className="relative w-full max-w-md glass rounded-2xl p-6 md:p-8 border border-black/10 dark:border-white/10 shadow-xl space-y-5 animate-modal-in" tabIndex={-1}>
        <span ref={liveRef} className="sr-only" aria-live="polite" />
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-hours-title" className="text-lg font-semibold text-neutral-800 dark:text-brand-light" ref={firstRef}>Horários de Atendimento</h2>
          <button onClick={() => { trackEvent('hours_close_button'); onClose() }} className="btn-outline px-3 py-1.5 text-xs">Fechar</button>
        </div>
        <p id="modal-hours-desc" className="text-sm text-neutral-600 dark:text-brand-light/70 leading-relaxed">Confira abaixo nossos períodos de atendimento padrão e plantão de fim de semana.</p>
        <div className="space-y-6">
          <div className="rounded-lg border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue dark:text-brand-lime mb-1">Segunda a Sexta</h3>
            <p className="text-sm text-neutral-700 dark:text-brand-light/80">Horário comercial: <span className="font-medium">08:00 às 18:00</span></p>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue dark:text-brand-lime mb-1">Sábado e Domingo</h3>
            <p className="text-sm text-neutral-700 dark:text-brand-light/80">Plantão técnico: <span className="font-medium">08:00 às 17:00</span></p>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue dark:text-brand-lime">Feriados</h3>
              <button onClick={() => { setShowHolidays(s=>{ const n=!s; trackEvent(n?'hours_holidays_open':'hours_holidays_close'); return n }) }} className="text-[11px] underline decoration-dotted text-neutral-600 dark:text-brand-light/60 link-hover">{showHolidays ? 'Ocultar' : 'Ver Todos'}</button>
            </div>
            {showHolidays && (
              <ul className="mt-2 space-y-2 text-xs text-neutral-600 dark:text-brand-light/70 max-h-48 overflow-auto pr-1">
                {HOLIDAYS.map(h => (
                  <li key={h.date} className="flex flex-col rounded border border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/[0.02] px-3 py-2">
                    <span className="font-medium text-neutral-800 dark:text-brand-light">{h.date} • {h.name}</span>
                    <span className="text-[11px] text-neutral-500 dark:text-brand-light/50">{h.note}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-brand-light/40 leading-relaxed pt-2">Chamados fora do horário comercial podem ser priorizados conforme criticidade (ex.: indisponibilidade total). Registre sempre pelo canal oficial para rastreabilidade.</p>
        <div className="flex justify-between gap-3 pt-2 flex-wrap">
          <div className="flex gap-2">
            <button onClick={copyHours} className="btn-outline text-xs px-4 py-2 relative">
              {copied && <span className="absolute -top-2 -right-2 bg-brand-lime text-brand-black text-[10px] font-semibold px-1.5 py-0.5 rounded shadow">OK</span>}
              {copied ? 'Copiado' : 'Copiar Horários'}
            </button>
            <button onClick={() => { setShowHolidays(true); trackEvent('hours_holidays_open'); }} className="text-[11px] underline decoration-dotted self-center text-neutral-500 dark:text-brand-light/50 link-hover">Ver feriados</button>
          </div>
          <a href={`${WHATSAPP_BASE_URL}?text=Preciso%20de%20suporte`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('hours_whatsapp_click')} className="btn-primary text-xs px-4 py-2">WhatsApp Suporte</a>
        </div>
      </div>
    </div>
  )
}
