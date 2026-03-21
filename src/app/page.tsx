'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

function FadeIn({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode, delay?: number, className?: string, style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function StaggerGrid({ children, className = '' }: { children: React.ReactNode[], className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// SVG Icon Components
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)

const BeamIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
)

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
)

const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
)

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
)

const SwatchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
  </svg>
)

const features = [
  { Icon: ShieldIcon, title: '25-Year Warranty', desc: "We only sell what we can stand behind. That's the standard." },
  { Icon: BeamIcon, title: '6061-T6 Aluminum', desc: 'Aerospace and marine grade alloy. Corrosion-proof in salt or fresh water.' },
  { Icon: CameraIcon, title: 'Pre-Assembled & Photo-Documented', desc: 'Every dock is built and quality-checked in our facility first. Photos ship with your dock.' },
  { Icon: WrenchIcon, title: 'Basic Hand Tools', desc: 'Impact driver and wrenches. No cranes, no barges, no pile drivers needed.' },
  { Icon: TruckIcon, title: 'Ships to Your Driveway', desc: 'Palletized on a standard freight truck. Delivered direct to your driveway.' },
  { Icon: SwatchIcon, title: '6 Decking Colors', desc: 'Solid WPC composite decking. Teak, Gray, Walnut, Charcoal, Driftwood, Espresso.' },
]

export default function Home() {
  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,20,51,0.55) 0%, rgba(59,74,143,0.25) 50%, rgba(14,20,51,0.65) 100%)', zIndex: 1 }} />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-sm md:text-base tracking-[0.35em] uppercase mb-6 font-medium" style={{ color: '#8A95C9' }}>
            Premium Aluminum Dock Systems
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
            Commercial-Grade Dock.<br />
            <span style={{ color: '#00D4FF' }}>Residential Installation.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
            No barge. No crane. No pile driver. Just a truck in your driveway and a few helping hands.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configurator" className="px-10 py-5 rounded-xl font-bold text-lg transition hover:scale-105"
              style={{ background: '#00D4FF', color: '#0E1433', boxShadow: '0 4px 24px rgba(0,212,255,0.35)' }}>
              Open Dock Designer
            </Link>
            <Link href="/contact" className="px-10 py-5 rounded-xl font-bold text-lg border transition hover:bg-white/5"
              style={{ borderColor: 'rgba(138,149,201,0.4)', color: '#EEF1FA' }}>
              Request Free Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6" style={{ background: '#151B3D' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: '#8A95C9' }}>Why ExpressDocks</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built Different</h2>
            <p className="text-center text-xl mb-16 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
              We build the same structural system used in full-scale marinas — modularized so it ships on a pallet and assembles with basic hand tools.
            </p>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: 'rgba(138,149,201,0.06)', border: '1px solid rgba(138,149,201,0.12)' }}>
                <div className="mb-4" style={{ color: '#00D4FF' }}><item.Icon /></div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p style={{ color: 'rgba(238,241,250,0.7)' }}>{item.desc}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-6" style={{ background: '#0E1433' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: '#8A95C9' }}>Our Process</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Factory-Verified Before It Ships</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-2xl p-8 md:p-12" style={{ background: 'rgba(138,149,201,0.08)', border: '1px solid rgba(138,149,201,0.15)' }}>
              <p className="text-xl leading-relaxed" style={{ color: 'rgba(238,241,250,0.85)' }}>
                Every dock is built and fully assembled in our facility first. We verify every connection, every section, every measurement. Once everything checks out, it ships — with complete photo documentation of the assembly so you know exactly how it goes together.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(180deg, #151B3D 0%, #0E1433 100%)' }}>
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
            Design it yourself in our Dock Designer or talk to our team for a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configurator" className="px-10 py-5 rounded-xl font-bold text-lg transition hover:scale-105"
              style={{ background: '#00D4FF', color: '#0E1433' }}>
              Open Dock Designer
            </Link>
            <Link href="/contact" className="px-10 py-5 rounded-xl font-bold text-lg border transition hover:bg-white/5"
              style={{ borderColor: 'rgba(138,149,201,0.4)', color: '#EEF1FA' }}>
              Request Free Quote
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
