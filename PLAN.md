# PLAN

## Estat general
- [x] 1. Definir governança del repo i pla inicial (`AGENTS.md`, `PLAN.md`).
- [x] 2. Inicialitzar app Next.js + Tailwind v4 + base shadcn/ui + estructura DDD.
- [x] 3. Implementar mòdul de funcionalitats togglables (notificacions, càmera, geolocalització).
- [x] 4. Afegir capacitats PWA (manifest, service worker bàsic, instal·lació).
- [x] 5. Configurar GitHub Actions (CI + deploy a GitHub Pages).
- [x] 6. Validació final (lint/build), screenshot i documentació d'ús.

## Detall de passos

### Pas 1 — Governança i planificació
- [x] Crear `AGENTS.md` amb normes d'arquitectura i flux.
- [x] Crear `PLAN.md` amb passos executables.
- [x] Test/check: validar format de markdown i estat de git.
- [x] Commit del pas.

### Pas 2 — Bootstrap tècnic
- [x] Crear base Next.js (TypeScript + App Router).
- [x] Configurar Tailwind v4.
- [x] Integrar base shadcn/ui (utilitats i components base necessaris).
- [x] Crear esquelet DDD (`src/domain`, `src/application`, `src/infrastructure`, `src/presentation`).
- [x] Test/check: `npm run lint`, `npm run build`.
- [x] Commit del pas.

### Pas 3 — Funcionalitats togglables
- [x] Definir model de `Feature` al domini i contractes.
- [x] Implementar casos d'ús d'activació/prova de features.
- [x] Implementar adapters navegador (Notification API, Camera API, Geolocation API).
- [x] Crear UI amb toggles i execució de proves.
- [x] Test/check: `npm run lint`, `npm run build`.
- [x] Commit del pas.

### Pas 4 — PWA
- [x] Afegir `manifest.webmanifest`.
- [x] Afegir service worker bàsic i registre client-safe.
- [x] Afegir UX d'instal·lació (botó install quan sigui possible).
- [x] Test/check: `npm run lint`, `npm run build`.
- [x] Commit del pas.

### Pas 5 — GitHub Actions
- [x] Workflow CI (lint + build).
- [x] Workflow deploy GitHub Pages (build estàtic + upload artifact + deploy).
- [x] Ajustar config Next per subpath de Pages via variables.
- [x] Test/check local build d'export.
- [x] Commit del pas.

### Pas 6 — Tancament
- [x] Actualitzar README amb guia d'ús/reutilització.
- [x] Fer screenshot de la UI final.
- [x] Revisió final del `PLAN.md` (tot marcat).
- [x] Commit final.


### Pas 7 — Hotfix CI lockfile
- [x] Revisar error de GitHub Actions relacionat amb lockfile.
- [x] Ajustar workflows per no requerir lockfile inexistent al checkout.
- [x] Test/check: validació sintàctica dels YAML i revisió de diff.
- [x] Commit del pas.


### Pas 8 — Hotfix lint ESM import
- [x] Identificar l'error d'import d'`eslint-config-next/core-web-vitals`.
- [x] Corregir l'import ESM cap a `core-web-vitals.js`.
- [x] Test/check: validació del fitxer de configuració ESLint.
- [x] Commit del pas.


### Pas 9 — Hotfix lint config iterable
- [x] Diagnosticar error `nextVitals is not iterable` al lint.
- [x] Fer `eslint.config.mjs` robust davant export object/array.
- [x] Test/check: validació sintàctica del fitxer de config.
- [x] Commit del pas.


### Pas 10 — Hotfix flat ESLint config
- [x] Diagnosticar incompatibilitat entre eslintrc i flat config.
- [x] Migrar `eslint.config.mjs` a `FlatCompat` amb `next/core-web-vitals`.
- [x] Afegir dependència `@eslint/eslintrc` per compatibilitat explícita.
- [x] Test/check: validació sintàctica dels fitxers modificats.
- [x] Commit del pas.


<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours

=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
### Pas 11 — Hotfix GitHub Pages enablement
- [x] Diagnosticar error `Get Pages site failed` a `configure-pages`.
- [x] Configurar `actions/configure-pages` amb `enablement: true`.
- [x] Test/check: validació YAML del workflow.
- [x] Commit del pas.


### Pas 12 — Hotfix registre Service Worker i instal·lació PWA
- [x] Diagnosticar registre SW fallant en entorns amb `basePath` (GitHub Pages).
- [x] Corregir rutes de SW/manifest/icons per suportar subpath i instal·lació PWA.
- [x] Millorar missatges d'estat a la UI d'instal·lació (HTTPS/standalone/prompt).
- [x] Test/check: lint/build o validacions alternatives segons entorn.
- [x] Commit del pas.


### Pas 13 — Millora UX visual i canvi de tema
- [x] Afegir icones i millorar botons de les funcionalitats.
- [x] Afegir indicador LED verd/vermell d'estat per feature.
- [x] Implementar selector de tema (clar, fosc, sistema).
- [x] Test/check: validacions disponibles en entorn actual i screenshot.
- [x] Commit del pas.
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours

=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
