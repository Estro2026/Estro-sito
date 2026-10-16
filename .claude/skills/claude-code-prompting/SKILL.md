---
name: claude-code-prompting
description: Scrive prompt compatti, precisi e ad alta densità informativa per Claude Code, riducendo token, ripetizioni e contesto inutile senza perdere vincoli critici.
---

# Claude Code Prompting Skill

## Scopo

Trasformare feedback, bug, richieste UI, task frontend e revisioni in prompt operativi brevi e precisi per Claude Code.

## Struttura preferita

TASK
SCOPE
REQUIREMENTS
DO NOT
VALIDATE

## Regole

- Descrivere il risultato desiderato, non la storia del problema.
- Specificare chiaramente scope locale o globale.
- Usare bullet brevi e verificabili.
- Non duplicare codice o documentazione già leggibile nel repository.
- Preferire fix sistemici a patch locali.
- Non introdurre refactor o dipendenze non necessarie.
- Chiedere solo validation pertinente.
- Separare task indipendenti.
- Per bug ordinari preferire approccio CONSERVATIVE.
- Preservare i comportamenti già corretti.

## Responsive

Non usare genericamente "rendi responsive". Specificare overflow, wrap, stacking, ordine, dimensione, spacing, zoom, touch o breakpoint.

## Regola finale

Il prompt ideale contiene solo le informazioni che cambiano il comportamento di Claude Code.
