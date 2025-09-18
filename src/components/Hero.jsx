export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-28 overflow-hidden">
      {/* Background image always visible now (light & dark) */}
      <div className="absolute inset-0 -z-30">
        <picture>
          <source srcSet="/hero-fibra.avif" type="image/avif" />
          <source srcSet="/hero-fibra.webp" type="image/webp" />
          <img
            src="/hero-fibra.jpg"
            alt="Cabos de fibra ótica representando alta velocidade de internet"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
      {/* Light overlay: agora menos opaca para revelar a foto */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white/55 via-white/30 to-white/10 backdrop-blur-[2px] dark:hidden" />
      {/* Glows reajustados mais discretos */}
      <div className="absolute inset-0 -z-10 dark:hidden pointer-events-none">
        <div className="absolute w-[880px] h-[880px] -top-64 left-1/2 -translate-x-1/2 rounded-full opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,94,148,0.55)_0%,transparent_62%)] blur-3xl" />
        <div className="absolute w-[720px] h-[720px] -bottom-40 left-1/2 -translate-x-1/2 rounded-full opacity-25 bg-[radial-gradient(circle_at_center,rgba(173,204,5,0.55)_0%,transparent_70%)] blur-3xl mix-blend-overlay" />
      </div>
      {/* Radial focus vignette (leve), ajuda a dar profundidade sem ficar branco chapado */}
      <div className="absolute inset-0 -z-[5] dark:hidden pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18)_0%,transparent_60%)] mix-blend-multiply" />
      {/* Dark overlays & accents (mantidos) */}
      <div className="absolute inset-0 -z-20 hidden dark:block bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
      <div className="absolute inset-0 -z-10 hidden dark:block opacity-50 bg-[radial-gradient(circle_at_30%_25%,#4966a0_0%,transparent_60%)]" />
      <div className="absolute inset-0 -z-10 hidden dark:block opacity-40 bg-[radial-gradient(circle_at_70%_60%,#adcc05_0%,transparent_65%)]" />

      <div className="container-section text-center relative">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-gradient-invert-light">Internet Fibra</span> <span className="text-neutral-900 dark:text-brand-light">Ultraveloz</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-brand-light/80">
          Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade. A Net7 entrega performance real.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#planos" className="btn-primary">Ver Planos</a>
          <a href="#contato" className="btn-outline">Fale Conosco</a>
        </div>
      </div>
    </section>
  )
}
