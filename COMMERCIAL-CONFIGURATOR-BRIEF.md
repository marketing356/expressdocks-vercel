# Commercial Configurator — Build Brief
**Status:** Queued — build after canvas upgrade and Monday launch
**URL:** expressdocks.com/commercial-configurator?access=marina2026
**Audience:** Marina operators, yacht clubs, waterfront contractors
**Access:** Secret URL parameter — no login, no account, just the link

---

## The Concept
Same configurator technology as residential but unlocked for commercial buyers with:
- Live pricing visible as they draw
- Larger grid for marina-scale layouts
- Pan and zoom (marinas can be 1,000ft+)
- Slip counter
- Commercial rates

---

## Access Control
- URL parameter: `?access=marina2026`
- No login required — just the link
- Anyone without the parameter sees residential version (no pricing)
- Access code can be changed anytime by updating the env var
- Add to .env.local: `COMMERCIAL_ACCESS_CODE=marina2026`

---

## Pricing (visible when access code present)
- Main dock platform: **$75/sqft**
- Fingers & gangways: **$85/sqft**
- Running total shows live as they draw
- Format: "Your layout: 4,800 sqft = **$360,000**"

---

## Grid & Canvas (different from residential)
- Grid increment: **20ft per cell** (vs 1ft residential)
- Canvas: larger, with **pan and zoom** (pinch on mobile, scroll wheel on desktop)
- Scale indicator: "1 grid square = 20ft"
- Sections snap to 20ft grid
- Maximum layout: unlimited (pan as far as needed)

---

## Section Types (dropdown before drawing)
- **Main Pier** — the central spine/headwalk
- **Finger Pier** — perpendicular slips off main pier
- **Gangway** — shore connection with railings
- **Fuel Dock** — separate section, different color highlight

Each type renders with a distinct visual style so the layout is immediately readable.

---

## Slip Counter
Based on finger pier spacing and layout:
- Auto-calculates: "Your layout fits approximately **~47 boat slips**"
- Updates live as sections are drawn
- Shown prominently in the header

---

## Lead Capture (different from residential)
Form fields:
- Marina/Company Name *
- Your Name *
- Email *
- Phone *
- Property Address *
- Number of existing slips (if replacing)
- Timeline (dropdown: ASAP / 3-6 months / 6-12 months / Planning stage)
- Notes

Submit → email to **mike@expressdocks.com** (not info@ — this goes directly to Michael)
Subject: `🏗️ COMMERCIAL LEAD: [Company] — [sqft] sqft — [slip count] slips`
Flagged as high-priority commercial inquiry

---

## Email Campaign Hook
*"Here's your private access link to our commercial dock pricing portal. Design your marina or waterfront project and see live pricing as you build — no sales call required."*

Link: `https://expressdocks.com/commercial-configurator?access=marina2026`

---

## Build Notes for Forge
- New page: `src/app/commercial-configurator/page.tsx`
- Reuse ConfiguratorCanvas component with props: `gridScale=20`, `showPricing=true`, `priceRate=75`
- Add URL parameter check at top of page component
- If access code missing → redirect to /configurator
- Mobile: pan/zoom with touch gestures
- Deploy same Vercel project
