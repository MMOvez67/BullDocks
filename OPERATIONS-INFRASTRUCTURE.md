# Bulldocks Operations Infrastructure (Sales Launch Ready)
## Build Plan & Implementation
**Date:** 2026-03-15
**Status:** In Progress
**Goal:** Launch-ready automation for 5+ daily orders by 2026-03-22

---

## Phase 1: Core Infrastructure (This Week)

### 1.1 n8n Installation & Setup
- **Status:** Installing via `npm install -g n8n`
- **Config Location:** `~/.n8n/` (local dev)
- **Port:** 5678 (default)
- **Database:** SQLite (default, sufficient for MVP)
- **Start Command:** `n8n start` or `n8n` (with -production flag for deployment)

**Workflows to Build:**
1. **Order Tracking Workflow** — polls Etsy API every 15min
   - Trigger: Schedule (every 15min)
   - Action: GET /v3/application/shops/{shop_id}/orders (Etsy API v3)
   - Filter: only orders from last 24h
   - Output: Push to webhook or internal DB

2. **Daily Briefing Trigger** — 08:00 CET every day
   - Trigger: Schedule (cron: "0 8 * * *")
   - Aggregation: Sum orders, revenue from last 24h
   - Slack Integration: Send formatted message to #sales-briefing

3. **Alert Workflow** — new orders with > 5★ review mention
   - Trigger: Etsy order webhook (when order status changes)
   - Action: Parse order for 5★ keyword
   - Output: Slack notification to #wins

---

### 1.2 Etsy-MCP (Model Context Protocol Server)
**Architecture:** Custom MCP built with `mcp-builder` tool

**Capabilities:**
```
Etsy-MCP/
├── auth/
│   ├── oauth2.js          (Etsy OAuth2 flow)
│   └── token-refresh.js   (automatic token rotation)
├── resources/
│   ├── orders.js          (GET /orders, webhooks)
│   ├── listings.js        (GET /listings, POST variations)
│   ├── payments.js        (GET /payments, transaction data)
│   └── reviews.js         (GET /reviews, sentiment tracking)
├── tools/
│   ├── create-listing.js  (POST listing with images)
│   ├── update-quantity.js (PATCH inventory)
│   ├── sync-orders.js     (bulk fetch + store)
│   └── send-message.js    (POST buyer messages)
└── config/
    └── schema.json        (MCP resource/tool definitions)
```

**Resources Exposed:**
- `etsy://shop/orders` — all orders with pagination, filters (status, date range)
- `etsy://shop/listings` — product listings with inventory, prices
- `etsy://shop/reviews` — customer reviews + ratings
- `etsy://payments` — transaction history, earnings

**Tools Exposed:**
- `create_listing(title, description, price, tags, images)`
- `update_listing(listing_id, quantity, price)`
- `fetch_orders(shop_id, limit=100, status_filter=null)`
- `send_buyer_message(order_id, message)`

---

### 1.3 Daily-Briefing-Skill
**Location:** `~/.claude/projects/-Users-mac-projects-bulldocks/skills/daily-briefing.md`

**Trigger:** 8 AM CET (or manual `/daily-briefing`)
**Output Channel:** Slack #sales-briefing

**Report Structure:**
```
📊 BULLDOCKS DAILY BRIEFING — 2026-03-15

🎯 SALES METRICS (last 24h)
├─ New Orders: 2
├─ Revenue: €59,98
├─ Avg Order Value: €29,99
└─ Conversion Rate: 0.8%

⭐ REVIEWS & FEEDBACK
├─ New Reviews: 1 (5★)
└─ Sentiment: 100% positive

🚨 ACTION ITEMS
├─ Pending Payments: 0
├─ Shipped Orders: 0
└─ Customer Support Tickets: 0

📈 TREND
├─ vs Yesterday: ↑ 100% orders
├─ vs Last Week: — (first week)
└─ Runway: €150 → €210 (40% growth)
```

---

### 1.4 Lead-Outreach-Skill
**Status:** Template-based system (Fiverr/Upwork APIs require approval)

**Capabilities:**
- Template message library (cold outreach to darts communities)
- One-click send to Slack DM lists
- Response tracking via Slack thread
- Suggested outreach targets: Dart clubs (VOKS, SDD, DLO), Influencers, Retailers

