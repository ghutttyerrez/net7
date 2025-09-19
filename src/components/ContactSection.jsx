import { useState, useMemo } from 'react'
import { trackEvent } from '../utils/analytics'
import CoverageModal from './CoverageModal'
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '../config/whatsapp'

export default function ContactSection() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [coverageOpen, setCoverageOpen] = useState(false)

  const whatsappHref = useMemo(() => {
    const msg = `Olá! Gostaria de entrar em contato.%0A%0ANome: ${nome || '(não informado)'}%0AEmail: ${email || '(não informado)'}%0AMensagem: ${mensagem || '(vazia)'}%0A%0AOrigem: Site Net7`;
    return `${WHATSAPP_BASE_URL}?text=${msg}`
  }, [nome, email, mensagem])

  // Classes CSS reutilizáveis
  const cardBaseClass = "group relative glass rounded-xl p-6 flex flex-col gap-3 h-full overflow-hidden border border-black/10 dark:border-white/10 transition-all hover:shadow-lg hover:-translate-y-1"
  const overlayClass = "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-lime/10 to-brand-blue/10"
  const cardContentClass = "relative flex flex-col gap-3 flex-1"
  const cardTitleClass = "text-lg font-semibold text-brand-blue dark:text-brand-lime"
  const cardTextClass = "text-sm text-neutral-600 dark:text-brand-light/70 flex-1"
  const inputClass = "w-full rounded-md bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-brand-blue dark:focus:border-brand-lime focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-lime px-3 py-2 outline-none text-sm text-neutral-700 dark:text-brand-light"

  return (
  <section id="contato" className="py-24" data-reveal data-reveal-delay="0">
      <div className="container-section">
  <div className="text-center mb-12" data-reveal data-reveal-delay="100">
          <h2 className="text-3xl sm:text-4xl font-bold">Fale com a Net7</h2>
          <p className="mt-4 max-w-xl mx-auto text-neutral-600 dark:text-brand-light/70">Tire dúvidas, peça instalação ou migre agora. Estamos prontos para ajudar você a ter uma internet melhor.</p>
        </div>
        <div className="mx-auto grid gap-8 xl:gap-10 max-w-6xl lg:grid-cols-12 auto-rows-[1fr]">
          <form data-reveal data-reveal-delay="200" onSubmit={e=>e.preventDefault()} className="group relative space-y-4 glass rounded-xl p-6 lg:col-span-5 xl:col-span-6 lg:row-span-2 self-start overflow-hidden border border-black/10 dark:border-white/10 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-lime/10 to-brand-blue/10" />
            <div className="relative space-y-4">
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-neutral-700 dark:text-brand-light/80 mb-1">Seus dados</legend>
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input value={nome} onChange={e=>setNome(e.target.value)} required type="text" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mensagem</label>
                <textarea value={mensagem} onChange={e=>setMensagem(e.target.value)} rows={4} className={`${inputClass} resize-none`} />
              </div>
            </fieldset>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={()=>trackEvent('contact_whatsapp_click')} className="btn-primary justify-center w-full">WhatsApp</a>
            </div>
            <p className="text-xs text-neutral-500 dark:text-brand-light/50">Demonstrativo. Dados não são enviados. O botão WhatsApp monta a mensagem automaticamente.</p>
            </div>
          </form>
          {/* Coluna com dois cards empilhados */}
          <div className="flex flex-col gap-6 lg:col-span-3 xl:col-span-3 lg:row-span-2 order-last lg:order-none" data-reveal data-reveal-delay="300">
            <div className={cardBaseClass}>
              <div className={overlayClass} />
              <div className={cardContentClass}>
              <h3 className={cardTitleClass}>Atendimento rápido</h3>
              <p className={cardTextClass}>Fale direto com nosso time via WhatsApp e acelere sua contratação.</p>
              <a href={WHATSAPP_BASE_URL} target="_blank" onClick={()=>trackEvent('quick_whatsapp_click')} className="btn-outline justify-center relative">WhatsApp</a>
              </div>
            </div>
            <div className={cardBaseClass}>
              <div className={overlayClass} />
              <div className={cardContentClass}>
              <h3 className={cardTitleClass}>Cobertura</h3>
              <p className={cardTextClass}>Consulte disponibilidade da nossa fibra no seu endereço.</p>
              <button type="button" onClick={()=>{ setCoverageOpen(true); trackEvent('coverage_open') }} className="btn-primary justify-center relative">Verificar Cobertura</button>
              </div>
            </div>
          </div>
          {/* Card alto de suporte */}
          <div data-reveal data-reveal-delay="400" className={`${cardBaseClass} lg:col-span-4 xl:col-span-3 lg:row-span-2 p-5 sm:p-6`}>
            <div className={overlayClass} />
            <div className={cardContentClass}>
            <h3 className={cardTitleClass}>Suporte</h3>
            <p className={`${cardTextClass} leading-relaxed`}>Clientes têm acesso a suporte dedicado com baixa fila. Utilize a Área do Cliente para abrir chamados, acompanhar instalações e acessar 2ª via de faturas.</p>
            <a href="https://sistema.net7.com.br/central-assinante/" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center whitespace-nowrap relative text-sm py-2">Área do Cliente</a>
            <details className="mt-2 text-[11px] text-neutral-500 dark:text-brand-light/40 leading-relaxed select-none">
              <summary className="cursor-pointer list-none marker:hidden flex items-center gap-1 text-neutral-500 dark:text-brand-light/50 hover:text-neutral-700 dark:hover:text-brand-light/70 transition-colors">
                <span>Mais detalhes</span>
                <span className="text-[9px] opacity-60">(tempo de resposta)</span>
              </summary>
              <div className="mt-2 space-y-1">
                <p><strong>Tempo médio de resposta:</strong> &lt; 5 min horário comercial.</p>
                <p>Plantão emergencial para indisponibilidades críticas.</p>
              </div>
            </details>
            </div>
          </div>
        </div>
      </div>
      
      {coverageOpen && <CoverageModal open={coverageOpen} onClose={()=>setCoverageOpen(false)} />}
    </section>
  )
}
