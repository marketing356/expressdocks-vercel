import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const lead = { ...data, submittedAt: new Date().toISOString() }
    
    // Save to leads file
    const leadsFile = path.join('/tmp', 'expressdocks-leads.json')
    let leads = []
    try {
      const existing = fs.readFileSync(leadsFile, 'utf-8')
      leads = JSON.parse(existing)
    } catch {}
    leads.push(lead)
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2))
    
    return NextResponse.json({ success: true, message: 'Thank you! We will contact you within 24 hours.' })
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Something went wrong. Please call us at 800-370-2285.' }, { status: 500 })
  }
}
