# PLAN DEL PROYECTO — Felipe León Web Studio

> **Este archivo es la fuente de verdad del proyecto.** Cualquier IA que deba continuar
> este trabajo debe leer este documento completo ANTES de hacer cualquier cambio.
> Al terminar cada fase, actualizar aquí el estado y la fecha.

**Última actualización:** F4 en curso: tests ✅ (astro check 0 errores) + pulido ✅.
Pendiente: F3b (micro-sitios demo, otra IA), microanimaciones mayores tras el rediseño
de Claude, y F5 completo (dominio real).

---

## 1. OBJETIVO DEL NEGOCIO

Crear una marca personal de desarrollo web ("Felipe León Web Studio") cuyo sitio web
consiga clientes reales (pymes en Colombia) mediante un portafolio premium con demos
reales y contacto directo por WhatsApp.

- Vender páginas web a negocios locales: barberías, restaurantes, veterinarias,
  gimnasios, tiendas, consultorios.
- Meta a 30 días: sitio publicado + 5 demos + contacto a negocios + primer cliente.
- Meta a 3 años: negocio sostenible con ingreso recurrente (mantenimiento mensual).

## 2. IDENTIDAD DE MARCA

- **Nombre:** Felipe León Web Studio
- **Eslogan:** "Tu negocio en línea esta semana."
- **Posicionamiento (clave):** velocidad + calidad premium + WhatsApp integrado.
  NO vender barato. Vender "webs premium entregadas en días, no en meses".
- **Personalidad:** confiable, directo, moderno, cercano. Hablar de resultados de
  negocio (más clientes), no de código.
- **Valores:** transparencia en precios · velocidad de entrega · diseño a medida
  (cero plantillas) · soporte real post-entrega.
- **Dato personal para "Sobre mí":** también desarrolla el videojuego **THE GEM**
  (en desarrollo). Se menciona como credibilidad técnica, NO como logo de la marca.

## 3. DECISIONES TÉCNICAS (APROBADAS)

- **Framework:** Astro 7 (estático, SEO excelente, componentes, content collections).
- **Estilos:** Tailwind CSS v4 (plugin `@tailwindcss/vite`).
- **Lenguaje:** TypeScript.
- **Iconos:** astro-icon + `@iconify-json/lucide`.
- **Fuentes auto-hospedadas:** Inter Variable (texto), Space Grotesk Variable (títulos),
  JetBrains Mono Variable (acentos "dev"). Cero peticiones a Google.
- **SEO:** `@astrojs/sitemap`. Site actualmente placeholder:
  `https://felipeleon.example.com` en `astro.config.mjs` → **CAMBIAR cuando tenga dominio**.
- **Hosting futuro:** Netlify o Vercel + dominio propio.
- **Válvula de escape:** si el usuario se bloquea con CLI/Git, pivotar a HTML/CSS/JS
  puro conservando el design system (colores/tipografías/animaciones se transfieren).
- **Por qué Astro y no HTML puro:** componentes reutilizables, SEO automático,
  demos gestionadas como contenido (escalable), solo carga JS donde hace falta.

## 4. ESTRUCTURA DEL SITIO

Página única con anclas (también puede tener páginas separadas si conviene):

1. Inicio (hero) ✅
2. Sobre mí ✅
3. Servicios ✅
4. Portafolio / Demos ✅ infraestructura (sección + 4 archivos demo; micro-sitios ⏳)
5. Proceso de trabajo ✅
6. Precios ✅
7. Preguntas frecuentes (FAQ) ✅
8. Contacto ✅
9. Testimonios ⏳ (espacio reservado; añadir cuando existan clientes reales)
10. Footer con aviso legal/privacidad ⏳ (Fase 5)

Estado actual: **Todas las secciones principales funcionando** (ver index.astro y
src/components/). El orden en index.astro es: Hero, About, Services, **Portfolio**,
Process, Pricing, FAQ, Contact + botón WhatsApp flotante.

## 5. DESIGN SYSTEM

- **Paleta:** monocromo premium — blanco `#fafaf8` / grafito `#0a0a0a` (modo claro y
  oscuro) + **verde WhatsApp `#25d366`** como único color de acción (CTAs) + **violeta
  `#6d5bff`** solo para acentos/gradientes. Definida como tokens en
  `src/styles/global.css` (`@theme` de Tailwind v4).
- **Tipografías:** Space Grotesk (display), Inter (sans), JetBrains Mono (mono).
- **Logo:** gema geométrica SVG (`src/components/ui/Gem.astro` y `public/favicon.svg`).
  **PENDIENTE:** reemplazar por la gema que el usuario generará con ChatGPT en morado
  (basada en el logo de THE GEM). Ver sección 13.
