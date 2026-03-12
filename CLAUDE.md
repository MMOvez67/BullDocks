# Bulldocks — CLAUDE.md
## Projektkontext für alle KI-Agenten
Letzte Aktualisierung: 12.03.2026

---

## Was ist Bulldocks?

3D-gedruckte Dartscheiben-Türrahmenhalterung — kein Bohren, kein Dübel, WDF-konform.
Zielgruppe: Mieter in DE/AT/CH/UK die Dart spielen wollen ohne Kaution zu riskieren.
Einziges Produkt am Markt mit fixierter WDF-Bullseye-Höhe (1730mm) und korrektem Wurfwinkel.

**Website:** https://bulldocks.net (GitHub Pages, live)
**Etsy:** noch nicht live — wartet auf Bankkonto nach Gewerbeanmeldung
**Preis:** 29,99 EUR (Standard) / 39,99 EUR (Pro Angular) / ab 59,99 EUR (Elite Custom)

---

## Unternehmensstruktur

**Rechtsform aktuell:** Einzelunternehmen (Gewerbeanmeldung ausstehend)
**Inhaber:** Daniel Maerz
**Adresse:** Ludwigstraße 7a, 84478 Waldkraiburg, Deutschland
**Rechtsform geplant:** Bulldocks UG (haftungsbeschränkt) — nach messbarem Umsatz

**Partner:** Daniel März (Produktion, 30 FDM-Drucker)
**Koordinator:** Mashl (Marketing, Sales, KI-System)

---

## E-Mail-Struktur (Google Workspace @bulldocks.net)

| Adresse | Verwendung |
|---|---|
| kontakt@bulldocks.net | Impressum-Pflichtangabe, allgemeiner Eingang |
| service@bulldocks.net | Bestellungen, Widerruf, Kundensupport |
| marketing@bulldocks.net | Presse, Kooperationen, Social Media |
| daniel.maerz@bulldocks.net | Partner intern |

---

## Produkt — 5-Komponenten-System

1. **Klemm-Modul ×2** — 60–120mm Türbreite, TPU-Gummipads, 180N+ Klemmkraft
2. **Höhen-Schiene ×2** — 350mm, WDF-Markierung bei 1730mm
3. **Höhen-Slider** — Federlock, M8 Kugelgelenk-Buchse
4. **Schwenkarm + Winkelgelenk** — 150–300mm, 0–15° Neigung
5. **Dartscheiben-Adapter** — 470mm, 3× Befestigungspunkte, alle WDF-Scheiben

**Material:** PETG empfohlen (12kg Traglast), PLA möglich (8kg)
**Druckzeit gesamt:** ~8,3 Stunden pro Set
**Filament:** ~323g pro Set

---

## Physik & WDF-Konformität

- Hebelmoment bei Standardkonfig: 1,28 Nm
- Benötigte Klemmkraft: 102,4 N
- Verfügbare Klemmkraft: 160 N (56% Reserve)
- Bullseye-Höhe: exakt 1730mm (WDF-Norm)
- Wurfabstand Steeldart: 2370mm

---

## Tech-Stack / Workspace-Pfade

| System | Pfad / URL |
|---|---|
| Claude Code (Website) | ~/projects/bulldocks/ |
| OpenClaw Workspace | ~/.openclaw/workspace/bulldocks/ |
| Website live | https://bulldocks.net |
| Dashboard (Tailscale) | http://mac-mini-von-mac.tail38c07f.ts.net:3333 |
| Pathmode Workspace | bulldocks (ID: daa1edbc-40df-4e54-98b9-cc52d05d5480) |

**Website-Dateien:**
- `~/projects/bulldocks/index.html` — Landing Page (Overhaul läuft)
- `~/projects/bulldocks/configurator.html` — 3D Konfigurator (Three.js r128)
- `~/projects/bulldocks/agb.html` — AGB (live, Einzelunternehmen)
- `~/projects/bulldocks/impressum.html` — Impressum (live)
- `~/projects/bulldocks/datenschutz.html` — Datenschutz (live, keine Cookies)
- `~/projects/bulldocks/assets/logo.svg` — Logo (in Arbeit bei Claude Code)

**Agenten:**
- Main (qwen3:8b) — Strategie, Analyse, via Telegram @Carlollama_bot
- Coder (qwen2.5-coder:7b) — Templates, Listings, Skripte
- Router (qwen3:4b) — Reports, schnelle Tasks
- Claude Code — Website, Dashboard, komplexe Entwicklung
- Claude (claude.ai) — Koordination, Planung, Qualitätskontrolle

