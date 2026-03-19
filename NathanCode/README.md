# NathanCode — Éditeur de code

Éditeur de code moderne inspiré de Visual Studio Code.
Fonctionne **directement dans le navigateur** (sans installation) et comme **application desktop** via Electron.

---

## Lancement rapide (navigateur)

1. Ouvre `index.html` dans n'importe quel navigateur moderne
2. C'est tout — aucune installation requise !

---

## Application Desktop (Electron)

### Prérequis
- Node.js 18+ → https://nodejs.org

### Installation
```bash
npm install
```

### Lancer en mode développement
```bash
npm run electron
```

### Compiler une application (.exe / .dmg / .AppImage)
```bash
# Windows
npm run build-win

# macOS
npm run build-mac

# Linux
npm run build-linux
```
Les fichiers compilés apparaissent dans le dossier `dist/`.

---

## Fonctionnalités

### Éditeur
- Coloration syntaxique : JavaScript, TypeScript, Python, CSS, JSON, Markdown
- Onglets multiples
- Numéros de ligne + minimap
- Fil d'Ariane (breadcrumb)
- Curseur positionnel (Ln/Col dans la barre d'état)

### Terminal intégré
- Commandes : `ls`, `pwd`, `cat`, `echo`, `mkdir`, `rm`, `open`
- Node.js : `node -v`, `npm install`, `npm start`, `npm run dev`, `npm test`
- Python : `python --version`, `pip install flask`, `python server.py`
- Git : `git status`, `git log --oneline`, `git add .`, `git commit`
- Historique des commandes (flèches ↑ ↓)

### Raccourcis clavier
| Raccourci        | Action                     |
|------------------|----------------------------|
| `Ctrl+S`         | Sauvegarder                |
| `Ctrl+F`         | Rechercher dans le fichier |
| `Ctrl+/`         | Commenter la ligne         |
| `Ctrl+D`         | Dupliquer la ligne         |
| Ctrl+\`           | Ouvrir/fermer le terminal  |
| `Tab`            | Indenter (2 espaces)       |
| `Shift+Alt+F`    | Formater le document       |
| `↑ / ↓`          | Historique terminal        |

### Interface
- Barre d'activité (explorateur, recherche, Git, extensions, paramètres)
- Explorateur de fichiers avec arborescence
- Recherche globale dans tous les fichiers
- Panneau Git avec statut des modifications
- Marketplace d'extensions (Prettier, ESLint, GitLens)
- Paramètres : taille de police, thème (Dark / Monokai / Light), retour à la ligne
- 3 thèmes : **Dark** (défaut), **Monokai**, **Light**

---

## Structure du projet
```
nathancode/
├── index.html    ← Application complète (web + desktop)
├── electron.js   ← Point d'entrée Electron (desktop)
├── package.json  ← Config npm + build Electron
└── README.md     ← Ce fichier
```

---

Créé par **NathanFR3** · v1.0.0
