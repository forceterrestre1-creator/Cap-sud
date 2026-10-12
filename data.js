/* ============================================================
   CAP SUD — Données du site (équivalent src/data/*.ts)
   12 enseignes d'exemple (PLACEHOLDERS — à remplacer par les vraies)
   Modifiables aussi depuis /admin.html (sauvegarde locale localStorage)
   ============================================================ */

const CS_DATA = {
  center: {
    name: "CAP SUD",
    tagline: "Boutiques, restos, ciné & services dans un cadre moderne, accessible, tout-en-un.",
    address: "Boulevard Valéry Giscard d'Estaing, Marcory, Abidjan, Côte d'Ivoire",
    phone: "+225 27 21 35 13 35",
    instagram: "https://instagram.com/capsud_abidjan",
    instagramHandle: "@capsud_abidjan",
    facebookFollowers: 96000,
    recommendedPct: 88,
    reviewsCount: 678,
    // Horaires d'ouverture (jour 0 = dimanche) — utilisés pour le badge "Ouvert maintenant"
    hours: [
      { day: 0, open: "09:00", close: "21:00", label: "Dimanche" },
      { day: 1, open: "09:00", close: "21:30", label: "Lundi" },
      { day: 2, open: "09:00", close: "21:30", label: "Mardi" },
      { day: 3, open: "09:00", close: "21:30", label: "Mercredi" },
      { day: 4, open: "09:00", close: "21:30", label: "Jeudi" },
      { day: 5, open: "09:00", close: "22:30", label: "Vendredi" },
      { day: 6, open: "09:00", close: "22:30", label: "Samedi" }
    ]
  },

  // Catégories d'enseignes
  categories: [
    { id: "mode",      label: "Mode",       icon: "👗" },
    { id: "beaute",    label: "Beauté",     icon: "💄" },
    { id: "hightech",  label: "High-Tech",  icon: "📱" },
    { id: "lifestyle", label: "Lifestyle",  icon: "🏠" },
    { id: "resto",     label: "Restauration", icon: "🍔" },
    { id: "service",   label: "Services",   icon: "🛠️" }
  ],

  // 12 enseignes PLACEHOLDER — remplacer par les vraies boutiques
  stores: [
    { id: 1,  name: "Maison Élégance",   category: "mode",      floor: "RDC",  unit: "Boutique 01", phone: "+225 07 00 00 00 01", desc: "Prêt-à-porter féminin et accessoires de marque, collections saisonnières." },
    { id: 2,  name: "Urban Style Hommes", category: "mode",      floor: "RDC",  unit: "Boutique 02", phone: "+225 07 00 00 00 02", desc: "Mode urbaine masculine, sneakers et streetwear." },
    { id: 3,  name: "Glow Beauty",        category: "beaute",    floor: "RDC",  unit: "Boutique 03", phone: "+225 07 00 00 00 03", desc: "Cosmétiques, parfums, soins visage & corps. Espace maquillage." },
    { id: 4,  name: "Coiffure Studio 21", category: "beaute",    floor: "1er",  unit: "Boutique 11", phone: "+225 07 00 00 00 04", desc: "Salon de coiffure & esthétique, rendez-vous en ligne." },
    { id: 5,  name: "TechZone",           category: "hightech",  floor: "RDC",  unit: "Boutique 04", phone: "+225 07 00 00 00 05", desc: "Smartphones, ordinateurs, accessoires high-tech & SAV." },
    { id: 6,  name: "Audio & Son",        category: "hightech",  floor: "1er",  unit: "Boutique 12", phone: "+225 07 00 00 00 06", desc: "Enceintes, casques, TV et installations home cinéma." },
    { id: 7,  name: "Déco & Maison",      category: "lifestyle", floor: "1er",  unit: "Boutique 13", phone: "+225 07 00 00 00 07", desc: "Décoration d'intérieur, luminaires, linge de maison." },
    { id: 8,  name: "Librairie du Sud",   category: "lifestyle", floor: "1er",  unit: "Boutique 14", phone: "+225 07 00 00 00 08", desc: "Livres, papeterie, jeux éducatifs et espace lecture." },
    { id: 9,  name: "Burger Avenue",      category: "resto",     floor: "RDC",  unit: "Local F01", phone: "+225 07 00 00 00 09", desc: "Burgers artisanaux, frites maison, milkshakes. Sur place & à emporter." },
    { id: 10, name: "Café Lumière",       category: "resto",     floor: "RDC",  unit: "Local F02", phone: "+225 07 00 00 00 10", desc: "Coffee shop, pâtisseries fraîches, brunchs le week-end." },
    { id: 11, name: "Pressing Éclat",     category: "service",   floor: "RDC",  unit: "Local S01", phone: "+225 07 00 00 00 11", desc: "Pressing, blanchisserie, retouches. Service express 4h." },
    { id: 12, name: "Change Horizon",     category: "service",   floor: "RDC",  unit: "Local S02", phone: "+225 07 00 00 00 12", desc: "Bureau de change — FCFA, €, $, £. Taux compétitifs." }
  ],

  // Services du centre (strip animé)
  services: [
    { id: "supermarche", label: "Supermarché",       icon: "🛒", desc: "Produits frais, épicerie, drive disponible." },
    { id: "cinema",      label: "Cinéma",            icon: "🎬", desc: "7 salles, films en VOST & VF, 3D." },
    { id: "pressing",    label: "Pressing",          icon: "👔", desc: "Nettoyage & retouches, service express." },
    { id: "change",      label: "Bureau de change",  icon: "💱", desc: "Devises principales, taux avantageux." },
    { id: "dab",         label: "Distributeurs (DAB)", icon: "🏧", desc: "Retraits & dépôts, toutes banques." },
    { id: "wifi",        label: "Wi-Fi gratuit",     icon: "📶", desc: "Connexion haut débit dans tout le centre." }
  ],

  // Films à l'affiche (admin éditable)
  films: [
    { id: 1, title: "L'Aventure Continue", genre: "Aventure", duration: "128 min", rating: "Tous publics",
      color: "#2F6BFF", showtimes: {
        "Aujourd'hui": ["13:30","16:00","18:45","21:15"],
        "Demain":      ["14:00","16:30","19:00","21:30"],
        "Week-end":    ["12:00","14:45","17:30","20:15","22:00"]
      }},
    { id: 2, title: "Nuit à Abidjan", genre: "Thriller", duration: "112 min", rating: "12 ans",
      color: "#0B2A6F", showtimes: {
        "Aujourd'hui": ["15:15","19:30","22:00"],
        "Demain":      ["15:15","19:30","22:00"],
        "Week-end":    ["13:00","17:00","21:00"]
      }},
    { id: 3, title: "Rires du Sud", genre: "Comédie", duration: "98 min", rating: "Tous publics",
      color: "#FFB020", showtimes: {
        "Aujourd'hui": ["14:00","17:15","20:00"],
        "Demain":      ["14:00","17:15","20:00"],
        "Week-end":    ["11:30","14:00","16:45","19:30"]
      }},
    { id: 4, title: "Héritage Royal", genre: "Drame", duration: "140 min", rating: "10 ans",
      color: "#C9A227", showtimes: {
        "Aujourd'hui": ["18:00","21:00"],
        "Demain":      ["18:00","21:00"],
        "Week-end":    ["15:30","18:30","21:30"]
      }},
    { id: 5, title: "Mission Cosmos", genre: "Science-Fiction", duration: "135 min", rating: "10 ans",
      color: "#7B2FFF", showtimes: {
        "Aujourd'hui": ["16:45","20:30"],
        "Demain":      ["16:45","20:30"],
        "Week-end":    ["14:30","17:45","21:00"]
      }}
  ],

  // Événements & promos (cartes sticky)
  events: [
    { id: 1, title: "Soldes d'Été",        date: "Jusqu'au 31 octobre", discount: "-50%",   tag: "PROMO",
      desc: "Jusqu'à -50% sur plus de 200 articles dans les boutiques de mode.", color: "#2F6BFF" },
    { id: 2, title: "Soirée Ciné & Popcorn", date: "Tous les mercredis", discount: "2 pour 1", tag: "CINÉ",
      desc: "Achetez une place, la deuxième est offerte + popcorn offert.", color: "#0B2A6F" },
    { id: 3, title: "Food Festival",       date: "15-17 novembre",       discount: "Menu spécial", tag: "FOOD",
      desc: "Trois jours de saveurs : chefs invités, ateliers et dégustations.", color: "#FFB020" },
    { id: 4, title: "Black Friday",        date: "29 novembre",          discount: "-70%",   tag: "PROMO",
      desc: "Le plus grand événement shopping de l'année, portes ouvertes à 8h.", color: "#C9A227" }
  ]
};

