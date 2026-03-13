# 🎯 Bulldocks — 5-Sterne-Business-Master-Workflow
**Version 1.0** | 12.03.2026 | Angepasst an Bulldocks DTC Launch-Strategie

---

## Workflow-Philosophie

**Ziel:** Von Product-Discovery bis Referral-Engine — 5 kritische Geschäftsphasen mit klaren Outcomes, Constraints und Health Metrics. Jede Phase blockiert die nächste.

**Sicherheit:** ⚠️ **KEINE API Keys, Shop-Credentials oder Secrets** in Git-Commits. Alle sensiblen Daten gehören in `.mcp.json` (gitignored) oder `.env` (auch gitignored).

---

## Constitution Rules (verbindlich für alle Intents)

1. **Keine UG-Angaben** — Bis Gewerbeanmeldung + Handelsregister nur "Einzelunternehmen"
2. **Preis minimum 29,99 EUR** — Keine Unter-Preisungen, auch nicht testweise
3. **WDF-Konformität in jeder Copy** — "1730mm Bullseye-Höhe" immer erwähnen, technische Spezifikationen korrekt
4. **Light Mode überall** — Weißer/heller Hintergrund, kein schwarzes BG (Monitor-Hardware-Kompatibilität)
5. **Keine Secrets in Commits** — Shop-Credentials, API Keys, Zahlungs-Tokens nur in `.mcp.json` oder 1Password
6. **DSGVO-Konformität** — Keine privaten Adressen in Fotos, Kunden-Opt-in für Email-Marketing, Datenschutz-Seite aktuell
7. **Deutsche/englische Dual-Language Ready** — Copy für DE/AT/CH/UK vorbereiten

---

## Stage 1️⃣: Product Discovery & Positioning

**Zeitrahmen:** Woche 1–2 (In Arbeit)
**Blocker:** Keine (Parallelarbeit möglich)
**Next Stage Trigger:** Website + Legal Pages LIVE

### Objective
Klare Positionierung und Produktverständnis im Markt etablieren — damit Kunden sofort verstehen: **WDF-konform, kein Bohren, für Mieter gemacht.**

### Outcomes
- [ ] Website mit vollständiger Brand-Identität live
  - Logo integriert (Bulldog mit Dartpfeil)
  - Fonts: Bebas Neue (Headlines) + DM Sans (Body)
  - Farben: Orange #ff6b35, Schwarz #1a1a1a, Weiß #ffffff
  - Mobile Responsive Design (>45% mobile traffic expected)
- [ ] 3D-Konfigurator funktioniert
  - Preis-Berechnung (Standard/Pro/Elite)
  - Größenvarianten (60–120mm Türbreite)
  - Echte Physik-Simulationen (Hebelmoment, Klemmkraft)
  - Fehlerquote < 2% (Browser-Kompatibilität)
- [ ] Competitive Positioning dokumentiert
  - Shot Voyager (UK, ~£25, keine WDF-Markierung)
  - VOKS (DE, ~€39, aber Bohren nötig)
  - Designa (Australien, teuer, UK-Konkurrenz)
  - **Unser USP:** "Einziges System mit fixierter WDF-Bullseye. Kein Bohren, kein Dübel. Für Mieter. Made in Germany."
- [ ] Legal-Seiten live
  - ✅ AGB (Einzelunternehmen-Fassung)
  - ✅ Impressum (kontakt@bulldocks.net)
  - ✅ Datenschutz (keine Cookies, DSGVO-konform)
- [ ] Waitlist-Formular deployed
  - Email-Erfassung (name + email)
  - Double-Opt-In (Email-Bestätigung)
  - Target: >= 50 Early Adopter vor Phase 2

### Constraints
- Keine UG-Angaben — nur "Einzelunternehmen"
- Preis minimum 29,99 EUR (Standard)
- WDF 1730mm **immer** in Copy erwähnen
- Light Mode überall (kein schwarzes BG)
- **Keine API Keys, Shop-Credentials in Commits** → `.mcp.json` (gitignored)
- Kein Server nötig — reine static HTML/CSS/JS

