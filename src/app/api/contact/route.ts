import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sales@ribitboats.com',
    pass: 'udjx opyc rjab errg',
  },
})

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
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Submitted</td><td style="padding:8px;border:1px solid #ddd">${new Date().toISOString()}</td></tr>
      </table>
    `

    await transporter.sendMail({
      from: '"ExpressDocks Website" <sales@ribitboats.com>',
      to: 'info@expressdocks.com',
      replyTo: email || 'info@expressdocks.com',
      subject: `New Dock Quote Request — ${name || 'Unknown'} (${dockType || 'Unknown type'})`,
      html,
    })

    return NextResponse.json({ success: true, message: 'Thank you! We will contact you within 24 hours.' })
  } catch (e) {
    console.error('Contact form error:', e)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please call us at 800-370-2285.' }, { status: 500 })
  }
}
