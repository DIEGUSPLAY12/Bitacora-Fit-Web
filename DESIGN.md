# Bitácora Fit — Sistema de diseño

Referencia rápida de los tokens de diseño utilizados en toda la landing.
Definidos en `app/globals.css` dentro de la directiva `@theme` de Tailwind v4.

---

## Paleta de colores

| Token          | Valor     | Uso                                       |
| -------------- | --------- | ----------------------------------------- |
| `background`   | `#121212` | Fondo principal de la página              |
| `surface`      | `#1E1E1E` | Tarjetas, contenedores, elementos elevados |
| `foreground`   | `#F5F5F5` | Texto principal                           |
| `muted`        | `#A3A3A3` | Texto secundario, descripciones, captions  |
| `accent`       | `#B4F03C` | CTA, elementos interactivos, highlights    |

> **Profundidad sin sombras**: la jerarquía visual se consigue únicamente
> mediante el contraste entre `background` y `surface`. No se usan
> `box-shadow` en ningún componente.

---

## Border radius

| Token    | Valor  | Uso                         |
| -------- | ------ | --------------------------- |
| `card`   | `16px` | Tarjetas, mockup placeholders |
| `button` | `8px`  | Botones, badges             |

---

## Tipografía

Fuente: **Inter** (Google Fonts, vía `next/font`), pesos 400, 500 y 700.

| Escala     | Tamaño                      | Peso | Color        |
| ---------- | --------------------------- | ---- | ------------ |
| `display`  | 40–56 px (clamp responsive) | 700  | `foreground` |
| `title`    | 24–28 px                    | 700  | `foreground` |
| `body`     | 16 px                       | 400  | `foreground` |
| `caption`  | 14 px                       | 400  | `muted`      |

---

## Espaciado

| Contexto       | Valor mínimo |
| -------------- | ------------ |
| Móvil          | `24px` padding vertical entre secciones |
| Escritorio     | `64px` padding vertical entre secciones |

Tokens Tailwind: `py-section-mobile` / `py-section-desktop`.

---

## Componentes interactivos

### Botón "Descargar"

- Fondo: `accent` (`#B4F03C`)
- Texto: `background` (`#121212`) — no blanco, para buen contraste
- `border-radius`: `button` (8 px)
- **Hover**: `opacity: 0.85`
- **Active**: `opacity: 0.75`, `scale: 0.97`
- **Focus-visible**: `outline: 2px solid accent`, `offset: 2px`
- Nunca se elimina el outline sin un sustituto visible

---

## Estructura de carpetas

```
app/
  globals.css        ← tokens @theme + resets
  layout.tsx         ← Inter font, metadata SEO/OG
  page.tsx           ← composición de secciones
components/
  sections/
    Header.tsx
    Hero.tsx
    Features.tsx     ← placeholder
    Gallery.tsx      ← placeholder
    Footer.tsx
  ui/
    DownloadButton.tsx
```
