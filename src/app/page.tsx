'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

      {/* HERO — VIDEO BACKGROUND */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(14,20,51,0.45) 0%, rgba(59,74,143,0.25) 50%, rgba(14,20,51,0.55) 100%)',
          zIndex: 1,
        }} />
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm font-semibold uppercase mb-6"
            style={{ color: '#8A95C9' }}
          >
            Factory-Direct · Middletown, Delaware
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
            style={{ color: '#EEF1FA' }}
          >
            Aluminum Docks<br/>
            <span style={{ color: '#8A95C9' }}>Built to Last a Lifetime</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
            style={{ color: 'rgba(238,241,250,0.85)' }}
          >
            Starting at <strong style={{ color: '#EEF1FA' }}>$50/sqft</strong>. Ships to US, Canada & Caribbean.
            50-year residential guarantee.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/contact" className="px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.6)' }}>
              Get Your Free Quote
            </a>
            <a href="/gallery" className="px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ border: '1px solid rgba(138,149,201,0.5)', color: '#EEF1FA', background: 'rgba(138,149,201,0.08)' }}>
              View Gallery
            </a>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: '#8A95C9' }}>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#8A95C9" strokeWidth="1.5"/>
            <circle cx="8" cy="7" r="2" fill="#8A95C9"/>
          </svg>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section className="py-5 px-6" style={{ background: '#3B4A8F' }}>
        <FadeIn>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-semibold text-center" style={{ color: '#EEF1FA' }}>
            <span>✓ 50-Year Residential Guarantee</span>
            <span>✓ Factory-Direct Pricing</span>
            <span>✓ Ships US, Canada & Caribbean</span>
            <span>✓ Free Dock Builder Tool</span>
            <span>✓ 800-370-2285</span>
          </div>
        </FadeIn>
      </section>


      {/* DOCK BUILDER 3D — PRIMARY CTA */}
      <section className="py-28 px-6 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #080d26 0%, #1a2a6c 40%, #3B4A8F 60%, #080d26 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #8A95C9 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6"
            style={{ background: 'rgba(138,149,201,0.2)', border: '1px solid rgba(138,149,201,0.4)', color: '#8A95C9' }}>
            ✦ Only on ExpressDocks — No One Else Has This
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{ color: '#EEF1FA' }}>
            Build Your Dock.<br/>
            <span style={{ background: 'linear-gradient(135deg, #8A95C9, #EEF1FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              See It in 3D.
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.8)' }}>
            Draw your exact layout on our live canvas. Get instant pricing. Then watch your dock come to life in a photorealistic 3D render.
          </p>
          <p className="text-base mb-12" style={{ color: 'rgba(138,149,201,0.8)' }}>
            No other dock company on the internet offers this.
          </p>
          <a href="/configurator" className="inline-block px-14 py-6 rounded-2xl font-black text-2xl transition-all duration-300 hover:scale-105"
            style={{ background: '#EEF1FA', color: '#0E1433', boxShadow: '0 12px 60px rgba(238,241,250,0.25)' }}>
            Start Building My Dock →
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm" style={{ color: 'rgba(238,241,250,0.5)' }}>
            <span>✓ Free to use</span>
            <span>✓ No account needed</span>
            <span>✓ Instant pricing</span>
            <span>✓ 3D render included</span>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="py-24 px-6" style={{ background: '#0E1433' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-center text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Why ExpressDocks</p>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16" style={{ color: '#EEF1FA' }}>
              The Premium Dock at a<br/>Factory-Direct Price
            </h2>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏭', title: 'Factory Direct', desc: 'No dealers, no middlemen, no markups. You buy from the manufacturer. That\'s how we deliver 50-year quality at $50/sqft.' },
              { icon: '⚡', title: 'Solid Aluminum', desc: 'Never rots. Never rusts. Never splinters. Our aluminum frames outperform wood and steel in every marine environment.' },
              { icon: '🎨', title: 'Free 3D Design', desc: 'Send us any sketch or description. We return a full custom 3D dock design in 48 hours — completely free, zero obligation.' },
              { icon: '🚢', title: 'Ships Anywhere', desc: 'All 50 US states, Canada, and the Caribbean. No job is too remote.' },
              { icon: '🛡️', title: '50-Year Guarantee', desc: 'The longest guarantee in the industry. 50 years residential, 40 years commercial. We stand behind every dock we build.' },
              { icon: '📐', title: 'Custom Built', desc: 'Every dock engineered to your exact waterfront — shape, depth, tidal range, and use case.' },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3" style={{ color: '#EEF1FA' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(238,241,250,0.65)' }}>{item.desc}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="py-4 overflow-hidden" style={{ background: '#080d26' }}>
        <FadeIn>
          <div className="flex gap-4 px-4">
            {['/images/gallery-real-1.webp','/images/gallery-00249e99.webp','/images/gallery-4.jpg','/images/gallery-b5847537.webp','/images/commercial-drone.webp'].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-80 h-52 rounded-xl overflow-hidden">
                <img src={src} alt="ExpressDocks project" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6" style={{ background: '#0a1030' }}>
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Transparent Pricing</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#EEF1FA' }}>No Guesswork. No Markups.</h2>
            <p className="mb-16 max-w-xl mx-auto" style={{ color: 'rgba(238,241,250,0.6)' }}>You buy directly from the manufacturer. What you see is what you pay.</p>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Residential', price: 'From $50', unit: '/sqft', desc: 'Perfect for home docks, boat lifts, and personal waterfront access.', example: 'Example: 20×8 ft dock starting around $8,000', guarantee: '50-Year Guarantee' },
              { title: 'Commercial / Marina', price: 'From $75', unit: '/sqft', desc: 'Heavy-duty systems for marinas, resorts, and commercial properties.', example: 'Example: 10-slip marina starting around $75,000', guarantee: '40-Year Guarantee', featured: true },
              { title: 'Fingers & Gangways', price: 'From $85', unit: '/sqft', desc: 'Specialty dock fingers, gangways, and transition pieces.', example: 'Example: 4 dock fingers starting around $12,000', guarantee: 'Custom Engineering' },
            ].map((tier) => (
              <div key={tier.title} className={`rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${tier.featured ? 'ring-2' : ''}`}
                style={{
                  background: tier.featured ? '#3B4A8F' : 'rgba(59,74,143,0.15)',
                  border: tier.featured ? 'none' : '1px solid rgba(138,149,201,0.2)',
                  boxShadow: tier.featured ? '0 8px 40px rgba(59,74,143,0.4)' : 'none',
                }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: tier.featured ? '#EEF1FA' : '#8A95C9' }}>{tier.title}</h3>
                <div className="text-5xl font-extrabold my-4" style={{ color: '#EEF1FA' }}>{tier.price}<span className="text-2xl font-normal">{tier.unit}</span></div>
                <p className="text-sm mb-2" style={{ color: tier.featured ? 'rgba(238,241,250,0.85)' : 'rgba(238,241,250,0.6)' }}>{tier.desc}</p>
                <p className="text-xs italic mb-4" style={{ color: '#8A95C9' }}>{tier.example}</p>
                <p className="text-xs font-semibold mb-6" style={{ color: tier.featured ? '#EEF1FA' : '#8A95C9' }}>{tier.guarantee}</p>
                <a href="/contact" className="block text-center py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                  style={{ background: tier.featured ? '#EEF1FA' : '#3B4A8F', color: tier.featured ? '#0E1433' : '#EEF1FA' }}>
                  Get Quote
                </a>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6" style={{ background: '#0E1433' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Customer Stories</p>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16" style={{ color: '#EEF1FA' }}>What Our Customers Say</h2>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "We got three quotes and ExpressDocks came in $12,000 under the competition. The quality is outstanding. The free 3D design sealed the deal.", name: "Tom R.", location: "Lake Norman, NC", dock: "Residential — 24×10 ft" },
              { quote: "We expanded our marina from 20 to 48 slips using ExpressDocks. The price was right, delivery on schedule, and the product has held up through two hurricane seasons.", name: "Marina Manager", location: "Fort Myers, FL", dock: "Commercial Marina Expansion" },
              { quote: "The aluminum looks sharp, doesn't rot like our old wood dock, and the 50-year guarantee gives real peace of mind. Best decision we made for our lake house.", name: "Linda & Dave M.", location: "Lake Champlain, VT", dock: "Residential Modular — 32×8 ft" },
            ].map((t) => (
              <div key={t.name} className="p-8 rounded-2xl" style={{ background: 'rgba(59,74,143,0.12)', border: '1px solid rgba(138,149,201,0.15)' }}>
                <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: 'rgba(238,241,250,0.75)' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ borderTop: '1px solid rgba(138,149,201,0.2)', paddingTop: '1rem' }}>
                  <p className="font-bold text-sm" style={{ color: '#EEF1FA' }}>{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(238,241,250,0.5)' }}>{t.location}</p>
                  <p className="text-xs mt-1" style={{ color: '#8A95C9' }}>{t.dock}</p>
                </div>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: '#080d26' }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-center text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16" style={{ color: '#EEF1FA' }}>Everything You Need to Know</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              {[
                { q: "Do you install the docks or just ship them?", a: "We manufacture and ship only — no installation services. Our docks are engineered for straightforward assembly and come with complete documentation. Most customers install with a small crew in a weekend." },
                { q: "How long does shipping take?", a: "Standard lead time is 4–6 weeks from order confirmation to delivery. Larger commercial orders may require 8–10 weeks. We ship via flatbed freight to your nearest accessible location." },
                { q: "What does the warranty actually cover?", a: "Our 50-year residential and 40-year commercial guarantees cover structural defects in the aluminum frame under normal use conditions." },
                { q: "Can you ship to my location?", a: "Yes. We ship to all 50 US states, all Canadian provinces, and throughout the Caribbean. Contact us for international freight quotes." },
                { q: "Do I need permits?", a: "Permit requirements vary by state and waterfront type. We recommend contacting your state's Department of Environmental Protection. We can provide documentation to support your permit application." },
                { q: "What does factory-direct mean?", a: "You buy directly from us — the manufacturer. No dealers, no distributors, no markups. That's how we deliver $90–$120/sqft quality at $50/sqft." },
              ].map((item, i) => (
                <details key={i} className="rounded-xl overflow-hidden group" style={{ border: '1px solid rgba(138,149,201,0.2)' }}>
                  <summary className="px-6 py-5 font-semibold cursor-pointer flex justify-between items-center list-none transition-all"
                    style={{ color: '#EEF1FA', background: 'rgba(59,74,143,0.1)' }}>
                    {item.q}
                    <span style={{ color: '#8A95C9' }} className="ml-4 text-xl">+</span>
                  </summary>
                  <div className="px-6 py-5 text-sm leading-relaxed" style={{ color: 'rgba(238,241,250,0.65)', background: 'rgba(14,20,51,0.5)', borderTop: '1px solid rgba(138,149,201,0.1)' }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden" style={{ background: '#3B4A8F' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("/images/gallery-b5847537.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <FadeIn className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ color: '#EEF1FA' }}>Ready to Build<br/>Your Dream Dock?</h2>
          <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: 'rgba(238,241,250,0.8)' }}>Use our Dock Builder to design your dock instantly. Starting at $50/sqft. No obligation.</p>
          <a href="/contact" className="inline-block px-12 py-5 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{ background: '#EEF1FA', color: '#0E1433', boxShadow: '0 8px 40px rgba(238,241,250,0.2)' }}>
            Start My Free Design →
          </a>
          <p className="mt-6 text-sm" style={{ color: 'rgba(238,241,250,0.6)' }}>
            Or call: <a href="tel:8003702285" className="hover:text-white" style={{ color: '#EEF1FA' }}>800-370-2285</a>
          </p>
        </FadeIn>
      </section>

    </main>
  )
}
