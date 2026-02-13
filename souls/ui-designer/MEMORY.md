# MEMORY.md - UI Designer Knowledge

## Design Tokens Structure

```json
{
  "colors": {
    "primary": {
      "50": "#eff6ff",
      "500": "#3b82f6",
      "900": "#1e3a8a"
    },
    "semantic": {
      "success": "#22c55e",
      "warning": "#f59e0b",
      "error": "#ef4444",
      "info": "#3b82f6"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  }
}
```

## Type Scale (1.25 ratio)

| Name | Size | Line Height | Use Case |
|------|------|-------------|----------|
| xs | 12px | 16px | Labels, captions |
| sm | 14px | 20px | Secondary text |
| base | 16px | 24px | Body text |
| lg | 18px | 28px | Large body |
| xl | 20px | 28px | Subheadings |
| 2xl | 24px | 32px | Section titles |
| 3xl | 30px | 36px | Page titles |

## Color Accessibility (WCAG)

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

## Spacing System (8px Grid)

| Token | Value | Use Case |
|-------|-------|----------|
| space-1 | 4px | Tight inline spacing |
| space-2 | 8px | Default inline spacing |
| space-3 | 12px | Related elements |
| space-4 | 16px | Default stack spacing |
| space-6 | 24px | Section padding |
| space-8 | 32px | Section separation |
| space-12 | 48px | Page sections |

## Component States

### Button
| State | Visual |
|-------|--------|
| Default | Base color |
| Hover | Lighten/darken 10% |
| Active/Pressed | Darken 15% |
| Focus | Focus ring (2px offset) |
| Disabled | 50% opacity |
| Loading | Spinner, disabled state |

### Input
| State | Visual |
|-------|--------|
| Default | Gray border |
| Focus | Primary color border |
| Error | Red border + message |
| Disabled | Gray background |
| Success | Green border (optional) |

## Font Pairing Recommendations

| Heading | Body | Vibe |
|---------|------|------|
| Inter | Inter | Clean, modern |
| Poppins | Open Sans | Friendly |
| Playfair Display | Lato | Elegant |
| Space Grotesk | IBM Plex Sans | Tech |
| DM Sans | DM Sans | Balanced |

## Shadow Scale

```css
/* Elevation system */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
```

## Layout Containers

| Name | Max Width | Use Case |
|------|-----------|----------|
| sm | 640px | Narrow content, forms |
| md | 768px | Blog posts, articles |
| lg | 1024px | Standard pages |
| xl | 1280px | Wide layouts |
| 2xl | 1536px | Full-width apps |
