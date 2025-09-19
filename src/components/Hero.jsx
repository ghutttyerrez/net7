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
    <section id="hero" className="relative pt-20 pb-16 overflow-hidden">
      {/* Container único para todas as imagens */}
      <div className="absolute inset-0 z-0">
        {lightImages.map((lightImage, index) => {
          const isActive = index === currentImageIndex
          const currentImage = isDarkMode ? darkImages[index] : lightImages[index]
          
          return (
            <img
              key={`image-${index}-${isDarkMode ? 'dark' : 'light'}`}
              src={currentImage.webp}
              alt={currentImage.alt}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              } ${index === 2 ? 'object-cover object-top' : index === 0 ? 'object-contain object-center' : 'object-cover object-center'}`}
              style={{ 
                zIndex: isActive ? 10 : 5,
                visibility: 'visible',
                display: 'block'
              }}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
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

      <div className="container-section text-center relative z-30 flex flex-col items-center justify-center min-h-[40vh]">
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-center transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <span className="text-gradient-invert-light">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(0, 2).join(' ') || 'Internet Fibra'}
          </span>{' '}
          <span className="text-neutral-900 dark:text-brand-light">
            {slideContent[currentImageIndex]?.title?.split(' ').slice(2).join(' ') || 'Ultraveloz'}
          </span>
        </h1>
        
        <p className={`mt-6 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-brand-light/80 text-center transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {slideContent[currentImageIndex]?.subtitle || 'Conecte sua casa e seu negócio com estabilidade, baixa latência e suporte humano de verdade. A Net7 entrega performance real.'}
        </p>
        
        <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto sm:max-w-none transition-all duration-1000 ${
          currentImageIndex === 2 ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <a href="#planos" className="btn-primary w-full sm:w-auto">Ver Planos</a>
          <a href="#contato" className="btn-outline w-full sm:w-auto">Fale Conosco</a>
        </div>
        
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
