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
      play: "Play",
      soon_title: "Something's brewing",
      soon_desc: "The next experiment is loading…",
      footer_gh: "Open source on GitHub",
    },
    pl: {
      tagline: "Małe gry. Wielkie decyzje.",
      sub: "Darmowe przeglądarkowe eksperymenty o wyborach, tłumie i rynkach. Bez kont, reklam i śledzenia — po prostu graj.",
      tb_desc:
        "Jeden wybór, dwa przyciski i wyniki na żywo z całej planety. Eksperyment społeczny rodem z teorii gier.",
      candle_desc:
        "Codzienna łamigłówka czytania wykresów. Wytypuj następną świecę, czytaj prawdziwe wskaźniki, buduj serię.",
      play: "Graj",
      soon_title: "Coś się szykuje",
      soon_desc: "Następny eksperyment się ładuje…",
      footer_gh: "Kod źródłowy na GitHubie",
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
      if (s != null) el.textContent = s;
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
