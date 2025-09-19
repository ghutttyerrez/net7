import { trackEvent } from '../utils/analytics'

export default function MinhaNet7Section() {
  const handleClick = (store) => {
    trackEvent('app_store_click', { store })
  }
  return (
  <section id="app" className="relative py-24" data-reveal data-reveal-delay="0">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,#4966a0_0%,transparent_65%)] opacity-20" />
      <div className="container-section">
  <div className="max-w-3xl mx-auto text-center" data-reveal data-reveal-delay="100">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Aplicativo <span className="text-gradient-invert-light">Minha Net7</span></h2>
          <p className="text-neutral-600 dark:text-brand-light/70 text-lg leading-relaxed">Gerencie sua conexão, acompanhe consumo, suporte, faturas e mais — tudo em um só lugar. Baixe agora e tenha controle total na palma da mão.</p>
        </div>
  <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center sm:items-center w-full max-w-md mx-auto" data-reveal data-reveal-delay="200">
          <a
            href="https://apps.apple.com/br/app/minha-net-7/id6745264071"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick('ios')}
            aria-label="Baixar aplicativo na App Store"
            className="group inline-flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-4 hover:border-brand-blue dark:hover:border-brand-lime transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black shadow-sm hover:shadow w-full sm:w-auto min-w-[260px] justify-start">
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center text-white shadow-inner">
              <svg width="22" height="22" viewBox="0 0 384 512" aria-hidden="true" className="scale-90">
                <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.5 4 273.5c0 25.7 4.7 52.3 14.1 79.7 12.5 36.7 57.6 126.7 104.7 125.2 24.6-.6 42-17.5 74-17.5 31.2 0 48.1 17.5 76.4 17.5 47.6-.7 88.9-82.5 101.2-119.3-64.4-30.4-55.7-89-55.7-90.4zM258 96.7c27.3-32.4 24.8-61.9 24-72.7-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 50-11.4 69.5-34.1z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs uppercase tracking-wide font-semibold text-neutral-500 dark:text-brand-light/60">Baixar na</p>
              <p className="text-base font-medium text-brand-blue dark:text-brand-lime group-hover:underline">App Store</p>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=br.com.aplicativoprovedor.net7tecnologia&hl=pt_BR"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick('android')}
            aria-label="Baixar aplicativo no Google Play"
            className="group inline-flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-4 hover:border-brand-blue dark:hover:border-brand-lime transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black shadow-sm hover:shadow w-full sm:w-auto min-w-[260px] justify-start">
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white shadow-inner">
              <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true" className="scale-90">
                <path fill="currentColor" d="M325.3 234.3 104.6 13 385 193.5l-59.7 40.8zm125.6-25.2c7.6 5.2 12.1 13.6 12.1 22.9 0 9.2-4.5 17.6-12.1 22.8l-62.9 42.9-69.1-69.1 69.1-69.1 62.9 49.6zM52.5 0C39.3 0 29.6 10.6 29.6 24.8v462.5c0 14.2 9.7 24.8 22.9 24.8 4.9 0 9.7-1.4 14.5-4.5l247.5-157.6L146.8 179.1 52.5 0zm332.4 318.5L104.6 499l280.4-180.5-59.7-40z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs uppercase tracking-wide font-semibold text-neutral-500 dark:text-brand-light/60">Disponível no</p>
              <p className="text-base font-medium text-brand-blue dark:text-brand-lime group-hover:underline">Google Play</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
