# gamestheory.org — hub

Landing page for **gamestheory.org**: a tile per game, bilingual (EN/PL,
auto-detected, switchable), pure static HTML/CSS/JS with no dependencies,
no tracking and a strict Content-Security-Policy.

Current tiles:

- **Two Buttons Dilemma** → https://twobuttons.gamestheory.org
- **CANDLE** → https://candles.gamestheory.org
- "Something's brewing" placeholder for the next game

## Adding a new game tile

1. Copy one of the `<a class="card">…</a>` blocks in `index.html` and point
   it at the new subdomain.
2. Add the description strings (EN + PL) to the `STR` dictionary in `hub.js`
   and reference them via `data-i18n`.
3. Commit + push — Cloudflare Pages deploys automatically.

## License

[PolyForm Noncommercial License 1.0.0](LICENSE) — Copyright Kacper (2026).
