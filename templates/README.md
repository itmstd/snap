# Strip Background Templates

The camera mode composes a 4×6 (4R) print (1200×1800 px) for one- and two-photo layouts, and a 2×6 photo strip (600×1800 px) for the three-photo Classic Strip. Backgrounds live in this folder and are loaded at runtime — add one file + one manifest entry, no code changes needed.

## How it works

1. App fetches `templates/templates.json` on load.
2. Each entry is rendered as a swatch under the camera viewfinder.
3. On composition, the selected background is drawn behind the photos. For 4R output it is tiled horizontally to preserve its proportions; the footer wordmark/date uses the entry's `textColor` / `subColor`.
4. If the manifest or image fails to load, the strip falls back to plain white — never breaks.

## Adding a template

1. Create a **600×1800 px** background (SVG or JPG/PNG). It is used once for Classic Strip and tiled horizontally for 4R output. Keep the footer zone (bottom ~120 px) and photo area readable — decorations belong at the edges, footer band, and top.
2. Drop the file in this folder.
3. Add an entry to `templates.json`:

```json
{
  "id": "my-theme",
  "name": "My Theme",
  "file": "templates/my-theme.svg",
  "textColor": "#1d1d1f",
  "subColor": "#86868b"
}
```

- `textColor` / `subColor` — footer wordmark and date colors; pick ones with contrast against your background's footer area.
- `id` must be unique; `file` is relative to the site root.

## Photo cell layout (for design reference)

The three-photo Classic Strip is 600×1800. The one- and two-photo 4R layout is 1200×1800. Both use 30 px padding, a 24 px gap between photos, and a 120 px footer. Remaining vertical space is divided equally among the photos; each photo cover-crops to fill its cell.

| Shots | Cell height | Cell y-positions (approx) |
|---|---|---|
| 1 (4R) | 1620 | 30 |
| 2 (4R) | 798 | 30, 852 |
| 3 | 524 | 30, 578, 1126 |

## Bundled templates

- `clean-white` — white with subtle dot columns
- `midnight-stars` — deep navy gradient with stars
- `pastel-sunset` — soft pink→peach→blue gradient
- `confetti-pop` — white with colorful confetti footer
