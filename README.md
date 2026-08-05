# Felipe León Web Studio

**Páginas web premium para negocios que quieren más clientes.** Diseño a medida (cero
plantillas), WhatsApp integrado y entrega en 5–7 días. Hecho en Colombia 🇨🇴.

Sitio en vivo: **https://felipe-leon-web-studio.vercel.app**

## Qué es

Landing + portafolio de Felipe León, desarrollador web independiente. Incluye 6 demos
navegables (barbería, salón de belleza, tienda de mercados, veterinaria, estudio de
uñas y restaurante/café) que funcionan como catálogo de plantillas para clientes reales.

## Características

- ⚡ **Diseño a medida** con identidad de marca propia por cliente (paleta + acento).
- 💬 **WhatsApp integrado** en cada sección y en cada demo (CTAs con mensaje pre-llenado).
- 🎨 **6 demos reales navegables** que muestran el trabajo terminado.
- 🌙 **Modo oscuro/claro** con animaciones que respetan `prefers-reduced-motion`.
- 🚀 **Despliegue automático** con Vercel conectado a GitHub.
- 🔍 SEO: sitemap, robots.txt, JSON-LD, metas Open Graph y og-image.
- 📊 Analytics GA4 listo (se activa llenando `analyticsId` en `src/lib/site.ts`).

## Stack

- [Astro 7](https://astro.build) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [astro-icon](https://astro-icon.dev) (íconos Lucide)
- Fuentes auto-hospedadas (Inter, Space Grotesk, JetBrains Mono)
- Desplegado en [Vercel](https://vercel.com)

## Empezar

```bash
npm install
npx astro dev --background   # servidor en http://localhost:4321
npx astro dev logs           # ver errores
npm run build                # build de producción
npx astro check              # typecheck (0 errores)
```

## Estructura

```
src/
  pages/            → index.astro, 404.astro, demos/[slug].astro
  components/       → secciones de la landing + demos/ (micro-sitios)
  layouts/          → Layout.astro (sitio) y DemoLayout.astro (demos)
  content/demos/    → datos de las 6 demos (frontmatter)
  lib/site.ts       → CONFIG CENTRAL: nombre, WhatsApp, email, precios
  styles/global.css → design system (tokens Tailwind v4)
public/             → logo, favicon, og.png, robots.txt
```

> **Tip:** toda la información de marca/contacto vive en `src/lib/site.ts`. No la repitas
> en los componentes.

## Precios (COP)

| Paquete | Precio | Entrega |
|---|---|---|
| Página Simple | desde $500.000 | 5–7 días |
| Sitio Completo | desde $900.000 | 5–7 días |
| Tienda / Panel | desde $1.500.000 | 7–10 días |

## Contacto

- WhatsApp: +57 310 488 5609
- Email: fmleom19@gmail.com
- Instagram: [@felieleonmm](https://instagram.com/felieleonmm)
