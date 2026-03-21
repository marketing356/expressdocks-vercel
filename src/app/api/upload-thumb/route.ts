import { NextRequest, NextResponse } from 'next/server'

// Temporary in-memory store for thumbnails (per-request, expires quickly)
// Vercel functions are stateless so this acts as a pass-through
export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json()
    
    if (!imageData || !imageData.startsWith('data:image')) {
      return NextResponse.json({ error: 'Invalid image data' }, { status: 400 })
    }

    // Extract base64 from data URL
    const base64 = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64, 'base64')

    // Upload to fal.ai storage via their initiate-upload endpoint
    const initResponse = await fetch('https://rest.alpha.fal.ai/storage/upload/initiate', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content_type: 'image/jpeg',
        file_name: `dock-thumb-${Date.now()}.jpg`,
      }),
    })

    if (initResponse.ok) {
      const { upload_url, file_url } = await initResponse.json()
      
      // Upload the file to the pre-signed URL
      await fetch(upload_url, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/jpeg' },
        body: buffer,
      })
      
      return NextResponse.json({ url: file_url })
    }

    // Fallback: return the base64 data URL directly (some endpoints accept it)
    return NextResponse.json({ url: imageData })
    
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
