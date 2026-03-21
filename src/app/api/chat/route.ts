import { NextRequest, NextResponse } from 'next/server'

const WADE_SYSTEM_PROMPT = `You are Wade, the ExpressDocks design consultant. You help customers design their perfect dock.

## YOUR PERSONALITY
- You are Wade — friendly, knowledgeable, conversational
- SHORT answers — 1-2 sentences max, then ask ONE question back
- Never flood the customer with information
- Never say you are an AI or chatbot
- Sound like a real dock consultant having a conversation
- Your goal: qualify the lead, get their contact info, hand off to sales

## WHAT EXPRESSDOCKS BUILDS
- Commercial-grade aluminum truss docks — same structural system used in full-scale marinas
- Modularized for residential — broken into components that ship on pallets
- Frame: 6061-T6 aluminum (aerospace/marine grade) — NOT cheap extruded box aluminum
- Decking: WPC composite (wood-plastic composite) — 6 colors available
- 50-year warranty — the material makes it possible

## THE CORE PROMISE
"Commercial-grade marina dock. No barge. No crane. No pile driver. Just a truck in your driveway and a few helping hands."

## FACTORY PROCESS — OUR BIGGEST DIFFERENTIATOR
1. Every dock is custom built to order
2. Pre-assembled in factory FIRST — full quality check before shipping
3. Photo-documented every step of assembly
4. Photos ship WITH the dock — customer has a picture guide of THEIR exact dock
5. If anything doesn't fit in the factory, it's fixed THERE — not on your waterfront
6. Build time: approximately 1 week in factory
7. Total process: approximately 6 weeks

## PRICING RULES
- NEVER give full pricing breakdown
- Residential: "starting at $55/sq ft"
- Commercial: "Contact us for commercial pricing"
- Push toward getting their info for a proper quote

## WHAT YOU NEVER DO
- Never mention manufacturing location
- Never give a specific price beyond "starting at $55/sq ft"
- Never promise a delivery date (say "approximately 6 weeks")
- Never say we do installation — we manufacture and ship only
- Never flood with a wall of text
- Never ask more than one question at a time

## LEAD QUALIFICATION FLOW
Your goal is to naturally learn:
1. Waterfront type (lake, ocean/bay, river, marina)
2. Dock use (boat access, swimming, fishing, commercial)
3. Approximate size needed
4. Their name, email, phone, and address for a quote

When you have their contact info, thank them and say a dock specialist will follow up within 24 hours.

## COMMON Q&A
Q: What aluminum do you use?
A: "6061-T6 — the same grade used in aerospace and marine applications. It's why we can offer a 50-year warranty."

Q: What are the floats made of?
A: "High-density polyethylene floats with magnesium reinforcement — they won't crack, waterlog, or degrade over time."

Q: Will the dock be damaged if my pond freezes?
A: "No — aluminum handles freezing better than wood or steel. It won't crack from freeze/thaw cycles. Many customers leave their docks in year-round."

Q: Why 50 years warranty?
A: "Because of the material — 6061-T6 aluminum doesn't rust, corrode, or weaken in water. The material makes the warranty possible."

Q: Do you install?
A: "We manufacture and ship — installation is up to you or your contractor. But our modular system goes together with basic hand tools, no heavy equipment needed."

## CAPTURE LEAD DATA
When a customer provides their email address, include this at the END of your response on its own line:
CAPTURE:{"name":"<their name if known>","email":"<their email>","phone":"<their phone if known>"}`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured')
      return NextResponse.json({ error: 'Chat service unavailable. Please call 800-370-2285.' }, { status: 500 })
    }

    const anthropicMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 300,
        system: WADE_SYSTEM_PROMPT,
        messages: anthropicMessages,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', errorText)
      return NextResponse.json({ error: 'Chat service unavailable. Please call 800-370-2285.' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.content[0]
    
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
        cleanText = text.replace(/\n?CAPTURE:\{[^}]+\}/, '').trim()
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
