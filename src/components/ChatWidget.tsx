'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type Step = 1 | 2 | 3 | 4 | 'capture' | 'done'

const QUICK_REPLIES: Record<number, string[]> = {
  1: ['🏠 Lake House', '🌊 Ocean/Bay', '🌿 River/Canal', '🏢 Marina/Commercial'],
  2: ['🛥️ Boat Access', '🎣 Fishing', '🏊 Swimming/Leisure', '🚢 Multiple Boats', '🏗️ Commercial Use'],
  3: ['Small (under 200 sqft)', 'Medium (200–500 sqft)', 'Large (500+ sqft)', 'Not sure yet'],
  4: ['✅ Yes, send me the design', '📞 I\'d rather call'],
}

const GREETING = "Hi! I'm your ExpressDocks consultant. I can help you design the perfect dock and get you a free custom 3D design. What type of waterfront property do you have?"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>(1)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [captured, setCaptured] = useState(false)
  const [captureForm, setCaptureForm] = useState({ name: '', email: '' })
  const [captureSubmitting, setCaptureSubmitting] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, step])

  async function callApi(msgList: Message[]) {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgList }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
      }
      if (data.capture && !captured) {
        setCaptured(true)
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.capture.name, email: data.capture.email, details: 'Lead captured via AI Chat Widget' }),
        }).catch(() => {})
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I had a connection issue. Please call us at 800-370-2285.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function nextStep(s: Step): Step {
    if (s === 1) return 2
    if (s === 2) return 3
    if (s === 3) return 4
    return 'done'
  }

  async function handleQuickReply(reply: string) {
    if (loading) return

    if (reply.includes('Yes, send me the design')) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: reply },
        { role: 'assistant', content: "Perfect! Just need a couple details to send your free 3D design:" },
      ])
      setStep('capture')
      return
    }

    if (reply.includes("I'd rather call")) {
      const newMessages: Message[] = [...messages, { role: 'user', content: reply }]
      setMessages(newMessages)
      setStep('done')
      await callApi(newMessages)
      return
    }

    const newMessages: Message[] = [...messages, { role: 'user', content: reply }]
    setMessages(newMessages)
    setStep(nextStep(step))
    await callApi(newMessages)
  }

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    if (step !== 'capture' && step !== 'done') setStep(nextStep(step))
    await callApi(newMessages)
  }

  async function submitCapture(e: React.FormEvent) {
    e.preventDefault()
    const { name, email } = captureForm
    if (!name.trim() || !email.trim()) return
    setCaptureSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, details: 'Lead captured via AI Chat Widget – structured flow' }),
      })
    } catch {}
    setCaptured(true)
    setCaptureSubmitting(false)
    const confirm = `Thanks ${name}! Our team will send your free 3D dock design to ${email} within 48 hours. Is there anything else you'd like to know?`
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: `${name} · ${email}` },
      { role: 'assistant', content: confirm },
    ])
    setStep('done')
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const activeReplies =
    !loading && (step === 1 || step === 2 || step === 3 || step === 4)
      ? QUICK_REPLIES[step as number]
      : []

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open dock expert chat"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#3B4A8F', border: '2px solid #8A95C9',
          boxShadow: '0 4px 24px rgba(14,20,51,0.5)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EEF1FA" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EEF1FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed', bottom: '96px', right: '24px', zIndex: 9998,
            width: '360px', maxWidth: 'calc(100vw - 48px)',
            height: '540px', maxHeight: 'calc(100vh - 120px)',
            background: '#0E1433', border: '1px solid rgba(138,149,201,0.25)',
            borderRadius: '16px', display: 'flex', flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(14,20,51,0.7)',
            animation: 'chatSlideUp 0.25s ease',
          }}
        >
          <style>{`
            @keyframes chatSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>

          {/* Header */}
          <div style={{
            padding: '14px 18px', borderBottom: '1px solid rgba(138,149,201,0.2)',
            display: 'flex', alignItems: 'center', gap: '10px',
            borderRadius: '16px 16px 0 0', background: 'rgba(59,74,143,0.3)',
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3B4A8F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EEF1FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <div>
              <div style={{ color: '#EEF1FA', fontWeight: 600, fontSize: '14px' }}>ExpressDocks Expert</div>
              <div style={{ color: '#8A95C9', fontSize: '11px' }}>Dock specialist · Powered by AI</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ color: '#8A95C9', fontSize: '11px' }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? '#3B4A8F' : 'rgba(138,149,201,0.12)',
                  color: '#EEF1FA', fontSize: '13px', lineHeight: '1.5',
                  border: msg.role === 'assistant' ? '1px solid rgba(138,149,201,0.15)' : 'none',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Inline capture form */}
            {step === 'capture' && !captured && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <form
                  onSubmit={submitCapture}
                  style={{
                    background: 'rgba(138,149,201,0.08)', border: '1px solid rgba(138,149,201,0.2)',
                    borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px',
                    width: '100%',
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#8A95C9', marginBottom: '4px', fontWeight: 600 }}>First Name</label>
                    <input
                      required
                      value={captureForm.name}
                      onChange={(e) => setCaptureForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      style={{
                        width: '100%', padding: '8px 10px', borderRadius: '6px',
                        background: 'rgba(14,20,51,0.6)', border: '1px solid rgba(138,149,201,0.25)',
                        color: '#EEF1FA', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#8A95C9', marginBottom: '4px', fontWeight: 600 }}>Email Address</label>
                    <input
                      required
                      type="email"
                      value={captureForm.email}
                      onChange={(e) => setCaptureForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      style={{
                        width: '100%', padding: '8px 10px', borderRadius: '6px',
                        background: 'rgba(14,20,51,0.6)', border: '1px solid rgba(138,149,201,0.25)',
                        color: '#EEF1FA', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={captureSubmitting}
                    style={{
                      padding: '9px', borderRadius: '7px',
                      background: captureSubmitting ? 'rgba(59,74,143,0.5)' : '#3B4A8F',
                      border: 'none', color: '#EEF1FA', fontSize: '13px', fontWeight: 700,
                      cursor: captureSubmitting ? 'default' : 'pointer',
                    }}
                  >
                    {captureSubmitting ? 'Sending...' : 'Send Me My Free 3D Design →'}
                  </button>
                </form>
              </div>
            )}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px', borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(138,149,201,0.12)', border: '1px solid rgba(138,149,201,0.15)',
                  color: '#8A95C9', fontSize: '20px', letterSpacing: '2px',
                }}>···</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick reply chips */}
          {activeReplies.length > 0 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {activeReplies.map((r) => (
                <button
                  key={r}
                  onClick={() => handleQuickReply(r)}
                  style={{
                    padding: '6px 12px', borderRadius: '20px',
                    border: '1px solid rgba(138,149,201,0.35)',
                    background: 'rgba(59,74,143,0.15)',
                    color: '#EEF1FA', fontSize: '12px', cursor: 'pointer',
                    transition: 'background 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,74,143,0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(59,74,143,0.15)')}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px', borderTop: '1px solid rgba(138,149,201,0.2)',
            display: 'flex', gap: '8px', borderRadius: '0 0 16px 16px',
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={step === 'capture'}
              placeholder={step === 'capture' ? 'Fill in the form above…' : 'Or type your question…'}
              style={{
                flex: 1, background: 'rgba(138,149,201,0.1)',
                border: '1px solid rgba(138,149,201,0.2)', borderRadius: '8px',
                padding: '8px 12px', color: '#EEF1FA', fontSize: '13px', outline: 'none',
                opacity: step === 'capture' ? 0.5 : 1,
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim() || step === 'capture'}
              style={{
                width: '38px', height: '38px', borderRadius: '8px',
                background: loading || !input.trim() || step === 'capture' ? 'rgba(59,74,143,0.4)' : '#3B4A8F',
                border: 'none',
                cursor: loading || !input.trim() || step === 'capture' ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EEF1FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
