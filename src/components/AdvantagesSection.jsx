const advantages = [
  {
    title: 'Latência Baixíssima',
    desc: 'Backbone otimizado e rotas inteligentes garantem respostas rápidas para games e VoIP.'
  },
  {
    title: 'Monitoramento Proativo',
    desc: 'Nossa NOC identifica e atua em anomalias antes de afetar você.'
  },
  {
    title: 'Suporte Humano Real',
    desc: 'Atendimento rápido e eficiente por pessoas que realmente entendem.'
  },
  {
    title: 'Infraestrutura Fibra Pura',
    desc: 'Rede 100% fibra óptica ponta a ponta para máxima estabilidade.'
  },
  {
    title: 'Instalação Profissional',
    desc: 'Equipe treinada realiza instalação limpa, otimizada e testada.'
  },
  {
    title: 'Segurança de Rede',
    desc: 'Camadas de proteção e mitigação contra ataques DDoS.'
  },
]

export default function AdvantagesSection() {
  return (
    <section id="vantagens" className="py-24 relative">
      <div className="container-section">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold">Por que escolher a Net7?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-brand-light/70">Tecnologia, estabilidade e suporte pensados para quem exige desempenho real.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a,i) => (
            <div data-reveal data-reveal-delay={(i*100).toString()} key={a.title} className="glass rounded-xl p-6 flex flex-col gap-2 hover:border-brand-blue/40 dark:hover:border-brand-lime/40 transition-colors">
              <h3 className="text-lg font-semibold text-brand-blue dark:text-brand-lime">{a.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-brand-light/75 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
