---
name: tdn-explorer
description: Search TOTVS Developer Network (TDN) and extract its pages as markdown — find docs with CQL, read a page, walk its page tree, download attachments (.prw source, .ch headers, screenshots), list recent changes. Use for ADVPL, TLPP, Protheus, MVC (FWFormModel, FWExecView), Pontos de Entrada, Logix, RM or Fluig.
---

# TDN Explorer

Consulta `https://tdn.totvs.com` y devuelve markdown con la fecha de última edición a la vista.

**Funciona sin credenciales.** El núcleo técnico —ADVPL, TLPP, MVC, Puntos de Entrada— es público.

## Instalar

```bash
npx skills add Mario-pereyra/resultar-agent-skills --skill tdn-explorer
```

La primera ejecución descarga el binario de la plataforma. No hace falta Node ni nada más.

## Ejecutar

Resuelve `<skill-root>` al directorio de este `SKILL.md`.

```bash
<skill-root>/bin/tdn <comando> [args]        # Linux, macOS
& <skill-root>/bin/tdn.exe <comando> [args]  # Windows
```

Sin argumentos imprime la ayuda con todos los flags.

## Flujo: `search` → id → `get`

```bash
tdn search "DBSeek" -s tec        # 1. encuentra el id
tdn get 6063453                   # 2. lee la página
tdn where 6063453                 # 3. si hace falta, mira qué hay alrededor
```

`get` acepta un id o una URL. Con texto libre devuelve candidatos para que elijas.

**Terminás cuando cada afirmación tiene su id de TDN y su fecha.** Una respuesta sobre ADVPL sin el id que la respalda es una respuesta sin fuente.

## Comandos

| Comando | Para qué |
|---|---|
| `search <cql\|texto>` | Buscar. Acepta CQL crudo; el texto suelto se busca como frase |
| `get <id\|url\|texto>` | Leer una página como markdown con su encabezado de versión |
| `where <id>` | Dónde está: camino desde la raíz, hermanos e hijos |
| `tree <id>` | Recorrer un subárbol. Sondea y avisa antes de empezar |
| `files <id>` · `files --ext .prw` | Adjuntos de una página, o búsqueda por extensión |
| `fetch <id>` · `fetch --ext .prw` | Bajar esos adjuntos a disco con `--out <dir>` |
| `recent <space>` | Lo modificado últimamente en un espacio |
| `spaces` | Los espacios disponibles con su clave |
| `verify <id\|url>` | Auditar la fidelidad entre la página original y el markdown |
| `tools` | Exportar esquemas JSON de las herramientas para agentes IA / MCP |

## Acertar con la consulta

Dos cosas deciden si una búsqueda encuentra algo. Las dos fallan en silencio.

### El espacio

Es el error que más tiempo cuesta. La misma consulta, distinto espacio:

```bash
space=tec       AND text~"FWFormModel"   →  0 resultados
space=framework AND text~"FWFormModel"   → 16 resultados
```

| Buscás | Espacio |
|---|---|
| ADVPL, TLPP, funciones de lenguaje, AppServer | `tec` |
| MVC, FWFormModel, FWExecView, componentes, APIs REST | `framework` |
| Módulos de Protheus, rutinas `MATA*`, Puntos de Entrada | `PROT` |
| Documentación técnica en español | `teces` |
| Logix | `LLOG` |
| RM | `LRM` |

Claves, volúmenes y prefijos de rutina: [`references/spaces-catalog.md`](references/spaces-catalog.md).

### El escapado de las frases

```bash
space=PROT AND text~"\"Ponto de Entrada\"" AND text~"MATA410"   # la frase
space=PROT AND text~"Ponto de Entrada" AND text~"MATA410"       # tres palabras sueltas
```

Escapá las comillas internas siempre que busques una frase.

### Recetas

```bash
tdn search 'space=tec AND text~"DBSeek"'                   # función del lenguaje
tdn search 'space=framework AND text~"FWFormModel"'        # clase MVC
tdn search 'space=PROT AND title~"MATA*"'                  # rutinas por prefijo
tdn search 'label="advpl" AND space=tec'                   # por etiqueta
tdn search 'type=attachment AND title~"*.prw"'             # código de ejemplo
tdn search 'ancestor=334340072'                            # tamaño de una rama
tdn recent tec --days 7                                    # cambios recientes
```

Campos, operadores y ejemplos: [`references/cql-syntax.md`](references/cql-syntax.md).

## Los adjuntos son la mitad del contenido técnico

Buena parte de lo que buscás vive en los adjuntos y no en el cuerpo de las páginas — sobre todo el código de ejemplo y los headers con los `#define` reales.

```bash
tdn files 758510608                          # qué hay, con su tamaño
tdn fetch 758510608 --out ./adjuntos         # bajalo
tdn fetch --ext .prw --space PROT --out ./ejemplos
```

`fetch` guarda los bytes tal cual y avisa si el tamaño no cuadra con el que declara TDN. **Los fuentes de Protheus vienen en cp1252**, así que la herramienta lo señala: leerlos como UTF-8 destroza los acentos. Si el nombre ya existe en el destino lo renombra, y un adjunto que el servidor no sirve queda declarado sin cancelar el resto del lote.

## Vigencia: cítala con la respuesta

Cada página y cada resultado traen su versión y su última edición. `⚠8a` son ocho años sin cambios:

```
1. 6063453  [tec]  DBSeek  (v3 2017-10-20 ⚠8a)
```

Contrastá contra la versión de Protheus del cliente antes de dar por vigente una página marcada.

## Modo anónimo y modo autenticado

Exportá el token y la herramienta lo usa sola:

```bash
export TDN_PAT='<token>'          # bash/zsh
$env:TDN_PAT = '<token>'          # PowerShell
```

Con `TDN_PAT` hay bastante más contenido disponible: más espacios visibles y más código de ejemplo. `--anon` lo ignora para una invocación.

**Con PAT los resultados dejan de ser reproducibles entre personas:** cada cuenta ve lo que sus permisos le permiten. Antes de pasarle un id a alguien, comprobá con `tdn get <id> --anon` que podrá abrirlo.

## Cuando algo falla

Cada error trae en su mensaje la salida concreta y qué hacer. Los más comunes:

| Situación | Qué significa |
|---|---|
| La página no existe | Se confirma con una segunda petición antes de responder |
| La página requiere permisos | Existe, pero tu cuenta no la ve |
| Se alcanzó el tope de peticiones | Subilo con `--max-requests` |

Al alcanzar cualquier tope la herramienta **aborta y declara qué quedó fuera**, para que un resultado incompleto se note.

## Más a fondo

- [`references/spaces-catalog.md`](references/spaces-catalog.md) — qué hay en cada espacio y cómo se llaman las rutinas.
- [`references/cql-syntax.md`](references/cql-syntax.md) — sintaxis de búsqueda, operadores, frases y campos.
- [`references/recetas-protheus.md`](references/recetas-protheus.md) — recetas listas para Puntos de Entrada, funciones y fuentes de Protheus.
- [`references/busqueda-privada.md`](references/busqueda-privada.md) — qué cambia al usar `TDN_PAT` y cómo verificar que un resultado es público.
