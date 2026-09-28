/* =========================================================
   BIMAR ACADEMY — SHARED JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. LANGUAGE SYSTEM
   ========================================================= */

function setBimarLanguage(language) {

  if (language !== "en" && language !== "ar") {
    language = "en";
  }

  /* Set document language */
  document.documentElement.lang = language;

  /* Set text direction */
  document.documentElement.dir =
    language === "ar" ? "rtl" : "ltr";


  /* Change all bilingual elements */
  document
    .querySelectorAll("[data-en]")
    .forEach(function (element) {

      const value =
        element.getAttribute("data-" + language);

      if (value !== null) {
        element.textContent = value;
      }

    });


  /* Update language buttons */
  const enButton =
    document.getElementById("bimarEnBtn");

  const arButton =
    document.getElementById("bimarArBtn");


  if (enButton) {
    enButton.classList.toggle(
      "active",
      language === "en"
    );
  }

  if (arButton) {
    arButton.classList.toggle(
      "active",
      language === "ar"
    );
  }


  /* Save language */
  try {
    localStorage.setItem(
      "bimarLanguage",
      language
    );
  } catch (error) {
    /* Ignore storage errors */
  }
}


/* =========================================================
   2. LOAD SAVED LANGUAGE
   ========================================================= */

function loadBimarLanguage() {

  let savedLanguage = "en";

  try {

    const storedLanguage =
      localStorage.getItem("bimarLanguage");

    if (
      storedLanguage === "en" ||
      storedLanguage === "ar"
    ) {
      savedLanguage = storedLanguage;
    }

  } catch (error) {
    /* Use English if storage is unavailable */
  }

  setBimarLanguage(savedLanguage);
}


/* =========================================================
   3. MOBILE MENU
   ========================================================= */

function initBimarMobileMenu() {

  const menuButton =
    document.getElementById("bimarMenuBtn");

  const navLinks =
    document.querySelector(".bimar-nav-links");


  if (!menuButton || !navLinks) {
    return;
  }


  menuButton.addEventListener(
    "click",
    function () {

      const isOpen =
        navLinks.classList.toggle("open");

      menuButton.classList.toggle(
        "open",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  /* Close menu after clicking a link */

  navLinks
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          navLinks.classList.remove("open");

          menuButton.classList.remove("open");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });


  /* Close menu when resizing to desktop */

  window.addEventListener(
    "resize",
    function () {

      if (window.innerWidth > 850) {

        navLinks.classList.remove("open");

        menuButton.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

}


/* =========================================================
   4. NAVBAR SCROLL EFFECT
   ========================================================= */

function initBimarNavbarScroll() {

  const navbar =
    document.querySelector(".bimar-navbar");

  if (!navbar) {
    return;
  }


  function updateNavbar() {

    if (window.scrollY > 10) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }


  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

}


/* =========================================================
   5. INITIALIZE BIMAR
   ========================================================= */

function initBimar() {

  loadBimarLanguage();

  initBimarMobileMenu();

  initBimarNavbarScroll();

}


/* =========================================================
   6. START
   ========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initBimar
  );

} else {

  initBimar();

}