### Health Metrics
- [ ] Website Pageload < 2s (Core Web Vitals)
- [ ] Konfigurator-Fehlerquote < 2%
- [ ] Mobile Traffic Ratio >= 45%
- [ ] Waitlist-Signups >= 50
- [ ] Google PageSpeed Insights >= 90

### Edge Cases & Lösungen
| Scenario | Expected Behavior |
|----------|-------------------|
| Kunde versucht Konfigurator mit 150mm Türbreite zu laden | Error-Message: "Türbreite muss zwischen 60–120mm liegen. Deine Tür ist wahrscheinlich X cm breit — kontaktiere uns für Custom-Lösung." |
| SEO-Tools flaggen duplicate content (Legal-Seiten) | rel=canonical in HTML-Header, noindex auf Duplicate-URLs |
| Konfigurator lädt bei Apple Safari zu langsam | Three.js r128 Polyfills prüfen, WebGL-Fallback vorbereiten |

---

## Stage 2️⃣: Product-Market Fit & First Social Proof

**Zeitrahmen:** Woche 2–3 (Nächster Milestone)
**Blocker:** Prototyp von Daniel (morgen fertig)
**Next Stage Trigger:** Etsy-Shop vollständig konfiguriert + erste 5-Sterne-Review online

### Objective
Prototyp in der Realität validieren, fotografieren und erste echte Kundenbewertung einholen — damit Etsy-Listing mit echten Assets startet.

### Outcomes
- [ ] Prototyp gedruckt, montiert und getestet
  - Material: PETG (12kg Traglast)
  - Klemmkraft-Test: >= 102,4N ohne Verformung
  - Montage-Zeit dokumentiert (Zielmarke: < 5 Min ohne Werkzeuge)
  - Daniele liefert morgen (12.03.2026)
- [ ] 5+ Hi-Res Produktfotos gemacht
  - Frontal (Türrahmen-Kontext)
  - Detail: Klemm-Modul (TPU-Gummipads sichtbar)
  - Montiert an echtem Türrahmen
  - Mit Dartscheibe + Dartpfeil
  - WDF-Höhe sichtbar (Meterstab oder Markierung auf 1730mm)
  - **Mindestqualität:** 2000x2000px, natürliches Licht, kein Hintergrund mit privaten Infos (DSGVO)
- [ ] Etsy-Shop vollständig vorkonfiguriert
  - Shop-Name: "Bulldocks — Dartscheibe für Mieter"
  - Shop-Beschreibung: WDF, kein Bohren, Made in Germany
  - Zahlungs-Methoden: Kreditkarte + PayPal
  - Versandprofil: DE (4,99€), AT (9,99€), CH (14,99€)
  - **Wichtig:** Shop-Credentials NICHT in Git speichern! → `.mcp.json`
- [ ] Erste 5-Sterne-Review online
  - Early Adopter aus Waitlist (3 free samples)
  - Testimonial: "Passt perfekt. Keine Bohrlöcher. WDF-konform. 5/5"
  - Review-Link auf Website + Social Media geteilt
- [ ] Etsy-Listing geht live (Entwurf)
  - Titel: "Dartscheibe Halterung für Mieter — WDF konform, kein Bohren"
  - Hauptbild: echtes Produktfoto OR Konfigurator-Screenshot (provisorisch)
  - Tags: Dartscheibe, WDF, Mieter, Halterung, 3D-gedruckt, Made in Germany
  - Beschreibung: 500+ Wörter, Physik + Materialkunde erklären

### Constraints
- Material: **nur PETG oder PLA** (kein Resin/SLS)
- Fotos müssen 1730mm WDF-Höhe deutlich zeigen
- **Keine Etsy API Keys, Shop-Credentials, Zahlungs-Secrets in Git** → `.mcp.json`
- Versandprofil: DE + AT + CH Launch-Ready (UK später)
- Kein Foto mit privaten Adressen/Hausnummern/Namen (DSGVO)
- Keine Stock-Fotos verwenden — nur echte Produkte

