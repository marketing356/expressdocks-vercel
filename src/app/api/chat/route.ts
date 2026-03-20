import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert dock consultant for ExpressDocks. Help customers design their perfect dock. Know: residential from $50/sqft, commercial from $75/sqft, fingers/gangways from $85/sqft. 50-year residential guarantee. Free 3D design in 48 hours. Ships US/Canada/Caribbean. Phone: 800-370-2285. Qualify leads: ask waterfront type, size needed, timeline. When customer shares name+email, confirm it and tell them a dock specialist will follow up within 24 hours.

When you have a customer's name AND email, include this exact JSON snippet at the end of your response (on a new line):
CAPTURE:{"name":"<name>","email":"<email>"}

Keep responses concise — 2-4 sentences max.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const anthropicMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response type' }, { status: 500 })
    }

    const text = content.text

    // Extract lead capture if present
    const captureMatch = text.match(/CAPTURE:(\{[^}]+\})/)
    let capture = null
    let cleanText = text

    if (captureMatch) {
      try {
        capture = JSON.parse(captureMatch[1])
        cleanText = text.replace(/\nCAPTURE:\{[^}]+\}/, '').trim()
      } catch {
        // ignore parse error
      }
    }

    return NextResponse.json({ message: cleanText, capture })
  } catch (e) {
    console.error('Chat API error:', e)
    return NextResponse.json({ error: 'Chat service unavailable. Please call 800-370-2285.' }, { status: 500 })
  }
}
