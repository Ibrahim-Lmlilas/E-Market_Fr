# E-Market Frontend

Plateforme e-commerce développée avec React, TypeScript et Vite. Cette application consomme l'API backend pour l'authentification et la gestion des produits.

## 🚀 Installation locale

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Backend API en cours d'exécution sur `http://localhost:3000`

### Étapes d'installation

1. **Cloner le repository** (si applicable)
   ```bash
   git clone <url-du-repo>
   cd e-market_fr
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créer un fichier `.env` à la racine du projet :
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
   
   > **Note** : Voir `.env.example` pour le format exact.

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   
   L'application sera accessible sur `http://localhost:5173`

5. **Build de production**
   ```bash
   npm run build
   ```
   
   Les fichiers optimisés seront générés dans le dossier `dist/`

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── cards/          # Cartes produits
│   ├── layout/         # Header, Footer, HeroSection
│   ├── routes/         # ProtectedRoute
│   └── ui/             # Button, Loader, ErrorMessage
├── context/            # AuthContext pour la gestion de l'authentification
├── pages/              # Pages de l'application
│   ├── Home.tsx
│   ├── ProductDetails.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── NotFound.tsx
├── routes/             # Configuration des routes (AppRoutes)
├── services/           # Services API
│   ├── apiClient.ts
│   ├── authService.ts
│   ├── productService.ts
│   └── userService.ts
└── assets/             # Images et ressources statiques
```

## 🛣️ Routes disponibles

| Route | Description | Protection |
|-------|-------------|------------|
| `/` | Page d'accueil (liste des produits) | Publique |
| `/products/:id` | Détails d'un produit | Publique |
| `/login` | Formulaire de connexion | Publique |
| `/register` | Formulaire d'inscription | Publique |
| `*` | Page 404 | Publique |

## 🔐 Authentification

L'application utilise JWT pour l'authentification :

- **Inscription** : `POST /users` via `authService.register()`
- **Connexion** : `POST /auth/login` via `authService.login()`
- **Profil utilisateur** : `GET /users/me` via `userService.getCurrentUser()`
- **Déconnexion** : Suppression du token du localStorage

Le token JWT est stocké dans `localStorage` et automatiquement ajouté aux requêtes API via `apiClient`.

### Utilisation du contexte d'authentification

```tsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  // ...
};
```

## 📡 API Backend

L'application consomme les endpoints suivants :

### Produits
- `GET /api/products` - Liste de tous les produits
- `GET /api/products/:id` - Détails d'un produit

### Authentification
- `POST /api/users` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/users/me` - Profil utilisateur (requiert authentification)

## 🎨 Technologies utilisées

| Domaine | Technologie |
|---------|-------------|
| Framework | React 18+ |
| Build Tool | Vite |
| Langage | TypeScript |
| Navigation | React Router v6 |
| HTTP Client | Axios |
| Styling | TailwindCSS |
| State Management | React Context API (useContext) |
| Hooks | useState, useEffect, useContext |

## 🎯 Fonctionnalités

- ✅ Authentification complète (inscription, connexion, déconnexion)
- ✅ Affichage de la liste des produits depuis l'API
- ✅ Page de détails pour chaque produit
- ✅ Interface responsive et moderne (design minimalist grayscale)
- ✅ Gestion des erreurs et états de chargement
- ✅ Composants réutilisables (Button, ProductCard, Loader, etc.)

## 📝 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de base de l'API backend | `http://localhost:3000/api` |

## 🧪 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Génère le build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint

## 📸 Screenshots

> Ajoutez ici des captures d'écran de votre application ou un lien vers votre maquette Figma.

## 🔄 Prochaines étapes

- [ ] Implémentation du panier d'achat
- [ ] Dashboard vendeur
- [ ] Gestion du state global (Redux/Zustand)
- [ ] Mode sombre (dark mode)
- [ ] Validation des formulaires avec React Hook Form + Yup
- [ ] Notifications toast (react-toastify)

## 📄 Licence

Ce projet est développé dans le cadre d'un projet pédagogique.

## 👤 Auteur

Développé dans le cadre du Sprint 3 - E-Market Frontend
