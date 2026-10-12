/* ============================================================
   CAP SUD — JS partagé (toutes les pages)
   Préchargeur, nav sticky, reveal au scroll, compteurs animés,
   badge "Ouvert maintenant", injection header/footer.
   ============================================================ */

(function () {
  const D = window.DATA || CS_DATA;

  /* ---------- Header / Footer injectés (évite la duplication) ---------- */
  function injectChrome() {
    const headerHTML = `
      <nav class="nav" id="nav">
        <div class="container nav-inner">
          <a href="index.html" class="logo">
            <span class="logo-bag">🛍️</span> CAP SUD
          </a>
          <ul class="nav-links" id="navLinks">
            <li><a href="index.html" data-page="index">Accueil</a></li>
            <li><a href="enseignes.html" data-page="enseignes">Enseignes</a></li>
            <li><a href="cinema.html" data-page="cinema">Cinéma</a></li>
            <li><a href="services.html" data-page="services">Services</a></li>
            <li><a href="evenements.html" data-page="evenements">Événements</a></li>
            <li><a href="acces.html" data-page="acces">Accès</a></li>
            <li><a href="contact.html" data-page="contact">Contact</a></li>
          </ul>
          <div class="nav-cta">
            <a href="tel:${D.center.phone.replace(/\s/g,'')}" class="nav-phone">📞 ${D.center.phone}</a>
            <a href="contact.html" class="btn btn-primary" style="padding:10px 20px;font-size:13px;">Nous trouver</a>
            <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
          </div>
        </div>
      </nav>`;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    const footerHTML = `
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="logo" style="margin-bottom:16px;"><span class="logo-bag">🛍️</span> CAP SUD</a>
              <p style="font-size:14px;max-width:320px;margin-top:14px;">${D.center.tagline}</p>
              <div class="social-row">
                <a href="${D.center.instagram}" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Facebook">👍</a>
                <a href="tel:${D.center.phone.replace(/\s/g,'')}" aria-label="Téléphone">📞</a>
              </div>
            </div>
            <div>
              <h4>Explorer</h4>
              <ul>
                <li><a href="enseignes.html">Nos enseignes</a></li>
                <li><a href="cinema.html">Cinéma & horaires</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="evenements.html">Événements & promos</a></li>
              </ul>
            </div>
            <div>
              <h4>Informations</h4>
              <ul>
                <li><a href="acces.html">Accès & horaires</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="admin.html">Espace admin</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>📍 ${D.center.address}</li>
                <li>📞 ${D.center.phone}</li>
                <li>📷 ${D.center.instagramHandle}</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} CAP SUD — Centre commercial Marcory, Abidjan. Tous droits réservés.</span>
            <span>Conçu avec ❤️ à Abidjan 🇨🇮</span>
          </div>
        </div>
      </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Active link
    const page = document.body.dataset.page || 'index';
    document.querySelectorAll(`.nav-links a[data-page="${page}"]`).forEach(a => a.classList.add('active'));

    // Burger
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  /* ---------- Nav sticky ---------- */
  function initNav() {
    const nav = document.getElementById('nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  /* ---------- Préchargeur (révélation par clip-path circulaire) ---------- */
  function initPreloader() {
    const pre = document.getElementById('preloader');
    if (!pre) return;
    // Si déjà vu dans la session, on réduit le délai
    const seen = sessionStorage.getItem('capsud_preloaded');
    const delay = seen ? 300 : 1400;
    setTimeout(() => {
      pre.classList.add('done');
      sessionStorage.setItem('capsud_preloaded', '1');
      setTimeout(() => pre.remove(), 1100);
    }, delay);
  }

  /* ---------- Reveal au scroll (IntersectionObserver) ---------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Compteurs animés ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1800; const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (target >= 1000 ? Math.round(val).toLocaleString('fr-FR') : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- Badge "Ouvert maintenant" ---------- */
  window.CS_isOpenNow = function () {
    const now = new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const h = D.center.hours.find(x => x.day === day);
    if (!h) return { open:false, label:"Fermé le dimanche ?", today:null };
    const [oh, om] = h.open.split(':').map(Number);
    const [ch, cm] = h.close.split(':').map(Number);
    const openMin = oh*60+om, closeMin = ch*60+cm;
    return { open: mins >= openMin && mins < closeMin, today: h, close: h.close };
  };
  function initOpenBadge() {
    const badge = document.getElementById('openBadge');
    if (!badge) return;
    const st = CS_isOpenNow();
    badge.classList.add(st.open ? 'open' : 'closed');
    badge.innerHTML = `<span class="pulse"></span> ${st.open ? 'OUVERT MAINTENANT' : 'FERMÉ'}` +
      (st.today ? ` · jusqu'à ${st.today.close}` : '');
    // highlight today in hours list
    document.querySelectorAll('.hours-list li[data-day]').forEach(li => {
      if (Number(li.dataset.day) === new Date().getDay()) li.classList.add('today');
    });
  }

  /* ---------- Parallaxe léger sur les .parallax ---------- */
  function initParallax() {
    const els = document.querySelectorAll('.parallax');
    if (!els.length) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      els.forEach(el => {
        const speed = parseFloat(el.dataset.speed || 0.15);
        el.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive:true });
  }

  /* ---------- Démarrage ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    injectChrome();
    initNav();
    initPreloader();
    initReveal();
    initCounters();
    initOpenBadge();
    initParallax();
  });
})();
