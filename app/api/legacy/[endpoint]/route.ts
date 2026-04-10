import { NextRequest } from 'next/server'

export async function POST(req: NextRequest, context: { params: { endpoint: string } }) {
   const endpoint = context.params.endpoint
   const target = `/api/${endpoint}`
   const bodyText = await req.text()
  const res = await fetch(target, {
     method: req.method,
     headers: req.headers,
     body: bodyText
   })
   const text = await res.text()
  return new Response(text, {
     status: res.status,
     headers: res.headers
   })
 }

export async function GET(req: NextRequest, context: { params: { endpoint: string } }) {
   const endpoint = context.params.endpoint
   const target = `/api/${endpoint}`
  const res = await fetch(target, { method: req.method, headers: req.headers })
   const text = await res.text()
   return new Response(text, {
     status: res.status,
     headers: res.headers
   })
 }
