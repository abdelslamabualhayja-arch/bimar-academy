/* =========================================================
   BIMAR ACADEMY — SHARED JAVASCRIPT
   ========================================================= */

function setBimarLanguage(language) {
  if (language !== "en" && language !== "ar") language = "en";

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en]").forEach(function (element) {
    const value = element.getAttribute("data-" + language);
    if (value !== null) element.textContent = value;
  });

  const enButton = document.getElementById("bimarEnBtn");
  const arButton = document.getElementById("bimarArBtn");

  if (enButton && arButton) {
    enButton.classList.remove("active");
    arButton.classList.remove("active");
    (language === "en" ? enButton : arButton).classList.add("active");
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

function initBimar() {
  loadBimarLanguage();
  initBimarNavbarScroll();
  initBimarMobileMenu();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBimar);
} else {
  initBimar();
}
