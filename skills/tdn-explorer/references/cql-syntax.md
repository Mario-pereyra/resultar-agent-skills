# CQL: la sintaxis de búsqueda de TDN

`tdn` es `node <skill-root>/tdn.mjs`, con `<skill-root>` el directorio del `SKILL.md`.

## Campos

| Campo | Ejemplo | Nota |
|---|---|---|
| `space` | `space=tec` | La **clave**, no el nombre |
| `type` | `type=page` | Enum cerrado, abajo |
| `title~` | `title~"MATA410*"` | Coincidencia en el título |
| `text~` | `text~"DBSeek"` | Texto completo |
| `label` | `label="advpl"` | Etiqueta |
| `ancestor` | `ancestor=334340072` | **Todo el subárbol**, a cualquier profundidad |
| `parent` | `parent=334340072` | Solo los hijos directos |
| `created` | `created >= now("-30d")` | |
| `lastmodified` | `lastmodified >= now("-180d")` | |

### Tipos válidos

```
[space, user, attachment, comment, page, blogpost]
```

## Frases exactas: escápalas

La diferencia es grande y silenciosa:

```bash
space=PROT AND text~"\"Ponto de Entrada\"" AND text~"MATA410"   # la frase
space=PROT AND text~"Ponto de Entrada" AND text~"MATA410"       # tres palabras sueltas
```

Sin las comillas internas, CQL busca los términos por separado y el resultado se llena de ruido.

## `ancestor`: contar antes de recorrer

`ancestor=` cuenta un subárbol entero con **una** petición, lo que permite saber en qué te metés antes de empezar:

```bash
tdn search 'ancestor=334340072 AND type=page'
```

Es lo que hace `tdn tree` antes de recorrer.

## Cuántos resultados pedir

El máximo por página es **500**: pedir más devuelve 500. El total que reporta la consulta sí es el real, así que sirve para saber si vale la pena paginar.

```bash
tdn search 'space=tec AND text~"DBSeek"' --limit 10 --start 20
```

## Filtros que se ignoran en silencio

Estos se aceptan sin error y **no cambian el resultado**:

```
lastModified   contributor   group   attachmentType
```

Usá `lastmodified` (todo en minúsculas) en su lugar.

## Marcadores en los títulos

Los títulos traen marcadores de estado que conviene reconocer:

| Marca | Significa |
|---|---|
| `[WIP]` | En progreso |
| `[Obsoleto]` · `[Deprecated]` | Desactualizado |
| `Traducción` · `[ES]` | Versión en español |

## Recetas

```bash
# Todo lo que cuelga de una página, a cualquier profundidad
tdn search 'ancestor=334340072'

# Solo los hijos directos
tdn search 'parent=334340072'

# Ventana temporal y espacio, ordenado
tdn search 'space=PROT AND lastmodified >= now("-180d")'

# Adjuntos de un tipo dentro de un espacio
tdn search 'space=PROT AND type=attachment AND title~"*.prw"'
```
