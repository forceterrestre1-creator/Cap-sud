/* ============================================================
   CAP SUD — Page Enseignes : recherche live, filtres par catégorie,
   tiroir (drawer) de détail d'une boutique.
   ============================================================ */

(function () {
  const D = window.DATA || CS_DATA;
  const catIcon = (id) => (D.categories.find(c => c.id === id) || { icon: '🏪' }).icon;
  const catLabel = (id) => (D.categories.find(c => c.id === id) || { label: id }).label;

  const grid = document.getElementById('storesGrid');
  const search = document.getElementById('searchInput');
  const chipsWrap = document.getElementById('catChips');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const drawerContent = document.getElementById('drawerContent');
  let activeCat = 'all';

  // Chips de catégories
  chipsWrap.innerHTML = `<button class="cat-chip active" data-cat="all">✨ Toutes</button>` +
    D.categories.map(c => `<button class="cat-chip" data-cat="${c.id}">${c.icon} ${c.label}</button>`).join('');
  chipsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-chip');
    if (!btn) return;
    chipsWrap.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    render();
  });

  function filtered() {
    const q = (search.value || '').trim().toLowerCase();
    return D.stores.filter(s => {
      const matchCat = activeCat === 'all' || s.category === activeCat;
      const matchQ = !q || [s.name, s.desc, s.floor, s.unit, catLabel(s.category)].join(' ').toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }

  function render() {
    const list = filtered();
    if (!list.length) {
      grid.innerHTML = `<div class="no-result">😕 Aucune boutique ne correspond à votre recherche.<br><small>Essayez un autre mot-clé ou catégorie.</small></div>`;
      return;
    }
    grid.innerHTML = list.map(s => `
      <div class="store-card" data-id="${s.id}">
        <span class="store-floor">${s.floor}</span>
        <div class="store-icon">${catIcon(s.category)}</div>
        <h4>${s.name}</h4>
        <div class="store-meta">${catLabel(s.category)} · ${s.unit}</div>
      </div>`).join('');
    grid.querySelectorAll('.store-card').forEach(card => {
      card.addEventListener('click', () => openDrawer(Number(card.dataset.id)));
    });
  }

  function openDrawer(id) {
    const s = D.stores.find(x => x.id === id);
    if (!s) return;
    drawerContent.innerHTML = `
      <div class="store-icon" style="background:linear-gradient(135deg,#EEF3FF,#DCE6FF);">${catIcon(s.category)}</div>
      <span class="cat-label">${catIcon(s.category)} ${catLabel(s.category)}</span>
      <h2>${s.name}</h2>
      <p>${s.desc}</p>
      <div class="drawer-info">
        <div class="row"><span class="ic">📍</span><span><strong>Localisation :</strong> ${s.floor} — ${s.unit}</span></div>
        <div class="row"><span class="ic">📞</span><span><strong>Téléphone :</strong> <a href="tel:${s.phone.replace(/\s/g,'')}" style="color:var(--blue);">${s.phone}</a></span></div>
        <div class="row"><span class="ic">🕐</span><span><strong>Horaires :</strong> identiques au centre (09h00 – 21h30)</span></div>
      </div>
      <a href="tel:${s.phone.replace(/\s/g,'')}" class="btn btn-primary" style="width:100%;justify-content:center;">📞 Appeler la boutique</a>
      <a href="acces.html" class="btn btn-dark" style="width:100%;justify-content:center;margin-top:12px;">📍 Venir au centre</a>`;
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  search.addEventListener('input', render);
  render();
})();