- **Microanimaciones:**
  - `.reveal` / `.is-visible` con IntersectionObserver (`src/scripts/reveal.ts`).
  - Hover en tarjetas y botones (translate-y + glow).
  - Header con blur al hacer scroll.
  - Respetar SIEMPRE `prefers-reduced-motion`.
- **Modo oscuro:** clase `.dark` en `<html>` + localStorage + preferencia del sistema.

## 6. ARQUITECTURA DE CARPETAS

```
Default Project/
├─ public/                    # favicon.svg, logo.png, og.png, robots.txt
├─ src/
│  ├─ components/
│  │  ├─ ui/                  # Button, Badge, Reveal, Gem, WhatsAppIcon (reutilizables)
│  │  ├─ Header.astro         # nav + tema oscuro + menú móvil
│  │  ├─ Footer.astro
│  │  ├─ Hero.astro
│  │  ├─ About.astro
│  │  └─ Portfolio.astro      # tarjetas data-driven desde content/demos
│  ├─ layouts/Layout.astro    # HTML base con SEO, JSON-LD, dark-mode script, skip link
│  ├─ lib/site.ts             # ★ CONFIG CENTRAL: nombre, WhatsApp, email, instagram, nav
│  ├─ pages/index.astro       # página principal (compone las secciones)
│  ├─ pages/404.astro         # página de error 404 con CTA WhatsApp
│  ├─ pages/demos/[slug].astro# página demo genérica (frontmatter + guía Markdown)
│  ├─ content/demos/          # 4 archivos .md (barberia, boutique, mercados, veterinaria)
│  ├─ content.config.ts       # esquema z + loader glob() (NO usar type:'content' en Astro 7)
│  ├─ scripts/reveal.ts       # animaciones de scroll
│  └─ styles/global.css       # design system (tokens Tailwind v4)
├─ astro.config.mjs           # site + integraciones
└─ package.json
```

**Futuro (demos como contenido):** ✅ YA IMPLEMENTADO. `src/content/demos/` con Content
Collections. Cada demo del portafolio es un archivo Markdown con frontmatter (order,
title, industry, slug, tagline, description, cta, features, palette[2], accent).
Agregar una demo = crear un `.md` y listo. Las demos a su vez son micro-sitios
reutilizables (biblioteca de plantillas para clientes reales).

## 7. SERVICIOS Y PRECIOS (COP, APROBADOS)

| Paquete | Precio | Incluye | Entrega |
|---|---|---|---|
| Página Simple | desde $500.000 COP | 1 página, diseño a medida, WhatsApp, SEO básico, responsive, 30 días de ajustes | 5-7 días |
| Sitio Completo | desde $900.000 COP | varias secciones, servicios con precios, galería, WhatsApp, SEO | 5-7 días |
| Tienda / Panel Admin | desde $1.500.000 COP | Catálogo, pedidos por WhatsApp, panel sencillo, pasarela | 7-10 días |

- **Mantenimiento mensual (ingreso recurrente):** desde $150.000 COP (hosting + dominio
  + backups + soporte + mejoras menores).
- **Estrategia de precios (Paipa, arranque):** ancla baja `desde $500.000` para conseguir
  los primeros clientes y testimonios rápido. Escalera: 500K → 900K → 1.5M. Subir cuando
  se tengan 3-5 clientes y reseñas. No regalar el trabajo: un sitio simple real toma 2-4
  horas con plantilla + despliegue.
- Referencias de mercado Colombia 2026: landing $800K–2.5M, corporativo $2.5M–5.5M,
  e-commerce $4M–12M, mantenimiento $120K–500K/mes.

## 8. PORTAFOLIO (4 DEMOS PLANIFICADAS)

Cada demo es un micro-sitio real con dos botones: "Ver demo" y "Quiero una página como
esta" (abre WhatsApp con mensaje pre-llenado del tipo de negocio).

| # | Demo | Nombre | Estilo | Destacado |
|---|---|---|---|---|
| 1 | Barbería | Navaja Club | Oscuro, masculino, acento dorado `#d4a24e` | Reserva por WhatsApp |
| 2 | Salón de belleza | Glow Studio | Femenino, elegante, acento rosa `#d24a7d` | Agenda de citas |
| 3 | Tienda de mercados (food truck) | Mercado Rodante | Fresco, de barrio, acento verde `#2f9e44` | Ruta del día + pedidos |
| 4 | Veterinaria | Patitas y Más | Limpio, confiable, acento teal `#2a9d8f` | Turnos + urgencias |

