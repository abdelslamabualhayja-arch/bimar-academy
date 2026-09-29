/* =========================================================
   BIMAR ACADEMY
   Language System
   ========================================================= */

(function () {

    const DEFAULT_LANGUAGE = "ar";
    const STORAGE_KEY = "bimar-language";

    const translations = {

        ar: {
            direction: "rtl",

            navbar: {
                home: "الرئيسية",
                universities: "الجامعات",
                comprehensive: "المحتوى الطبي الشامل",
                otherCourses: "دورات أخرى",

                language: "EN",
                login: "تسجيل الدخول",
                signup: "إنشاء حساب"
            }
        },

        en: {
            direction: "ltr",

            navbar: {
                home: "Home",
                universities: "Universities",
                comprehensive: "Comprehensive Medical Content",
                otherCourses: "Other Courses",

                language: "AR",
                login: "Log in",
                signup: "Sign up"
            }
        }

    };


    /* =====================================================
       GET SAVED LANGUAGE
       ===================================================== */

    function getSavedLanguage() {

        const savedLanguage =
            localStorage.getItem(STORAGE_KEY);

        if (savedLanguage === "ar" || savedLanguage === "en") {
            return savedLanguage;
        }

        return DEFAULT_LANGUAGE;
    }


    /* =====================================================
       SAVE LANGUAGE
       ===================================================== */

    function saveLanguage(language) {

        localStorage.setItem(
            STORAGE_KEY,
            language
        );
    }


    /* =====================================================
       APPLY LANGUAGE
       ===================================================== */

    function applyLanguage(language) {

        const selectedLanguage =
            translations[language]
                ? language
                : DEFAULT_LANGUAGE;

        const translation =
            translations[selectedLanguage];


        /* -------------------------------------------------
           HTML DIRECTION
           ------------------------------------------------- */

        document.documentElement.lang =
            selectedLanguage;

        document.documentElement.dir =
            translation.direction;


        /* -------------------------------------------------
           NAVBAR
           ------------------------------------------------- */

        const homeLink =
            document.querySelector(
                '[data-i18n="navbar.home"]'
            );

        const universitiesLink =
            document.querySelector(
                '[data-i18n="navbar.universities"]'
            );

        const comprehensiveLink =
            document.querySelector(
                '[data-i18n="navbar.comprehensive"]'
            );

        const otherCoursesLink =
            document.querySelector(
                '[data-i18n="navbar.otherCourses"]'
            );

        const languageButton =
            document.querySelector(
                '[data-language-toggle]'
            );

        const loginLink =
            document.querySelector(
                '[data-i18n="navbar.login"]'
            );

        const signupLink =
            document.querySelector(
                '[data-i18n="navbar.signup"]'
            );


        /* -------------------------------------------------
           UPDATE TEXT
           ------------------------------------------------- */

        if (homeLink) {
            homeLink.textContent =
                translation.navbar.home;
        }

        if (universitiesLink) {
            universitiesLink.textContent =
                translation.navbar.universities;
        }

        if (comprehensiveLink) {
            comprehensiveLink.textContent =
                translation.navbar.comprehensive;
        }

        if (otherCoursesLink) {
            otherCoursesLink.textContent =
                translation.navbar.otherCourses;
        }

        if (languageButton) {
            languageButton.textContent =
                translation.navbar.language;
        }

        if (loginLink) {
            loginLink.textContent =
                translation.navbar.login;
        }

        if (signupLink) {
            signupLink.textContent =
                translation.navbar.signup;
        }


        /* -------------------------------------------------
           SAVE
           ------------------------------------------------- */

        saveLanguage(selectedLanguage);
    }


    /* =====================================================
       TOGGLE LANGUAGE
       ===================================================== */

    function toggleLanguage() {

        const currentLanguage =
            getSavedLanguage();

        const newLanguage =
            currentLanguage === "ar"
                ? "en"
                : "ar";

        applyLanguage(newLanguage);
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initializeLanguage() {

        const languageButton =
            document.querySelector(
                '[data-language-toggle]'
            );

        if (languageButton) {

            languageButton.addEventListener(
                "click",
                toggleLanguage
            );

        }

        applyLanguage(
            getSavedLanguage()
        );
    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeLanguage
        );

    } else {

        initializeLanguage();

    }

})();
