import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { trackEvent } from '../utils/analytics'
import { WHATSAPP_NUMBER } from '../config/whatsapp'

export default function ReferralSection() {
  // Palavras que irão rotacionar após "Indique e"
  const rotatingWords = ['Ganhe', 'Junte', 'Lucre']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % rotatingWords.length)
    }, 2500) // troca a cada 2s
    return () => clearInterval(interval)
  }, [rotatingWords.length])
  const steps = [
    {
      title: '1. Indique um amigo',
      desc: 'Compartilhe nossos planos com amigos e familiares.'
    },
    {
      title: '2. Ele contrata o serviço',
      desc: 'Seu amigo assina qualquer um dos nossos planos.'
    },
    {
      title: '3. Vocês ganham desconto',
      desc: 'Ambos recebem desconto na próxima fatura.'
    },
  ]

  // Estados do formulário de indicação (movido do contato)
  const [indNome, setIndNome] = useState('')
  const [indTelefone, setIndTelefone] = useState('')
  const [indTelefoneErro, setIndTelefoneErro] = useState('')
  const [indPlano, setIndPlano] = useState('')
  const [seuNome, setSeuNome] = useState('')
  const [seuEmail, setSeuEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const modalRef = useRef(null)
  const openBtnRef = useRef(null)

  const zapBase = WHATSAPP_NUMBER
  const whatsappHref = useMemo(() => {
    const msg = `Indicação via site.%0A%0A-- Indicador --%0ANome: ${seuNome || '(não informado)'}%0AEmail: ${seuEmail || '(não informado)'}%0A%0A-- Amigo --%0ANome: ${indNome || '(não informado)'}%0ATelefone: ${indTelefone || '(não informado)'}%0APlano: ${indPlano || '(não informado)'}%0A%0AOrigem: Seção Indique e Ganhe`;
  return `https://wa.me/${zapBase}?text=${msg}` // mantém construção direta pois já usa zapBase da config
  }, [seuNome, seuEmail, indNome, indTelefone, indPlano, zapBase])

  const rawMessage = useMemo(() => (
    `Indicação via site\n\n-- Indicador --\nNome: ${seuNome || '(não informado)'}\nEmail: ${seuEmail || '(não informado)'}\n\n-- Amigo --\nNome: ${indNome || '(não informado)'}\nTelefone: ${indTelefone || '(não informado)'}\nPlano: ${indPlano || '(não informado)'}\n\nOrigem: Seção Indique e Ganhe`
  ), [seuNome, seuEmail, indNome, indTelefone, indPlano])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawMessage)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2500)
      trackEvent('referral_copy_message')
    } catch (e) {
      console.error('Falha ao copiar', e)
    }
  }

  const handleTelefoneChange = (v) => {
    let digits = v.replace(/\D/g, '')
    if (digits.length > 11) digits = digits.slice(0, 11)
    let formatted = digits
    if (digits.length >= 2) formatted = `(${digits.slice(0,2)}) ${digits.slice(2)}`
    if (digits.length === 10) formatted = `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`
    else if (digits.length === 11) formatted = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
    setIndTelefone(formatted)
    if (digits.length > 0 && (digits.length < 10 || digits.length === 9)) setIndTelefoneErro('Telefone incompleto')
    else setIndTelefoneErro('')
  }

  const closeOnEsc = useCallback((e) => { if (e.key === 'Escape') setShowModal(false) }, [])
  useEffect(() => {
    if (showModal) {
      document.addEventListener('keydown', closeOnEsc)
      requestAnimationFrame(() => {
        const el = modalRef.current?.querySelector('[data-auto-focus]') || modalRef.current?.querySelector('button, a, input, select, textarea')
        el && el.focus()
      })
    } else {
      document.removeEventListener('keydown', closeOnEsc)
      openBtnRef.current && openBtnRef.current.focus()
    }
    return () => document.removeEventListener('keydown', closeOnEsc)
  }, [showModal, closeOnEsc])

  // Persistência localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('net7_referral_form') || '{}')
      if (saved.seuNome) setSeuNome(saved.seuNome)
      if (saved.seuEmail) setSeuEmail(saved.seuEmail)
      if (saved.indNome) setIndNome(saved.indNome)
      if (saved.indTelefone) setIndTelefone(saved.indTelefone)
      if (saved.indPlano) setIndPlano(saved.indPlano)
    } catch {
      // ignore parse errors
    }
  }, [])

  useEffect(() => {
    const payload = { seuNome, seuEmail, indNome, indTelefone, indPlano }
    try { localStorage.setItem('net7_referral_form', JSON.stringify(payload)) } catch {
      // ignore quota errors
    }
  }, [seuNome, seuEmail, indNome, indTelefone, indPlano])

  return (
    <section id="indique" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#4966a0_0%,transparent_70%)] opacity-10 dark:opacity-20" />
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Indique e{' '}
            <span className="relative inline-block overflow-hidden align-middle min-w-[5.5ch] h-[1.3em] leading-none">
              <span
                key={wordIndex}
                className="animate-slide-word absolute inset-0 flex items-center justify-start select-none bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-lime dark:from-brand-lime dark:to-brand-blue"
              >{rotatingWords[wordIndex]}</span>
            </span>
          </h2>
          <p className="mt-5 text-neutral-600 dark:text-brand-light/70 text-lg leading-relaxed">Faça parte do crescimento da Net7 e seja recompensado. A cada nova instalação originada da sua indicação, todos saem ganhando.</p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {steps.map((s, idx) => (
            <div
              key={s.title}
              data-reveal
              data-reveal-delay={100 + idx * 120}
              className="group relative rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-3 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-lime/10 to-brand-blue/10" />
              <div className="relative flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-brand-light">{s.title}</h3>
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-brand-blue text-white dark:bg-brand-lime dark:text-brand-black shadow-sm">{String(idx+1).padStart(2,'0')}</span>
              </div>
              <p className="relative text-sm text-neutral-600 dark:text-brand-light/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 xl:gap-10 lg:grid-cols-5 items-start">
          <div className="lg:col-span-2 space-y-4 pt-6 lg:pt-6" data-reveal data-reveal-delay="100">
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-brand-light">Ganhe indicando hoje</h3>
            <p className="text-sm text-neutral-600 dark:text-brand-light/70 leading-relaxed">Preencha seus dados e os do amigo. Nosso time entra em contato e após a instalação o bônus aparece automaticamente.</p>
            <ul className="text-xs text-neutral-500 dark:text-brand-light/40 space-y-1 list-disc pl-5">
              <li>R$ 40,00 de desconto para você</li>
              <li>+100 Mega por 30 dias para o amigo</li>
              <li>Sem limite mensal de indicações</li>
            </ul>
            <div className="pt-2">
              <button ref={openBtnRef} onClick={()=>{ setShowModal(true); trackEvent('referral_info_open') }} className="text-xs font-medium underline decoration-dotted hover:text-brand-blue dark:hover:text-brand-lime">Como funciona?</button>
            </div>
          </div>
          <form onSubmit={e=>e.preventDefault()} data-reveal data-reveal-delay="220" className="group relative lg:col-span-3 glass rounded-2xl p-6 backdrop-blur-sm border border-black/10 dark:border-white/10 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-lime/10 to-brand-blue/10" />
            <div className="relative grid md:grid-cols-2 gap-4">
              {/* Linha 1 */}
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide text-neutral-600 dark:text-brand-light/60">Seu Nome</label>
                <input value={seuNome} onChange={e=>setSeuNome(e.target.value)} type="text" required className="w-full h-[42px] rounded-md bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-brand-blue dark:focus:border-brand-lime focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-lime px-3 py-2 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide text-neutral-600 dark:text-brand-light/60">Nome do Amigo</label>
                <input value={indNome} onChange={e=>setIndNome(e.target.value)} type="text" required className="w-full h-[42px] rounded-md bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-brand-blue dark:focus:border-brand-lime focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-lime px-3 py-2 outline-none text-sm" />
              </div>
              {/* Linha 2 */}
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide text-neutral-600 dark:text-brand-light/60">Seu Email</label>
                <input value={seuEmail} onChange={e=>setSeuEmail(e.target.value)} type="email" required className="w-full h-[42px] rounded-md bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-brand-blue dark:focus:border-brand-lime focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-lime px-3 py-2 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide text-neutral-600 dark:text-brand-light/60">Telefone do Amigo</label>
                <input value={indTelefone} onChange={e=>handleTelefoneChange(e.target.value)} type="tel" placeholder="(DD) 9XXXX-XXXX" className={`w-full h-[42px] rounded-md bg-neutral-100 dark:bg-black/40 border px-3 py-2 outline-none text-sm focus:ring-1 transition-colors ${indTelefoneErro ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-black/10 dark:border-white/10 focus:border-brand-blue dark:focus:border-brand-lime focus:ring-brand-blue dark:focus:ring-brand-lime'}`} aria-invalid={!!indTelefoneErro} aria-describedby={indTelefoneErro?'erro-ind-tel':undefined} />
                {indTelefoneErro && <p id="erro-ind-tel" className="mt-1 text-xs text-red-500">{indTelefoneErro}</p>}
              </div>
              {/* Linha 3 */}
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide text-neutral-600 dark:text-brand-light/60">Plano de Interesse</label>
                <select value={indPlano} onChange={e=>setIndPlano(e.target.value)} className="w-full h-[42px] rounded-md bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-brand-blue dark:focus:border-brand-lime focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-lime px-3 py-2 outline-none text-sm">
                  <option value="">Selecionar...</option>
                  <option value="400 Mega">400 Mega</option>
                  <option value="700 Mega">700 Mega</option>
                  <option value="900 Mega">900 Mega</option>
                  <option value="Outro">Outro / Não sabe</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide text-neutral-600 dark:text-brand-light/60">Ações</label>
                <div className="flex gap-3">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={()=>trackEvent('referral_whatsapp_click', { plano: indPlano || null })} className="btn-primary flex-1 flex items-center justify-center text-sm h-[42px]">WhatsApp</a>
                  <button type="button" onClick={handleCopy} className="btn-outline flex-1 relative flex items-center justify-center text-sm h-[42px]">
                    {copied ? 'Copiado!' : 'Copiar'}
                    {copied && <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-brand-lime text-brand-black shadow">OK</span>}
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-neutral-500 dark:text-brand-light/50">Demonstrativo. Ainda não enviamos esses dados; use o botão de WhatsApp para contato imediato.</p>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-indicacao-info-titulo">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setShowModal(false)} />
          <div ref={modalRef} className="relative w-full max-w-md rounded-xl glass p-6 shadow-lg" tabIndex={-1}>
            <h3 id="modal-indicacao-info-titulo" className="text-lg font-semibold mb-2 text-neutral-800 dark:text-brand-light" data-auto-focus>Como a indicação funciona</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-600 dark:text-brand-light/80 mb-4">
              <li>Preencha seus dados e do amigo.</li>
              <li>Nosso time confirma interesse e agenda.</li>
              <li>Instalado o serviço, bônus aplicado.</li>
              <li>Você pode repetir o processo quantas vezes quiser.</li>
            </ol>
            <p className="text-xs text-neutral-500 dark:text-brand-light/50 mb-4">Controle e validação de indicações feito internamente. Sujeito a auditoria antifraude.</p>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setShowModal(false)} className="btn-outline px-4">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
