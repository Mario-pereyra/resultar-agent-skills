# Espacios de TDN

La clave del espacio nunca se deduce del nombre: `LR` y `LRM` se llaman los dos "Linha RM", y `PROT` y `mp` difieren en un punto final. Un filtro por nombre devuelve el espacio equivocado.

Para la lista viva usá `tdn spaces`.

## Los que importan

| Clave | Contenido |
|---|---|
| `PROT` | **Módulos, rutinas, Puntos de Entrada.** Es el más grande por amplio margen |
| `LLOG` | Línea Logix (manufactura, materiales, 4GL) |
| `LRM` | Línea RM (nómina, educacional, obras, .NET) |
| `LMPESP` | Protheus en español |
| `tec` | **ADVPL, TLPP**, AppServer, SmartClient, funciones de lenguaje |
| `TAF` | Fiscal, eSocial, Reinf |
| `mp` | Protheus histórico |
| `framework` | **MVC**, FWFormModel, FWExecView, componentes, PO-UI, APIs REST |
| `fluig` | Plataforma Fluig (BPM, ECM, WCM) |
| `teces` | Documentación técnica **en español** |
| `THF` | TOTVS HTML Framework |
| `TASS` | Totvs API Services |

## Claves que no funcionan

| Si escribís | Usá | Por qué |
|---|---|---|
| `logix` | **`LLOG`** | El nombre largo devuelve 0 resultados |
| `rm` | **`LRM`** | Ídem |

## Espacios vacíos en modo anónimo

Existen y aparecen en `tdn spaces`, pero devuelven **0 páginas** sin credenciales: `SDKF` (SDK Fluig), `UIE` (User Interface Explorer), `mpes` (Línea Microsiga Protheus), `TAFESP` (TAF - Espanhol). Con `TDN_PAT` pueden tener contenido.

## Prefijos de rutinas en `PROT`

Los nombres de rutina de Protheus llevan un prefijo por módulo. Buscar por título es la vía directa a la documentación de una rutina.

| Prefijo | Módulo |
|---|---|
| `MATA` | Materiales / Compras / Stock |
| `FINA` | Financiero |
| `GPEA` | Gestión de Personal |
| `CTBA` | Contabilidad |
| `TMSA` | Transporte |
| `ATFA` | Activo Fijo |
| `TAFA` | Automación Fiscal |
| `FATA` | Facturación |

```bash
tdn search 'space=PROT AND title~"MATA410*"'
```

## Puntos de Entrada

Viven en `PROT`. Es la vía más rápida para encontrar la documentación de un PE:

```bash
tdn search 'space=PROT AND title~"Ponto de Entrada" AND title~"MATA410"'
```

## Con credenciales

Con `TDN_PAT` se ven más espacios, pero la mayoría son wikis internos de equipos, no documentación de producto. Para el núcleo técnico —ADVPL, TLPP, MVC, Puntos de Entrada— el modo anónimo alcanza.

`tdn spaces --all` los lista.
