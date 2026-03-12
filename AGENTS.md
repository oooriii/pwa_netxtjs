# AGENTS.md

## Scope
Aquest fitxer aplica a tot el repositori.

## Objectiu del projecte
Crear un template PWA amb Next.js orientat a reutilització en altres projectes, mantenint:
- principis SOLID,
- arquitectura DDD,
- codi modular i fàcil d'extendre,
- evitant codi espagueti o lasanya.

## Convencions d'arquitectura
- Separar clarament capes: `domain`, `application`, `infrastructure`, `presentation`.
- El `domain` no pot dependre de framework ni APIs del navegador.
- Casos d'ús (`application`) depenen d'interfícies/ports i no d'implementacions concretes.
- Implementacions del navegador o UI van a `infrastructure` i `presentation`.
- Evitar fitxers grans multifunció: preferir components i serveis petits.

## Convencions tècniques
- Frontend amb Next.js (App Router), Tailwind CSS v4 i components shadcn/ui.
- Tipatge estricte TypeScript.
- Evitar `any` excepte justificació clara.
- Noms descriptius i coherents (anglès per codi, català/anglès per documentació segons context).

## Flux de treball
- Mantenir `PLAN.md` actualitzat marcant passos completats.
- Després de cada pas del pla:
  1. executar comprovacions/tests,
  2. fer commit amb missatge clar.
- Si hi ha canvis visuals rellevants, generar captura.

## Qualitat
- Fer lint i build com a mínim abans de tancar.
- Prioritzar llegibilitat, separació de responsabilitats i extensibilitat.
