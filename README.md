# CAP SUD — Site Web Officiel

Centre commercial **CAP SUD**, Boulevard Valéry Giscard d'Estaing, Marcory, Abidjan (Côte d'Ivoire).
Site multi-page en **HTML/CSS/JS vanilla** — aucune étape de build, aucun framework, déployable tel quel sur n'importe quel hébergement statique (Netlify, Vercel, OVH, Hostinger, GitHub Pages…).

> *« Boutiques, restos, ciné & services dans un cadre moderne, accessible, tout-en-un. »*

---

## 🚀 Démarrage rapide

```bash
# Option 1 : ouvrir directement index.html dans un navigateur
# Option 2 : serveur local (recommandé pour le JSON-LD et les assets)
npx serve .
# ou
python3 -m http.server 8000
```

Puis ouvrez `http://localhost:8000`.

**Identifiants admin (démo)** : `admin` / `capsud2026` → page `/admin.html`

---

## 📁 Structure du projet

```
capsud/
├── index.html          # Accueil (9 scènes animées)
├── enseignes.html      # Annuaire : recherche live, filtres, tiroir détail
├── cinema.html         # Films à l'affiche + horaires par jour
├── services.html       # Services du centre
├── evenements.html     # Événements & promos (cartes sticky)
├── acces.html          # Carte, horaires, badge "Ouvert maintenant"
├── contact.html        # Coordonnées + formulaire
├── admin.html          # Back-office protégé (auth-ready)
├── css/
│   └── style.css       # Design system complet (navy/bleu électrique, Sora+Inter)
├── js/
│   ├── data.js         # ⭐ DONNÉES (équivalent src/data/*.ts) : 12 enseignes PLACEHOLDER,
│   │                   #    films, événements, horaires + couche CS_DB (load/save)
│   ├── main.js         # Header/footer injectés, nav, préchargeur, reveal, compteurs, badge Ouvert
│   ├── home.js         # Animations accueil (hero scrub, carrousel, horaires, façade)
│   ├── enseignes.js    # Logique annuaire (recherche, filtres, drawer)
│   └── admin.js        # Logique back-office (auth, édition, sauvegarde)
└── README.md
```

---

## 🎨 Design system

| Rôle | Couleur | Usage |
|---|---|---|
| `--navy` | `#0B2A6F` | 60% — fonds, textes, header/footer |
| `--blue` | `#2F6BFF` | 30% — accents, boutons, CTA |
| `--white` | `#FFFFFF` | 10% — fonds clairs, espaces |
| `--gold` | `#FFB020` | touches (étoiles, fenêtres, soldes) |

- **Polices** : Sora (titres) + Inter (corps) — chargées via Google Fonts.
- **Identité** : sac shopping 3D CSS brillant, orbes lumineux, grille architecturale, verre (glassmorphism), dégradés golden-hour / blue-hour.

---

## 📝 Remplacer les données (12 enseignes = placeholders)

Tout le contenu vit dans **`js/data.js`** :

- `stores` : les 12 boutiques (à remplacer par les vraies enseignes — nom, catégorie, étage, local, téléphone, description).
- `categories` : les 6 catégories de boutiques.
- `films` + `showtimes` : films et horaires par jour (onglets Aujourd'hui / Demain / Week-end).
- `events` : événements & promos (titre, date, réduction, couleur).
- `center.hours` : horaires d'ouverture (utilisés pour le badge **« Ouvert maintenant »** auto-calculé sur `/acces.html`).
- `services` : strip des services (supermarché, pressing, change, DAB, Wi-Fi…).

Vous pouvez aussi tout éditer visuellement depuis **`/admin.html`** (les modifs sont stockées dans le `localStorage` du navigateur).

---

## ⚙️ Back-office : connecter une vraie base de données

Le back-office est **auth-ready** : l'interface et la logique d'édition sont complètes, il ne reste qu'à brancher la persistance.

### Étape 1 — Remplacer la couche de données

Dans `js/data.js`, la couche `CS_DB` a deux méthodes :

```js
CS_DB.load()   // renvoie les données (actuellement : localStorage, sinon défaut)
CS_DB.save(patch) // persiste les modifications (actuellement : localStorage)
```

Pour une vraie BDD multi-postes, remplacez-les par des appels à votre API. Exemple avec **Supabase** :

```js
// js/data.js — remplacez load() et save() par :
const SUPA_URL = 'https://VOTRE-PROJET.supabase.co';
const SUPA_KEY = 'VOTRE-ANON-KEY';

CS_DB.load = async function () {
  const res = await fetch(`${SUPA_URL}/rest/v1/capsud_content?select=*`, {
    headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` }
  });
  const rows = await res.json();
  return rows[0]?.content || CS_DATA; // fallback sur les données par défaut
};

