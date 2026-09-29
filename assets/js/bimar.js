/* =========================================================
   BIMAR ACADEMY — SHARED JAVASCRIPT
   ========================================================= */

function setBimarLanguage(language) {
  if (language !== "en" && language !== "ar") language = "en";

  const isArabic = language === "ar";

  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  document.querySelectorAll("[data-en]").forEach(function (element) {
    const value = element.getAttribute("data-" + language);
    if (value !== null) element.textContent = value;
  });

  document.querySelectorAll("[data-aria-en][data-aria-ar]").forEach(function (element) {
    const value = element.getAttribute(isArabic ? "data-aria-ar" : "data-aria-en");
    if (value) element.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-dir-en][data-dir-ar]").forEach(function (element) {
    const direction = element.getAttribute(isArabic ? "data-dir-ar" : "data-dir-en");
    if (direction) element.dir = direction;
  });

  document.querySelectorAll("[data-directional]").forEach(function (element) {
    element.setAttribute("aria-hidden", element.getAttribute("aria-hidden") || "true");
  });

  const enButton = document.getElementById("bimarEnBtn");
  const arButton = document.getElementById("bimarArBtn");

  if (enButton && arButton) {
    enButton.classList.toggle("active", !isArabic);
    arButton.classList.toggle("active", isArabic);
    enButton.setAttribute("aria-pressed", String(!isArabic));
    arButton.setAttribute("aria-pressed", String(isArabic));
  }

  localStorage.setItem("bimarLanguage", language);
}

function loadBimarLanguage() {
  setBimarLanguage(localStorage.getItem("bimarLanguage") || "en");
}

function initBimarNavbarScroll() {
  const navbar = document.querySelector(".bimar-navbar");
  if (!navbar) return;

  function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

function initBimarMobileMenu() {
  const menuButton = document.getElementById("bimarMenuBtn");
  const navLinks = document.querySelector(".bimar-nav-links");

  if (!menuButton || !navLinks) return;

  menuButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 850) {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}


function initBimarFooter() {
  if (document.querySelector(".bimar-footer")) return;

  const footer = document.createElement("footer");
  footer.className = "bimar-footer";
  footer.innerHTML = `
    <div class="bimar-footer-inner">
      <div>
        <div class="bimar-footer-brand">BIMAR ACADEMY</div>
        <div class="bimar-body-sm bimar-muted"
             data-en="Medical education, built for medical students."
             data-ar="تعليم طبي صُمم لطلاب الطب.">
          Medical education, built for medical students.
        </div>
      </div>

      <nav class="bimar-footer-links" aria-label="Footer navigation">
        <a href="index.html" data-en="Home" data-ar="الرئيسية">Home</a>
        <a href="subjects.html" data-en="Subjects" data-ar="المواد">Subjects</a>
        <a href="questions.html" data-en="Question Bank" data-ar="بنك الأسئلة">Question Bank</a>
        <a href="clinical.html" data-en="Clinical" data-ar="السريري">Clinical</a>
        <a href="osce.html" data-en="OSCE" data-ar="الأوسكي">OSCE</a>
      </nav>
    </div>
  `;

  document.body.appendChild(footer);
}

/* =========================================================
   BIMAR ACADEMY — SHARED JAVASCRIPT
   Global utilities only.
   Page-specific logic belongs in a page-specific JS file.
   ========================================================= */









function initBimarTheme() {
  const savedTheme = localStorage.getItem("bimarTheme");
  const theme = savedTheme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      const nextTheme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";

      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("bimarTheme", nextTheme);
      document.dispatchEvent(new CustomEvent("bimar:themechange", {
        detail: { theme: nextTheme }
      }));
    });
  });
}

function openBimarModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.hidden = false;
  modal.classList.add("open");
  document.body.classList.add("bimar-modal-open");

  const focusTarget = modal.querySelector("[autofocus], button, input, select, textarea, a");
  if (focusTarget) focusTarget.focus();
}

function closeBimarModal(modal) {
  if (!modal) return;

  modal.hidden = true;
  modal.classList.remove("open");

  if (!document.querySelector(".bimar-modal.open")) {
    document.body.classList.remove("bimar-modal-open");
  }
}

function initBimarModals() {
  document.querySelectorAll("[data-modal-open]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openBimarModal(trigger.getAttribute("data-modal-open"));
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      closeBimarModal(trigger.closest(".bimar-modal"));
    });
  });

  document.querySelectorAll(".bimar-modal").forEach(function (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal && modal.dataset.modalBackdrop !== "false") {
        closeBimarModal(modal);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.querySelectorAll(".bimar-modal.open").forEach(closeBimarModal);
    }
  });
}

