# ChainBreak Games — Website

Static website for chainbreakgames.github.io. No build step required.

## File Structure

```
├── index.html          ← Main page (hero, game, about)
├── impressum.html      ← Impressum & Datenschutz (Austrian legal)
├── css/
│   └── style.css       ← All styles, design tokens, responsive rules
├── js/
│   └── main.js         ← Nav, mobile menu, scroll effects
└── assets/
    ├── icon-square.png     ← Studio logo (square, ~512×512px)
    ├── banner-16x9.png     ← Hero key art (1920×1080px recommended)
    └── screenshot-01.png   ← Game screenshot (16:9 recommended)
```

## Deploy to GitHub Pages

1. Create a repo named `chainbreakgames.github.io`
2. Push all files to the `main` branch
3. Settings → Pages → Source: Deploy from branch (main / root)
4. Live at `https://chainbreakgames.github.io`

Custom domain (e.g. chainbreak.games): add a `CNAME` file containing
`chainbreak.games` to the repo root and point your DNS to GitHub Pages IPs.

## Swapping Fonts

Open `css/style.css` and find the FONT PLACEHOLDERS block at the top.

1. Replace the two @import lines with your chosen fonts
2. Update the two CSS variables:
   --font-display: 'YourDisplayFont', Georgia, serif;
   --font-body:    'YourBodyFont', system-ui, sans-serif;

Both are used globally — one change updates the whole site.

## Filling Placeholders

Search for href="#" in index.html for all social/Steam links to replace.
