export async function purgeAll(): Promise<boolean> {
  const serviceId = process.env.FASTLY_SERVICE_ID
  const apiKey = process.env.FASTLY_API_KEY
  if (!serviceId || !apiKey) return false
  try {
    const res = await fetch(`https://api.fastly.com/service/${serviceId}/purge_all`, {
      method: 'POST',
      headers: {
        'Fastly-Key': apiKey,
        'Accept': 'application/json'
      }
    })
    return res.ok
  } catch {
    return false
  }
}

export async function purgePath(path: string): Promise<boolean> {
  const serviceId = process.env.FASTLY_SERVICE_ID
  const apiKey = process.env.FASTLY_API_KEY
  if (!serviceId || !apiKey || !path) return false
  try {
    const clean = path.startsWith('/') ? path.slice(1) : path
    const encoded = encodeURIComponent(clean)
    const url = `https://api.fastly.com/service/${serviceId}/purge/${encoded}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Fastly-Key': apiKey, 'Accept': 'application/json' }
    })
    return res.ok
  } catch {
    return false
  }
}
