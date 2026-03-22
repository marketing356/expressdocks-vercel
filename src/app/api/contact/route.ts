import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, phone, zip, dockType, waterfrontType, sqft, details } = data

    const html = `
      <h2 style="color:#0E1433">New ExpressDocks Lead</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">ZIP</td><td style="padding:8px;border:1px solid #ddd">${zip || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Dock Type</td><td style="padding:8px;border:1px solid #ddd">${dockType || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Waterfront</td><td style="padding:8px;border:1px solid #ddd">${waterfrontType || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Sq Footage</td><td style="padding:8px;border:1px solid #ddd">${sqft || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Details</td><td style="padding:8px;border:1px solid #ddd">${details || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Submitted</td><td style="padding:8px;border:1px solid #ddd">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</td></tr>
      </table>
    `

    const { data: result, error } = await resend.emails.send({
      from: 'ExpressDocks Website <info@expressdocks.com>',
      to: ['info@expressdocks.com'],
      replyTo: email || undefined,
      subject: `New Lead: ${name || 'Website Contact'}`,
      html: html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: result?.id })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
