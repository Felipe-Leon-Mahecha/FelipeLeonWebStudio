# CLAUDE.md

Guía para trabajar en **Felipe León Web Studio** (Astro 7 + Tailwind v4 + TypeScript).

## Cómo ejecutar

- Dev server (siempre en background): `npx astro dev --background`, luego `npx astro dev logs` / `npx astro dev stop` / `npx astro dev status`. URL: http://localhost:4321
- Build: `npm run build`
- Typecheck: `npx astro check` (debe dar 0 errores/warnings/hints)
- Verificar build: `npm run preview` (si aplica)

## Reglas innegociables

1. Todos los textos del sitio son en **español** (Colombia, tono directo y cercano).
2. **Cero comentarios en el código** a menos que se pidan explícitamente.
3. Respetar el design system de `src/styles/global.css`. No inventar colores ni fuentes nuevas.
4. Todo cambio visual respeta `prefers-reduced-motion` (hay una regla global que frena animaciones).
5. Contacto real centralizado en `src/lib/site.ts` (NO hardcodear WhatsApp/email). Usa `whatsappLink()`.
6. Moneda y precios en **COP**. Ancla de precio: `desde $1.500.000 COP`.
7. Dark mode: Tailwind v4 usa `@custom-variant dark (&:where(.dark, .dark *))`. En `<style>` escopeados de componentes, los selectores de tema requieren **`:global(.dark)`** (ej: `:global(.dark) .foo`), porque Astro escopea las clases. NO usar `.dark` plano en estilos escopeados.
8. Colecciones de contenido en Astro 7: cargar con `glob()` de `astro/loaders` en `src/content.config.ts` (NO `type: 'content'`, deprecado). Schema con `z` importado de `'zod'`.

## Design system (Tailwind v4, tokens en `@theme`)

- **Fonts** (auto-hospedadas): `font-display` = Space Grotesk (títulos), `font-sans` = Inter, `font-mono` = JetBrains Mono.
- **Neutros** (monocromo): `ink` (oscuro), `paper` (claro), con variantes `-soft` y `-mute`. Modo oscuro vía clase `.dark` en `<html>`.
- **CTA / primario**: verde WhatsApp `brand-500` = `#25d366` (fondo con texto `ink`).
- **Acentos**: violeta `accent-500` = `#6d5bff` (eyebrows, números, hovers, focos).
- **Líneas**: `line` / `line-strong` (claro), `line-dark` / `line-dark-strong` (oscuro).
- **Sombras**: `shadow-card`, `shadow-card-dark`, `shadow-glow` (violeta), `shadow-glow-brand` (verde).
- **Animaciones**: `animate-float`, `animate-float-slow`, `animate-pulse-soft`.

### Clases de componentes (`@layer components`)

- `.shell` → contenedor max-w-6xl con padding.
- `.eyebrow` → etiqueta mono mayúsculas violeta.
- `.display` → título font-display bold.
- `.btn-primary` / `.btn-secondary` → botones (verde / outline). Incluyen `active:scale` y hover lift.
- `.card` → tarjeta redondeada con borde y fondo suave (light/dark).
- `.bg-grid` → rejilla de fondo sutil (light/dark).
- `.faq-panel` / `.faq-panel.open` → acordeón FAQ.
- `.reveal` / `.reveal.is-visible` → animación de entrada al scroll (controlada por `src/scripts/reveal.ts`, con fallback SSR y reduced-motion).

## Estructura

```
src/
  pages/
    index.astro        → landing (orden: Hero, About, Services, Portfolio, Process, Pricing, FAQ, Contact, FloatingWhatsApp)
    demos/[slug].astro → página demo genérica desde frontmatter
    404.astro
  content.config.ts    → colección `demos` con glob() de astro/loaders
  content/demos/       → barberia.md, boutique.md, mercados.md, veterinaria.md
  components/
    ui/                → Button, Badge, Gem, WhatsAppIcon, Reveal
    Header.astro       → tiene fix `:global(.dark)` para tema en estilos escopeados
    Hero, About, Services, Portfolio, Process, Pricing, FAQ, Contact, Footer, FloatingWhatsApp
  layouts/Layout.astro → head completo, JSON-LD, theme script inline, metas og/twitter con /og.png
  lib/site.ts          → SITE + whatsappLink() (config central)
  scripts/reveal.ts    → IntersectionObserver para .reveal
  styles/global.css    → design system (tokens, capas, keyframes)
public/
  logo.png, favicon.svg, og.png, robots.txt
astro.config.mjs       → site placeholder https://felipeleon.example.com (cambiar con dominio real)
```

- Íconos: `import { Icon } from 'astro-icon/components'` con `name="lucide:..."` y `width`/`height` explícitos.
- `Reveal` componente (`.astro`) con prop `delay` para retrasar entrada.

## Estado del proyecto

- F0-F3a completas (estrategia, base, secciones, portafolio + 4 demos, SEO). F4 pulido (build OK, check 0 errores).
- F3b completada: los 4 micro-sitios demo reales viven en `src/components/demos/` y `src/layouts/DemoLayout.astro`, con dispatcher en `src/pages/demos/[slug].astro` (detalles en `PLAN-PROYECTO.md` sección 16).
- F5 en curso (SEO ✅, analytics GA4 preparado en `Layout.astro` con `SITE.analyticsId` vacío en `src/lib/site.ts`; falta ID real, dominio y despliegue).
- Microanimaciones ya añadidas: scroll progress (`src/scripts/scroll-progress.ts`), marquee (`src/components/Marquee.astro`), float en hero.
- `PLAN-PROYECTO.md` es la fuente de verdad; actualizar al terminar cada fase.
