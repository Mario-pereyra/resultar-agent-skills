# Búsqueda autenticada con `TDN_PAT`

## Para qué sirve

El núcleo técnico de TDN —ADVPL, TLPP, MVC, Puntos de Entrada— es público y se consulta sin credenciales. El token agrega sobre todo **código de ejemplo**: bastantes más fuentes `.prw` descargables.

Si buscás documentación de funciones, clases o rutinas, no lo necesitás.

## Cómo se configura

El token va en una variable de entorno. Es el único canal: la herramienta rechaza cualquier intento de pasarlo como argumento, para que no quede en el historial del shell.

```bash
export TDN_PAT='<token>'          # bash/zsh
$env:TDN_PAT = '<token>'          # PowerShell
```

Para una invocación puntual en modo anónimo, ignorando el token:

```bash
tdn get 6063453 --anon
```

## Antes de compartir un id

**Con token, los resultados dejan de ser reproducibles entre personas:** cada cuenta ve lo que sus permisos le permiten. Un id que vos abrís puede no existir para tu compañero.

Comprobalo antes de pasarlo:

```bash
tdn get <id> --anon
```

Si responde en anónimo, cualquiera podrá abrirlo.

## Qué marca la salida

Los listados indican con qué identidad se consultó, pero **no** la visibilidad de cada resultado por separado. Solo `get` verifica si una página concreta es pública.

Si un token no es válido, la herramienta lo detecta al arrancar y avisa que continúa en modo anónimo, en lugar de devolver resultados incompletos sin explicación.