### Health Metrics
- [ ] Prototyp hält 102,4N Klemmkraft ohne Verformung/Risse
- [ ] Foto-Qualität: mind. 2000x2000px
- [ ] Erste 5-Sterne-Review innerhalb 7 Tage nach Versand
- [ ] Etsy Shop SEO: Titel + Tags + Beschreibung >= 95% vollständig
- [ ] Etsy-Listing Conversion-Rate baseline (Pre-Ads)

### Edge Cases & Lösungen
| Scenario | Expected Behavior |
|----------|-------------------|
| Prototyp hat sichtbare Layer-Lines | **Trotzdem fotografieren!** Handgefertigt = USP. In Beschreibung: "Made on German FDM Printers (Bambu Lab H2D)" |
| Kein passender Türrahmen für Fotos vorhanden | Konfigurator-Screenshot als provisorisches Hauptbild. Note: "Echtes Produktfoto folgt" |
| Early Adopter meldet Passungsproblem (T=119mm, außerhalb 60–120mm) | Massentabelle prüfen, Toleranz nachrechnen (±2mm Spiel möglich?). Kostenloser Ersatz + Entschuldigung — Review-Schutz ist kritisch. |
| Etsy verweigert Shop-Verifikation (Adresse unklar) | Einzelunternehmen-Bestätigung + Gewerbeanmeldungs-Nr. hochladen (folgt morgen?) |

---

## Stage 3️⃣: First Revenue & Market Validation

**Zeitrahmen:** Woche 3–4 (Nach Etsy-Launch)
**Blocker:** Etsy-Shop + Zahlungs-Gateway
**Next Stage Trigger:** >= 5 Bestellungen, >= 1 echte 5-Sterne-Review

### Objective
Ersten zahlenden Kunden gewinnen und Etsy-Kanalmechaniken validieren — Basis für Scale.

### Outcomes
- [ ] Etsy-Listing LIVE mit echtem Produktfoto
  - Mindestens 1 echtes Foto (prioritär Montage am Türrahmen)
  - SEO: Page 1 für "Dartscheibe Mieter" (optional, organisch wird Zeit brauchen)
  - Varianten konfiguriert (Standard/Pro/Elite)
- [ ] Erste Bestellung eingegangen
  - Zahlung erfolgreich verarbeitet (Kreditkarte/PayPal)
  - Bestellbestätigung an Kunde versendet
  - Bestellung manuell dokumentiert (Kundennote, Größe, Variante)
- [ ] Paket versendet mit Tracking
  - 24–48h Versand (DHL/DPD)
  - Tracking-Link in Email mit Dankeschreiben
  - Beilage: Installationsanleitung (PDF) + Dankeskarte (handgeschrieben optional)
- [ ] Erste 5-Sterne-Review online
  - Nach Lieferung (typisch 3–5 Tage)
  - Testimonial eingefangen (ggf. Foto mit Dartscheibe)
  - Link auf Website + LinkedIn geteilt (Marketing)
- [ ] Feedback dokumentiert
  - Montage-Experience: Einfach? Probleme?
  - Qualität: Druckqualität, Material, Verarbeitung
  - Versand: Verpackung, Timing, Kommunikation
  - Feedback in CRM/Spreadsheet speichern

### Constraints
- **Keine Dumping-Preise** — minimum 29,99 EUR (Standard)
- Versandkosten: DE 4,99€, AT 9,99€, CH 14,99€ (ohne Profit möglich)
- Support via **service@bulldocks.net** mit max. 4h Response-Time
- **Keine Etsy-Accountdaten, API Keys, Zahlungs-Credentials in Git** → `.mcp.json` (gitignored!)
- Jede Bestellung manuell dokumentieren (Kundename, Email, Größe, Variante, Versand-Tracking)
- Kein Verkauf unter Selbstkosten (PETG ~3–5€/Set)

### Health Metrics
- [ ] Erste Bestellung innerhalb 14 Tage nach Listing Go-Live
- [ ] Etsy Conversion-Rate >= 2% (Shop-Views zu Kauf)
- [ ] Erste 5-Sterne-Review innerhalb 30 Tage nach Lieferung
- [ ] Kundensupport Response-Time < 4h (verfolgbar in Email)
- [ ] Zero Retouren in Phase 1 (Target: 0% RMA-Rate)

