import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Imagens para tema light (tons azuis/neutros)
  const lightImages = [
    {
      src: '/hero-fibra.jpg',
      webp: '/hero-fibra.webp',
      alt: 'Cabos de fibra ótica representando alta velocidade de internet',
    },
    {
      src: '/hero-connection.jpg',
      webp: '/hero-connection.webp',
      alt: 'Conexões de rede representando estabilidade',
    },
    {
      src: '/hero-speed.jpg',
      webp: '/hero-speed.webp',
      alt: 'Representação visual de alta velocidade',
    }
  ]
  
  // Imagens para tema dark (tons verdes/lima)
  const darkImages = [
    {
      src: '/hero-fibra-dark.jpg',
      webp: '/hero-fibra-dark.webp',
      alt: 'Cabos de fibra ótica com iluminação verde',
    },
    {
      src: '/hero-connection-dark.jpg',
      webp: '/hero-connection-dark.webp',
      alt: 'Conexões de rede com efeitos verdes',
    },
    {
      src: '/hero-speed-dark.jpg',
      webp: '/hero-speed-dark.webp',
      alt: 'Velocidade representada com tons verdes',
    }
  ]

  // Carrossel automático a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative pt-20 pb-16 overflow-hidden">
            {/* Background carousel com imagens temáticas */}
      <div className="absolute inset-0 -z-30">
        {/* Imagens para tema light */}
        <div className="dark:hidden">
          {lightImages.map((image, index) => (
            <div
              key={`light-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <picture>
                <source srcSet={image.webp} type="image/webp" />
                <img
                  src={image.webp}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>
        
        {/* Imagens para tema dark */}
        <div className="hidden dark:block">
          {darkImages.map((image, index) => (
            <div
              key={`dark-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <picture>
                <source srcSet={image.webp} type="image/webp" />
                <img
                  src={image.webp}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
      {/* Light overlay: apenas na primeira imagem */}
      <div className={`absolute inset-0 -z-25 bg-gradient-to-b from-white/55 via-white/30 to-white/10 backdrop-blur-[2px] transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden`} />
      {/* Glows reajustados mais discretos: apenas na primeira imagem */}
      <div className={`absolute inset-0 -z-20 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none`}>
        <div className="absolute w-[880px] h-[880px] -top-64 left-1/2 -translate-x-1/2 rounded-full opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,94,148,0.55)_0%,transparent_62%)] blur-3xl" />
        <div className="absolute w-[720px] h-[720px] -bottom-40 left-1/2 -translate-x-1/2 rounded-full opacity-25 bg-[radial-gradient(circle_at_center,rgba(173,204,5,0.55)_0%,transparent_70%)] blur-3xl mix-blend-overlay" />
      </div>
      {/* Radial focus vignette: apenas na primeira imagem */}
      <div className={`absolute inset-0 -z-15 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18)_0%,transparent_60%)] mix-blend-multiply`} />
      
      {/* Overlay sutil para tema dark - apenas na primeira imagem */}
      <div className={`absolute inset-0 -z-25 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} hidden dark:block bg-black/20`} />

      <div className="container-section text-center relative flex flex-col items-center justify-center min-h-[40vh]">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-center">
          <span className="text-gradient-invert-light">Internet Fibra</span> <span className="text-neutral-900 dark:text-brand-light">Ultraveloz</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-brand-light/80 text-center">
          Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade. A Net7 entrega performance real.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto sm:max-w-none">
          <a href="#planos" className="btn-primary w-full sm:w-auto">Ver Planos</a>
          <a href="#contato" className="btn-outline w-full sm:w-auto">Fale Conosco</a>
        </div>
        
        {/* Indicadores do carrossel */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-brand-blue dark:bg-brand-lime shadow-lg scale-125'
                  : 'bg-white/40 dark:bg-white/20 hover:bg-white/60 dark:hover:bg-white/40'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
