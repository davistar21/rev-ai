# Glass UI Component Architecture (Agent Rules)

## Core Principle

This project uses a **two-tier component system**:

1. **Base Design System (glass-ui)** → reusable primitives
2. **Feature Components** → composed, app-specific UI

The agent MUST never mix these responsibilities.

---

## Folder Structure (Strict)

```
components/
  ui/               # shadcn (DO NOT MODIFY)
  glass-ui/         # custom glass design system (YOU BUILD THIS)

features/ or app/
  planner/
    Planner.tsx     # feature-level component
```

---

## 1. When to Create a Glass Base Component

The agent MUST create a new file in `components/glass-ui/` when:

- A UI pattern is **visually reusable**
- It appears **more than once OR is expected to**
- It represents a **primitive building block**

### Examples:

- Buttons
- Inputs
- Cards
- Modals / Dialogs
- Tables
- Dropdowns
- Tabs
- Nav bars

---

## 2. When NOT to Create a Base Component

DO NOT create a glass-ui component if:

- It is business logic specific (e.g. Planner logic)
- It is layout-specific to one screen
- It combines too many responsibilities

### ❌ Wrong:

- `GlassPlanner.tsx`
- `GlassDashboardWithStats.tsx`

### ✅ Correct:

- `glass-card.tsx`
- `glass-table.tsx`

---

## 3. Naming Convention (Strict)

All base components MUST:

- Be lowercase kebab-case files:
  - `glass-button.tsx`
  - `glass-dialog.tsx`

- Export PascalCase components:
  - `GlassButton`
  - `GlassDialog`

---

## 4. Required Props (Standardized API)

Every glass component MUST support:

```ts
type GlassProps = {
  depth?: 1 | 2 | 3;
  blur?: number; // e.g. 20–40
  translucency?: number; // 0–1 scale
  tint?: "light" | "dark" | "auto";
  className?: string;
};
```

### Behavior:

- `depth` controls shadow + elevation
- `blur` controls backdrop-filter
- `translucency` controls background alpha
- `tint` adapts to theme
- `className` allows extension

---

## 5. Composition Rule (Critical)

Feature components MUST ONLY use:

- glass-ui components
- shadcn primitives (if needed internally)

They MUST NOT:

- Reimplement glass styles inline
- Duplicate glass logic

---

## 6. Example Architecture

### Base Component

```tsx
// components/glass-ui/glass-button.tsx
export function GlassButton(props) {
  // handles ALL glass styling logic
}
```

### Feature Component

```tsx
// features/planner/Planner.tsx
import { GlassButton } from "@/components/glass-ui/glass-button";

export function Planner() {
  return <GlassButton>New Task</GlassButton>;
}
```

---

## 7. Reuse Enforcement Rule

If the agent writes the same styling logic twice:

→ It MUST refactor into a glass-ui component

No exceptions.

---

## 8. Extensibility Pattern

Glass components must be:

- Unopinionated about business logic
- Highly composable
- Style-driven, not behavior-heavy

---

## 9. Variants (Preferred Pattern)

Use variant systems instead of multiple components:

```ts
variant?: "primary" | "secondary" | "ghost"
size?: "sm" | "md" | "lg"
```

---

## 10. Internal Consistency

All glass-ui components MUST:

- Share the same blur logic
- Share the same depth system
- Share the same color behavior

If inconsistency appears → refactor immediately

---

## 11. Anti-Patterns (Hard Fail)

Reject any code that:

- Uses inline glass styles inside feature components
- Creates one-off “almost reusable” components
- Mixes business logic into glass-ui
- Copies shadcn components instead of extending them

---

## Final Rule

If a component answers:
“Could this exist in another screen?”

→ It belongs in `glass-ui/`
