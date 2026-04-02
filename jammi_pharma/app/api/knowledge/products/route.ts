import { NextResponse } from 'next/server'

async function fetchFromConvex() {
  try {
    const res = await fetch(`${process.env.CONVEX_URL || 'https://cheerful-rhinoceros-28.convex.cloud'}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: 'functions/products:listProducts', args: { status: 'published' }, format: 'json' })
    })
    const data = await res.json()
    return data?.value ?? []
  } catch {
    return []
  }
}

export async function GET() {
  const products = await fetchFromConvex()
  return NextResponse.json({ products })
}
