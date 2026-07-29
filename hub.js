/* gamestheory.org hub — language toggle, nothing else. */
"use strict";

(function () {
  const STR = {
    en: {
      tagline: "Tiny games. Big decisions.",
      sub: "Free browser experiments about choices, crowds and markets. No accounts, no ads, no tracking — just play.",
      tb_desc:
        "One choice, two buttons, live results from the whole planet. A social experiment straight out of game theory.",
      candle_desc:
        "A daily market-reading puzzle. Call the next candle, read real indicators, keep your streak.",
      wt_desc:
        "Draw a 2D shape and watch real airflow bend around it — streamlines, wake and vortices. Fluid dynamics you can doodle.",
      play: "Play",
      aria_games: "Games",
      aria_lang: "Language",
      footer_gh: "Open source on GitHub",
      aria_privacy: "Privacy notice",
      privacy_link: "Privacy",
      privacy_title: "Privacy & legal",
      privacy_clear: "Clear local data",
      privacy_cleared: "Local data cleared.",
      pb_text: "This site collects no personal data and uses no tracking. Local storage only remembers your chosen language — on your device.",
      pb_more: "Details",
      pb_ok: "Got it",
      privacy_body: "<p><strong>Games Theory is a free, non-commercial collection of browser games.</strong> No accounts, no forms, no sign-in, no payments.</p><ul><li><strong>No personal data.</strong> The site does not collect, store or share any personal data. No advertising, no analytics (e.g. Google Analytics), no tracking cookies, no third parties.</li><li><strong>Local storage.</strong> This page stores only your chosen language in your browser. It stays on your device and is never sent anywhere. Each game likewise keeps only its own settings and progress locally. You can remove it anytime with the button below.</li><li><strong>Hosting.</strong> The site runs on Cloudflare Pages. Like any web host, Cloudflare processes technical connection data (e.g. your IP address) to deliver the page and protect against attacks — see the <a href='https://www.cloudflare.com/privacypolicy/' target='_blank' rel='noopener noreferrer'>Cloudflare privacy policy</a>.</li><li><strong>Your rights (GDPR / RODO).</strong> Because this site collects no personal data, there is nothing on our side to access, correct or delete. You keep your rights under the GDPR and may lodge a complaint with the Polish Data Protection Authority (<a href='https://uodo.gov.pl/' target='_blank' rel='noopener noreferrer'>PUODO</a>).</li><li><strong>Why there is no consent prompt.</strong> The local storage above is strictly necessary to provide the feature you asked for, so under the ePrivacy rules it needs no consent — this notice is for your information.</li></ul>",
    },
    pl: {
      tagline: "Małe gry. Wielkie decyzje.",
      sub: "Darmowe przeglądarkowe eksperymenty o wyborach, tłumie i rynkach. Bez kont, reklam i śledzenia — po prostu graj.",
      tb_desc:
        "Jeden wybór, dwa przyciski i wyniki na żywo z całej planety. Eksperyment społeczny rodem z teorii gier.",
      candle_desc:
        "Codzienna łamigłówka czytania wykresów. Wytypuj następną świecę, czytaj prawdziwe wskaźniki, buduj serię.",
      wt_desc:
        "Narysuj kształt 2D i patrz, jak realne powietrze zakrzywia się wokół niego — strugi, ślad i wiry. Dynamika płynów, którą można bazgrać.",
      play: "Graj",
      aria_games: "Gry",
      aria_lang: "Język",
      footer_gh: "Kod źródłowy na GitHubie",
      aria_privacy: "Informacja o prywatności",
      privacy_link: "Prywatność",
      privacy_title: "Prywatność",
      privacy_clear: "Wyczyść dane lokalne",
      privacy_cleared: "Dane lokalne usunięte.",
      pb_text: "Ten serwis nie zbiera danych osobowych i nie używa śledzenia. Pamięć lokalna zapamiętuje tylko wybrany język — na Twoim urządzeniu.",
      pb_more: "Szczegóły",
      pb_ok: "Rozumiem",
      privacy_body: "<p><strong>Games Theory to darmowy, niekomercyjny zbiór gier przeglądarkowych.</strong> Bez kont, formularzy, logowania i płatności.</p><ul><li><strong>Brak danych osobowych.</strong> Serwis nie zbiera, nie przechowuje ani nie udostępnia żadnych danych osobowych. Bez reklam, bez analityki (np. Google Analytics), bez śledzących plików cookie, bez podmiotów trzecich.</li><li><strong>Pamięć lokalna.</strong> Ta strona zapisuje w przeglądarce jedynie wybrany język. Zostaje on na Twoim urządzeniu i nie jest nigdzie wysyłany. Każda gra również trzyma tylko własne ustawienia i postęp lokalnie. Możesz je usunąć przyciskiem poniżej.</li><li><strong>Hosting.</strong> Serwis działa na Cloudflare Pages. Jak każdy host, Cloudflare przetwarza techniczne dane połączenia (np. adres IP) w celu dostarczenia strony i ochrony przed atakami — zob. <a href='https://www.cloudflare.com/privacypolicy/' target='_blank' rel='noopener noreferrer'>politykę prywatności Cloudflare</a>.</li><li><strong>Twoje prawa (RODO).</strong> Ponieważ serwis nie zbiera danych osobowych, po naszej stronie nie ma czego udostępniać, poprawiać ani usuwać. Zachowujesz prawa wynikające z RODO i możesz wnieść skargę do <a href='https://uodo.gov.pl/' target='_blank' rel='noopener noreferrer'>PUODO</a>.</li><li><strong>Dlaczego nie ma pytania o zgodę.</strong> Powyższa pamięć lokalna jest niezbędna do świadczenia funkcji, o którą prosisz, więc zgodnie z przepisami ePrivacy nie wymaga zgody — ta informacja ma charakter informacyjny.</li></ul>",
    },
  };

  const KEY = "gt.hub.lang";

  function getLang() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "pl" || saved === "en") return saved;
    } catch {
      /* private mode — fall through */
    }
    return (navigator.language || "").toLowerCase().startsWith("pl") ? "pl" : "en";
  }

  let lang = getLang();

  function apply() {
    document.documentElement.lang = lang;
    const btn = document.getElementById("btn-lang");
    if (btn) btn.textContent = lang.toUpperCase();
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const s = STR[lang][el.dataset.i18n];
      if (s == null) return;
      if (s.indexOf("<") >= 0) el.innerHTML = s; else el.textContent = s;  // notice text carries markup
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const s = STR[lang][el.dataset.i18nAria];
      if (s != null) el.setAttribute("aria-label", s);
    });
  }

  function init() {
    apply();
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
    const btn = document.getElementById("btn-lang");
    if (btn)
      btn.addEventListener("click", () => {
        lang = lang === "pl" ? "en" : "pl";
        try {
          localStorage.setItem(KEY, lang);
        } catch {
          /* ignore */
        }
        apply();
      });

    // privacy & legal notice (informational — functional storage needs no consent)
    const pm = document.getElementById("modal-privacy");
    const openPrivacy = () => { if (pm && typeof pm.showModal === "function") pm.showModal(); };
    const pfoot = document.getElementById("btn-privacy");
    if (pfoot) pfoot.addEventListener("click", openPrivacy);
    const pmore = document.getElementById("pb-more");
    if (pmore) pmore.addEventListener("click", openPrivacy);
    const pok = document.getElementById("pb-ok");
    if (pok) pok.addEventListener("click", () => {
      const b = document.getElementById("privacy-banner");
      if (b) b.hidden = true;
      try { localStorage.setItem("gt.hub.privacyAck", "1"); } catch { /* ignore */ }
    });
    const pclr = document.getElementById("privacy-clear");
    if (pclr) pclr.addEventListener("click", () => {
      try { localStorage.clear(); } catch { /* ignore */ }
      const c = document.getElementById("privacy-cleared");
      if (c) c.hidden = false;
    });
    try {
      if (!localStorage.getItem("gt.hub.privacyAck")) {
        const b = document.getElementById("privacy-banner");
        if (b) b.hidden = false;
      }
    } catch { /* ignore */ }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