**Implementation:** Simple markdown templates + manual Slack integration initially

---

### 1.5 Bulldocks-Brand-Skill
**Location:** `~/.claude/projects/-Users-mac-projects-bulldocks/assets/brand-guidelines.md`

**Contents:**
```
BULLDOCKS BRAND SYSTEM

📏 DESIGN TOKENS
├─ Primary: #FF6B35 (Orange)
├─ Dark: #1A1A1A (Almost Black)
├─ Light: #F8F6F2 (Off-White)
├─ Accent: #E8E5E0 (Border Gray)
└─ Mode: Light only (no dark mode)

🔤 TYPOGRAPHY
├─ Headlines: Bebas Neue (400, 900 weights)
├─ Body: DM Sans (400, 600, 700 weights)
├─ Scale: 12px → 32px (modular scale)
└─ Line Height: 1.5 (body), 1.2 (headlines)

✍️ VOICE & TONE
├─ Personality: Direct, confident, slightly cheeky
├─ Tagline: "Dart spielen. Ohne einen einzigen Nagel."
├─ Viral Slogan: "Wir docken nicht nur an eurer Vorder-, sondern auch an eurer Hintertür."
└─ Never: Corporate-speak, dark mode, undersell price

💰 PRICING RULES
├─ Minimum: €29,99 (Standard)
├─ Price Tiers: Standard (€29,99), Pro (€39,99), Elite (€59,99+)
├─ Margin Target: ~70%
└─ No discounts before 10+ orders

📦 PRODUCT MESSAGING
├─ Core: "WDF-compliant, no-drill dart mount for renters"
├─ USP: "Only system with certified 1730mm bullseye height"
├─ Materials: PETG recommended, PLA acceptable
└─ Guarantee: No visible damage, 6-month satisfaction

📸 VISUAL GUIDELINES
├─ Prototype Photos: 5+ shots (frontal, detail, mounted, with dart, WDF height)
├─ Lighting: Natural light preferred
├─ Background: Neutral (wall, white backdrop)
└─ Bulldog Mascot: Retro cartoon + dartpfeil icon (see logo.svg)

🌐 MARKET TARGETING
├─ Primary: 🇩🇪 Germany (Etsy DE, bulldocks.net)
├─ Secondary: 🇬🇧 UK (25.99 GBP equivalent)
└─ Tertiary: 🇦🇹🇨🇭 AT/CH (German-speaking, higher income)
```

---

## Phase 2: Etsy Shop Setup (Week of 2026-03-20)
- [ ] Gewerbeanmeldung completed
- [ ] Finom bank account created
- [ ] Etsy shop settings configured
  - [ ] Shipping profiles (DE, AT, CH, UK)
  - [ ] Payment methods (Stripe via Etsy)
  - [ ] Tax setup (USt-ID for EU)
  - [ ] Return policy (14-day no questions)
- [ ] Listing published (first 3 variants)
- [ ] Photos uploaded (5+ per variant)

---

## Phase 3: Marketing Automation (Week of 2026-03-20)
- [ ] TikTok video (Configurator screen + "Hintertür" slogan)
- [ ] Formspree integration (waitlist → email nurture)
- [ ] Email sequence (3 emails: Welcome, Social Proof, Limited Offer)
- [ ] n8n workflow: Auto-response to first-time buyers

---

## Critical Security Rules
- ✅ **No API keys in Git** — only in .mcp.json (gitignored)
- ✅ **No customer data in commits** — CRM/spreadsheet separate
- ✅ **No passwords in Slack** — 1Password links only
- ✅ **Etsy OAuth2 tokens** — refresh automatically, never commit refresh tokens

---

## Success Metrics (By 2026-03-22)
| Metric | Target | Status |
|--------|--------|--------|
| n8n workflows deployed | 3 | ⏳ |
| Etsy listings live | 1+ | ⏳ |
| Daily orders | 5+ | ⏳ |
| Revenue | €150+ | ⏳ |
| Briefing reports sent | 7 | ⏳ |

---

## Links & References
- Etsy API v3 Docs: https://developers.etsy.com/
- n8n Docs: https://docs.n8n.io/
- MCP Builder: https://mcp.builder/
- Formspree: https://formspree.io/
- Tailscale Dashboard: http://mac-mini-von-mac.tail38c07f.ts.net:3333/
