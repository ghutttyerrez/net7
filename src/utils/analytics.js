// Simple analytics event dispatcher.
// In the future you can bridge this to GA4, Plausible etc.
const queue = []
let initialized = false

function sendToConsole(evt) {
  // Vite substitui import.meta.env.PROD
  if (!import.meta.env.PROD) {
    console.log('%c[analytics]', 'color:#2563eb;font-weight:bold', evt)
  }
}

export function initAnalytics() {
  if (initialized) return
  initialized = true
  // Flush queued events if any
  while (queue.length) {
    const ev = queue.shift()
    dispatch(ev)
  }
}

function dispatch(evt) {
  // Placeholder: here you could send fetch('/analytics', {method:'POST', body: JSON.stringify(evt)})
  sendToConsole(evt)
}

export function trackEvent(name, details = {}) {
  const evt = {
    name,
    details,
    ts: Date.now(),
  }
  if (!initialized) {
    queue.push(evt)
  } else {
    dispatch(evt)
  }
}

// Auto init on load (optional). You may remove and call manually.
if (typeof window !== 'undefined') {
  initAnalytics()
}