Cada archivo `src/content/demos/*.md` incluye además una **guía en Markdown** (abajo del
frontmatter) que la IA encargada de construir la demo debe seguir para maquetar el
micro-sitio. **Las demos son la biblioteca de plantillas:** el primer cliente real de
barbería ya tiene el 60% hecho.

**Estado:** los 4 archivos `.md` existen y la sección Portafolio + página
`/demos/[slug]` funcionan (build 5 páginas OK). Los micro-sitios propios de cada demo
(hero real, servicios, galería, etc.) los construye otra IA a partir de la guía en cada
`.md`.

## 9. ESTRATEGIA DE CONVERSIÓN

- WhatsApp con mensaje pre-llenado (función `whatsappLink()` en `src/lib/site.ts`).
- CTA WhatsApp dominante sobre el pliegue (hero).
- Anclaje de precios: paquete medio resaltado como "Más elegido".
- Reducción de riesgo: garantía + proceso transparente + 30 días de ajustes.
- Escasez honesta: "solo 3 proyectos al mes".
- Micro-CTAs al final de cada sección.
- (Futuro) Medir clics de WhatsApp por sección con parámetros UTM.

## 10. ROADMAP Y ESTADO

| Fase | Qué | Estado |
|---|---|---|
| F0 | Decisiones branding/stack/precios | ✅ Completada |
| F1 | Proyecto Astro + design system + logo + hero + sobre mí | ✅ Completada |
| F2 | Servicios, precios, proceso, FAQ, contacto + WhatsApp | ✅ Completada |
| F3 | Infraestructura demos (collections + Portafolio + 4 archivos + página /demos) | ✅ |
| F3b | Construir los 4 micro-sitios demo (guía en cada `.md`) | ✅ Completada (ver sección 16) |
| F4 | Tests + pulido + microanimaciones | ✅ Completada (16/08: check 0, build OK, scroll progress + marquee + float hero) |
| F5 | SEO completo, analytics, Lighthouse 95+, dominio | ◐ Parcial (robots, og.png, JSON-LD, 404, analytics GA4 configurable listos) |
| F6 | Lanzamiento + adquisición de clientes | ⏳ |

## 11. COMANDOS ÚTILES

```bash
# Servidor de desarrollo (siempre en background)
npx astro dev --background
npx astro dev status      # estado
npx astro dev logs        # ver errores
npx astro dev stop        # detener

# Build de producción (valida que todo compile)
npm run build

# Revisión de tipos (tests) — debe dar 0 errores
npx astro check
```

El servidor de desarrollo corre en http://localhost:4321

## 12. DATOS DE CONTACTO REALES (YA EN EL CÓDIGO)

