'use client'

import { Component, ReactNode } from 'react'

interface State { crashed: boolean; error: string }

export default class ThreeErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { crashed: false, error: '' }

  static getDerivedStateFromError(e: Error): State {
    return { crashed: true, error: e.message }
  }

  render() {
    if (this.state.crashed) {
      return (
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 400, background: '#080d26',
        }}>
          <div style={{ textAlign: 'center', padding: 32, maxWidth: 460 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <div style={{ color: '#EEF1FA', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>
              3D view couldn't load on this device
            </div>
            <div style={{ color: '#8A95C9', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Your browser may not support WebGL, or hardware acceleration is disabled.
              Use the <strong>Draw 2D</strong> tab to design your dock, then hit
              <strong> "See Your Dock Come to Life"</strong> for a photorealistic AI render.
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 24px', borderRadius: 8, border: '1px solid rgba(138,149,201,0.3)',
                background: 'rgba(59,74,143,0.3)', color: '#EEF1FA', cursor: 'pointer', fontSize: 14,
              }}
            >
              Try Again
            </button>
            <div style={{ color: '#374151', fontSize: 11, marginTop: 16 }}>
              {this.state.error}
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