### Edge Cases & Lösungen
| Scenario | Expected Behavior |
|----------|-------------------|
| Etsy-Konto-Verifizierung dauert länger (Einzelunternehmen-Status unklar) | Shop-Struktur vorbereiten, Listing als Draft schreiben, warten auf Freigabe — kein Shortcut |
| Zahlungsabwicklung wird abgelehnt (Visa-Block für DE) | PayPal + Klarna als Fallback prüfen, Kunde per Email informieren |
| Versand in AT wird blockiert (Zollgebühren unklar) | AT/CH-Kunden vorab informieren: "±3 EUR zusätzliche Zollgebühren möglich" |
| Kunde meldet Passungsproblem (T=119mm, außerhalb Spec) | Support-Prozess: Massentabelle prüfen → Toleranz-Nachrechnung → kostenloser Ersatz anbieten (Marge bleibt OK) |

---

## Stage 4️⃣: Growth & Market Expansion

**Zeitrahmen:** Woche 4–8 (Nach 5+ Bestellungen)
**Blocker:** >= 5 echte Bestellungen + >= 1 echte 5-Sterne-Review
**Next Stage Trigger:** 10+ Monthly Orders, ROAS >= 3:1 (Ads)

### Objective
Skalierter Umsatz durch Paid Ads, Influencer-Kooperationen und Etsy SEO — Weg zu 10+ Bestellungen/Monat.

### Outcomes
- [ ] Etsy-Listing auf Seite 1 für Top-Keywords
  - Target: "Dartscheibe Halterung Mieter" (organisch)
  - Target: "WDF konform" (organisch oder Ads)
  - Listing Impressions > 500/Woche
  - Tactic: Titel + Tags A/B-Test, Fotos refreshen, Keywords testen
- [ ] TikTok-Video gestartet
  - Content: Screen-Recording Konfigurator + Hintertür-Slogan ("Wir docken nicht nur an eurer Vorder-, sondern auch an eurer Hintertür")
  - Länge: 20–30s (CapCut-Format)
  - Target: >= 1000 Views
  - Posting: 3x/Woche (Consistency)
  - Link zu Etsy in Bio
- [ ] Google Shopping Campaign
  - Pixel auf Website installiert (4px für Conversion-Tracking)
  - Merchant Feed mit Produktdaten hochgeladen
  - Budget: 5€/Tag (konservativ)
  - Target ROAS: >= 3:1
  - **Wichtig:** API Keys für Shopping nur in `.mcp.json`
- [ ] 10+ Monthly Orders erreicht
  - Mix: organisch (70%), Ads (20%), TikTok-Traffic (10%)
  - Durchschnittliche Bestellgröße: 29,99€ (mindestens)
  - Repeat-Order-Quote tracken (Target: >= 1 von 10)
- [ ] Review-Bewertung >= 4.8 Sterne
  - Mind. 5 echte Bewertungen online
  - Negative Reviews höflich beantworten
  - Testimonials auf Website + LinkedIn sharen

### Constraints
- Ad-Budget max. 20% des bisherigen Umsatzes (konservativ)
- Keine Konkurrenten-Pricing-Dumps — bleib >= 29,99€
- Influencer-Kooperationen: **free product only** (kein Budget vor 5k€ Umsatz)
- Analytics: **keine Kundendaten in Tracking-Codes** (DSGVO)
- **Alle Ad-Credentials (Google, TikTok, Facebook API Keys):** `.mcp.json` oder 1Password — NICHT Git
- Tracking-Pixel: Privacy-konform, ohne Cookie-Banner (falls nicht nötig)

### Health Metrics
- [ ] Etsy Listing Conversion-Rate >= 2.5% (up von 2%)
- [ ] Google Shopping ROAS >= 3:1
- [ ] Etsy Impressionen > 500/Woche
- [ ] TikTok Video-Views >= 1000 pro Video
- [ ] Customer Acquisition Cost (CAC) < 10€
- [ ] Repeat-Order-Rate >= 10%

