/* ============================================================
   CAP SUD — Back-office admin
   Auth démo (admin / capsud2026). Édition des enseignes,
   événements, films & horaires. Sauvegarde localStorage.
   Pour une vraie BDD : voir README.md § Back-office.
   ============================================================ */

(function () {
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'capsud2026'; // À remplacer par une auth serveur en production
  const SESSION_KEY = 'capsud_admin_session';

  const loginView = document.getElementById('loginView');
  const adminView = document.getElementById('adminView');
  const toast = document.getElementById('savedToast');

  // Copie de travail (modifiable)
  let draft = JSON.parse(JSON.stringify(DATA));

  /* ---------- Auth ---------- */
  function isAuthed() { return sessionStorage.getItem(SESSION_KEY) === '1'; }
  function showAdmin() { loginView.style.display = 'none'; adminView.style.display = 'block'; renderAll(); }
  if (isAuthed()) showAdmin();

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('adminUser').value.trim();
    const p = document.getElementById('adminPass').value;
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, '1');
      showAdmin();
    } else {
      document.getElementById('loginErr').style.display = 'block';
    }
  });
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  });

  /* ---------- Onglets ---------- */
  const panels = { stores: 'panelStores', events: 'panelEvents', films: 'panelFilms', hours: 'panelHours' };
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.values(panels).forEach(id => document.getElementById(id).style.display = 'none');
      document.getElementById(panels[tab.dataset.tab]).style.display = 'block';
    });
  });

  /* ---------- Helpers ---------- */
  const input = (val, onInput, type = 'text') => {
    const i = document.createElement('input');
    i.type = type; i.value = val ?? '';
    i.addEventListener('input', () => onInput(i.value));
    return i;
  };
  const select = (opts, val, onInput) => {
    const s = document.createElement('select');
    opts.forEach(o => { const op = document.createElement('option'); op.value = o; op.textContent = o; s.appendChild(op); });
    s.value = val; s.addEventListener('change', () => onInput(s.value));
    return s;
  };
  const delBtn = (onClick) => {
    const b = document.createElement('button');
    b.className = 'del'; b.textContent = '🗑️'; b.title = 'Supprimer';
    b.addEventListener('click', onClick);
    return b;
  };
  function row(children) {
    const r = document.createElement('div');
    r.className = 'admin-row';
    children.forEach(c => r.appendChild(c));
    return r;
  }

  /* ---------- Enseignes ---------- */
  function renderStores() {
    const wrap = document.getElementById('storesRows');
    wrap.innerHTML = '';
    const cats = DATA.categories.map(c => c.id);
    draft.stores.forEach((s, idx) => {
      wrap.appendChild(row([
        input(s.name, v => draft.stores[idx].name = v),
        select(cats, s.category, v => draft.stores[idx].category = v),
        input(s.floor, v => draft.stores[idx].floor = v),
        delBtn(() => { draft.stores.splice(idx, 1); renderStores(); })
      ]));
    });
  }
  document.getElementById('addStore').addEventListener('click', () => {
    const id = Math.max(0, ...draft.stores.map(s => s.id)) + 1;
    draft.stores.push({ id, name: 'Nouvelle boutique', category: 'mode', floor: 'RDC', unit: 'Boutique XX', phone: '', desc: 'Description à compléter.' });
    renderStores();
  });

  /* ---------- Événements ---------- */
  function renderEvents() {
    const wrap = document.getElementById('eventsRows');
    wrap.innerHTML = '';
    draft.events.forEach((e, idx) => {
      const r = document.createElement('div');
      r.className = 'admin-row'; r.style.gridTemplateColumns = '2fr 1fr 1fr auto';
      r.appendChild(input(e.title, v => draft.events[idx].title = v));
      r.appendChild(input(e.date, v => draft.events[idx].date = v));
      r.appendChild(input(e.discount, v => draft.events[idx].discount = v));
      r.appendChild(delBtn(() => { draft.events.splice(idx, 1); renderEvents(); }));
      wrap.appendChild(r);
    });
  }
  document.getElementById('addEvent').addEventListener('click', () => {
    draft.events.push({ id: Date.now(), title: 'Nouvel événement', date: 'À définir', discount: '-XX%', tag: 'PROMO', desc: 'Description.', color: '#2F6BFF' });
    renderEvents();
  });

  /* ---------- Films ---------- */
  function renderFilms() {
    const wrap = document.getElementById('filmsRows');
    wrap.innerHTML = '';
    draft.films.forEach((f, idx) => {
      const r = document.createElement('div');
      r.className = 'admin-row'; r.style.gridTemplateColumns = '2fr 1fr 2fr auto';
      r.appendChild(input(f.title, v => draft.films[idx].title = v));
      r.appendChild(input(f.genre, v => draft.films[idx].genre = v));
      const times = input(Object.values(f.showtimes)[0].join(', '), v => {
        const arr = v.split(',').map(s => s.trim()).filter(Boolean);
        Object.keys(draft.films[idx].showtimes).forEach(k => draft.films[idx].showtimes[k] = arr);
      });
      times.placeholder = '13:30, 16:00, 19:00';
      r.appendChild(times);
      r.appendChild(delBtn(() => { draft.films.splice(idx, 1); renderFilms(); }));
      wrap.appendChild(r);
    });
  }
  document.getElementById('addFilm').addEventListener('click', () => {
    draft.films.push({ id: Date.now(), title: 'Nouveau film', genre: 'À définir', duration: '120 min', rating: 'Tous publics', color: '#2F6BFF',
      showtimes: { "Aujourd'hui": ["14:00","19:00"], "Demain": ["14:00","19:00"], "Week-end": ["14:00","19:00"] } });
    renderFilms();
  });

  /* ---------- Horaires ---------- */
  function renderHours() {
    const wrap = document.getElementById('hoursRows');
    wrap.innerHTML = '';
    draft.center.hours.forEach((h, idx) => {
      const r = document.createElement('div');
      r.className = 'admin-row'; r.style.gridTemplateColumns = '1fr 1fr 1fr';
      r.appendChild(input(h.label, v => draft.center.hours[idx].label = v));
      r.appendChild(input(h.open, v => draft.center.hours[idx].open = v));
      r.appendChild(input(h.close, v => draft.center.hours[idx].close = v));
      wrap.appendChild(r);
    });
  }

  function renderAll() { renderStores(); renderEvents(); renderFilms(); renderHours(); }

  /* ---------- Sauvegarde ---------- */
  document.getElementById('saveBtn').addEventListener('click', () => {
    DATA = CS_DB.save({
      stores: draft.stores,
      events: draft.events,
      films: draft.films,
      hours: draft.center.hours
    });
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Réinitialiser toutes les données aux valeurs par défaut ?')) {
      CS_DB.reset();
      location.reload();
    }
  });
})();
