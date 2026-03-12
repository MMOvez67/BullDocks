# 🐶 Bulldocks Projekt-Struktur

## Verzeichnis-Übersicht

```
bulldocks/
├── 📄 HTML-SEITEN (Root)
│   ├── index.html              → Landing Page (Home)
│   ├── configurator.html       → 3D Konfigurator
│   ├── impressum.html          → Impressum (Legal)
│   ├── datenschutz.html        → Datenschutz (Legal)
│   └── agb.html                → AGB (Legal)
│
├── 📁 assets/                  → Alle Grafiken & Icons
│   ├── logo.svg                → Logo Standard
│   ├── logo-white.svg          → Logo White (dark backgrounds)
│   ├── favicon.svg             → Browser Tab Icon
│   ├── product-1.jpg           → Produktfoto 1
│   ├── product-2.jpg           → Produktfoto 2
│   ├── product-3.jpg           → Produktfoto 3
│   └── product-4.jpg           → Produktfoto 4
│
├── 📁 js/                      → JavaScript-Dateien
│   ├── three.min.js            → Three.js Library (3D)
│   └── main.js                 → Custom Scripts (wenn nötig)
│
├── 📁 styles/                  → CSS-Dateien (wenn ausgelagert)
│   └── main.css                → Main Stylesheet (wenn nötig)
│
├── 🖥️ BACKEND / SERVER
│   ├── server.js               → Express Backend (Port 3333)
│   ├── package.json            → NPM Dependencies
│   └── node_modules/           → Installierte Packages
│
├── 🚀 DEPLOYMENT
│   ├── start.sh                → Start-Script (npm install + node server)
│   ├── CNAME                   → GitHub Pages Custom Domain
│   └── .github/workflows/      → GitHub Actions (CI/CD)
│
├── 📚 DOKUMENTATION
│   ├── PROJECT_STRUCTURE.md    → Diese Datei
│   ├── docs/SETUP.md           → Entwicklungs-Setup
│   ├── docs/DEPLOYMENT.md      → Deployment Guide
│   └── docs/ARCHITECTURE.md    → Technische Architektur
│
└── 🔧 KONFIGURATION
    ├── .gitignore
    ├── README.md               → Projekt-Übersicht
    └── CLAUDE.md               → Claude Code Instruktionen
```

---

## 📋 Dateien-Zuordnung

### HTML-Seiten (Root-Verzeichnis)
| Datei | Zweck | Status |
|-------|-------|--------|
| `index.html` | Landing Page, SEO-optimiert | ✅ Live |
| `configurator.html` | 3D Konfigurator mit Three.js | ✅ Live |
| `impressum.html` | Impressum (Legal) | ✅ Live |
| `datenschutz.html` | DSGVO-konforme Datenschutz | ✅ Live |
| `agb.html` | AGB für Shop | ⏳ Zu erstellen |

### Assets (Grafiken & Bilder)
| Datei | Größe | Format | Verwendung |
|-------|-------|--------|-----------|
| `logo.svg` | ~2KB | SVG | Header, Branding |
| `logo-white.svg` | ~2KB | SVG | Dark Mode, Invert |
| `favicon.svg` | ~1KB | SVG | Browser Tab |
| `product-*.jpg` | ~100-200KB je | JPG | Produktfotos |

### Backend
| Datei | Port | Zweck |
|-------|------|-------|
| `server.js` | 3333 | Express API Server |
| `package.json` | - | Abhängigkeiten: express, cors, chokidar |
| `start.sh` | - | Bash-Script zum Starten |

---

## 🎯 Workflow: Neue Dateien hinzufügen

### 1. Neue Produktfoto?
```bash
cp ~/Downloads/foto-neu.jpg ~/projects/bulldocks/assets/product-5.jpg
```

### 2. Neues JavaScript?
```bash
# Kleine Skripte direkt in HTML <script> Tags
# Größere Module nach js/ auslagern
cp script.js ~/projects/bulldocks/js/
```

### 3. Neue Seite (z.B. Blog)?
```bash
# Neue HTML-Datei im Root
cp blog.html ~/projects/bulldocks/
# Links in index.html + footer aktualisieren
```

### 4. Dokumentation aktualisieren?
```bash
# Alle .md Dateien nach docs/
cp setup-guide.md ~/projects/bulldocks/docs/SETUP.md
```

---

## 🔗 Wichtige Links

| Link | Zweck |
|------|-------|
| https://bulldocks.net | Live Website (GitHub Pages) |
| http://localhost:3333 | Local Dashboard (wenn server.js läuft) |
| https://github.com/MMOvez67/BullDocks | GitHub Repository |
| https://www.etsy.com/shop/MMOvez67 | Etsy Shop |

---

## 📧 E-Mail-Adressen (vereinheitlicht)

| Adresse | Verwendung |
|---------|-----------|
| `kontakt@bulldocks.net` | Impressum, allgemeiner Kontakt |
| `service@bulldocks.net` | Bestellungen, Support, Widerruf |
| `marketing@bulldocks.net` | Presse, Kooperationen |
| `daniel.maerz@bulldocks.net` | Partner intern |

---

## ⚡ Quick Commands

```bash
# Projekt starten
bash ~/projects/bulldocks/start.sh

# Git Status prüfen
cd ~/projects/bulldocks && git status

# Commit & Push
git add . && git commit -m "feat: beschreibung" && git push origin main

# Lokalen Server stoppen
pkill -f "node server.js"

# Alle Dateien listen
ls -la ~/projects/bulldocks/
```

---

**Last Updated:** 2026-03-12
**Maintained by:** Claude Code
