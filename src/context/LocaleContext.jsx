import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LocaleContext = createContext({ locale: 'pt-BR', setLocale: () => {} })
const LS_KEY = 'net7_locale'

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState('pt-BR')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY)
      if (saved) setLocaleState(saved)
    } catch { /* ignore missing localStorage */ }
  }, [])

  const setLocale = useCallback(l => {
    setLocaleState(l)
  try { localStorage.setItem(LS_KEY, l) } catch { /* ignore quota */ }
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
