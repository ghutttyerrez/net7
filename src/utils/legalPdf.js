// Carregamento dinâmico para reduzir bundle inicial
async function dynJsPDF() {
  const mod = await import('jspdf')
  return mod.jsPDF
}

async function loadContent(locale) {
  switch (locale) {
    case 'en-US':
      return (await import('../content/legal/en-US.json')).default
    case 'pt-BR':
    default:
      return (await import('../content/legal/pt-BR.json')).default
  }
}

function addWrapped(doc, text, y, maxWidth = 170, lineHeight = 6, fontSize = 11) {
  if (!text) return y
  doc.setFontSize(fontSize)
  const lines = doc.splitTextToSize(text, maxWidth)
  lines.forEach(line => { doc.text(line, 20, y); y += lineHeight })
  return y + 2
}

async function sha256(text) {
  const enc = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')
}

export async function generateLegalPdf(type = 'privacy', locale = 'pt-BR') {
  const all = await loadContent(locale)
  const map = { privacy: all.privacy, terms: all.terms, cookies: all.cookies }
  const content = map[type]
  if (!content) throw new Error('Tipo inválido')
  const JsPDF = await dynJsPDF()
  const doc = new JsPDF({ unit: 'pt', format: 'a4' })
  let y = 40
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(`${content.title} (v${content.version || '1'})`, 40, y)
  y += 24
  doc.setFont('helvetica', 'normal')
  y = addWrapped(doc, content.intro, y, 515, 14, 11)
  content.sections.forEach(sec => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    y += 6
    doc.text(sec.title, 40, y)
    y += 18
    doc.setFont('helvetica', 'normal')
    if (sec.body) y = addWrapped(doc, sec.body, y, 515, 14, 11)
    if (sec.list) {
      sec.list.forEach(item => {
        const lines = doc.splitTextToSize('- ' + item, 500)
        lines.forEach(line => { doc.text(line, 50, y); y += 14 })
        y += 2
      })
    }
    if (y > 760) { doc.addPage(); y = 40 }
  })
  y = addWrapped(doc, content.disclaimer, y, 515, 14, 10)
  // Hash de integridade simples sobre o JSON serializado da policy
  try {
    const integrity = await sha256(JSON.stringify(content))
    doc.setFont('helvetica','italic')
    doc.setFontSize(8)
    if (y > 760) { doc.addPage(); y = 40 }
    doc.text(`Integridade: ${integrity.slice(0,32)}…  Locale: ${locale}`, 40, y + 10)
  } catch { /* ignore hash errors */ }
  const fileName = `${content.title.replace(/\s+/g,'_')}_${locale}.pdf`
  doc.save(fileName)
  return fileName
}