CS_DB.save = async function (patch) {
  await fetch(`${SUPA_URL}/rest/v1/capsud_content?id=eq.1`, {
    method: 'PATCH',
    headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ content: patch })
  });
};
```

Compatible aussi avec **Firebase Firestore**, **MySQL/PostgreSQL via un backend Node/PHP**, ou un **headless CMS** (Strapi, Contentful, Sanity).

### Étape 2 — Sécuriser l'authentification

Le mot de passe démo (`capsud2026`) est en clair dans `js/admin.js` — **à remplacer absolument en production** par :
- Une auth côté serveur (session JWT), ou
- L'auth fournie par Supabase/Firebase (`signInWithPassword`), ou
- Une protection HTTP Basic au niveau de l'hébergement pour `/admin.html`.

### Étape 3 — Formulaire de contact

Dans `contact.html`, le submit est intercepté en JS. Branchez un service d'email (**Formspree**, **EmailJS**, ou votre endpoint) :

```js
fetch('https://formspree.io/f/VOTRE_ID', { method: 'POST', body: new FormData(form) });
```

---

## 🔍 SEO

- Métadonnées `title` / `description` / `keywords` par page, ciblées sur **« centre commercial Abidjan Marcory »** et **« cinéma Marcory »**.
- **Open Graph** pour le partage social.
- **JSON-LD** intégré : `ShoppingCenter` (adresse, téléphone, horaires, `aggregateRating` 678 avis) + `Event` (promos) — dans `index.html`, `enseignes.html`, `evenements.html`.
- Balises sémantiques, URLs propres, responsive mobile.

Pour aller plus loin : ajoutez un `sitemap.xml` et un `robots.txt` à la racine, et déclarez le site sur **Google Business Profile** (référencement local).

---

## ✨ Animations de la page d'accueil (9 scènes)

1. **Préchargeur** — logo qui pulse, révélation par `clip-path` circulaire (une seule fois par session).
2. **Hero** — sac shopping 3D CSS brillant + orbes ; au scroll, il atterrit, pivote et zoom (effet « on entre dans le centre »).
3. **Walk-through 5 zones** — Boutiques / Restaurants / Cinéma / Supermarché / Services, teinte colorée par zone, carte info flottante, reveal au scroll.
4. **Cinéma** — lettres géantes « CINÉ », carrousel d'affiches à défilement auto (parallaxe horizontal), panneau d'horaires avec onglets par jour.
5. **Food** — burger / café / frites / gâteau flottants (parallaxe), chips de catégories.
6. **Services strip** — 6 icônes animées (bob offset).
7. **Événements** — cartes sticky empilées qui glissent les unes sur les autres.
8. **Preuve sociale** — compteurs animés : 88 % recommandé, 678 avis, 96K followers.
9. **Finale** — façade heure bleue, fenêtres lumineuses clignotantes, lettres géantes « RENDEZ-VOUS ».

---

## 📱 Responsive

Breakpoints : 960 px (tablette, menu burger) et 560 px (mobile). Toutes les grilles passent en colonne unique.

---

## 📞 Coordonnées (à mettre à jour dans `js/data.js` → `center`)

- 📞 +225 27 21 35 13 35
- 📷 @capsud_abidjan
- 📍 Boulevard Valéry Giscard d'Estaing, Marcory, Abidjan

---

**Déploiement** : glissez-déposez le dossier sur Netlify/Vercel, ou uploadez en FTP. Aucune compilation. ✅
