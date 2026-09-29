/* =========================================================
   BIMAR ACADEMY
   Language System
   ========================================================= */

(function () {

    const DEFAULT_LANGUAGE = "ar";
    const STORAGE_KEY = "bimar-language";


    /* =====================================================
       TRANSLATIONS
       ===================================================== */

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
            },

           hero: {
    eyebrow: "التعليم الطبي، بشكل منظم.",

title:
    "تعلّم الطب،",

titleHighlight:
    "بشكل منظم وبسيط.",
              
    description:
        "منصة تعليمية طبية تجمع الدورات والشروحات الطبية في مكان واحد، بشكل منظم وسهل الوصول.",

    primaryButton:
        "استكشف الجامعات",

    secondaryButton:
        "استكشف المحتوى الطبي"
},
           universities: {

    eyebrow: "الجامعات",

    title: "تعلّم حسب جامعتك",

    description:
        "اختر الجامعة للوصول إلى الدورات والشروحات التعليمية المرتبطة بنظامها الدراسي."

},
            footer: {
                description:
                    "منصة تعليمية طبية عربية تهدف إلى توفير محتوى طبي تعليمي منظم وموثوق، يجمع الدورات والشروحات الطبية من مختلف الجامعات والأنظمة التعليمية، إلى جانب محتوى طبي شامل.",

                about: "عن BIMAR",
                contact: "تواصل معنا",
                privacy: "سياسة الخصوصية",
                terms: "شروط الاستخدام",

                copyright:
                    "© 2026 BIMAR Academy — جميع الحقوق محفوظة."
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
            },

           hero: {
    eyebrow: "Medical Education, Organized.",

title:
    "Learn Medicine,",

titleHighlight:
    "Simply Organized.",

    description:
        "A medical education platform that brings courses and medical learning content together in one organized place.",

    primaryButton:
        "Explore Universities",

    secondaryButton:
        "Explore Medical Content"
},
           universities: {

    eyebrow: "Universities",

    title: "Learn by Your University",

    description:
        "Choose a university to explore courses and educational content organized around its curriculum."

},

            footer: {
                description:
                    "An Arabic medical educational platform dedicated to providing organized and reliable medical learning content, bringing together courses and educational resources from different universities and educational systems, alongside comprehensive medical content.",

                about: "About BIMAR",
                contact: "Contact Us",
                privacy: "Privacy Policy",
                terms: "Terms of Use",

                copyright:
                    "© 2026 BIMAR Academy — All rights reserved."
            }

        }

    };


    /* =====================================================
       GET SAVED LANGUAGE
       ===================================================== */

    function getSavedLanguage() {

        const savedLanguage =
            localStorage.getItem(STORAGE_KEY);

        if (
            savedLanguage === "ar" ||
            savedLanguage === "en"
        ) {
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
           HTML LANGUAGE & DIRECTION
           ------------------------------------------------- */

        document.documentElement.lang =
            selectedLanguage;

        document.documentElement.dir =
            translation.direction;


        /* -------------------------------------------------
           ALL TRANSLATABLE ELEMENTS
           ------------------------------------------------- */

        const elements =
            document.querySelectorAll(
                "[data-i18n]"
            );


        elements.forEach(function (element) {

            const key =
                element.dataset.i18n;

            const value =
                getTranslation(
                    translation,
                    key
                );

            if (value !== null) {
                element.textContent = value;
            }

        });


        /* -------------------------------------------------
           SAVE LANGUAGE
           ------------------------------------------------- */

        saveLanguage(selectedLanguage);
    }


    /* =====================================================
       GET TRANSLATION
       ===================================================== */

    function getTranslation(object, path) {

        const keys =
            path.split(".");

        let value = object;

        for (const key of keys) {

            if (
                value === undefined ||
                value === null ||
                !(key in value)
            ) {
                return null;
            }

            value = value[key];
        }

        return typeof value === "string"
            ? value
            : null;
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
                "[data-language-toggle]"
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