### Edge Cases & Lösungen
| Scenario | Expected Behavior |
|----------|-------------------|
| Etsy-Algorithmus boosted Konkurrenz stärker | A/B-Test: Titel umbenennen, Fotos refreshen, Keywords testen. Prüfe: Shot Voyager war schon #1 — Nische ist spitz. |
| TikTok blockiert Video (Musik-Copyright) | Alternative Musik + Reupload, Dauer < 2h. Verwende royalty-free Musik (YouTube Audio Library). |
| Google Shopping flaggt "incorrect shipping costs" | Versandprofil prüfen (DE/AT/CH richtig konfiguriert?). Update-Delay: 24–48h. |
| Negative Review wegen "Passt nicht auf 140mm Tür" | Höflich antworten: Massenspezifikation (60–120mm) wiederholen, Custom-Service Link, KEIN Dislike. |

---

## Stage 5️⃣: Retention & Referral Engine

**Zeitrahmen:** Woche 8+ (Langfristig)
**Blocker:** >= 10 Monthly Orders, >= 4.5 Stern-Rating
**Success Metric:** 100+ Kunden kumulativ, 10% Referral-Rate, 15% Repeat-Rate

### Objective
Loyal Customer Base aufbauen und organisches Wachstum durch Mund-zu-Mund-Propaganda + Reviews starten. Der "Viral Loop".

### Outcomes
- [ ] 100+ Kunden erreicht (kumulativ)
  - Zeitrahmen: 12 Monate
  - Mix: 70% Etsy, 20% Ads, 10% Referral + Social
  - Dokumentation: CRM/Spreadsheet mit Name, Email, Bestellhistorie, Feedback
- [ ] Review-Bewertung >= 4.8 Sterne (mind. 20 Reviews)
  - Proaktiv um Reviews bitten (Follow-up Email nach 10 Tagen)
  - Negative Reviews nicht blockieren — öffentlich beantworten
  - Testimonial-Video mit Kunden (3–5 Personen, mit Erlaubnis)
- [ ] Referral-Quote >= 10%
  - "Bring 1 Freund, erhalte kostenlos 1 Extra-Schraube-Set" (kostenlos, 10 Cent Wert)
  - Tracking: "Woher hast du von uns gehört?" in Bestellung
  - Referral-Links in Email-Footer
- [ ] Wiederholungs-Quote >= 15%
  - Kunden, die 2+ Bestellungen machen (PRO oder Custom)
  - Email-Kampagne: "Hast du noch eine zweite Tür? PRO-Versionen ab 39,99€"
  - Timing: 6 Wochen nach erstem Kauf
- [ ] Community aufgebaut
  - Discord oder Telegram: min. 30 aktive Member
  - Content: Installations-Tipps, Dart-Turniere, Foto-Sharing
  - Moderation: 1h/Woche von Mashl oder Bot

### Constraints
- **Keine Kundendaten ohne Opt-in** — nur für Service/Support
- Support Response-Time: < 2h für Reklamationen
- **Reviews NIE manipuliert** — nur echte Feedback akzeptieren
- Referral-Programm: **kostenlos** (keine Rabatte = mehr Marge)
- **Alle Kundendaten DSGVO-konform** — encrypted Spreadsheet oder CRM (z.B. Airtable mit Encryption)
- Keine Marketing-Cookies ohne Consent-Banner

### Health Metrics
- [ ] Customer Satisfaction NPS >= 50
- [ ] Review-Count >= 20 insgesamt
- [ ] Repeat Purchase Rate >= 15%
- [ ] Community Size >= 30 aktive Member
- [ ] Word-of-Mouth Attribution >= 10% aller Bestellungen
- [ ] Customer Lifetime Value (CLV) >= 60€ (2 Bestellungen im Schnitt)

