# 🎰 Jugaad Roulette — Indian Funny Pitch Spinner

> "Build a **[ ______ ]** for **[ ______ ]**" — but make it *desi*.

Spin the wheel, get a ridiculous startup idea with an Indian twist, build it in 5 minutes, pitch it in 60 seconds. Based on the **Pitch Roulette** design (Stitch export: `code.html`, `screen.png`, `DESIGN.md`).

---

## 1. What is this?

A tiny, fast, single-page web game for friends, hackathons, college fests and Instagram Reels.

1. **Spin** → the slot machine / wheel picks a *Product* and an *Audience*
2. **Build** → 5-minute sprint timer
3. **Pitch** → 60-second pitch timer + audience reactions

Example spins:

| Build a… | For… |
|---|---|
| Tinder for **pressure cooker whistles** | **Sharma ji ke bête** |
| Swiggy for **leftover wedding food** | **Shaadi wale mama ji** |
| Uber for **"beta, 2 minute mein aaya"** | **Delhi auto wale bhaiya** |
| LinkedIn for **chai tapri philosophers** | **Unemployed engineers** |
| Duolingo for **decoding mom's "kuch nahi"** | **Husbands everywhere** |

---

## 2. The Spin Feature 🎡

Two spin modes, both in the first version:

### A. Slot-Reel Spin (from original design)
- Two slots: `build a [ ? ]` and `for [ ? ]`
- Press **SPACE** or tap **SPIN** → both reels blur and snap to a result
- **Lock** a slot to keep it while re-rolling the other
- Max **3 re-rolls** per session (house rule)

### B. Desi Wheel Spin (new)
- A colourful wheel (like a mela / lucky-draw chakra) with 8 segments
- Spin to pick a **twist** or **category**: `Bollywood`, `Cricket`, `Shaadi`, `Chai`, `Jugaad`, `Rishtedaar`, `Traffic`, `Exam`
- Wheel result biases the idea pool (e.g. `Cricket` → ideas about IPL, Dhoni, "umpire ka decision")
- Ticking sound + confetti on landing 🎉

---

## 3. Modes

| Mode | Vibe | Example |
|---|---|---|
| 🤪 **Wild** | Pure desi chaos | "Smart dupatta that Wi-Fi hotspots" |
| 💼 **B2B** | Fake-serious startup | "SaaS for managing Sharma ji's comparisons" |
| 🔧 **Jugaad Gadgets** | Hardware hacks | "Scooter-powered inverter for load-shedding" |
| 🏏 **Cricket** | IPL madness | "DRS for family arguments" |
| 💍 **Shaadi** | Wedding season | "CRM for 500 uninvited relatives" |

---

## 4. Design System (kept from Stitch export)

- **Fonts:** Space Grotesk (display) · Inter (body) · JetBrains Mono (labels)
- **Colours:** Primary `#635BFF` · Secondary `#22C55E` · Tertiary `#FF7A00` · Ink `#121316` · Canvas `#FAF9F6`
- **Style:** crisp 1.5px black borders, retro hard shadows (`2px 2px 0 #121316`), pill badges
- **Press state:** hover lifts, click depresses — mechanical, game-like

### Desi additions
- Marigold accent `#FFB400` for the wheel
- Rangoli-style dotted border on the wheel card
- Hinglish microcopy: `SPIN KARO`, `LOCK KAR DO`, `CHAL, PITCH MAAR`
- Optional truck-art (Horn OK Please) sticker badges

---

## 5. Hinglish Microcopy

| Original | Desi version |
|---|---|
| spin new idea | **spin karo bhai** |
| lock concept | **pakka kar do** |
| build this prompt | **chal, bana de** |
| ready to pitch | **ab bol, 60 second** |
| pitch again | **ek aur baar** |
| audience votes | **janta ka faisla** |
| shut up & take my money | **le le paisa, chup kar** |
| unhinged brilliance | **pagal hai, par genius hai** |
| this is a lawsuit | **court mein milenge** |

---

## 6. Tech Stack

| Layer | Choice |
|---|---|
| UI | HTML + Tailwind (CDN) + vanilla JS |
| Optional backend | **Python (FastAPI or Flask)** serving the idea pool + leaderboard |
| Storage | `localStorage` for saved pitches, SQLite for community (v2) |
| Sound | Web Audio API (tick, ding, airhorn) |
| Confetti | `canvas-confetti` |
| Hosting | GitHub Pages / Vercel / Render |

> Python backend is optional — v1 runs fully static. See `ARCHITECTURE.md`.

---

## 7. Project Structure

```
jugaad-roulette/
├── index.html
├── README.md
├── ARCHITECTURE.md
├── DESIGN.md              # from Stitch export
├── assets/
│   ├── screen.png
│   ├── sounds/            # tick.mp3, ding.mp3, airhorn.mp3
│   └── stickers/
├── src/
│   ├── main.js
│   ├── state.js
│   ├── spin/
│   │   ├── slots.js       # reel spin
│   │   └── wheel.js       # desi wheel spin
│   ├── timers.js
│   ├── share.js
│   └── data/
│       ├── ideas.desi.json
│       └── audiences.desi.json
├── styles/tokens.css
└── server/                # optional, Python
    ├── app.py
    └── requirements.txt
```

---

## 8. Roadmap

- [ ] **v0.1** Port Stitch `code.html`, swap in desi data pool
- [ ] **v0.2** Add Desi Wheel spin + sounds + confetti
- [ ] **v0.3** Hinglish microcopy + mode switcher (Wild / B2B / Jugaad / Cricket / Shaadi)
- [ ] **v0.4** Share card (image) for Instagram Reels / WhatsApp
- [ ] **v0.5** Python backend: submit ideas, upvotes, daily "Sharma ji special"
- [ ] **v1.0** Multiplayer room: everyone gets the same spin, vote on the best pitch

---

## 9. Content Guidelines (keep it funny, not hurtful)

- Roast **situations and stereotypes of everyday life** (chai, traffic, shaadi, exams, relatives) — not religions, castes, regions or communities.
- No real people's names (use "Sharma ji", "Pinky aunty", "Bunty" as fictional archetypes).
- Keep it family-friendly so it works for college events and Reels.

---

## 10. Quick Start

```bash
# static version
cd jugaad-roulette
python -m http.server 8000
# open http://localhost:8000
```

Optional backend:

```bash
cd server
pip install fastapi uvicorn
uvicorn app:app --reload
```

---

## 11. Credits

- Design base: **Pitch Roulette Playful Minimal** (Stitch export)
- Desi remix: your build 🇮🇳
