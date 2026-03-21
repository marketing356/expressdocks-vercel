import { NextRequest, NextResponse } from 'next/server'

const FAL_KEY = process.env.FAL_API_KEY ?? 'a769657e-785f-4a20-b65b-4eff4fd60678:822b07002bcfcff48e2f2fa9e56e415a'

export async function POST(req: NextRequest) {
  try {
    const { totalSqft, color } = await req.json()

    const COLOR_NAMES: Record<string, string> = {
      '#8b6914': 'warm teak brown',
      '#7a7a7a': 'slate grey',
      '#5c3d1e': 'rich dark walnut',
      '#1a1a1a': 'matte black',
      '#a0522d': 'natural cedar',
      '#9e8b6b': 'driftwood beige',
      '#8b3a3a': 'redwood',
    }

    const colorKey = (color ?? '').toLowerCase()
    const colorName = COLOR_NAMES[colorKey] ?? 'teak brown'

    // Generate a clean waterfront background — NO dock in it
    // The dock will be composited client-side with exact geometry
    const prompt = `Photorealistic aerial drone photograph looking straight down at a beautiful American lake waterfront property. Luxury home with green manicured lawn at the water's edge on the left side. Crystal clear blue-green calm lake water occupying the right two-thirds of the image. No dock, no boat, no people. Golden hour warm lighting. Ultra sharp, 8K, professional aerial photography. The water surface should be calm and clear for a dock to be placed on it.`

    const response = await fetch('https://fal.run/fal-ai/flux-pro', {
      method: 'POST',
      headers: { 'Authorization': `Key ${FAL_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        image_size: 'landscape_16_9',
        num_images: 1,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        safety_tolerance: '2',
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('fal.ai error:', err)
      return NextResponse.json({ error: 'Background generation failed' }, { status: 500 })
    }

    const data = await response.json()
    const bgUrl = data?.images?.[0]?.url ?? null

    if (!bgUrl) {
      return NextResponse.json({ error: 'No background image returned' }, { status: 500 })
    }

    // Return background URL — client will composite dock shape on top
    return NextResponse.json({ 
      backgroundUrl: bgUrl,
      compositeMode: true, // tells client to do the compositing
      colorName,
      totalSqft,
    })

  } catch (err) {
    console.error('Render route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
