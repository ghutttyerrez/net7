import { useRef } from 'react'
import { trackEvent } from '../utils/analytics'
import { WHATSAPP_BASE_URL } from '../config/whatsapp'
import { useModalA11y } from '../hooks/useModalA11y'

export default function CoverageModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const firstFocusRef = useRef(null)

  useModalA11y({ open, onClose: ()=>{ trackEvent('coverage_close_esc'); onClose() }, containerRef: dialogRef, firstFocusRef: firstFocusRef, escEventName: 'coverage_close_esc' })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 md:p-8 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="coverage-modal-title">
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>{ trackEvent('coverage_close_backdrop'); onClose() }} />
      <div ref={dialogRef} className="relative w-full max-w-lg glass rounded-2xl p-6 md:p-8 border border-black/10 dark:border-white/10 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="coverage-modal-title" className="text-xl font-semibold text-neutral-800 dark:text-brand-light tracking-tight">Áreas de Cobertura</h2>
          <button ref={firstFocusRef} onClick={()=>{ trackEvent('coverage_close_button'); onClose() }} className="btn-outline px-3 py-1.5 text-sm">Fechar</button>
        </div>
        <p className="text-sm text-neutral-600 dark:text-brand-light/70 leading-relaxed">
          Estamos expandindo continuamente nossa rede de fibra. Abaixo um panorama atual das áreas atendidas. Caso seu endereço esteja em zona limítrofe ou área rural, nossa equipe pode validar viabilidade detalhada.
        </p>
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue dark:text-brand-lime mb-2">Sidrolândia / MS</h3>
            <ul className="text-sm leading-relaxed text-neutral-700 dark:text-brand-light/80 space-y-1 list-disc pl-5">
              <li>Área urbana (Todos os bairros da cidade)</li>
              <li>Condomínios residenciais aprovados</li>
              <li>Algumas áreas rurais com rota técnica (sob consulta)</li>
            </ul>
          </div>
        </div>
        <div className="rounded-md border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.04] p-4 text-xs text-neutral-600 dark:text-brand-light/60 leading-relaxed">
          <strong className="font-semibold text-neutral-800 dark:text-brand-light">Observação:</strong> Disponibilidade está sujeita a vistoria técnica, capacidade de porta/caixa e condições de passagem. Caso sua localidade não apareça, registre o interesse e aceleramos a expansão.
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-brand-light/50">Para endereços específicos, loteamentos novos ou propriedades rurais, fale com o Comercial via WhatsApp para análise individualizada.</p>
        <div className="flex justify-end">
          <a href={`${WHATSAPP_BASE_URL}?text=Quero%20validar%20cobertura%20em%20um%20endereço`} onClick={()=>trackEvent('coverage_whatsapp_click')} target="_blank" rel="noopener noreferrer" className="btn-primary">Falar com Comercial</a>
        </div>
      </div>
    </div>
  )
}