function initBimarTabs() {
  document.querySelectorAll("[data-bimar-tabs]").forEach(function (group) {
    const tabs = group.querySelectorAll("[data-tab]");
    const panels = group.querySelectorAll("[data-tab-panel]");

    function activateTab(name) {
      tabs.forEach(function (tab) {
        const active = tab.getAttribute("data-tab") === name;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
      });

      panels.forEach(function (panel) {
        const active = panel.getAttribute("data-tab-panel") === name;
        panel.hidden = !active;
        panel.classList.toggle("active", active);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab.getAttribute("data-tab"));
      });
    });

    const initial =
      group.querySelector("[data-tab].active") ||
      group.querySelector("[data-tab]");

    if (initial) activateTab(initial.getAttribute("data-tab"));
  });
}

function initBimarDropdowns() {
  document.querySelectorAll("[data-bimar-dropdown]").forEach(function (dropdown) {
    const trigger = dropdown.querySelector("[data-dropdown-trigger]");
    if (!trigger) return;

    trigger.addEventListener("click", function () {
      const open = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", function (event) {
    document.querySelectorAll("[data-bimar-dropdown].open").forEach(function (dropdown) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        const trigger = dropdown.querySelector("[data-dropdown-trigger]");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function bimarToast(message, type) {
  if (!message) return;

  let container = document.querySelector(".bimar-toast-container");

  if (!container) {
    container = document.createElement("div");
    container.className = "bimar-toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "bimar-toast" + (type ? " bimar-toast-" + type : "");
  toast.textContent = message;
  container.appendChild(toast);

  window.setTimeout(function () {
    toast.classList.add("is-leaving");
    window.setTimeout(function () {
      toast.remove();
      if (!container.children.length) container.remove();
    }, 250);
  }, 3000);
}

/* =========================================================
   🔎 SHARED SEARCH ARCHITECTURE
   Global search behavior only.
   Content/data indexing will live outside this file.
   ========================================================= */

function bimarNormalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .trim();
}

function bimarSearchItems(query, items) {
  const normalizedQuery = bimarNormalizeSearchText(query);
  const terms = normalizedQuery.split(/\\s+/).filter(Boolean);

  return Array.from(items).filter(function (item) {
    const text = bimarNormalizeSearchText(
      item.getAttribute("data-search-text") || item.textContent
    );

    return !terms.length || terms.every(function (term) {
      return text.includes(term);
    });
  });
}

function initBimarSearch() {
  document.querySelectorAll("[data-bimar-search]").forEach(function (input) {
    const selector = input.getAttribute("data-target");
    if (!selector) return;

    const target = document.querySelector(selector);
    if (!target) return;

    const items = target.querySelectorAll("[data-search-text]");
    const countTarget = input.getAttribute("data-search-count")
      ? document.querySelector(input.getAttribute("data-search-count"))
      : null;

    function render() {
      const matches = bimarSearchItems(input.value, items);

      items.forEach(function (item) {
        item.hidden = !matches.includes(item);
      });

      if (countTarget) {
        countTarget.textContent = String(matches.length);
      }
    }

    input.addEventListener("input", render);
    render();
  });
}

/*
  Future global search contract:

  Each searchable record should expose:
  data-search-type="lesson|question|clinical|osce"
  data-search-title="..."
  data-search-text="..."
  data-search-url="..."

  Example:
  <article
    data-search-type="lesson"
    data-search-title="Heart Failure"
    data-search-text="Heart Failure Cardiology">
  </article>

  The future search index/API can return:
  Lessons
  Questions
  Clinical Cases
  OSCE

  bimar.js stays responsible for search behavior/UI,
  while page/data files stay responsible for their own content.
*/

function initBimarProgress() {
  document.querySelectorAll("[data-bimar-progress]").forEach(function (bar) {
    const value = Math.max(0, Math.min(100, Number(bar.getAttribute("data-bimar-progress")) || 0));
    bar.style.setProperty("--bimar-progress", value + "%");
    bar.setAttribute("aria-valuenow", String(value));
  });
}




function initBimarLanguageButtons() {
  const enButton = document.getElementById("bimarEnBtn");
  const arButton = document.getElementById("bimarArBtn");

  if (!enButton || !arButton) return;

  enButton.addEventListener("click", function (event) {
    event.preventDefault();
    setBimarLanguage("en");
  });

  arButton.addEventListener("click", function (event) {
    event.preventDefault();
    setBimarLanguage("ar");
  });
}

function initBimar() {
  initBimarFooter();
  initBimarLanguageButtons();
  loadBimarLanguage();
  initBimarNavbarScroll();
  initBimarMobileMenu();
  initBimarTheme();
  initBimarModals();
  initBimarTabs();
  initBimarDropdowns();
  initBimarSearch();
  initBimarProgress();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBimar);
} else {
  initBimar();
}
