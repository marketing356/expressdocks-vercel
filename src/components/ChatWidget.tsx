'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GREETING = "Hi! I'm Wade, your ExpressDocks design consultant. What can I help you with today?"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [captured, setCaptured] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

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
        // Send lead to contact API
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.capture.name || 'Chat Lead',
            email: data.capture.email || '',
            phone: data.capture.phone || '',
            message: `Lead captured via Wade chat. Conversation:\n${msgList.map(m => `${m.role}: ${m.content}`).join('\n')}`,
          }),
        }).catch(() => {})
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I had a connection issue. You can also call us at 800-370-2285.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || loading) return
    const newMsg: Message = { role: 'user', content: trimmed }
    const updated = [...messages, newMsg]
    setMessages(updated)
    setInput('')
    callApi(updated)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Quick reply suggestions
  const quickReplies = messages.length <= 2 ? [
    'I need a dock for my lake house',
    'How much does a dock cost?',
    'What sizes do you offer?',
    'I have questions about installation',
  ] : []

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Wade"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B4A8F 0%, #2A3A7F 100%)',
            border: 'none',
            boxShadow: '0 4px 20px rgba(59,74,143,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)'
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(59,74,143,0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,74,143,0.5)'
          }}
        >
          {/* Hard hat icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EEF1FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
            <path d="M10 15V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v9"/>
            <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
          </svg>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '520px',
            maxHeight: 'calc(100vh - 100px)',
            background: 'linear-gradient(180deg, #0E1433 0%, #141B3D 100%)',
            borderRadius: '16px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(138,149,201,0.2)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #3B4A8F 0%, #2A3A7F 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {/* Wade avatar */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EEF1FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
                <path d="M10 15V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v9"/>
                <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#EEF1FA', fontSize: '16px' }}>Wade</div>
              <div style={{ fontSize: '12px', color: 'rgba(238,241,250,0.7)' }}>ExpressDocks Design Consultant</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EEF1FA',
                fontSize: '18px',
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #3B4A8F 0%, #4A5BA0 100%)'
                    : 'rgba(138,149,201,0.12)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(138,149,201,0.15)',
                  color: '#EEF1FA',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 20px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(138,149,201,0.12)',
                  border: '1px solid rgba(138,149,201,0.15)',
                  color: '#8A95C9',
                  fontSize: '20px',
                  letterSpacing: '4px',
                }}>
                  •••
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && !loading && (
            <div style={{
              padding: '0 16px 12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const newMsg: Message = { role: 'user', content: reply }
                    const updated = [...messages, newMsg]
                    setMessages(updated)
                    callApi(updated)
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: '1px solid rgba(138,149,201,0.3)',
                    background: 'rgba(138,149,201,0.08)',
                    color: '#8A95C9',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(138,149,201,0.15)'
                    e.currentTarget.style.borderColor = 'rgba(138,149,201,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(138,149,201,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(138,149,201,0.3)'
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px 16px',
            borderTop: '1px solid rgba(138,149,201,0.15)',
            display: 'flex',
            gap: '10px',
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: '1px solid rgba(138,149,201,0.25)',
                background: 'rgba(14,20,51,0.6)',
                color: '#EEF1FA',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: loading || !input.trim() ? 'rgba(59,74,143,0.4)' : '#3B4A8F',
                border: 'none',
                cursor: loading || !input.trim() ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EEF1FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
