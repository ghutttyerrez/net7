import { useEffect, useRef, useState, useCallback } from 'react'
import { trackEvent } from '../utils/analytics'
import { generateLegalPdf } from '../utils/legalPdf'
import { useLocale } from '../context/LocaleContext'
import { loadLegalContent } from '../utils/legalContent'
import { useModalA11y } from '../hooks/useModalA11y'

export default function PrivacyModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const firstRef = useRef(null)
  const { locale } = useLocale()
  const [content, setContent] = useState(null)
  const [downloading, setDownloading] = useState(false)

  useModalA11y({ open, onClose, containerRef: dialogRef, firstFocusRef: firstRef, escEventName: 'privacy_close_esc' })

  // Carrega conteúdo legal conforme locale
  useEffect(() => {
    if (!open) return
    let active = true
    loadLegalContent(locale).then(data => { if (active) setContent(data.privacy) }).catch(()=>{})
    return () => { active = false }
  }, [locale, open])

  const handlePdf = useCallback(async () => {
    try {
      setDownloading(true)
      await generateLegalPdf('privacy', locale)
      trackEvent('privacy_download_pdf')
    } finally {
      setDownloading(false)
    }
  }, [locale])
  if (!open) return null
  if (!content) return null
  return (
    <div className="fixed inset-0 z-[85] flex items-start justify-center p-4 md:p-8 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="privacy-modal-title">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>{ trackEvent('privacy_close_backdrop'); onClose() }} />
  <div ref={dialogRef} className="relative w-full max-w-3xl glass rounded-2xl p-5 md:p-8 border border-black/10 dark:border-white/10 shadow-xl space-y-6 animate-modal-in max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain" tabIndex={-1}>
        <div className="flex items-start justify-between gap-4">
          <h2 id="privacy-modal-title" ref={firstRef} className="text-xl font-semibold text-neutral-800 dark:text-brand-light tracking-tight">{content.title} <span className="text-xs font-normal text-neutral-400 dark:text-brand-light/40">v{content.version}</span></h2>
          <div className="flex gap-2">
            <button disabled={downloading} onClick={handlePdf} className="btn-outline px-3 py-1.5 text-xs disabled:opacity-50">{downloading ? '...' : 'PDF'}</button>
            <button onClick={()=>{ trackEvent('privacy_close_button'); onClose() }} className="btn-outline px-3 py-1.5 text-xs">Fechar</button>
          </div>
        </div>
        <p className="text-sm text-neutral-600 dark:text-brand-light/70 leading-relaxed">{content.intro}</p>
        <div className="space-y-5 text-sm leading-relaxed text-neutral-700 dark:text-brand-light/75">
          {content.sections.map(sec => (
            <section key={sec.id}>
              <h3 className="font-semibold mb-1 text-neutral-800 dark:text-brand-light">{sec.title}</h3>
              {sec.body && <p>{sec.body}</p>}
              {Array.isArray(sec.list) && (
                <ul className="list-disc pl-5 space-y-1">
                  {sec.list.map(item => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-brand-light/40 pt-4 border-t border-black/10 dark:border-white/10">{content.disclaimer}</p>
      </div>
    </div>
  )
}
