# TDN Explorer — beta para agentes de codificación

Hola a todos. Les comparto una herramienta que armé para consultar la documentación
oficial de TOTVS desde el agente con el que programamos. Está en **beta** y la
comparto primero con quienes ya usan agentes de codificación.

## Qué hace

Busca en el **TOTVS Developer Network** (`tdn.totvs.com`) y devuelve la página como
markdown, **con su id y su fecha de última edición a la vista**.

Eso último es lo importante: cuando el agente responde sobre ADVPL, indica de qué
página sacó la información y de cuándo es. Si una página lleva ocho años sin cambios,
lo advierte antes de que se tome como vigente.

Busca por función (`DBSeek`), por clase MVC (`FWFormModel`), por rutina (`MATA410`),
por Punto de Entrada, y descarga los adjuntos: fuentes `.prw` de ejemplo y headers
`.ch` con los `#define` reales.

## Para quién es

**Solo funciona con agentes de codificación.** No sirve en el chat web de ChatGPT ni
en claude.ai: la herramienta necesita salir a internet para consultar TDN, y el
entorno donde esos chats ejecutan código **tiene la red deshabilitada**. No es una
limitación que se resuelva con configuración.

Si no usan un agente de codificación, esto todavía no les va a servir.

## Instalación

**Con Claude Code:**

```bash
claude plugin marketplace add Mario-pereyra/resultar-agent-skills
claude plugin install tdn-explorer@resultar-agent-skills
```

**Con Codex, Cursor o GitHub Copilot:**

```bash
npx skills add Mario-pereyra/resultar-agent-skills --skill tdn-explorer
```

Se necesita **Node 18 o superior**, que ya está instalado si usan cualquiera de estos
agentes.

## Cómo se usa

No hay que invocar nada a mano: el agente decide usarla cuando se le pregunta por
documentación de TOTVS. Si quieren forzarla, nombren la skill.

```
Con la skill tdn-explorer, búscame la documentación de FWExecView y dime
el id y la fecha de última edición.
```

Cuando responda, **pídanle siempre el id**: es lo que permite abrir la página y
verificar que dice eso.

## Cómo se configura el acceso

Funciona **sin credenciales** y cubre el núcleo técnico: ADVPL, TLPP, MVC, Puntos de
Entrada.

Opcionalmente, exportando el token de TDN se accede a más código de ejemplo:

```bash
export TDN_PAT='<token>'     # bash/zsh
$env:TDN_PAT = '<token>'     # PowerShell
```

Dos cosas sobre el token:

- **Es personal y queda en la máquina de cada uno.** La herramienta lo lee del
  entorno; nunca sale del equipo ni se pasa como argumento.
- **Con token, los resultados dejan de ser iguales entre personas**, porque cada
  cuenta ve lo que sus permisos permiten. Un id que uno abre puede que otro no. Para
  eso existe `--anon`, que verifica si una página es pública.

## Estado: beta

- Funciona para el uso diario, pero **la sigo mejorando**.
- Si algo no encuentra lo que debería, o el markdown sale mal, **avísenme**. Los
  casos raros son los que más sirven.
- Si una búsqueda no devuelve nada, conviene probar con otro espacio antes de
  concluir que no existe: es el error más común, y la documentación de TOTVS está
  repartida en varios.

## Dos aclaraciones

**Es de uso interno.** El repositorio es público para que puedan instalarlo, pero el
código tiene licencia propietaria: se usa dentro de Resultar, no se redistribuye hacia
afuera ni se reutiliza en otro producto.

**Es un proyecto mío, anterior a este pedido.** Lo desarrollé por mi cuenta porque lo
necesitaba para trabajar; ahora lo comparto porque le puede servir al equipo.

Cualquier duda o problema, me escriben directamente.
