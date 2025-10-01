import { useState, useEffect, useLayoutEffect } from 'react'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Detecta tema inicial imediatamente
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })
  
  // Use useLayoutEffect para detectar tema antes do primeiro paint
  useLayoutEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark')
    setIsDarkMode(darkMode)
  }, [])
  
  // Monitora mudanças de tema
  useEffect(() => {
    const checkTheme = () => {
      const darkMode = document.documentElement.classList.contains('dark')
      setIsDarkMode(darkMode)
    }
    
    // Monitora mudanças na classe do html
    const observer = new MutationObserver(() => {
      checkTheme()
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])
  
  const slideContent = [
    {
      title: 'Internet Fibra Ultraveloz',
      subtitle: 'Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade.'
    },
    {
      title: 'Conexão Estável e Confiável',
      subtitle: 'Sua internet sempre funcionando quando você mais precisa.'
    },
    {
      title: '',
      subtitle: ''
    }
  ]
  
  // Configuração de imagens responsivas para cada dispositivo
  const imageConfig = [
    {
      // Slide 1: Speed/Velocidade
      desktop: {
        light: '/hero-speed-desktop.webp',
        dark: '/hero-speed-desktop-dark.webp'
      },
      tablet: {
        light: '/hero-speed-tablet.webp',
        dark: '/hero-speed-tablet-dark.webp'
      },
      mobile: {
        light: '/hero-speed-mobile.webp',
        dark: '/hero-speed-mobile-dark.webp'
      },
      alt: 'Representação visual de alta velocidade de internet'
    },
    {
      // Slide 2: Fibra
      desktop: {
        light: '/hero-fibra-desktop.webp',
        dark: '/hero-fibra-desktop-dark.webp'
      },
      tablet: {
        light: '/hero-fibra-tablet.webp',
        dark: '/hero-fibra-tablet-dark.webp'
      },
      mobile: {
        light: '/hero-fibra-mobile.webp',
        dark: '/hero-fibra-mobile-dark.webp'
      },
      alt: 'Fibra óptica representando tecnologia avançada'
    },
    {
      // Slide 3: Connection
      desktop: {
        light: '/hero-connection-desktop.webp',
        dark: '/hero-connection-desktop-dark.webp'
      },
      tablet: {
        light: '/hero-connection-tablet.webp',
        dark: '/hero-connection-tablet-dark.webp'
      },
      mobile: {
        light: '/hero-connection-mobile.webp',
        dark: '/hero-connection-mobile-dark.webp'
      },
      alt: 'Conexões de rede representando estabilidade'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageConfig.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [imageConfig.length])

  return (
  <section id="hero" className="relative pt-20 pb-14 overflow-hidden h-[62vh] sm:h-[65vh] max-[600px]:pt-24 max-[600px]:pb-10 min-[571px]:max-[799px]:pt-24">
      {/* Container otimizado para imagens responsivas */}
      <div className="absolute inset-0 z-0">
        {imageConfig.map((config, index) => {
          const isActive = index === currentImageIndex
          const theme = isDarkMode ? 'dark' : 'light'
          
          return (
            <div key={`slide-${index}-${theme}`} className="absolute inset-0">
              {/* Sistema de imagens responsivas por dispositivo */}
              <picture>
                <source 
                  media="(max-width: 767px)" 
                  srcSet={config.mobile[theme]} 
                />
                <source 
                  media="(min-width: 768px) and (max-width: 1023px)" 
                  srcSet={config.tablet[theme]} 
                />
                <source 
                  media="(min-width: 1024px)" 
                  srcSet={config.desktop[theme]} 
                />
                <img
                  src={config.desktop[theme]}
                  alt={config.alt}
                  className={`w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    zIndex: isActive ? 10 : 5,
                    imageRendering: 'high-quality',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    minHeight: '100%',
                    maxHeight: '100%'
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          )
        })}
      </div>
      
      {/* Overlays para tema claro */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-white/70 via-white/50 to-white/30 backdrop-blur-[2px] dark:hidden" />
      
      <div className={`absolute inset-0 z-21 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none`}>
        <div className="absolute w-[880px] h-[880px] -top-64 left-1/2 -translate-x-1/2 rounded-full opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,94,148,0.55)_0%,transparent_62%)] blur-3xl" />
        <div className="absolute w-[720px] h-[720px] -bottom-40 left-1/2 -translate-x-1/2 rounded-full opacity-25 bg-[radial-gradient(circle_at_center,rgba(173,204,5,0.55)_0%,transparent_70%)] blur-3xl mix-blend-overlay" />
      </div>
      
      <div className={`absolute inset-0 z-22 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,transparent_60%)] mix-blend-multiply`} />
      
      {/* Overlay para tema escuro */}
      <div className="absolute inset-0 z-20 bg-black/35 hidden dark:block" />

  <div className="container-section text-center relative z-30 flex flex-col items-center justify-center h-full pb-16 sm:pb-20 max-[600px]:pb-16">
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl max-[600px]:text-2xl max-[600px]:leading-tight max-[600px]:mt-2 min-[571px]:max-[799px]:text-4xl min-[571px]:max-[799px]:leading-snug font-bold tracking-tight text-center transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <span className="text-gradient-invert-light">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(0, 2).join(' ') || 'Internet Fibra'}
          </span>{' '}
          <span className="text-neutral-900 dark:text-brand-light">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(2).join(' ') || 'Ultraveloz'}
          </span>
        </h1>
        
        <p className={`mt-6 max-w-2xl mx-auto text-lg max-[600px]:text-base max-[600px]:mt-5 min-[571px]:max-[799px]:text-base text-neutral-600 dark:text-brand-light/80 text-center transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {slideContent[currentImageIndex]?.subtitle || 'Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade. A Net7 entrega performance real.'}
        </p>
        
        <div className={`mt-10 max-[600px]:mt-6 min-[571px]:max-[799px]:mt-8 flex flex-col sm:flex-row gap-4 max-[600px]:gap-3 min-[571px]:max-[799px]:gap-3 justify-center w-full max-w-md mx-auto sm:max-w-none transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <a href="#planos" className="btn-primary w-full sm:w-auto max-[600px]:px-5 max-[600px]:py-2.5 max-[600px]:text-sm min-[571px]:max-[799px]:px-5 min-[571px]:max-[799px]:py-2.5 min-[571px]:max-[799px]:text-sm">Ver Planos</a>
          <a href="#contato" className="btn-outline w-full sm:w-auto max-[600px]:px-5 max-[600px]:py-2.5 max-[600px]:text-sm min-[571px]:max-[799px]:px-5 min-[571px]:max-[799px]:py-2.5 min-[571px]:max-[799px]:text-sm">Fale Conosco</a>
        </div>
        
  <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-30">
          {imageConfig.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-brand-blue dark:bg-brand-lime shadow-lg scale-125'
                  : 'bg-white/40 dark:bg-white/20 hover:bg-white/60 dark:hover:bg-white/40'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
