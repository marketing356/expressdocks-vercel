import { NextRequest, NextResponse } from 'next/server'

const FAL_KEY = process.env.FAL_API_KEY ?? 'a769657e-785f-4a20-b65b-4eff4fd60678:822b07002bcfcff48e2f2fa9e56e415a'

const COLOR_NAMES: Record<string, string> = {
  '#8b6914': 'warm teak',
  '#7a7a7a': 'slate grey',
  '#5c3d1e': 'rich walnut',
  '#1a1a1a': 'matte black',
  '#a0522d': 'natural cedar',
  '#9e8b6b': 'weathered driftwood',
}

function getShapeDescription(sections: { x: number; y: number; width: number; height: number }[]): { shape: string; dims: string } {
  if (!sections.length) return { shape: 'single rectangular floating dock platform', dims: '20ft wide by 8ft deep' }

  // Build exact dimension description for each section
  const sectionDescs = sections.map((s, i) => {
    const w = Math.round(s.width)
    const h = Math.round(s.height)
    const sqft = w * h
    if (sections.length === 1) return `${w}ft wide by ${h}ft deep (${sqft} sq ft)`
    return `section ${i + 1}: ${w}ft × ${h}ft`
  })

  // Determine overall shape
  let shape = ''
  if (sections.length === 1) {
    const s = sections[0]
    const ratio = s.width / Math.max(s.height, 1)
    if (Math.abs(ratio - 1) < 0.2) shape = `square floating dock platform, ${sectionDescs[0]}`
    else if (ratio > 2) shape = `long straight dock pier, ${sectionDescs[0]}`
    else shape = `rectangular floating dock platform, ${sectionDescs[0]}`
  } else if (sections.length === 2) {
    shape = `L-shaped dock system with two connected sections: ${sectionDescs.join(' and ')}`
  } else if (sections.length === 3) {
    shape = `T-shaped or U-shaped dock system with three connected sections: ${sectionDescs.join(', ')}`
  } else {
    shape = `custom multi-section dock system with ${sections.length} connected sections: ${sectionDescs.join(', ')}`
  }

  // Total bounding dimensions
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const s of sections) {
    minX = Math.min(minX, s.x); minY = Math.min(minY, s.y)
    maxX = Math.max(maxX, s.x + s.width); maxY = Math.max(maxY, s.y + s.height)
  }
  const dims = `overall footprint approximately ${Math.round(maxX - minX)}ft × ${Math.round(maxY - minY)}ft`

  return { shape, dims }
}

export async function POST(req: NextRequest) {
  try {
    const { sections, totalSqft, dockType, color } = await req.json()

    const colorKey = (color ?? '').toLowerCase()
    const colorName = COLOR_NAMES[colorKey] ?? 'teak'
    const { shape, dims } = getShapeDescription(sections ?? [])

    const prompt = `Stunning aerial photograph of a custom aluminum floating dock with ${colorName} WPC composite decking attached to a beautiful waterfront home. ${shape} layout approximately ${dims}, totaling ${totalSqft} square feet. Luxury lake house or waterfront home visible on shore with green lawn leading to the dock. Crystal clear blue water, golden hour lighting, photorealistic, 8K, professional architectural photography, no people, calm water reflections, beautiful American waterfront setting`

    const response = await fetch('https://fal.run/fal-ai/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
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
      console.error('fal.ai error:', response.status, err)
      return NextResponse.json({ error: 'Render failed' }, { status: 500 })
    }

    const data = await response.json()
    const imageUrl = data?.images?.[0]?.url ?? null

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image returned' }, { status: 500 })
    }

    return NextResponse.json({ imageUrl })
  } catch (e) {
    console.error('Render route error:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
