import { useState, useEffect, useLayoutEffect } from 'react'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Detecta tema inicial e monitora mudanças
  useLayoutEffect(() => {
    const checkTheme = () => {
      const darkMode = document.documentElement.classList.contains('dark')
      setIsDarkMode(darkMode)
    }
    
    // Detecta tema inicial
    checkTheme()
    
    // Monitora mudanças na classe do html
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])
  
  const slideContent = [
    {
      title: 'Internet Fibra Ultraveloz',
      subtitle: 'Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade. A Net7 entrega performance real.'
    },
    {
      title: 'Conexão Estável e Confiável',
      subtitle: 'Tecnologia de ponta que garante estabilidade 24/7. Sua internet sempre funcionando quando você mais precisa.'
    },
    {
      title: '',
      subtitle: ''
    }
  ]
  
  const lightImages = [
    { webp: '/hero-speed.webp', alt: 'Representação visual de alta velocidade' },
    { webp: '/hero-fibra.webp', alt: 'Fibra óptica representando tecnologia avançada' },
    { webp: '/hero-connection.webp', alt: 'Conexões de rede representando estabilidade' }
  ]
  
  const darkImages = [
    { webp: '/hero-connection-dark.webp', alt: 'Conexões de rede com efeitos verdes' },
    { webp: '/hero-fibra-dark.webp', alt: 'Fibra óptica com efeitos verdes' },
    { webp: '/hero-speed-dark.webp', alt: 'Velocidade representada com tons verdes' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative pt-20 pb-16 overflow-hidden min-h-[60vh] sm:min-h-[70vh]">
      {/* Container único para todas as imagens com background-size: cover */}
      <div className="absolute inset-0 z-0">
        {lightImages.map((lightImage, index) => {
          const isActive = index === currentImageIndex
          const currentImage = isDarkMode ? darkImages[index] : lightImages[index]
          
          return (
            <div
              key={`image-${index}-${isDarkMode ? 'dark' : 'light'}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-no-repeat ${
                isActive ? 'opacity-100' : 'opacity-0'
              } ${
                // Posicionamento específico por imagem para mobile e desktop
                index === 0 
                  ? 'bg-center' 
                  : index === 1 
                    ? 'bg-[center_25%] sm:bg-[center_30%]'
                    : 'bg-[center_15%] sm:bg-[center_20%]'
              } ${
                // Ajustes de brilho para tema dark
                isDarkMode 
                  ? 'brightness-110 contrast-105' 
                  : 'brightness-95 contrast-100'
              }`}
              style={{ 
                backgroundImage: `url(${currentImage.webp})`,
                zIndex: isActive ? 10 : 5
              }}
              role="img"
              aria-label={currentImage.alt}
            />
          )
        })}
      </div>
      
      {/* Overlays para tema claro - Otimizados para mobile */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-white/85 via-white/70 to-white/50 backdrop-blur-[1px] dark:hidden sm:from-white/70 sm:via-white/50 sm:to-white/30 sm:backdrop-blur-[2px]" />
      
      <div className={`absolute inset-0 z-21 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none`}>
        <div className="absolute w-[400px] h-[400px] sm:w-[880px] sm:h-[880px] -top-20 sm:-top-64 left-1/2 -translate-x-1/2 rounded-full opacity-50 sm:opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,94,148,0.55)_0%,transparent_62%)] blur-xl sm:blur-3xl" />
        <div className="absolute w-[350px] h-[350px] sm:w-[720px] sm:h-[720px] -bottom-10 sm:-bottom-40 left-1/2 -translate-x-1/2 rounded-full opacity-45 sm:opacity-25 bg-[radial-gradient(circle_at_center,rgba(173,204,5,0.55)_0%,transparent_70%)] blur-xl sm:blur-3xl mix-blend-overlay" />
      </div>
      
      <div className={`absolute inset-0 z-22 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_65%)] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.45)_0%,transparent_55%)] sm:[mask-image:radial-gradient(circle_at_center,black,transparent_70%)] sm:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,transparent_60%)] mix-blend-multiply`} />
      
      {/* Overlay para tema escuro - Otimizado para mobile */}
      <div className="absolute inset-0 z-20 bg-black/50 sm:bg-black/35 hidden dark:block" />

      <div className="container-section text-center relative z-30 flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[40vh] px-4 sm:px-6 py-8 sm:py-0">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center transition-all duration-1000 leading-tight ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <span className="text-gradient-invert-light">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(0, 2).join(' ') || 'Internet Fibra'}
          </span>{' '}
          <span className="text-neutral-900 dark:text-brand-light">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(2).join(' ') || 'Ultraveloz'}
          </span>
        </h1>
        
        <p className={`mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 dark:text-brand-light/80 text-center transition-all duration-1000 leading-relaxed ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {slideContent[currentImageIndex]?.subtitle || 'Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade. A Net7 entrega performance real.'}
        </p>
        
        <div className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <a href="#planos" className="btn-primary w-full sm:w-auto text-sm sm:text-base">Ver Planos</a>
          <a href="#contato" className="btn-outline w-full sm:w-auto text-sm sm:text-base">Fale Conosco</a>
        </div>
        
        <div className="mt-6 sm:mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-brand-blue dark:bg-brand-lime shadow-lg scale-125'
                  : 'bg-white/50 dark:bg-white/30 hover:bg-white/70 dark:hover:bg-white/50 sm:bg-white/40 sm:dark:bg-white/20 sm:hover:bg-white/60 sm:dark:hover:bg-white/40'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
