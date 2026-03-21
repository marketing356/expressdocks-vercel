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
- **Two finish options:**
  - **WPC Decked Gangway** — matches the selected decking color, same texture as dock sections but clearly angled/ramp shape
  - **Bare Aluminum Gangway** — silver/brushed metal color (#B0B8C0), visually distinct from any decking color
- Label shows on section: "16ft Gangway — Aluminum" or "16ft Gangway — Teak WPC"
- In AI render prompt: include gangway description with finish type

---

## LATER — AI Render Improvements
- Pass pile positions to Flux Pro prompt
- "Dock with [X] piles visible in water" in prompt
- Cleat positions enhance realism of render
