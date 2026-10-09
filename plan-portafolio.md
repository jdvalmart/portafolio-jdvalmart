# Plan de mejora — Portafolio profesional de Juan David Valencia

> Objetivo: transformar el portafolio actual en un sitio profesional, con identidad propia
> y un diferencial real frente a otros portafolios de la industria.

---

## 1. Visión e identidad

**Problema actual:** el sitio es un "escaparate" bonito (tarjetas, badges, skills) pero sin
contenido profundo ni personalidad. Se parece a cientos de portafolios genéricos.

**Identidad propia:** no copiar el estilo de Daniel (minimalista, texto, Hugo). La identidad
de Juan es **interactiva y demostrativa**: el sitio mismo es una demo de lo que vende.

### Concepto central (el diferencial revolucionario)

> **"Mi portafolio no se lee: se conversa."**

El chatbot RAG deja de ser un widget secundario y se convierte en el **centro de la
experiencia**. El visitante puede preguntarle a un agente sobre mí, mis proyectos y mi
experiencia, y obtiene respuestas reales desde un sistema RAG construido por mí.

Esto convierte el portafolio en **una demostración viva de la habilidad que vendo** (RAG,
LLM, MCP), no solo en una vitrina estática. Daniel no tiene esto. Casi nadie lo tiene.

### Posicionamiento

- **No soy "full-stack genérico"** → soy **AI Software Developer / RAG & LLM Engineer**.
- El sitio debe gritar "inteligencia artificial aplicada" en cada página.
- Estética: tecnología + calidez humana (no el frío minimalismo de blog).

---

## 2. La página de mi foto (About / "Quién soy")

> El usuario pidió explícitamente una página con su foto.

Esta página es la que genera **confianza y conexión humana**. Debe incluir:

1. **Foto profesional** — retrato de medio cuerpo, fondo neutro, sonriendo, con buena luz.
   - Tómala con luz natural cerca de una ventana, fondo liso, cámara a la altura de los ojos.
   - No selfie, no foto recortada de un evento.
2. **Historia personal** (no solo stack):
   - De dónde vengo: Palmira → Bogotá.
   - Mi transición: 5 años en monitoreo de sistemas críticos → IA.
   - Por qué la IA y qué me apasiona (explicabilidad, RAG, agentes).
   - Algo humano: hobbies (leer, programar, ejercicio), qué me mueve.
3. **Qué hago hoy**: Trajectory Inc. (área Initus) — plataforma MCP multi-tenant.
4. **Frase personal** que me defina (mi "marca").

### Regla de oro del About
> **Tecnología + humanidad.** El visitante debe recordar a la persona, no solo la lista de
> tecnologías. La tecnología ya la demuestra el chatbot y los proyectos.

---

## 3. Arquitectura del sitio (páginas)

| Página | Propósito |
|--------|-----------|
| **Inicio (Hero)** | Impacto en 5 segundos: quién soy + frase + chatbot al frente |
| **Sobre mí** | Foto, historia, personalidad, contacto |
| **Proyectos** | Los 4-5 proyectos con demo viva + artículo profundo |
| **Notas / Blog** | Aprendizaje en público (evaluación RAG, MCP, AWS) |
| **Contacto** | Email + LinkedIn + GitHub + (formulario o chatbot) |

### Detalle por página

**Inicio:**
- Hero con nombre, rol (`AI Software Developer | RAG · LLM · MCP`).
- Botón principal: **"Habla con mi CV"** (abre el chatbot).
- Accesos rápidos a proyectos destacados (Mishkan, Orion, Pacioli).
- Estadísticas honestas (años de experiencia, proyectos en producción, integraciones).

**Proyectos:** cada proyecto con 3 capas:
1. **Demo interactiva** (si aplica) o screenshots/GIF.
2. **Artículo profundo** (ver sección 4).
3. **Stack + link al repo + link a la demo en vivo.**

**Notas/Blog:** entradas cortas (800-1500 palabras) sobre lo que aprendo.
Frecuencia mínima: 1 cada 2 semanas.

---

## 4. Contenido: pasar de "tarjetas" a "cuerpo de trabajo"

> Esta es la mejora más importante. El sitio hoy tiene tarjetas de 2 líneas; necesita
> profundidad escrita que demuestre comprensión real.

### 4.1 Reescribir el proyecto MCP (urgente)
- Eliminar "140+ tools" (es el monolito viejo, y revela info interna).
- Describir a alto nivel, como lo hace Daniel (sin nombrar el proyecto):
  - "Plataforma MCP multi-tenant: un núcleo único para identidad, permisos, credenciales
    y observabilidad; integraciones que se activan por configuración sin redepliegues;
    confirmación humana para cambios; AWS EC2 + Lambda."

### 4.2 Agregar los proyectos que faltan
Quitar: MachineDeepLearning, XAI CIFAR-10, Book Tracker (pasarlos a una sección secundaria "labs").
Agregar como principales: **Mishkan, Orion, Pacioli**.

### 4.3 Escribir 1 artículo profundo por proyecto
Estructura recomendada para cada uno (12-20 min de lectura):

```
# [Proyecto]: qué construí y qué aprendí

1. El problema (1-2 párrafos)
2. Cómo lo resolví (arquitectura, decisiones)
3. Lo difícil (bugs reales, errores que cometí, cómo los resolví)
4. Lo que aprendí (lecciones transferibles)
5. Resultados y métricas
```

