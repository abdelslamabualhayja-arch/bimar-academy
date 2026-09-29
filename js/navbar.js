(function () {

    const menuToggle =
        document.getElementById(
            "bimar-mobile-menu-toggle"
        );

    const mobileMenu =
        document.getElementById(
            "bimar-mobile-menu"
        );

    if (!menuToggle || !mobileMenu) {
        return;
    }


    function openMenu() {

        mobileMenu.classList.add("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close menu"
        );

    }


    function closeMenu() {

        mobileMenu.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    }


    function toggleMenu() {

        const isOpen =
            mobileMenu.classList.contains(
                "is-open"
            );

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


    const mobileLinks =
        mobileMenu.querySelectorAll(
            ".bimar-mobile-menu-link"
        );

    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 700) {
                closeMenu();
            }

        }
    );

})();
