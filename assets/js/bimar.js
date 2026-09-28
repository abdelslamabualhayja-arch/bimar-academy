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

function initBimar() {
  loadBimarLanguage();
  initBimarNavbarScroll();
  initBimarMobileMenu();
  initBimarFooter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBimar);
} else {
  initBimar();
}
