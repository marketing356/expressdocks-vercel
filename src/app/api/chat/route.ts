import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert dock consultant for ExpressDocks, a factory-direct aluminum floating dock company. You guide customers through a structured consultation to help them design their perfect dock.

PRICING:
- Residential docks: from $50/sqft (50-year guarantee)
- Commercial / Marina docks: from $75/sqft
- Finger docks & gangways: from $85/sqft
- Free Dock Builder tool — design your dock instantly
- Ships to US, Canada & Caribbean
- Phone: 800-370-2285

CONVERSATION FLOW — follow these steps in order:
1. After the customer shares their waterfront type (lake, ocean/bay, river/canal, marina/commercial), respond warmly and ask: "Great! How do you plan to use your dock?" Keep it to 1-2 sentences.
2. After they share their dock use (boat access, fishing, swimming, multiple boats, commercial), acknowledge it and ask: "What size dock are you thinking? Don't worry if you're not sure — we can help." 1-2 sentences.
3. After they share a size (small under 200sqft, medium 200-500sqft, large 500+sqft, or unsure), give a brief pricing estimate based on their waterfront type (residential vs commercial rate), then ask: "Would you like a free layout recommendation using our Dock Builder?" 2-3 sentences max.
4. If they say yes to the design or share their name+email, confirm and tell them a dock specialist will follow up within 24 hours.
5. If they'd rather call, give the phone number 800-370-2285 enthusiastically and offer to answer any questions.

RULES:
- Keep every response to 2-3 sentences max. Never use bullet points unless listing products.
- Be warm, consultative, and knowledgeable — not salesy.
- If the user types freely (not following the flow), answer their question helpfully and steer back to the next step naturally.
- When a customer mentions both their name AND email in the same message, include this at the end of your response on a new line:
CAPTURE:{"name":"<name>","email":"<email>"}`

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
