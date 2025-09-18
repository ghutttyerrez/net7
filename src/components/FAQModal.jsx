import { useRef, useState, useMemo } from 'react'
import { trackEvent } from '../utils/analytics'
import { useModalA11y } from '../hooks/useModalA11y'

const rawFaq = [
  {
    category: 'Planos e Contratação',
    items: [
      { q: 'Quais velocidades vocês oferecem?', a: 'Atualmente trabalhamos com planos a partir de 400 Mega até 900 Mega, além de opções personalizadas sob consulta.' },
  { q: 'Há fidelidade ou multa?', a: 'Sim o plano residencial tem fidelidade mínima de 12 meses. Em caso de cancelamento antecipado, é cobrada uma taxa proporcional ao período restante.' },
      { q: 'Consigo fazer upgrade ou downgrade?', a: 'Sim. Mudanças de plano podem ser solicitadas via WhatsApp e normalmente são aplicadas em até 1 dia útil.' },
      { q: 'Existe teste gratuito?', a: 'Podemos oferecer período de cortesia em campanhas específicas. Consulte nossa equipe para saber se há promoção ativa.' },
    ]
  },
  {
    category: 'Instalação e Equipamentos',
    items: [
      { q: 'Qual o prazo de instalação?', a: 'Após confirmação, o agendamento ocorre geralmente dentro de 1 a 3 dias úteis, dependendo da disponibilidade de agenda e viabilidade técnica.' },
      { q: 'O roteador é incluso?', a: 'Sim. Fornecemos roteador compatível com o plano contratado. Em planos avançados utilizamos Wi‑Fi 6.' },
      { q: 'Posso usar meu próprio roteador?', a: 'Sim. Nossos técnicos configuram a ONU/ONT em modo compatível. A qualidade do Wi‑Fi passa a depender do seu equipamento.' },
      { q: 'Há taxa de instalação?', a: 'Em campanhas vigentes a taxa pode ser isenta. Caso exista custo, será informado com transparência antes de qualquer agendamento.' },
    ]
  },
  {
    category: 'Indicação e Benefícios',
    items: [
      { q: 'Como funciona o programa de indicação?', a: 'Você indica um amigo, ele instala e ambos recebem o benefício (desconto ou bônus de velocidade) conforme regras vigentes.' },
      { q: 'Há limite de indicações por mês?', a: 'Não. Você pode indicar quantas pessoas quiser; cada instalação válida gera um novo benefício.' },
      { q: 'Quando recebo meu bônus?', a: 'Após a confirmação de instalação do indicado e processamento interno (até o próximo ciclo de fatura).' },
      { q: 'Posso acumular benefícios?', a: 'Sim, benefícios podem ser acumulados conforme cada indicação concluída com sucesso.' },
    ]
  },
  {
    category: 'Suporte e Performance',
    items: [
      { q: 'Qual o horário de atendimento?', a: 'Suporte via WhatsApp e telefone em horário comercial estendido; plantão emergencial para indisponibilidades críticas.' },
      { q: 'O que fazer se a internet ficar lenta?', a: 'Reinicie o roteador/ONU, teste com cabo direto e verifique se há muitos dispositivos consumindo banda. Persistindo, acione nosso suporte.' },
      { q: 'Qual velocidade eu recebo no Wi‑Fi?', a: 'A velocidade via Wi‑Fi pode variar por distância, interferência e número de dispositivos conectados. Para medir a taxa máxima do plano, prefira cabo de rede (Gigabit) em um equipamento compatível.' },
      { q: 'Latência é boa para jogos?', a: 'Sim. Nossa rede em fibra e rota otimizada garantem baixa latência e estabilidade em jogos on‑line.' },
      { q: 'Vocês limitam velocidade (traffic shaping)?', a: 'Não praticamos redução artificial de banda em uso residencial normal. Monitoramos apenas abuso ou atividades ilícitas.' },
    ]
  },
  {
    category: 'Financeiro e Pagamentos',
    items: [
      { q: 'Quais formas de pagamento aceitam?', a: 'PIX, boleto bancário, cartão recorrente e em alguns casos débito automático.' },
      { q: 'Posso antecipar pagamentos?', a: 'Sim. Solicite ao suporte para gerar cobranças futuras ou link de pagamento.' },
      { q: 'Há cobrança proporcional (pró‑rata)?', a: 'Na ativação ou mudança de plano durante o ciclo, aplicamos cálculo proporcional claro na fatura.' },
      { q: 'Como emitir 2ª via?', a: 'Você pode solicitar via WhatsApp ou portal do assinante (quando disponível) e enviamos imediatamente um link ou PDF.' },
    ]
  },
  {
    category: 'Segurança e Privacidade',
    items: [
      { q: 'Meus dados são compartilhados?', a: 'Utilizamos seus dados apenas para operação e suporte conforme legislação vigente (LGPD). Não vendemos dados a terceiros.' },
      { q: 'Posso pedir a exclusão dos meus dados?', a: 'Sim. Solicite formalmente e avaliaremos obrigações legais de retenção antes da remoção.' },
      { q: 'Vocês monitoram navegação?', a: 'Não monitoramos conteúdo de navegação. Apenas logs técnicos mínimos para segurança e cumprimento legal.' },
      { q: 'Wi‑Fi é seguro?', a: 'Configuramos padrões WPA2/WPA3 e recomendamos senha forte única. Atualizações de firmware são aplicadas conforme necessidade.' },
    ]
  },
]

