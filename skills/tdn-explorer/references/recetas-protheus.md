# Recetas para Protheus (ADVPL / TLPP)

`tdn` es `node <skill-root>/tdn.mjs`, con `<skill-root>` el directorio del `SKILL.md`.

Patrones de búsqueda listos para localizar información técnica de Protheus en TDN.

## 1. Puntos de Entrada

Para encontrar la documentación oficial de un Punto de Entrada (ej: `MATA410`, `MATA010`, `FINA050`):

```bash
# PEs asociados a una rutina estándar
tdn search 'space=PROT AND title~"MATA410" AND text~"\"Ponto de Entrada\""'

# Por el identificador del Punto de Entrada
tdn search 'space=PROT AND (title~"MT410*" OR text~"\"MT410INC\"")'
```

## 2. Funciones nativas y clases del framework

Para consultar la firma de funciones ADVPL (`DbSeek`, `RecLock`, `FWExecStatement`) y clases MVC (`FWFormModel`, `FWFormView`, `FWMBrowse`):

```bash
# Funciones del lenguaje y AppServer
tdn search 'space=tec AND title~"DbSeek"'

# Clases del framework: MVC, PO-UI, APIs REST
tdn search 'space=framework AND title~"FWFormModel"'
```

## 3. Código de ejemplo y fuentes (`.prw` / `.tlpp`)

```bash
# Buscar adjuntos .prw en el espacio PROT
tdn files --ext .prw -s PROT

# Descargar los adjuntos .prw de una página a disco
tdn fetch <page_id> --ext .prw --out ./ejemplos/
```

> **Codificación:** los fuentes de Protheus vienen en **Windows-1252 (CP1252)**. La herramienta lo señala al descargarlos; leerlos como UTF-8 destroza los acentos.

## 4. Diagnóstico de errores y Help del sistema

Cuando Protheus emite un Help (ej: `NOFREEZE`, `A410NITEM`, `REGNOIS`):

```bash
tdn search 'space=PROT AND text~"\"A410NITEM\""'
```

## 5. Auditar páginas complejas

Para verificar que una página extensa —con tablas de campos, macros y diagramas— se convierte íntegra:

```bash
tdn verify <page_id_o_url>
```