---

## Kritische Regeln für alle Agenten

1. **Light Mode überall** — weißer/heller Hintergrund, kein schwarzes BG (Monitor-Problem)
2. **Keine UG-Angaben** — bis Handelsregistereintrag nur Einzelunternehmen
3. **Preis 29,99 EUR minimum** — nicht darunter, auch nicht testweise
4. **WDF immer erwähnen** — in Copy, Listings, Titeln
5. **Slack-Nachrichten max. ~2800 Zeichen** — sonst silent truncation
6. **Kein Server nötig** — alle Website-Dateien statisches HTML/CSS/JS

---

## Aktueller Stand (12.03.2026)

### ERLEDIGT ✅
- System-Setup (OpenClaw, Slack, Telegram, Dashboard, Tailscale)
- Masterplan v2.0
- Etsy-Konkurrenzanalyse (echte Daten — VOKS, Shot Voyager, Designa)
- Etsy-Listing v1 (Titel, Tags, Beschreibung)
- Landing Page erste Version
- 3D-Konfigurator (Three.js, live Berechnungen)
- Produkt-Design Brief PDF (5 Komponenten, Physik, Materialvergleich)
- Social Media Playbook PDF
- Viral-Video Skript ("Hintertür"-Slogan, 2 Versionen)
- AGB / Impressum / Datenschutz (alle live auf bulldocks.net)
- Website Overhaul Task an Claude Code übergeben (Logo, Copy, FAQ, SEO, Mobile Nav)
- UK/AT/CH Marktanalyse Task an Main übergeben
- Waitlist-Formular Task an Claude Code übergeben
- Pathmode Workspace eingerichtet (2 Intents: Prototyp/Foto + Erster Verkauf)
- DNS konfiguriert (A-Records + CNAME auf GitHub Pages)

### WARTET AUF EXTERN 🔴
- Prototyp-Druck — morgen fertig (Daniel)
- Gewerbeanmeldung — ausstehend (Mashl)
- Finom-Konto — nach Gewerbeanmeldung
- Etsy-Shop — nach Bankkonto
- Produktfotos — nach Prototyp

### IN ARBEIT ⚙️
- Website Overhaul (Claude Code, 3 Tasks aktiv in Slack)

### NÄCHSTE SCHRITTE WENN DRUCK FERTIG 🎯
1. Prototyp fotografieren (5+ Fotos, natural light reicht)
2. Gewerbe anmelden → Finom → Etsy-Shop
3. Listing live stellen
4. TikTok-Video: Screen-Recording Konfigurator + Hintertür-Slogan (CapCut, 20 Min)

---

## Drucker-Upgrade (geplant)
**Bambu Lab H2D AMS Combo** — steuerlich absetzbar als vorweggenommene
Betriebsausgabe auch vor Gewerbeanmeldung (Nachweis durch Projektdokumentation).
Ohne Upgrade: ~1 Woche pro Set. Mit Upgrade: Serienproduktion möglich.

---

## Brand & Design

**Fonts:** Bebas Neue (Headlines) + DM Sans (Body)
**Farben:** Orange #ff6b35, Schwarz #1a1a1a, Weiß #ffffff, Grau #888888
**Ton:** Direkt, selbstbewusst, leicht frech — kein Corporate-Sprech
**Slogan:** "Dart spielen. Ohne einen einzigen Nagel."
**Viral-Slogan:** "Wir docken nicht nur an eurer Vorder-, sondern auch an eurer Hintertür."
**Maskottchen:** Retro-Cartoon Bulldogge mit Dartpfeil zwischen den Zähnen

---

## Märkte (Priorität)

1. 🇩🇪 Deutschland — Primärmarkt, Etsy DE + bulldocks.net
2. 🇬🇧 UK — Darts Volkssport, Shot Voyager Hauptkonkurrent, GBP-Preis ~25,99£
3. 🇦🇹🇨🇭 AT/CH — deutschsprachig, höhere Kaufkraft

---

## Finanzielle Eckdaten

Empfohlene Marge ~70% bei 29,99 EUR (exakte Kalkulation ausstehend).
Etsy-Gebühren: 6,5% Transaktionsgebühr + 0,20 USD Listing-Gebühr + Zahlungsgebühren.
Materialkostenschätzung: ~3-5 EUR Filament pro Set (PETG).