import { NextRequest, NextResponse } from 'next/server'
// Dynamically import purge to avoid static type resolution issues in some configs

const GROK_ENDPOINT = process.env.GROK_ENDPOINT ?? ''
const GROK_API_KEY = process.env.GROK_API_KEY ?? ''

async function callGrok(system: string, knowledge: string, userMessage: string) {
  if (!GROK_ENDPOINT) {
    return { text: "Pantulu is not configured. Please set GROK_ENDPOINT and GROK_API_KEY." }
  }
  try {
    const res = await fetch(GROK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(GROK_API_KEY ? { 'Authorization': `Bearer ${GROK_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: 'grok-chat-model',
        messages: [
          { role: 'system', content: system },
          { role: 'system', content: knowledge },
          { role: 'user', content: userMessage }
        ]
      })
    })
    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content ?? data?.text ?? 'Sorry, I could not fetch a response.'
    return { text }
  } catch (e) {
    return { text: 'Error contacting Pantulu service.' }
  }
}

async function fetchKnowledge() {
  try {
    const resp = await fetch('/api/knowledge/products')
    if (!resp.ok) return ''
    const data = await resp.json()
    const items = data?.products ?? data?.value ?? []
    if (!Array.isArray(items)) return ''
    return 'Current catalog:\n' + items.map((p: any) => `- ${p.name} (${p.category ?? p.label}) ₹${p.price ?? ''}`).join('\n')
  } catch {
    return ''
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, knowledge } = await req.json()
    const system = `You are Pantulu, an AI assistant for Jammi Pharmaceuticals. You know every product in the store, including new products added by admins. Your role is to guide customers, suggest relevant products, compare options, and direct them to the right category and product pages. Be concise, friendly, and helpful. Ask clarifying questions when needed to tailor recommendations. If multiple products fit, present the top 3 with brief reasoning and links to product pages. If a user asks about stock or price, provide up-to-date guidance and point to alternatives if needed. When new products are added by admins, refresh your internal knowledge so you can recommend them immediately.`
    const liveKnowledge = (knowledge ?? '').trim()
    const finalKnowledge = liveKnowledge.length > 0 ? liveKnowledge : await fetchKnowledge()
    const resp = await callGrok(system, finalKnowledge, message ?? '')
    // Purge knowledge cache for the catalog so Pantulu sees latest products (inline, no dynamic import)
    try {
      const serviceId = process.env.FASTLY_SERVICE_ID
      const apiKey = process.env.FASTLY_API_KEY
      if (serviceId && apiKey) {
        const encoded = encodeURIComponent('/api/knowledge/products'.replace(/^\//, ''))
        await fetch(`https://api.fastly.com/service/${serviceId}/purge/${encoded}`, {
          method: 'POST',
          headers: { 'Fastly-Key': apiKey }
        })
      }
    } catch {
      // ignore purge errors
    }
    return NextResponse.json({ reply: resp.text ?? '' })
  } catch (e) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
