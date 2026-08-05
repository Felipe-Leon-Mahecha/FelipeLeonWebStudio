# GUÍA PARA CLIENTES — Felipe León Web Studio

Guía rápida de "qué hago cuando alguien me pide una página". Léela completa la primera vez;
después es tu checklist.

## 1. Vercel es GRATIS (nadie paga hosting)

El plan gratuito (Hobby) alcanza de sobra: hosting, HTTPS y dominio `tusitio.vercel.app`
sin costo. Tú puedes tener muchos proyectos Vercel gratis en una sola cuenta.

- Tú despliegas en tu cuenta Vercel → cada cliente recibe un link `nombre.vercel.app`.
- Si el cliente quiere un dominio propio (ej. `sublocal.com`), eso SÍ se compra
  (~$15–$30 USD/año) y se lo cobras aparte; tú se lo conectas en 5 minutos.

## 2. El guion cuando alguien te pide una página

Copia y adapta esto por WhatsApp:

> "¡Hola! Claro que sí, te hago la página. Te muestro ejemplos reales de lo que hago:
> [link de la demo que más se parezca al negocio del cliente].
> Tu página quedaría así pero con TU marca, TU información y TU WhatsApp.
> El costo es desde $1.500.000 COP y te la entrego en 5–7 días. Para empezar necesito un
> 50% de anticipo y me cuentas los datos de tu negocio."

Reglas de oro de este mensaje:
- **Siempre manda una demo** (nadie compra "una página"; compra "así le quedaría a mi negocio").
- **Cobra anticipo 50%** antes de escribir UNA línea de código.
- No pongas precio con "depende": pon el ancla (desde $1.500.000) y sube según complejidad.

## 3. Qué datos pedirle al cliente (plantilla)

Pídele todo de una vez, así no lo persigues:

- Nombre del negocio y qué hace (1 párrafo).
- Lo que quiere en la página: info + WhatsApp / pedidos / reservas / catálogo.
- Colores de su marca o ejemplo de logo (pueden enviarte foto).
- Número de WhatsApp REAL del negocio (¡el de él, no el tuyo!).
- Servicios/productos con precios (en COP).
- Fotos (si no tiene, usamos diseños limpios como en las demos).
- Dirección, horarios, redes.

## 4. Cómo se construye (NO desde cero)

Tu proyecto YA ES la base. Cada página nueva = copiar + cambiar contenido.

1. **Copia tu proyecto** en una carpeta nueva con el nombre del cliente
   (ej. `C:\Users\adona\Documents\CorteExpress`).
   - En la terminal: `git clone <URL de tu repo> <carpeta cliente>`.
2. **Elige la plantilla** que más se parezca al cliente:
   - Barbería/salón masculino → demo `BarberiaDemo`
   - Salón de belleza/estética → demo `BoutiqueDemo`
   - Tienda/mercados/domicilios → demo `MercadosDemo`
   - Veterinaria/clínica/peluquería mascotas → demo `VeterinariaDemo`
   - Ninguna encaja → copia el `index.astro` del sitio principal y le cambias los textos.
3. **Cambia el contenido:**
   - Datos del negocio → `src/lib/site.ts` (nombre, WhatsApp, email).
   - Textos y precios → dentro del componente demo que copiaste.
   - Colores → acento en el componente (una variable `accent` al inicio del archivo).
   - Quita la barra de "Quiero una página como esta" (DemoStrip) cuando sea un sitio
     real de cliente (esa barra es SOLO para tus demos de portafolio).
4. **Prueba en local:** `npm install` y `npx astro dev`, mira http://localhost:4321.
5. **Despliega** (ver sección 5).

Horas reales de trabajo: 2–4 horas por página ya con la plantilla. Eso es tu margen.

## 5. Desplegar la página del cliente (Vercel, gratis)

1. Crea un repo nuevo en GitHub con el nombre del cliente y sube el código
   (`git init` + `git add` + `git commit` + `git push`).
2. Ve a **vercel.com** → "Add New" → "Project" → elige el repo del cliente → "Deploy".
3. Listo: link `nombre.vercel.app` (gratis). Mándaselo al cliente.

Tú tienes el control del proyecto en tu cuenta Vercel: no se entrega la página final
hasta cobrar el otro 50%.

## 6. Cobro y entrega

- **50% antes de empezar** (te cubre aunque el cliente se arrepienta).
- **50% al entregar** el link. No pases la administración del proyecto al cliente hasta
  que pague todo.
- Entrega: el link + una mini explicación de cómo pedirle cambios después
  ("escríbeme y en 24h te ajusto lo que quieras" → eso son ventas futuras).

## 7. Checklist antes de entregar

- [ ] WhatsApp, dirección y horarios son los DEL CLIENTE (no los tuyos).
- [ ] Todos los textos en español.
- [ ] Se quitó la barra de demo (DemoStrip) y el pie "Demo creada por Felipe".
- [ ] Precios del cliente en COP.
- [ ] `npx astro check` da 0 errores y `npm run build` pasa.
- [ ] El link funciona en el celular del cliente.
- [ ] Cobraste el 50% final.
