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
    <section id="hero" className="relative pt-20 pb-16 overflow-hidden min-h-[60vh] sm:min-h-[75vh]">
      {/* Container otimizado para imagens responsivas */}
      <div className="absolute inset-0 z-0">
        {lightImages.map((lightImage, index) => {
          const isActive = index === currentImageIndex
          const currentImage = isDarkMode ? darkImages[index] : lightImages[index]
          
          return (
            <div key={`wrapper-${index}-${isDarkMode ? 'dark' : 'light'}`} className="absolute inset-0">
              <img
                key={`image-${index}-${isDarkMode ? 'dark' : 'light'}`}
                src={currentImage.webp}
                alt={currentImage.alt}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                } ${
                  // Otimização avançada por imagem e responsividade
                  index === 0 
                    ? 'object-cover object-center scale-[1.05] sm:scale-100' 
                    : index === 1 
                      ? 'object-cover object-[center_35%] scale-[1.08] sm:scale-100 sm:object-[center_25%] md:object-[center_20%]' 
                      : 'object-cover object-[center_20%] scale-[1.06] sm:scale-100 sm:object-[center_15%] md:object-[center_10%]'
                } ${
                  // Ajustes de qualidade visual por tema
                  isDarkMode 
                    ? 'brightness-[1.15] contrast-[1.08] saturate-[1.05]' 
                    : 'brightness-[0.92] contrast-[1.02] saturate-[0.98]'
                }`}
                style={{ 
                  zIndex: isActive ? 10 : 5,
                  // Melhoria da qualidade de renderização
                  imageRendering: 'high-quality',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  // Otimização para mobile
                  willChange: isActive ? 'transform, opacity' : 'auto',
                  transform: 'translateZ(0)' // Force hardware acceleration
                }}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              
              {/* Overlay individual por imagem para melhor controle */}
              <div 
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                } ${
                  // Overlay específico por imagem em mobile
                  index === 0 
                    ? 'bg-gradient-to-b from-black/10 via-transparent to-black/15 sm:from-black/5 sm:to-black/10' 
                    : index === 1 
                      ? 'bg-gradient-to-t from-black/20 via-transparent to-black/10 sm:from-black/15 sm:to-black/5' 
                      : 'bg-gradient-to-b from-black/15 via-black/5 to-black/20 sm:from-black/10 sm:to-black/15'
                } ${isDarkMode ? 'opacity-40' : 'opacity-60'}`}
                style={{ zIndex: isActive ? 15 : 8 }}
              />
            </div>
          )
        })}
          )
      </div>
      
      {/* Overlays globais otimizados para legibilidade */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-white/90 via-white/75 to-white/60 backdrop-blur-[0.5px] dark:hidden sm:from-white/80 sm:via-white/60 sm:to-white/45 sm:backdrop-blur-[1px]" />
      
      {/* Overlays dinâmicos por slide para tema claro */}
      <div className={`absolute inset-0 z-21 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none`}>
        <div className="absolute w-[500px] h-[500px] sm:w-[900px] sm:h-[900px] -top-20 sm:-top-40 left-1/2 -translate-x-1/2 rounded-full opacity-35 sm:opacity-25 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.4)_0%,transparent_65%)] blur-2xl sm:blur-3xl" />
        <div className="absolute w-[400px] h-[400px] sm:w-[750px] sm:h-[750px] -bottom-10 sm:-bottom-20 left-1/2 -translate-x-1/2 rounded-full opacity-30 sm:opacity-20 bg-[radial-gradient(circle_at_center,rgba(132,204,22,0.4)_0%,transparent_70%)] blur-2xl sm:blur-3xl mix-blend-overlay" />
      </div>
      
      <div className={`absolute inset-0 z-21 transition-opacity duration-1000 ${currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none`}>
        <div className="absolute w-[450px] h-[450px] sm:w-[800px] sm:h-[800px] top-0 sm:-top-20 left-1/2 -translate-x-1/2 rounded-full opacity-25 sm:opacity-15 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35)_0%,transparent_60%)] blur-xl sm:blur-3xl" />
      </div>
      
      <div className={`absolute inset-0 z-21 transition-opacity duration-1000 ${currentImageIndex === 2 ? 'opacity-100' : 'opacity-0'} dark:hidden pointer-events-none`}>
        <div className="absolute w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] top-10 sm:top-0 left-1/2 -translate-x-1/2 rounded-full opacity-30 sm:opacity-20 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.3)_0%,transparent_65%)] blur-xl sm:blur-2xl" />
      </div>
      
      {/* Overlay central para melhorar legibilidade do texto */}
      <div className="absolute inset-0 z-22 pointer-events-none dark:hidden [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_0%,transparent_60%)] sm:[mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_75%)] sm:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,transparent_65%)]" />
      
      {/* Overlay otimizado para tema escuro */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/45 to-black/35 hidden dark:block sm:from-black/50 sm:via-black/35 sm:to-black/25" />

      <div className="container-section text-center relative z-30 flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[45vh] px-4 sm:px-6 py-6 sm:py-8">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center transition-all duration-1000 leading-tight mb-1 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <span className="text-gradient-invert-light drop-shadow-sm">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(0, 2).join(' ') || 'Internet Fibra'}
          </span>{' '}
          <span className="text-neutral-900 dark:text-brand-light drop-shadow-sm">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(2).join(' ') || 'Ultraveloz'}
          </span>
        </h1>
        
        <p className={`mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg text-neutral-700 dark:text-brand-light/90 text-center transition-all duration-1000 leading-relaxed drop-shadow-sm ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {slideContent[currentImageIndex]?.subtitle || 'Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade. A Net7 entrega performance real.'}
        </p>
        
        <div className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <a href="#planos" className="btn-primary w-full sm:w-auto text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow">Ver Planos</a>
          <a href="#contato" className="btn-outline w-full sm:w-auto text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow">Fale Conosco</a>
        </div>
        
        <div className="mt-8 sm:mt-10 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-brand-blue dark:bg-brand-lime shadow-lg scale-125 ring-2 ring-white/50 dark:ring-black/30'
                  : 'bg-white/60 dark:bg-white/40 hover:bg-white/80 dark:hover:bg-white/60 shadow-md hover:shadow-lg hover:scale-110'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
