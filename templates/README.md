# Strip Background Templates

The camera mode composes a 2×6 photo strip (600×1800 px) and paints a background behind the photos. Backgrounds live in this folder and are loaded at runtime — add one file + one manifest entry, no code changes needed.

## How it works

1. App fetches `templates/templates.json` on load.
2. Each entry is rendered as a swatch under the camera viewfinder.
3. On strip composition, the selected background is drawn full-size, photos are laid on top, and the footer wordmark/date uses the entry's `textColor` / `subColor`.
4. If the manifest or image fails to load, the strip falls back to plain white — never breaks.

## Adding a template

1. Create a **600×1800 px** background (SVG or JPG/PNG). Keep the footer zone (bottom ~120 px) and photo area readable — decorations belong at the edges, footer band, and top.
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

Strip: 600×1800. Padding 30 px sides/top, gap 24 px between photos, footer band 120 px at the bottom. Remaining vertical space is divided equally among 1–3 photos; each photo cover-crops to fill its cell.

| Shots | Cell height | Cell y-positions (approx) |
|---|---|---|
| 1 | 1626 | 30 |
| 2 | 801 | 30, 855 |
| 3 | 527 | 30, 581, 1132 |

## Bundled templates

- `clean-white` — white with subtle dot columns
- `midnight-stars` — deep navy gradient with stars
- `pastel-sunset` — soft pink→peach→blue gradient
- `confetti-pop` — white with colorful confetti footer
