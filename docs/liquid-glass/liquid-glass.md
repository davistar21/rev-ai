# Liquid Glass UI Principles (PWA – iPhone First)

## Core Philosophy

Design like glass is **earned, not default**.

Glass is used to:

- Separate layers without hard borders
- Preserve context (background awareness)
- Suggest depth and motion

Avoid using glass as decoration.

---

## 1. Layering Model (Strict)

Every screen must follow a 3-layer system:

1. **Base Layer (Solid)**
   - Primary content background
   - Minimal gradients or subtle noise only
   - No blur here

2. **Glass Layer (Translucent Surfaces)**
   - Navigation bars, modals, floating panels
   - Must use backdrop blur + translucency
   - Opacity range: 60–85%

3. **Foreground Layer (Content)**
   - Text, icons, controls
   - Always high contrast
   - Never blurred

---

## 2. Glass Rules (Non-Negotiable)

### Use glass ONLY for:

- Navigation bars
- Floating action panels
- Modals / sheets
- Context overlays

### NEVER use glass for:

- Long scrolling content backgrounds
- Large containers holding dense text
- Primary reading surfaces

---

## 3. Blur & Material

- Backdrop blur: 20px – 40px (dynamic preferred)
- Saturation: slightly increased (1.1–1.3)
- Tint: subtle (based on theme)
- Add inner highlight:
  - 1px white at 20–30% opacity (top edge)

- Add outer shadow:
  - Soft, diffused, low opacity

Example CSS:

```css
.glass {
  backdrop-filter: blur(30px) saturate(1.2);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 4. Motion & Physics

All glass must feel **physically reactive**:

- Use subtle scale (0.98 → 1.0 on tap)
- Spring animations (not linear)
- Parallax: background moves slower than glass
- Blur adjusts slightly during transitions

Target:

- Duration: 200ms–400ms
- Easing: spring or ease-out (never linear)

---

## 5. Color System

- Prefer **vibrant base colors behind glass**
- Glass adapts to background (not fixed color)
- Support:
  - Light mode (frosted white)
  - Dark mode (frosted charcoal)

Avoid:

- Pure white (#FFFFFF)
- Pure black (#000000)

---

## 6. Typography

- Use clean sans-serif (SF Pro style)
- High contrast against glass
- Minimum:
  - Body: 16px
  - Line height: 1.4–1.6

Rule:
Text must ALWAYS be readable regardless of background blur.

---

## 7. Spacing & Density

- Glass increases perceived density → compensate with spacing
- Minimum padding inside glass: 12–16px
- Use generous margins between glass elements

---

## 8. Depth System

Every glass element must have a defined depth level:

- Level 1: subtle (nav bars)
- Level 2: elevated (cards, panels)
- Level 3: modal (strong blur + shadow)

Never mix levels arbitrarily.

---

## 9. iPhone PWA Constraints

- Respect safe areas (notch, home bar)
- Avoid fixed elements that fight scroll bounce
- Ensure performance:
  - Avoid excessive blur layers
  - Limit simultaneous glass elements to 3–5

---

## 10. Anti-Patterns (Hard Fail)

Reject any UI that:

- Uses blur everywhere
- Has low-contrast text on glass
- Feels “milky” or washed out
- Lacks clear hierarchy
- Uses glass without depth purpose

---

## 11. Signature Touches (Allowed)

- Subtle grain/noise overlay
- Dynamic color shifting based on wallpaper-like background
- Frosted edge highlights
- Micro-reflections on motion

---

## Final Rule

If removing blur improves clarity → remove it.

Clarity > Aesthetic.
