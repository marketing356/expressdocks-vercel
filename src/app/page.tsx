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
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-sm font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#8A95C9' }}>
            Factory-Direct Aluminum Docks
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Commercial-Grade Marina Dock.<br />
            <span style={{ color: '#8A95C9' }}>No Barge. No Crane. No Pile Driver.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
            Just a truck in your driveway and a few helping hands. Factory pre-assembled, photo-documented, and shipped direct.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dock3d" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105" style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
              Design Your Dock →
            </Link>
            <Link href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105" style={{ background: 'rgba(138,149,201,0.15)', color: '#EEF1FA', border: '1px solid rgba(138,149,201,0.3)' }}>
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY EXPRESSDOCKS */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #0E1433 0%, #141B3D 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">Why ExpressDocks?</h2>
            <p className="text-center text-xl mb-16 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
              We build the same structural system used in full-scale marinas — modularized so it ships on a pallet and assembles with basic hand tools.
            </p>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🛡️', title: '50-Year Warranty', desc: "We only sell what we can stand behind for 50 years. That's the standard." },
              { icon: '✈️', title: '6061-T6 Aluminum', desc: 'Aerospace and marine grade alloy. Corrosion-proof in salt or fresh water.' },
              { icon: '📸', title: 'Pre-Assembled & Photo-Documented', desc: 'Every dock is built and quality-checked in our factory first. Photos ship with your dock.' },
              { icon: '🔧', title: 'Basic Hand Tools', desc: 'Impact driver and wrenches. No cranes, no barges, no pile drivers needed.' },
              { icon: '🚚', title: 'Ships to Your Driveway', desc: 'Palletized on a standard freight truck. Delivered direct from our factory.' },
              { icon: '🎨', title: '6 Decking Colors', desc: 'Solid WPC composite decking. Teak, Gray, Walnut, Charcoal, Driftwood, Espresso.' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: 'rgba(138,149,201,0.06)', border: '1px solid rgba(138,149,201,0.12)' }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p style={{ color: 'rgba(238,241,250,0.7)' }}>{item.desc}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* THE FACTORY PROCESS */}
      <section className="py-24 px-6" style={{ background: '#0E1433' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-center" style={{ color: '#8A95C9' }}>Our Process</p>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">Built Right. Documented. Shipped.</h2>
            <p className="text-center text-xl mb-16 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
              If anything doesn't fit in the factory, it's fixed there — not on your waterfront.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Custom Design', desc: 'Your dock is designed to your exact specifications' },
              { step: '2', title: 'Factory Build', desc: 'Pre-assembled and quality-checked in our facility' },
              { step: '3', title: 'Photo Documentation', desc: 'Every step photographed — your assembly guide' },
              { step: '4', title: 'Direct Shipping', desc: 'Palletized and shipped to your driveway' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold" style={{ background: '#3B4A8F', color: '#EEF1FA' }}>{item.step}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p style={{ color: 'rgba(238,241,250,0.7)', fontSize: '14px' }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #141B3D 0%, #0E1433 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Dock Systems</h2>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Residential', price: 'From $55/sqft', img: '/images/residential-docks.webp', href: '/residential', desc: 'Lake houses, waterfront homes, private properties' },
              { title: 'Commercial', price: 'Contact for pricing', img: '/images/commercial-main.webp', href: '/commercial-docks', desc: 'Marinas, resorts, public facilities' },
              { title: 'Modular', price: 'Configurable', img: '/images/modular-docks.webp', href: '/modular-docks', desc: 'Expandable systems that grow with your needs' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block rounded-2xl overflow-hidden" style={{ background: 'rgba(138,149,201,0.06)', border: '1px solid rgba(138,149,201,0.12)' }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm mb-3" style={{ color: 'rgba(238,241,250,0.7)' }}>{item.desc}</p>
                  <p className="font-semibold" style={{ color: '#8A95C9' }}>{item.price}</p>
                </div>
              </Link>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, #3B4A8F 0%, #2A3A7F 100%)' }}>
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Your Dock?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
            Design it yourself in our 3D builder or talk to our team for a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dock3d" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105" style={{ background: '#EEF1FA', color: '#0E1433' }}>
              3D Dock Builder
            </Link>
            <Link href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105" style={{ background: 'transparent', color: '#EEF1FA', border: '2px solid rgba(238,241,250,0.5)' }}>
              Contact Us
            </Link>
          </div>
          <p className="mt-8" style={{ color: 'rgba(238,241,250,0.7)' }}>
            Or call us directly: <a href="tel:800-370-2285" className="font-bold" style={{ color: '#EEF1FA' }}>800-370-2285</a>
          </p>
        </FadeIn>
      </section>
    </main>
  )
}
