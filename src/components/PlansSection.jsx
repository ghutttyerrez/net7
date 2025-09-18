import { PlanCard } from './PlanCard'

const plans = [
  {
    name: 'Essencial',
    speed: '400 Mega',
    highlight: false,
    features: ['Wifi 5 incluso', 'Streaming fluido Full HD', '2 anos de histórico de estabilidade', 'Suporte via WhatsApp'],
  },
  {
    name: 'Power',
    speed: '700 Mega',
    highlight: true,
    features: ['Wifi 6 incluso', 'Ideal para gamers', 'Prioridade em suporte', 'Upload turbinado'],
  },
  {
    name: 'Elite',
    speed: '900 Mega',
    highlight: false,
    features: ['Roteador WiFi 6 Pro', 'Baixíssima latência', 'Suporte dedicado', 'Perfeito para múltiplos devices'],
  },
]

export default function PlansSection() {
  return (
    <section id="planos" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,#4966a0_0%,transparent_65%)] opacity-30" />
      <div className="container-section">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold">Planos que aceleram sua vida</h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-brand-light/70">Escolha a velocidade ideal para sua rotina digital. Transparência e performance real.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((p,i) => <PlanCard key={p.name} {...p} revealDelay={(i*100).toString()} />)}
        </div>
      </div>
    </section>
  )
}