Prioridad de artículos:
1. **Orion** (tu especialidad MCP — el más valioso)
2. **Mishkan** (el más completo, e-commerce con pagos)
3. **Pacioli** (finanzas, partida doble)

### 4.4 Corregir los niveles de skill
- Python: **Avanzado** (no "Experto")
- FastAPI: **Avanzado** (no "Experto")
- RAG: **Intermedio/Avanzado** (honesto)
- Docker: **Intermedio** (no "Básico")
- Mantener MCP/FastMCP altos (los usas a diario)

---

## 5. Identidad visual (tu propia estética, no la de Daniel)

**Dirección:** "IA viva" — oscuro, con acentos de color cálido/neón, pero sobrio.

| Elemento | Dirección |
|----------|-----------|
| Tema | Oscuro por defecto, con toggle claro |
| Color de acento | Teal/esmeralda (ya lo tienes) + un toque cálido (ámbar) |
| Tipografía | Moderna sans (Inter/Space Grotesk) para títulos, legible para texto |
| Personalidad | Detalles de IA: animaciones sutiles de "tokens", glitch mínimo, grid de red neuronal |
| Fotos | Una foto real, profesional, protagonista (no avatares) |

**Regla:** la identidad visual debe decir "IA + humano", no "blog minimalista".
Usa la foto y la calidez como contraste al lado técnico.

---

## 6. Técnica (brechas reales que hay que cerrar)

### 6.1 SEO — el gran hueco (crítico)
El sitio actual es una SPA con React client-side. Consecuencia:
- **No es indexable por Google** (el HTML está vacío; el contenido se pinta con JS).
- Un reclutador que busque "AI developer Bogotá" **nunca te encontrará**.

Solución: migrar a **SSR/SSG** (Next.js) o al menos pre-renderizado/prerender.
Esto es una ventaja que Daniel tiene (Hugo = estático, SEO perfecto) y tú no.

### 6.2 Rendimiento y accesibilidad
- Lazy-load de imágenes, formato WebP/AVIF.
- Lighthouse > 90 en Performance, Accessibility, SEO.
- Metadatos (Open Graph) para que al compartir el enlace salga vista previa con foto.

### 6.3 El CV embebido
- Actualizar el PDF que descarga la web con la versión nueva del CV.

### 6.4 Analítica
- Añadir analítica anónima (p. ej. Plausible) para saber quién visita y qué ve.

---

## 7. Roadmap (fases)

### Fase 1 — Higiene (semana 1)
- [ ] Corregir niveles de skill (honestos)
- [ ] Reescribir proyecto MCP (sin "140+ tools", sin info interna)
- [ ] Actualizar CV embebido
- [ ] Unificar URL del portafolio (jdvalmartdev.netlify.app) y corregir en CV/Magneto/LinkedIn

### Fase 2 — Contenido profundo (semanas 2-5)
- [ ] Escribir artículo de **Orion**
- [ ] Escribir artículo de **Mishkan**
- [ ] Escribir artículo de **Pacioli**
- [ ] Agregar los 3 proyectos como principales; mover los de bootcamp a "labs"

### Fase 3 — La página de foto (semana 3)
- [ ] Tomar/mejorar foto profesional
- [ ] Crear página "Sobre mí" con historia + foto + contacto

### Fase 4 — Identidad interactiva (semanas 4-6)
- [ ] Subir el chatbot a la portada como "Habla con mi CV"
- [ ] Mejorar el chatbot (más datos, mejores respuestas, enlazar proyectos)

### Fase 5 — Notas/Blog (desde semana 4, continuo)
- [ ] Sección de notas
- [ ] Primer post (p. ej. "Cómo construí un RAG con ChromaDB y ONNX")
- [ ] Ritmo de 1 post cada 2 semanas

### Fase 6 — SEO y distribución (semanas 6-8)
- [ ] Migrar a Next.js (SSG) o prerender
- [ ] Open Graph + metadatos + sitemap
- [ ] Lighthouse > 90
- [ ] Compartir cada artículo en LinkedIn

---

## 8. Métricas de éxito

- El chatbot responde correctamente a "¿quién es Juan?" y "¿qué proyectos tiene?".
- El sitio aparece en Google al buscar mi nombre.
- 1 artículo profundo por proyecto (mínimo 3).
- Lighthouse: Performance > 90, SEO > 90, Accessibility > 90.
- Un reclutador que ve el sitio en 30 segundos sabe: **qué hago, qué construí, y que soy humano**.

---

## 9. Lo que NO hacer

- ❌ Copiar el estilo minimalista de Daniel (perderías tu ventaja interactiva).
- ❌ Dejar el chatbot como un widget escondido (debe ser el héroe).
- ❌ Inflar skills o inventar métricas (rompe confianza).
- ❌ Nombrar el proyecto MCP interno ni exponer arquitectura confidencial.
- ❌ Mantener los proyectos de bootcamp como los principales.

---

## Resumen de una frase

> **Convierte tu portafolio en una demostración viva de lo que vendes:**
> contenido profundo (como el hábito de Daniel) + un chatbot interactivo que él no tiene,
> todo con una identidad propia: **"mi CV no se lee, se conversa".**