/* ============================================================
   Couche de données : priorise localStorage (modifs admin),
   sinon données par défaut ci-dessus.
   Pour connecter une vraie BDD : remplacer load()/save() par
   des fetch() vers votre API (voir README.md § Back-office).
   ============================================================ */
const CS_DB = {
  key: "capsud_data_v1",
  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) {
        const merged = JSON.parse(JSON.stringify(CS_DATA));
        const patch = JSON.parse(raw);
        if (patch.stores)  merged.stores  = patch.stores;
        if (patch.events)  merged.events  = patch.events;
        if (patch.films)   merged.films   = patch.films;
        if (patch.hours)   merged.center.hours = patch.hours;
        return merged;
      }
    } catch(e) { console.warn("CS_DB load fallback", e); }
    return JSON.parse(JSON.stringify(CS_DATA));
  },
  save(patch) {
    const cur = this.load();
    const out = {};
    if (patch.stores) { out.stores = patch.stores; cur.stores = patch.stores; }
    if (patch.events) { out.events = patch.events; cur.events = patch.events; }
    if (patch.films)  { out.films  = patch.films;  cur.films  = patch.films; }
    if (patch.hours)  { out.hours  = patch.hours;  cur.center.hours = patch.hours; }
    localStorage.setItem(this.key, JSON.stringify(out));
    return cur;
  },
  reset() { localStorage.removeItem(this.key); }
};

// Instance de données active (utilisée par toutes les pages)
let DATA = CS_DB.load();