export default function FAQModal({ open, onClose }) {
  const containerRef = useRef(null)
  const firstFocusable = useRef(null)
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(null) // guarda chave única ou null

  // Função para destacar termos buscados (case-insensitive) em perguntas e respostas
  const highlight = (text) => {
    const q = query.trim()
    if (!q) return text
    // Suporta múltiplas palavras separadas por espaço
    const parts = q.split(/\s+/).filter(Boolean).map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    if (!parts.length) return text
    try {
      const regex = new RegExp(`(${parts.join('|')})`, 'gi')
      const segments = text.split(regex)
      return segments.map((seg, idx) => {
        if (seg.match(regex)) {
          return <mark key={idx} className="bg-brand-lime/40 dark:bg-brand-lime/30 text-neutral-900 dark:text-brand-black font-semibold rounded px-0.5">{seg}</mark>
        }
        return <span key={idx}>{seg}</span>
      })
    } catch {
      return text
    }
  }

  // Filtro de busca simples
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rawFaq
    return rawFaq
      .map(cat => ({
        ...cat,
        items: cat.items.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q))
      }))
      .filter(cat => cat.items.length > 0)
  }, [query])

  // Acessibilidade unificada (focus trap, ESC, scroll lock)
  useModalA11y({ open, onClose, containerRef, firstFocusRef: firstFocusable, escEventName: 'faq_close_esc' })

  const toggleItem = (catIdx, itemIdx, question) => {
    const key = `${catIdx}-${itemIdx}`
    setExpanded(prev => {
      const next = prev === key ? null : key
      if (next) trackEvent('faq_open_question', { question })
      else trackEvent('faq_close_question', { question })
      return next
    })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 md:p-8 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="faq-modal-title">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div ref={containerRef} className="relative w-full max-w-4xl bg-white dark:bg-[#0d1218] border border-black/10 dark:border-white/10 rounded-2xl shadow-xl p-5 md:p-8 space-y-6 animate-fade-in focus:outline-none">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 id="faq-modal-title" className="text-2xl font-bold text-neutral-800 dark:text-brand-light tracking-tight">Perguntas Frequentes</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              ref={firstFocusable}
              value={query}
              onChange={e=>{ setQuery(e.target.value); trackEvent('faq_search_change', { value: e.target.value }) }}
              placeholder="Buscar..."
              className="w-full sm:flex-1 md:w-64 rounded-md bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-blue dark:focus:border-brand-lime focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-lime"
              aria-label="Buscar nas perguntas"
            />
            <button onClick={onClose} className="btn-outline px-4 w-full sm:w-auto">Fechar</button>
          </div>
        </div>
        <div className="space-y-8">
          {filtered.length === 0 && (
            <p className="text-sm text-neutral-600 dark:text-brand-light/70">Nenhum resultado para "{query}".</p>
          )}
          {filtered.map((cat, cIdx) => (
            <div key={cat.category} className="space-y-3">
              <h3 className="text-lg font-semibold text-neutral-700 dark:text-brand-light/80 flex items-center gap-2">
                <span className="inline-block w-1.5 h-5 rounded bg-gradient-to-b from-brand-lime to-brand-blue" />
                {cat.category}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item, iIdx) => {
                  const key = `${cIdx}-${iIdx}`
                  const openItem = expanded === key
                  return (
                    <li key={item.q} className="border border-black/10 dark:border-white/10 rounded-md overflow-hidden bg-white/70 dark:bg-white/[0.04] backdrop-blur-sm">
                      <button
                        onClick={()=>toggleItem(cIdx,iIdx,item.q)}
                        className="w-full flex items-center justify-between text-left px-4 py-3 gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-colors"
                        aria-expanded={openItem}
                      >
                        <span className="text-sm font-medium text-neutral-800 dark:text-brand-light group-hover:text-brand-blue dark:group-hover:text-brand-lime transition-colors">{highlight(item.q)}</span>
                        <span className="text-xs rounded-full px-2 py-0.5 border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-brand-light/50">
                          {openItem ? '−' : '+'}
                        </span>
                      </button>
                      {openItem && (
                        <div className="px-4 pb-4 -mt-1 text-sm leading-relaxed text-neutral-600 dark:text-brand-light/70">
                          {highlight(item.a)}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-brand-light/40 pt-4 border-t border-black/10 dark:border-white/10">Precisa de algo que não está aqui? Fale com nosso suporte via WhatsApp ou e‑mail.</p>
      </div>
    </div>
  )
}
