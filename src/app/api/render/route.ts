import { NextRequest, NextResponse } from 'next/server'

const FAL_KEY = process.env.FAL_API_KEY ?? '4db9a2f7-e681-43e2-9ce9-fae4045e1e20:d846c178304e2325cba7125d3171c647'

const COLOR_NAMES: Record<string, string> = {
  '#8b6914': 'warm teak',
  '#7a7a7a': 'slate grey',
  '#5c3d1e': 'rich walnut',
  '#1a1a1a': 'matte black',
  '#a0522d': 'natural cedar',
  '#9e8b6b': 'weathered driftwood',
}

function getShapeDescription(sections: { x: number; y: number; width: number; height: number }[]): { shape: string; dims: string } {
  if (!sections.length) return { shape: 'rectangular', dims: '20 x 8 ft' }

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const s of sections) {
    minX = Math.min(minX, s.x)
    minY = Math.min(minY, s.y)
    maxX = Math.max(maxX, s.x + s.width)
    maxY = Math.max(maxY, s.y + s.height)
  }

  const totalW = maxX - minX
  const totalH = maxY - minY
  const dims = `${totalW} x ${totalH} ft`
  const ratio = totalW / Math.max(totalH, 1)

  let shape = 'rectangular'
  if (sections.length === 1) {
    if (ratio > 2.5) shape = 'long straight'
    else if (ratio < 0.4) shape = 'narrow finger'
    else shape = 'rectangular'
  } else {
    if (ratio > 3) shape = 'long straight finger pier'
    else shape = 'L-shaped multi-section'
  }

  return { shape, dims }
}

export async function POST(req: NextRequest) {
  try {
    const { sections, totalSqft, dockType, color } = await req.json()

    const colorKey = (color ?? '').toLowerCase()
    const colorName = COLOR_NAMES[colorKey] ?? 'teak'
    const { shape, dims } = getShapeDescription(sections ?? [])

    const prompt = `Photorealistic image of a premium aluminum floating dock with ${colorName} WPC composite decking, ${shape} layout approximately ${dims}, floating on calm blue reflective lake water, sunny day, slightly elevated aerial perspective, professional real estate photography style, ultra sharp focus, cinematic lighting`

    const response = await fetch('https://fal.run/fal-ai/flux/dev', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        image_size: 'landscape_4_3',
        num_images: 1,
        num_inference_steps: 28,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('fal.ai error:', response.status, err)
      return NextResponse.json({ error: 'Render failed' }, { status: 500 })
    }

    const data = await response.json()
    const imageUrl = data?.images?.[0]?.url ?? data?.image?.url ?? null

    if (!imageUrl) {
      console.error('fal.ai: no image URL in response', JSON.stringify(data))
      return NextResponse.json({ error: 'No image returned' }, { status: 500 })
    }

    return NextResponse.json({ imageUrl })
  } catch (e) {
    console.error('Render route error:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
