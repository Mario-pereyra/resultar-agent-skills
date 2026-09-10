---
name: tdn-explorer
description: Search TOTVS Developer Network (TDN) and read its pages as sourced markdown with their last-edited date. Find docs with CQL, read a page, walk its tree, download attachments, list recent changes. Use for ADVPL, TLPP, Protheus, MVC, Pontos de Entrada, Logix, RM and Fluig questions.
---

# TDN Explorer

Consulta `tdn.totvs.com` y devuelve markdown con la fecha de última edición a la vista. El núcleo técnico —ADVPL, TLPP, MVC, Puntos de Entrada— es público: funciona sin credenciales.

## Invocación

Resolvé `<skill-root>` al directorio de este `SKILL.md`:

```bash
node <skill-root>/tdn.mjs <comando> [args]
```

Sin argumentos imprime la ayuda. El resto de esta guía abrevia esa invocación como `tdn`.

Si `tdn.mjs` falta o `node -v` falla, la skill todavía no está instalada: las instrucciones están en el README del repositorio.

## Flujo: `search` → `get` → citar

```bash
tdn search "DBSeek" -s tec     # 1. busca; devuelve candidatos con su id
tdn get 6063453                # 2. lee la página por id o URL
tdn where 6063453              # 3. si se necesita contexto: camino, hermanos, hijos
```

`get` con texto libre en vez de id devuelve candidatos para que elijas.

**Terminás cuando cada afirmación que vas a dar tiene su id, su fecha y su vigencia contrastada contra la versión del cliente.** Lo que no llegó a tener id, va marcado como no verificado.

La fecha es la **vigencia**: `⚠8a` son ocho años sin cambios. Así se ve en la salida, y así se cita:

```
1. 6063453  [tec]  DBSeek  (v3 2017-10-20 ⚠8a)
```

## Comandos

| Comando | Qué hace |
|---|---|
| `search <cql\|texto>` | Busca; el texto suelto se busca como frase |
| `get <id\|url\|texto>` | Una página como markdown, con su encabezado de versión |
| `where <id>` | Camino desde la raíz, hermanos e hijos |
| `tree <id>` | Recorre un subárbol, avisando antes de empezar |
| `files <id>` · `files --ext .prw` | Adjuntos de una página, o por extensión |
| `fetch <id>` · `fetch --ext .prw` | Baja adjuntos a disco (`--out <dir>`) |
| `recent <space>` | Lo modificado últimamente en un espacio |
| `spaces` | Los espacios disponibles con su clave |
| `verify <id\|url>` | Audita la fidelidad entre la página y el markdown |
| `tools` | Esquemas JSON de las herramientas, para agentes IA / MCP |

Flags: `--limit` en todos, `--max-requests` para acotar el costo, `--anon` para una invocación sin token.

## El espacio decide la búsqueda

Es el error que más tiempo cuesta, porque falla en silencio: `text~"FWFormModel"` en `tec` da 0 resultados y en `framework` da 16.

| Buscás | Espacio |
|---|---|
| ADVPL, TLPP, funciones de lenguaje, AppServer | `tec` |
| MVC, FWFormModel, FWExecView, componentes, APIs REST | `framework` |
| Módulos de Protheus, rutinas `MATA*`, Puntos de Entrada | `PROT` |
| Documentación técnica en español | `teces` |
| Logix | `LLOG` |
| RM | `LRM` |

Un espacio equivocado devuelve una lista vacía. Ante cero resultados, cambiá de espacio antes de cambiar la consulta.

## Los adjuntos son la mitad del contenido

El código de ejemplo y los headers con los `#define` reales viven en los adjuntos, no en el cuerpo de las páginas.

```bash
tdn files 758510608                    # qué hay, con su tamaño
tdn fetch 758510608 --out ./adjuntos   # bajalo
```

`fetch` guarda los bytes tal cual. **Los fuentes de Protheus vienen en cp1252**, y la herramienta lo señala: leerlos como UTF-8 destroza los acentos. Si un adjunto falla, la herramienta lo declara y sigue con el resto del lote.

## Con `TDN_PAT`

El token va en el entorno y la herramienta lo usa sola:

```bash
export TDN_PAT='<token>'     # bash/zsh
$env:TDN_PAT = '<token>'     # PowerShell
```

Agrega sobre todo código de ejemplo descargable. **Con token, los resultados dejan de ser reproducibles entre personas:** cada cuenta ve lo que sus permisos permiten. Antes de pasarle un id a alguien, comprueba con `tdn get <id> --anon` que podrá abrirlo.

## Cuando algo falla

Cada error trae en su mensaje la salida concreta y qué hacer. Al alcanzar cualquier tope la herramienta **aborta y declara qué quedó fuera**, para que un resultado incompleto se note: subilo con `--max-requests` o acotá la consulta.

## A fondo

Cada archivo se abre por una rama distinta:

- [`references/cql-syntax.md`](references/cql-syntax.md) — al escribir una consulta: campos, operadores, frases, tipos y filtros que se ignoran en silencio.
- [`references/spaces-catalog.md`](references/spaces-catalog.md) — al elegir espacio o al buscar por rutina: prefijos por módulo, Puntos de Entrada, espacios vacíos en anónimo.
- [`references/recetas-protheus.md`](references/recetas-protheus.md) — cuando ya se sabe qué buscar y se quiere la consulta armada: PEs de una rutina, firmas de funciones, Help del sistema, fuentes.
- [`references/busqueda-privada.md`](references/busqueda-privada.md) — al usar `TDN_PAT`: qué agrega y cómo verificar que un id es público.
