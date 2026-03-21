# Configurator Feature Roadmap
Last updated: 2026-03-21

---

## NEXT BUILD — Dock Elements (Cleats + Piles)

### Cleats
- Two material options: **Stainless Steel** | **Galvanized**
- Placed as point markers on dock sections (click to drop)
- Icon: small cleat symbol (T-shape or horn cleat silhouette)
- Show count in sidebar: "4x Stainless Cleats"

### Piles
Sizes residential: 4", 6", 8", 10", 12"
Sizes commercial/marina: 10", 12", 14", 16", 18", 20", 24"

- Placed as circular markers on/around dock sections
- Icon: solid circle with diameter label inside
- Color code: residential = gray, commercial = darker/steel
- Click to place, click to remove
- Show in sidebar: pile count + sizes

### Pile Size Logic
- Default mode = Residential (4"–12")
- Switch to Commercial mode = unlocks 10"–24"
- Dropdown selector for pile size before placing

---

## LATER — Marina Configurator
- Separate page: /marina
- 20ft grid increments (vs 1ft residential)
- Pan + zoom required (layouts up to 1,000ft+)
- Section types: Main Pier, Finger, Gangway, Fuel Dock
- Slip count calculator
- Commercial rate $75/sqft
- Leads go directly to Michael

---

## LATER — Gangway as Separate Section Type
- Different visual from floating dock sections — shows as a diagonal/angled ramp shape
- Fixed length options: 12ft, 16ft, 20ft, 24ft, 32ft
- **Railings: ALWAYS INCLUDED** — gangways always come with railings, no option to remove
- Visually shown as thin lines along both sides of the gangway shape in the 2D view
- In AI render prompt: always include "with safety railings on both sides"
- **Two finish options:**
  - **WPC Decked Gangway** — matches the selected decking color, same texture as dock sections but clearly angled/ramp shape
  - **Bare Aluminum Gangway** — silver/brushed metal color (#B0B8C0), visually distinct from any decking color
- Label shows on section: "16ft Gangway — Aluminum" or "16ft Gangway — Teak WPC"
- In AI render prompt: include gangway description with finish type

### Gangway Connection Behavior (critical for accurate 2D rendering)
- **Shore end:** Fixed pivot point — hinged to land/bulkhead (shown as a fixed anchor symbol)
- **Dock end:** NOT fixed — has a **roller** that slides freely on top of the floating dock as water level changes
- **Bird's-eye view:** The gangway overlaps/sits ON TOP of the floating dock at the dock end
- In the 2D canvas: gangway draws FROM a land anchor point, ONTO the dock surface — the dock end shows a small roller circle symbol indicating it floats freely
- The gangway is ALWAYS drawn overlapping the dock at one end, not connecting edge-to-edge
- This distinction matters for accurate design — customer needs to know the gangway needs enough dock surface to roll on (minimum 3-4ft of dock overlap)

---

## LATER — AI Render Improvements
- Pass pile positions to Flux Pro prompt
- "Dock with [X] piles visible in water" in prompt
- Cleat positions enhance realism of render

---

## Dock Accessories — From Product Photos

### Bench
- Aluminum frame, WPC slat seat + backrest + armrests
- Matches dock decking color (same WPC material, same color swatch as selected)
- Placed as a point element — click on dock surface to drop
- Standard footprint: ~4ft wide × 18in deep
- In 2D view: small rectangle with two armrest lines on each side
- In AI render prompt: "aluminum bench with WPC slat seating"
- Photo confirmed: walnut WPC bench on L-shaped floating dock

### Bench Variants (confirmed from product photos)
1. **Bench with armrests** — seen installed on dock (photo 1)
2. **Bench without armrests** — standalone product shot, A-frame aluminum legs, 4-slat seat + 3-slat backrest (photo 2)

Both use WPC slats matching the dock decking color selection.
In configurator: dropdown "Bench Style: With Armrests / Without Armrests"
Footprint both: ~6ft wide × 18in deep (from photo proportions)

### Bench — Final Confirmed Spec (from 3 product photos)
**Style 1: Bench with Armrests (Premium)**
- Aluminum sled-base frame (not A-frame legs)
- 4 WPC seat slats + 3 WPC backrest slats
- Full aluminum armrests on both sides
- WPC color matches dock decking selection
- Footprint: ~5ft wide × 2ft deep

**Style 2: Bench without Armrests (Standard)**  
- Aluminum A-frame legs
- 4 WPC seat slats + 3 WPC backrest slats
- No armrests
- WPC color matches dock decking selection
- Footprint: ~5ft wide × 2ft deep

**Placement notes:**
- Can place multiple benches on same dock
- Shown in photos facing each other (social seating arrangement) — good for AI render prompt
- Typically placed at waterfront edge or corners of dock platform
- In AI render: "dock with [X] aluminum benches with WPC seating"

**Gangway details confirmed from photos:**
- Two vertical aluminum guide posts at shore end (not just a hinge)
- Gangway sits ON dock surface at roller end — visible gap/roller at connection point
- Walnut WPC decking on gangway matches dock in photos

---

## Dock Accessories — Additional Items

### Ladders
- Standard dock ladder — aluminum, 3-4 rungs, mounts to dock edge
- In 2D view: small ladder symbol on dock edge (parallel lines)
- Customer selects which edge to mount (click dock edge to place)
- In AI render: "aluminum dock ladder on dock edge"
- Forge to source standard dock ladder specs/dimensions from web

### Utility / Power Pedestals — US Supplier Partnership
- Electrical pedestal box (marina standard) — shore power connection
- In 2D view: small square symbol with lightning bolt
- Sizes: 20A, 30A, 50A (dropdown selection)
- Common on commercial docks, optional on residential
- In AI render: "electrical utility pedestal on dock"

### NOT included
- Bumpers — not in product line

---

## Marina Email Campaign — PRIORITY after configurator launches

### Campaign concept
"Upgrade Your Marina — Design It Online, See the Exact Cost"
- Target: marina operators, waterfront property managers, yacht clubs
- Hook: "Be the first marina in [STATE] to design your new dock system online and see exact pricing instantly"
- CTA: Goes directly to /marina configurator page
- Lead capture: slip count, timeline, location → Michael handles personally

### Data needed
- Marina email list — Instantly.ai campaign or purchased list
- States to target first: FL, TX, NC, SC, MD, NY, MI, WI, MN
- Subject line options:
  - "Design your new marina dock system online (see exact cost instantly)"
  - "Your marina's next dock — designed in 5 minutes, priced in seconds"
  - "We built a marina configurator. No other dock company has this."

### Timing
- Launch email campaign AFTER marina configurator is live
- Marina configurator builds after Wednesday ExpressDocks residential launch

### Power Pedestal Notes
- NOT manufactured by ExpressDocks — sourced from US supplier (TBD)
- In configurator: shown as an add-on option with "Contact us for pedestal pricing"
- Treated as a separate line item, not included in sqft price
- Creates a natural upsell conversation — customer designs dock, adds pedestals, calls for full package quote
- Marina configurator will heavily feature pedestals (every slip needs one)
- US supplier deal to be arranged — add to Michael's action items
