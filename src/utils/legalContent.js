const cache = {}

export async function loadLegalContent(locale = 'pt-BR') {
  if (cache[locale]) return cache[locale]
  let mod
  switch (locale) {
    case 'en-US':
      mod = await import('../content/legal/en-US.json')
      break
    case 'pt-BR':
    default:
      mod = await import('../content/legal/pt-BR.json')
  }
  cache[locale] = mod.default
  return mod.default
}
