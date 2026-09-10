# Mensaje para WhatsApp

Dos versiones. Usar la corta si el grupo es de mucho tráfico; la larga si es un grupo
técnico donde se leen las cosas.

Reglas que sigue: el beneficio antes del nombre, los comandos al final, un solo link
y una sola pregunta. En WhatsApp nadie scrollea.

---

## Versión corta (para pegar)

```text
Buenas 👋 Les comparto algo que armé y creo que les va a ahorrar tiempo.

*El problema:* cuando le pedimos a la IA algo de ADVPL o Protheus, muchas veces
inventa o mezcla versiones. No cita de dónde sacó lo que dice.

*Lo que hace:* consulta la documentación oficial de TOTVS (TDN) desde el agente
y devuelve la respuesta *con el id de la página y la fecha de última edición*.
Así uno puede abrir la página y verificar. Si la documentación es vieja, lo avisa.

Sirve para buscar funciones (DBSeek), clases MVC (FWFormModel), rutinas (MATA410),
Puntos de Entrada, y baja los fuentes .prw de ejemplo.

*Solo funciona con agentes de codificación* (Claude Code, Codex, Cursor, Copilot).
En el chat web no anda: necesita salir a internet y esos entornos tienen la red
bloqueada.

Si usan Claude Code:
claude plugin marketplace add Mario-pereyra/resultar-agent-skills
claude plugin install tdn-explorer@resultar-agent-skills

Los demás:
npx skills add Mario-pereyra/resultar-agent-skills --skill tdn-explorer

*Está en beta.* Si algo no lo encuentra o sale raro, me avisan y lo ajusto.
Los que la prueben, cuéntenme qué tal 🙌
```

---

## Versión larga (para pegar)

```text
Buenas a todos 👋

Les quiero compartir una herramienta que armé para el trabajo diario con Protheus
y ADVPL. Está en beta y la comparto primero acá.

*El problema que resuelve*

Cuando le pedimos a la IA algo de ADVPL, Protheus o MVC, muchas veces contesta con
seguridad pero sin decir de dónde lo sacó. Y esa respuesta puede venir de
documentación vieja, de otra versión, o directamente inventada. Verificar eso a mano
cuesta tiempo.

*Qué hace*

Consulta el TOTVS Developer Network (la documentación oficial de TOTVS) desde el
agente, y devuelve la página *con su id y su fecha de última edición*.

Eso cambia la conversación: la respuesta viene con la fuente, uno abre la página y
comprueba. Y cuando una página lleva años sin cambios, lo advierte antes de que la
tomemos como vigente.

Se le puede pedir:
• Funciones del lenguaje → DBSeek, RecLock
• Clases del MVC → FWFormModel, FWExecView
• Rutinas de módulos → MATA410, FINA050
• Puntos de Entrada de una rutina
• Los fuentes .prw de ejemplo y los headers .ch

*Cómo se usa*

No hay que hacer nada especial: el agente la usa solo cuando le preguntan por
documentación de TOTVS. Si quieren forzarla, nombren la skill y pídanle el id:

"Con la skill tdn-explorer, búscame la documentación de FWExecView y dime el id
y la fecha."

*Cómo se instala*

Funciona sin credenciales, así que se puede probar sin configurar nada.

Con Claude Code:
claude plugin marketplace add Mario-pereyra/resultar-agent-skills
claude plugin install tdn-explorer@resultar-agent-skills

Con Codex, Cursor o GitHub Copilot:
npx skills add Mario-pereyra/resultar-agent-skills --skill tdn-explorer

Necesitan Node 18 o superior (lo tienen si ya usan alguno de esos agentes).

*Ojo:* solo funciona con agentes de codificación. En el chat web de ChatGPT o
claude.ai no anda, porque la herramienta necesita salir a internet y esos entornos
ejecutan el código con la red bloqueada. No es algo que se arregle con configuración.

*Es beta*

Funciona para el uso diario, pero la sigo mejorando. Si algo no lo encuentra, o el
resultado sale mal, avísenme: los casos raros son los que más me sirven para
ajustarla.

Un tip: si una búsqueda no devuelve nada, prueben con otro espacio antes de concluir
que no existe. La documentación de TOTVS está repartida en varios y es el error más
común.

Gracias 🙌 y cualquier cosa me escriben.
```

---

## Notas

- Los `*asteriscos*` son negrita en WhatsApp. No usar `**dobles**` ni `#` de markdown:
  se ven como texto literal.
- El link va **una sola vez**, en el bloque de instalación. Repetirlo hace que el
  mensaje parezca publicidad.
- Las listas van con `•` o `-` al inicio de línea; WhatsApp no renderiza listas.
- Si el grupo es mixto (funcionales y técnicos), la versión corta separa bien: quien
  no programa lee las primeras cinco líneas y entiende que no es para él.