- WhatsApp: **+57 3104885609** → wa.me/573104885609
- Email: **fmleom19@gmail.com**
- Instagram: **@felieleonmm** (https://instagram.com/felieleonmm)
- Todo centralizado en `src/lib/site.ts`.

## 13. PENDIENTES Y PRÓXIMOS PASOS

1. **Logo final:** ✅ integrado como `public/logo.png` (419×419 RGBA) en Header,
   Footer y favicon. La IA no puede ver imágenes: el usuario juzga el resultado y puede
   reemplazar el archivo cuando quiera. Si el PNG tiene fondo, avisar para ajustarlo.
2. **Dominio:** cuando compre dominio, cambiar `site` en `astro.config.mjs`.
3. **Fase 3b (SIGUIENTE, para la otra IA):** construir los 4 micro-sitios demo como
   páginas propias (por ejemplo `src/pages/demos/[slug].astro` con un componente por
   industria, o un componente `.astro` por demo), siguiendo la guía Markdown dentro de
   cada `src/content/demos/*.md`. Cada demo mantiene los botones "Ver demo" y "Quiero
   una página como esta". El frontmatter alimenta datos reales (paleta, acento, CTA).
4. **⚠️ Trampa de Astro 7 (IMPORTANTE para la otra IA):** la sintaxis legacy
   `defineCollection({ type: 'content', ... })` NO carga las entradas en Astro 7.1.6
   (el schema se genera pero `getCollection` devuelve vacío y el build da
   "The collection X does not exist or is empty"). SOLUCIÓN YA APLICADA en
   `src/content.config.ts`: usar el loader moderno
   `import { glob } from 'astro/loaders'` +
   `loader: glob({ pattern: '**/*.md', base: './src/content/demos' })`.
   Si se vuelve a tocar este archivo, NO volver a `type: 'content'`.
4b. **⚠️ Trampa de Astro con estilos escopeados:** en un `<style>` de un componente,
   un selector `.dark ...` se compila como `.dark[data-astro-cid-xxx] ...` que NUNCA
   matchea (la clase `.dark` vive en `<html>`). Bug visto y corregido en el header
   (fondo del header en dark + iconos sol/luna). Regla: para variantes de tema dentro
   de `<style>` de componente usar SIEMPRE `:global(.dark)` (ej.
   `:global(.dark) header.is-scrolled`).
5. **Testimonios:** añadir sección cuando existan clientes reales (NO inventar).
6. **Formulario de contacto:** ya implementado con patrón "form → WhatsApp" (sin
   backend). Opcional en Fase 5: Netlify Forms para copia por email.
7. **SEO/pulido ✅ (16/08):**
   - `robots.txt` + Sitemap en public (usa `https://felipeleon.example.com` → cambiar
     con dominio real).
   - `og.png` 1200×630 generado (script en temp, se regenera con
     `node <temp>/og.js`) + metas `og:image`/`twitter:image` en Layout. La IA no ve
     imágenes: **el usuario debe abrir http://localhost:4321/og.png y juzgarlo**.
   - JSON-LD WebSite + Person en `Layout.astro` (SEO local).
   - Página `src/pages/404.astro` (branding + CTA WhatsApp).
   - `src/scripts/reveal.ts` blindado contra entornos sin IntersectionObserver.
8. **F4 tests + pulido ✅ (16/08):**
   - `@astrojs/check` + `typescript` instalados como devDeps; `npx astro check` = 0
     errores/warnings/hints.
   - Corregido: `z` deprecado → importar de `'zod'` (no de `astro:content`) en
     `content.config.ts`; import sin usar en Contact.astro; `Props` exportado en
     Reveal.astro; `Astro.site` posible undefined en Layout (JSON-LD).
   - Pulido CSS global: feedback de presión en botones (`active:scale`), `scroll-margin-top`
     para anclas bajo el header fijo, y regla global `prefers-reduced-motion` (WCAG).
   - **Microanimaciones MAYORES hechas (16/08)**: barra de progreso de scroll en el
     top (`src/scripts/scroll-progress.ts` + `#scroll-progress` en Layout), marquee de
     industrias entre Hero y About (`src/components/Marquee.astro`, pausa en hover,
     respeta reduced-motion), y `animate-float`/`animate-float-slow` en los glows del
     hero. Se hicieron ya (aunque el rediseño de Claude los pueda reubicar/rediseñar).
9. **Git + versionado ✅ (16/08):** repo inicializado (rama `main`), `.gitignore`
   (node_modules, dist, .astro, .env...), primer commit de todo el trabajo
   (`Portafolio completo: design system, secciones, demos, SEO y pulido`).
10. **CLAUDE.md ✅ (16/08):** creado en la raíz con design system, reglas y comandos,
    para que Claude (o cualquier IA) pueda rediseñar sin romper el proyecto.
11. **F5 Analytics (preparado, sin activar) ✅ (16/08):** GA4 listo en `Layout.astro`,
    solo se renderiza si `SITE.analyticsId` está lleno (hoy `''` → no carga nada).
    Para activarlo: crear propiedad GA4 en analytics.google.com, copiar el ID
    `G-XXXXXXX` en `src/lib/site.ts` (`analyticsId: 'G-XXXXXXX'`) y re-desplegar.
    ⚠️ Falta: dominio real en `astro.config.mjs` (todavía `https://felipeleon.example.com`).

## 16. FASE 3b COMPLETADA — LOS 4 MICRO-SITIOS DEMO (RESUMEN)

**Qué se construyó (16/08):** las 4 demos dejaron de ser "fichas de caso" y ahora son
**webs reales completas**, cada una con identidad de marca propia (paleta, acento, estilo):

| Demo | Marca | Estilo | Acento |
|---|---|---|---|
| `/demos/barberia` | Navaja Club | Oscuro + dorado, masculino | `#d4a24e` |
| `/demos/boutique` | Glow Studio | Rosa suave, femenino premium | `#d24a7d` |
| `/demos/mercados` | Mercado Rodante | Crema + verde, de barrio confiable | `#2f9e44` |
| `/demos/veterinaria` | Patitas y Más | Azul claro + teal, limpio y calmado | `#2a9d8f` |

**Arquitectura:**
- `src/layouts/DemoLayout.astro` → HTML propio (head SEO, sin header/footer de Felipe;
  cada demo es un sitio independiente). Importa `global.css` para reusar `.shell`,
  `.display`, `.bg-grid`.
- `src/components/demos/` → chrome compartido (DemoStrip con aspecto de navegador +
  botón "Quiero una página como esta" a WhatsApp; DemoHeader sticky; DemoHero;
  DemoFooter con CTA final) + 4 componentes de demo (BarberiaDemo, BoutiqueDemo,
  MercadosDemo, VeterinariaDemo) con secciones propias.
- `src/pages/demos/[slug].astro` → dispatcher: según `slug` renderiza la demo correcta.
- Cada demo incluye: hero, servicios con precios COP, galería/equipo/testimonios,
  horarios y ubicación, banner de urgencias (veterinaria), ruta semanal + cómo pedir
  (mercados). Sin fotos reales: se usan tiles con gradientes e íconos lucide.
- **Conversión:** la barrita superior (DemoStrip) y el CTA final de cada demo llevan a
  WhatsApp de Felipe con mensaje personalizado por industria.
- ⚠️ Los textos de las marcas demo son **contenido ficticio de muestra** (para mostrar
  el trabajo); los precios COP son realistas. No usar estos datos de contacto reales.

**Verificado:** `npx astro check` = 0 errores/warnings/hints. Build = 6 páginas OK.
Las demos se ven en http://localhost:4321/demos/{barberia|boutique|mercados|veterinaria}.

## 14. INSTRUCCIONES PARA LA IA QUE CONTINÚE

- **Leer este archivo completo antes de tocar nada.**
- El usuario es **principiante**: explicar en lenguaje simple, enseñar paso a paso,
  no asumir conocimiento. Él decide y aprueba; la IA ejecuta el código.
- **Reglas de código estrictas:**
  - NO agregar comentarios al código salvo que el usuario lo pida.
  - Textos de la web SIEMPRE en español.
  - Mantener el estilo premium/minimalista del design system existente.
  - Respetar `prefers-reduced-motion` en cualquier animación nueva.
  - Reusar los componentes de `src/components/ui/` antes de crear nuevos.
  - Centralizar datos de marca/contacto en `src/lib/site.ts`, nunca repetirlos.
- **Antes de dar una fase por terminada:** correr `npm run build` y revisar
  `npx astro dev logs` (sin errores). El sitio debe abrir en http://localhost:4321.
- NO hacer commit de git sin que el usuario lo pida explícitamente.
- Al terminar cada fase: actualizar la sección 10 (estado) y la fecha de este archivo.
- Mantener este archivo SIEMPRE actualizado: es lo que permite retomar el trabajo
  desde otra sesión de IA sin perder contexto.

## 15. INSTRUCCIONES PARA LA IA QUE CONSTRUYA LAS DEMOS (FASE 3b) — ✅ YA COMPLETADA

> ⚠️ **Esta fase YA se completó (16/08).** Los 4 micro-sitios están construidos (ver
> sección 16). NO reconstruir. Conservar esta sección solo como referencia histórica.

**Objetivo:** convertir las 4 demos del portafolio en micro-sitios web reales, cada uno
con su propia página, usando la guía Markdown dentro de cada
`src/content/demos/*.md` (barberia.md, boutique.md, mercados.md, veterinaria.md).

**Cómo funciona hoy (NO romper):**
- `src/content.config.ts` usa `glob()` (ver advertencia de Astro 7 en sección 13.4).
- `src/pages/demos/[slug].astro` ya renderiza una página funcional por cada demo usando
  el frontmatter (hero con paleta + acento, features, paleta, CTA WhatsApp) + el
  contenido Markdown de la guía. Es el punto de partida.
- `src/components/Portfolio.astro` genera las tarjetas del índice automáticamente.

**Qué hacer:**
1. Para cada demo, construir su micro-sitio completo siguiendo el listado de su `.md`
   (ej. barbería: hero, servicios con precios, galería de cortes, reserva WhatsApp,
   testimonios, CTA final). Se puede mejorar `[slug].astro` para que cada industria
   tenga su layout propio, o crear componentes por demo.
2. Mantener en cada demo: la paleta y el acento del frontmatter, textos en español,
   CTAs que abran WhatsApp con mensaje pre-llenado (`whatsappLink()` de
   `src/lib/site.ts`), respeto a `prefers-reduced-motion` y al design system global.
3. El frontmatter puede ampliarse si la demo necesita más datos (ej. horarios,
   servicios, testimonios), pero SIN romper el esquema de `content.config.ts`.
4. Verificar con `npx astro build` (debe listar 5 páginas) y `npx astro dev logs` sin
   errores. El servidor corre en http://localhost:4321 (preview en /demos/barberia,
   /demos/boutique, /demos/mercados, /demos/veterinaria).
5. Al terminar: actualizar secciones 8 y 10 de este archivo.
