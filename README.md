# PWA Next.js Template (DDD + SOLID)

Template base per projectes Next.js que necessiten una **PWA instal·lable** i una arquitectura clara orientada a domini.

## Stack

- Next.js (App Router + TypeScript)
- Tailwind CSS v4
- shadcn/ui (components base)
- Arquitectura DDD (`domain`, `application`, `infrastructure`, `presentation`)

## Funcionalitats incloses

- Catàleg de funcionalitats del navegador:
  - Notificacions
  - Càmera
  - Geolocalització
- Activació i prova de cada feature des de la UI
- `manifest.webmanifest`
- `service worker` bàsic per cachejar assets inicials
- UX d'instal·lació amb `beforeinstallprompt`

## Estructura

```text
src/
  domain/           # Entitats, tipus i ports
  application/      # Casos d'ús i orquestració
  infrastructure/   # Adaptadors concrets (Browser APIs)
  presentation/     # Components UI
  app/              # Rutes Next.js
```

## Desenvolupament

```bash
npm install
npm run dev
```

## Build estàtic per GitHub Pages

Aquest template està configurat amb `output: "export"`.

```bash
npm run build
```

El resultat es genera a `out/`.

## GitHub Actions

- `ci.yml`: executa `npm ci`, `npm run lint`, `npm run build`
- `deploy-pages.yml`: publica `out/` a GitHub Pages quan es fa push a `main`

## Reutilització

1. Fes fork d'aquest repo.
2. Canvia textos/branding.
3. Afegeix noves features implementant:
   - Port al domini
   - Cas d'ús a `application`
   - Adapter a `infrastructure`
   - Card o vista a `presentation`

## Flux recomanat per sincronitzar branques i fer PR

Quan treballes amb una branca remota (per exemple `origin/codex/...`) i vols evitar conflictes:

1. **Actualitza refs remotes**
   ```bash
   git fetch origin
   ```
2. **Crea o recupera la branca local que trackeja la remota**
   ```bash
   git checkout -b <branch-local> origin/<branch-remota>
   # o, si ja existeix:
   git checkout <branch-local>
   git branch --set-upstream-to=origin/<branch-remota>
   ```
3. **Rebasa o fusiona `main` abans de tocar res**
   ```bash
   git fetch origin
   git rebase origin/main
   # alternativa: git merge origin/main
   ```
4. **Resol conflictes i valida**
   ```bash
   npm run lint
   npm run build
   ```
5. **Publica els canvis al remot**
   ```bash
   git push -u origin <branch-local>
   ```
6. **Obre PR cap a `main`** i fes merge quan CI estigui en verd.

> Si un agent resol conflictes al núvol però no fa `push`, els canvis només existeixen localment dins aquella sessió. Sempre cal `commit + push` perquè tu ho puguis veure des del teu local i obrir/mergejar el PR sense desajustos.