### Edge Cases & Lösungen
| Scenario | Expected Behavior |
|----------|-------------------|
| Negativer Review: "Passt nicht auf meine 130mm Tür" | Höflich: "Unsere Spez ist 60–120mm. Für größere Türen empfehlen wir Custom-Service (kontakt@bulldocks.net). Entschuldigung für Enttäuschung." KEIN Dislike. |
| Kunde erwartet kostenlosen Austausch nach 6 Monaten Verschleiß | Verschleiß-Policy klar in Beschreibung festhalten. Austausch nur innerhalb 30 Tage nach Kauf. Danach: kostenpflichtiger Ersatz (30€). |
| Community-Member teilt falsches Installations-Video (Fehler-Anleitung) | Moderatoren können Video corrected pinnen + offizielles Video erneut sharen. Nicht löschen (Trust). |
| Etsy flaggt 10+ Bestellungen als "suspicious activity" | Zahlungs-Pattern prüfen (normale Schwankungen?). Kundendaten anonymisieren in allen Reports für Etsy. |

---

## Implementierungs-Checkliste (Phase-übergreifend)

### Sicherheit & Compliance
- [ ] `.mcp.json` erstellt (Etsy API, Google Shopping, Discord-Bot) — gitignored
- [ ] `.env.example` (Template ohne Secrets) in Repo
- [ ] DSGVO-Datenschutz-Policy auf Website
- [ ] Shop-Credentials NIEMALS in Commits
- [ ] Kein privates Foto mit Adressen/Namen
- [ ] Email-Marketing: Double-Opt-In configured

### Monitoring & Analytics
- [ ] Google Analytics 4 (GA4) auf Website (nicht invasiv)
- [ ] Etsy Shop-Dashboard: Bestellungen, Views, Conversion-Rate täglich
- [ ] CRM/Spreadsheet: Kundenliste (Name, Email, Bestellhistorie, Review)
- [ ] TikTok Analytics: Views, Shares, Engagement (weekly review)
- [ ] Email Open-Rate tracking (Mailchimp oder ähnlich)

### Communication Templates (Ready-to-Use)
- [ ] Bestellbestätigung-Email (automatisch via Etsy)
- [ ] Versand-Tracking-Email + Dankeschreiben
- [ ] Review-Anfrage (10 Tage nach Lieferung)
- [ ] Follow-up bei kein Review (21 Tage nach Lieferung)
- [ ] Support-Response-Template für häufige Fragen
- [ ] Referral-Anfrage (30 Tage nach Lieferung)

### Escalation Paths
- [ ] Kunde meldet Qualitätsproblem → sofort kostenloser Ersatz (< 2h Response)
- [ ] Negative Review erscheint → höfliche, schnelle Antwort (< 1h)
- [ ] Zahlung fehlgeschlagen → Kunde per Email benachrichtigen (< 30 min)
- [ ] Etsy-Shop blockiert → Daniel oder Mashl kontaktieren (emergency)

---

## Erfolgs-Definition pro Stage

| Stage | Go/No-Go Metric | Target | Konsequenz |
|-------|-----------------|--------|-----------|
| **1** | Website Live + >= 50 Waitlist | 100% erreichbar | → Stage 2 freigeben |
| **2** | Prototyp validiert + 1 echte 5★-Review | 100% erforderlich | → Etsy-Launch |
| **3** | >= 5 Bestellungen + >= 2% Conversion | 100% erforderlich | → Paid Ads starten |
| **4** | 10+ Bestellungen + ROAS >= 2:1 | 100% erforderlich | → Full Growth-Mode |
| **5** | 100+ Kunden + >= 10% Referral | Laufender Betrieb | → Skalierung / Automation |

---

## Nächste Schritte (heute 12.03.2026)

- [ ] Prototyp kommt morgen von Daniel → fotografieren (Stage 2 startet)
- [ ] Etsy-Shop-Credentials in `.mcp.json` speichern (NICHT Git)
- [ ] 3 Early Adopter kontaktieren (Waitlist) für kostenlose Samples + Review
- [ ] Gewerbe anmelden (parallel — Mashl)
- [ ] TikTok-Account erstellen (Marketing)
- [ ] Stage 1 → SHIPPED markieren (Pathmode)

---

**Gültig ab:** 12.03.2026
**Letzte Überprüfung:** 12.03.2026
**Owner:** Mashl (Marketing) + Claude Code (Tech)
