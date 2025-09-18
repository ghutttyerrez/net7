export function PlanCard({ name, speed, features, highlight = false, revealDelay }) {
  return (
    <div data-reveal data-reveal-delay={revealDelay} className={`card-plan ${highlight ? 'ring-1 ring-brand-blue dark:ring-brand-lime shadow-[0_0_0_1px_rgba(37,99,235,0.35)] dark:shadow-[0_0_0_1px_rgba(173,204,5,0.35)]' : ''}`}>
      {highlight && (
        <div className="absolute top-2 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm border border-brand-black/10 dark:border-white/10 bg-brand-blue text-white dark:bg-brand-lime dark:text-brand-black">
          MAIS POPULAR
        </div>
      )}
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
  <p className="text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-lime dark:from-brand-lime dark:to-brand-blue">{speed}</p>
  <p className="mt-2 text-sm text-neutral-600 dark:text-brand-light/70">Ideal para streaming, games e trabalho remoto sem travar.</p>
      <p className="mt-6 text-sm font-medium text-neutral-600 dark:text-brand-light/70 leading-relaxed">
        Para saber os valores, fale com nossa equipe.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1 inline-block w-2 h-2 rounded-full bg-gradient-to-r from-brand-lime to-brand-blue" />
            <span className="text-neutral-600 dark:text-brand-light/80">{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <a href="#contato" className="btn-primary w-full justify-center">Assinar</a>
      </div>
    </div>
  )
}
