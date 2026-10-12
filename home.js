/* ============================================================
   CAP SUD — Animations de la page d'accueil
   Hero scrub (sac 3D qui atterrit), panneau horaires cinéma,
   fenêtres lumineuses de la façade finale.
   ============================================================ */

(function () {
  const D = window.DATA || CS_DATA;

  /* ---------- Hero : sac 3D qui "atterrit" au scroll (scrub) ---------- */
  function initHeroScrub() {
    const bag = document.querySelector('.bag-3d');
    const hero = document.querySelector('.hero');
    if (!bag || !hero) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const p = Math.min(y / 600, 1); // progression 0→1 sur 600px
      // Le sac descend et pivote, puis s'éloigne (zoom intérieur)
      const ty = p * 120;          // descend
      const scale = 1 + p * 0.6;   // grossit = on "entre" dans le centre
      const rotY = -22 + p * 40;
      const rotX = -12 + p * 10;
      const opacity = 1 - p * 0.4;
      bag.style.animation = 'none';
      bag.style.transform = `translate(-50%, calc(-50% + ${ty}px)) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      bag.style.opacity = opacity;
      // léger fondu du texte du hero
      const hc = document.querySelector('.hero-content > div:first-child');
      if (hc) hc.style.opacity = 1 - p * 0.7;
    }, { passive:true });
  }

  /* ---------- Panneau horaires cinéma (accueil) ---------- */
  function initShowtimes() {
    const panel = document.getElementById('showtimesPanel');
    if (!panel) return;
    const film = D.films[0]; // film principal sur l'accueil
    const days = Object.keys(film.showtimes);
    const tabsWrap = panel.querySelector('.day-tabs');
    const grid = panel.querySelector('.slot-grid');
    days.forEach((d, i) => {
      const t = document.createElement('button');
      t.className = 'day-tab' + (i === 0 ? ' active' : '');
      t.textContent = d;
      t.addEventListener('click', () => {
        tabsWrap.querySelectorAll('.day-tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        renderSlots(film.showtimes[d]);
      });
      tabsWrap.appendChild(t);
    });
    function renderSlots(times) {
      grid.innerHTML = '';
      times.forEach(tm => {
        const s = document.createElement('div');
        s.className = 'slot';
        s.innerHTML = `${tm}<small>${film.duration} · ${film.rating}</small>`;
        grid.appendChild(s);
      });
    }
    renderSlots(film.showtimes[days[0]]);
  }

  /* ---------- Carrousel affiches cinéma (parallaxe horizontal) ---------- */
  function initPosters() {
    const track = document.getElementById('posterTrack');
    if (!track) return;
    D.films.forEach(f => {
      const p = document.createElement('div');
      p.className = 'poster';
      p.style.background = `linear-gradient(160deg, ${f.color}, #061a4a)`;
      p.innerHTML = `
        <span class="badge">${f.genre}</span>
        <div style="font-size:70px;margin-bottom:14px;">🎬</div>
        <h4>${f.title}</h4>
        <div class="meta"><span>${f.duration}</span><span>·</span><span>${f.rating}</span></div>`;
      track.appendChild(p);
    });
    // défilement auto lent
    let dir = 1;
    setInterval(() => {
      if (track.matches(':hover')) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 5) dir = -1;
      if (track.scrollLeft <= 5) dir = 1;
      track.scrollBy({ left: dir * 1.2, behavior: 'auto' });
    }, 40);
  }

  /* ---------- Façade finale : fenêtres lumineuses aléatoires ---------- */
  function initFacadeWindows() {
    const wrap = document.getElementById('facadeWindows');
    if (!wrap) return;
    for (let i = 0; i < 40; i++) {
      const w = document.createElement('div');
      w.className = 'window';
      w.style.left = (3 + Math.random() * 94) + '%';
      w.style.bottom = (20 + Math.random() * 80) + 'px';
      w.style.animationDelay = (Math.random() * 4) + 's';
      if (Math.random() > 0.5) { w.style.background = '#6B94FF'; w.style.boxShadow = '0 0 12px #6B94FF'; }
      wrap.appendChild(w);
    }
  }

  /* ---------- Chips restauration ---------- */
  function initFoodChips() {
    document.querySelectorAll('.food-section .chip').forEach(c => {
      c.addEventListener('click', () => {
        document.querySelectorAll('.food-section .chip').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroScrub();
    initShowtimes();
    initPosters();
    initFacadeWindows();
    initFoodChips();
  });
})();
