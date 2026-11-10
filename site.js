// Fælles tidsstempler og visning af sider for invitationen.
// Bruges af index.html (indgangen) og af de enkelte sider.
(function () {
  'use strict';

  // Nina blev født 14. november 1996 kl. 08.22 CET = 07.22 UTC
  var BIRTH = Date.UTC(1996, 10, 14, 7, 22, 0);
  // Invitationen åbner 14. november 2026 kl. 08.22 CET = 07.22 UTC (præcis 30 år)
  var REVEAL = Date.UTC(2026, 10, 14, 7, 22, 0);

  var SITE = {
    birth: BIRTH,
    reveal: REVEAL,
    span: REVEAL - BIRTH,
    // Fødselsdagsfesten: 24. november 2026 kl. 16.00 i lokal tid
    party: [2026, 10, 24, 16, 0, 0],

    // Siderne, i rækkefølge. Den side, hvis "from" er nået, er den aktuelle.
    // Vil du have en ny side ind, sæt den ind på listen — resten følger automatisk.
    pages: [
      { file: 'loading.html', from: BIRTH },
      { file: 'invite.html', from: REVEAL }
    ]
  };

  // Den side der passer til tidspunktet
  SITE.current = function () {
    var now = Date.now();
    var chosen = SITE.pages[0];
    for (var i = 0; i < SITE.pages.length; i++) {
      if (now >= SITE.pages[i].from) chosen = SITE.pages[i];
    }
    return chosen;
  };

  // Den side der følger efter den givne
  SITE.next = function (file) {
    var i = SITE.pages.findIndex(function (p) { return p.file === file; });
    return SITE.pages[Math.min(i + 1, SITE.pages.length - 1)];
  };

  window.SITE = SITE;

  // Hvilken side der er vist lige nu
  var shown = null;

  // Hent en side og vis den i #app. URL'en ændrer sig ikke.
  window.showPage = async function (file) {
    if (shown === file) return;
    shown = file;

    var app = document.getElementById('app');
    if (!app) {
      // Siden er blevet åbnet direkte — brug kroppen som beholder
      app = document.createElement('div');
      app.id = 'app';
      document.body.replaceChildren(app);
    }

    try {
      var res = await fetch(file, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      render(new DOMParser().parseFromString(await res.text(), 'text/html'), app);
    } catch (e) {
      renderFallback(file, app);
    }
  };

  // Sæt en hentet side ind i siden
  function render(doc, app) {
    // Titel
    var title = doc.querySelector('[data-title]');
    if (title) document.title = title.getAttribute('data-title') || document.title;

    // Favicon og theme-color
    ['link[rel="icon"]', 'meta[name="theme-color"]'].forEach(function (sel) {
      var old = document.head.querySelector(sel);
      if (old) old.remove();
      var el = doc.querySelector(sel);
      if (el) document.head.appendChild(document.importNode(el, true));
    });

    // Styler fra siden
    Array.prototype.forEach.call(document.head.querySelectorAll('style[data-page]'), function (s) { s.remove(); });
    Array.prototype.forEach.call(doc.querySelectorAll('style'), function (s) {
      var st = document.importNode(s, true);
      st.setAttribute('data-page', '');
      document.head.appendChild(st);
    });

    // Markup
    app.innerHTML = '';
    Array.prototype.forEach.call(doc.body.children, function (el) {
      if (el.tagName === 'SCRIPT') return;
      app.appendChild(document.importNode(el, true));
    });

    // Scripts: importerede scripts kører ikke, så de genoprettes.
    // Scripts med src indlæses ikke igen — fx site.js, som indgangen allerede har.
    Array.prototype.forEach.call(doc.querySelectorAll('script'), function (old) {
      if (old.src) return;
      var s = document.createElement('script');
      Array.prototype.forEach.call(old.attributes, function (a) { s.setAttribute(a.name, a.value); });
      s.textContent = old.textContent;
      app.appendChild(s);
    });
  }

  // Fallback, hvis siden ikke kan hentes (fx når filen åbnes direkte fra disk)
  function renderFallback(file, app) {
    app.innerHTML = '';
    var f = document.createElement('iframe');
    f.src = file;
    f.setAttribute('title', file);
    f.style.cssText = 'width:100%;height:100vh;border:0;display:block';
    app.appendChild(f);
  }
})();
