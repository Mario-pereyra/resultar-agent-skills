# Agent Skills — Resultar

Skills para agentes de codificación (**Claude Code, Cursor, Windsurf, Roo Code, Antigravity, Aider** y [75 más](https://github.com/vercel-labs/skills)) orientadas al trabajo diario con **TOTVS Protheus, ADVPL y TLPP**.

Este repositorio es el **canal de distribución** de las herramientas: contiene las instrucciones de uso y los binarios precompilados. No contiene código fuente.

---

## Skills disponibles

### 🔍 `tdn-explorer`

Busca en el **TOTVS Developer Network** y extrae sus páginas como markdown — encuentra documentación con CQL, lee una página, recorre su árbol, descarga adjuntos (fuentes `.prw`, headers `.ch`, capturas) y lista cambios recientes. Para ADVPL, TLPP, Protheus, MVC, Puntos de Entrada, Logix, RM o Fluig.

**Instalar:**

```bash
npx skills add Mario-pereyra/resultar-agent-skills --skill tdn-explorer
```

**Primer uso:** la skill descarga su binario automáticamente. Después:

```bash
.claude/skills/tdn-explorer/bin/tdn spaces
```

Funciona sin credenciales. Opcionalmente, con `TDN_PAT` en el entorno accedés a más código de ejemplo.

**Documentación:** [`skills/tdn-explorer/SKILL.md`](skills/tdn-explorer/SKILL.md)

---

## Instalación

```bash
# Una skill concreta
npx skills add Mario-pereyra/resultar-agent-skills --skill tdn-explorer

# Listar las disponibles sin instalar
npx skills add Mario-pereyra/resultar-agent-skills --list

# Instalar todas
npx skills add Mario-pereyra/resultar-agent-skills --all
```

Por defecto se instalan en el proyecto (`.claude/skills/`, `.cursor/skills/`, etc.). Con `-g` se instalan para todo el usuario.

---

## Estructura

```text
resultar-agent-skills/
├── LICENSE.md
├── README.md
└── skills/
    └── tdn-explorer/
        ├── SKILL.md          · instrucciones de uso
        ├── bootstrap.mjs     · descarga el binario de la plataforma
        └── references/       · guías de consulta (espacios, CQL, recetas)
```

El directorio `bin/` se crea en la primera ejecución y no se versiona.

---

## Requisitos

- **Node 18+** para el instalador (`npx skills` y `bootstrap.mjs`)
- Las herramientas en sí no requieren runtime: los binarios son autónomos

Plataformas: **Linux x64** · **Windows x64** · **macOS arm64/x64**

---

## Licencia

Propietaria. Copyright © 2026 Mario Alberto Pereyra J. — Todos los derechos reservados.

Uso interno autorizado a Resultar Soluciones. Ver [`LICENSE.md`](LICENSE.md).

**Licenciamiento comercial disponible a pedido.**

---

Proyecto independiente. No está afiliado a, ni patrocinado ni respaldado por
TOTVS S.A. Los nombres de productos se usan únicamente con fines descriptivos.
