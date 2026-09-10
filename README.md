# Agent Skills — Resultar

Skills para agentes de codificación (**Claude Code, Cursor, Windsurf, Roo Code, Antigravity, Aider** y [75 más](https://github.com/vercel-labs/skills)) orientadas al trabajo diario con **TOTVS Protheus, ADVPL y TLPP**.

Este repositorio es el **canal de distribución** de las herramientas: contiene cada skill con su documentación de uso y su herramienta empaquetada como un único archivo, lista para usar.

---

## Instalación

Dos caminos, uno por familia de agentes.

| Agente | Vía | Estado |
|---|---|---|
| Claude Code | plugin nativo | **Verificado** |
| Codex, Cursor, Copilot y el resto | `npx skills` | **Verificado** |

### Claude Code — plugin nativo

```bash
claude plugin marketplace add Mario-pereyra/resultar-agent-skills
claude plugin install tdn-explorer@resultar-agent-skills
```

Dentro de una sesión: `/plugin marketplace add Mario-pereyra/resultar-agent-skills` y luego `/plugin install tdn-explorer`.

### Codex, Cursor, GitHub Copilot — con `npx skills`

```bash
# Una skill concreta
npx skills add Mario-pereyra/resultar-agent-skills --skill tdn-explorer

# Elegir agentes y skills interactivamente
npx skills@latest add Mario-pereyra/resultar-agent-skills

# Listar las disponibles sin instalar
npx skills add Mario-pereyra/resultar-agent-skills --list
```

El instalador coloca los archivos donde cada agente los lee:

| Agente | Proyecto | Global |
|---|---|---|
| Codex | `.agents/skills/` | `~/.codex/skills/` |
| Cursor | `.agents/skills/` | `~/.cursor/skills/` |
| GitHub Copilot | `.agents/skills/` | `~/.copilot/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |

Con `-g` se instala para todo el usuario en vez del proyecto.

### Requisitos

- **Node 18+** — ya está instalado si usas cualquiera de estos agentes
- Sin dependencias ni instalación adicional: cada herramienta es un archivo

Funciona igual en **Linux**, **Windows** y **macOS**.

### Primer uso

```bash
node .claude/skills/tdn-explorer/tdn.mjs spaces
```

Funciona sin credenciales. Opcionalmente, con `TDN_PAT` en el entorno accedés a más código de ejemplo.

---

## Skills disponibles

### 🔍 `tdn-explorer`

Busca en el **TOTVS Developer Network** y extrae sus páginas como markdown, con la fecha de última edición a la vista — encuentra documentación con CQL, lee una página, recorre su árbol, descarga adjuntos (fuentes `.prw`, headers `.ch`, capturas) y lista cambios recientes. Para ADVPL, TLPP, Protheus, MVC, Puntos de Entrada, Logix, RM o Fluig.

Documentación de uso: [`skills/tdn-explorer/SKILL.md`](skills/tdn-explorer/SKILL.md)

---

## Estructura

```text
resultar-agent-skills/
├── .claude-plugin/           · marketplace.json + plugin.json
├── docs/                     · anuncio de beta para el equipo
├── LICENSE.md
├── README.md
└── skills/
    └── tdn-explorer/
        ├── SKILL.md          · instrucciones para el agente
        ├── tdn.mjs           · la herramienta (un archivo, sin dependencias)
        └── references/       · guías de consulta (espacios, CQL, recetas)
```

---

## Licencia

Propietaria. Copyright © 2026 Mario Alberto Pereyra J. — Todos los derechos reservados.

Uso interno autorizado a Resultar Soluciones. Ver [`LICENSE.md`](LICENSE.md).

**Licenciamiento comercial disponible a pedido.**

---

Proyecto independiente. No está afiliado a, ni patrocinado ni respaldado por
TOTVS S.A. Los nombres de productos se usan únicamente con fines descriptivos.
