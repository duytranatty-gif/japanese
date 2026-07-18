# Japanese for Kids 🎌

A game-based Japanese learning app for **English-speaking kids**. Fully offline, no accounts, no ads, all progress saved on the device.

**Live:** https://duytranatty-gif.github.io/japanese/ — open in Safari on an iPad and **Add to Home Screen**.

## What it is

- **Two kid profiles** — Track A (age ~5, audio + picture) and Track B (age ~8, adds hiragana reading and simple sentence patterns). Independent progress, pick an avatar at launch.
- **One spaced-repetition engine** (Leitner, 5 boxes) over 343 items: 258 words, 31 everyday phrases, 46 hiragana, 8 grammar patterns.
- **English on-ramp, Japanese target.** All instructions and buttons are in English; every new word shows the picture, the Japanese (kana), a romaji "sound-it-out" line, and the English meaning, and is spoken aloud in Japanese. Romaji can be toggled off per child in the parent dashboard.
- **Games** — tap-what-you-hear, matching pairs, production choice, new-word intros, a tap-the-body-part figure, hiragana recognition + finger-tracing + read-a-word, and unlock-gated sentence patterns.
- **Kid-friendly motivation** — a growing garden, a daily quest ring, a forgiving streak (one grace day a week), and milestone stickers. No timers, no lose states.
- **Parent dashboard** (hold the ⚙️ for 3 seconds) — known-word counts by unit, streak, hiragana grid, unlocked patterns, next unlocks, the weekly family phrase (with romaji), and settings: new items/day, session length, romaji on/off, reset hiragana, and export/import progress.

## Tech

Single self-contained `index.html` — the curriculum is embedded as a JS const, audio uses the device's `speechSynthesis` Japanese voice (iOS: Kyoko), and a small service worker (`sw.js`) caches everything for offline use. No build step, no network calls after first load.

*Needs a Japanese voice installed. On iPad: Settings → Accessibility → Spoken Content → Voices → add Japanese.*
