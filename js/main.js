const tabLinks = document.querySelectorAll(".about .tab-links");
const tabContents = document.querySelectorAll(".about .tab-contents");

function activateTab(tabLink) {
    const tabName = tabLink.dataset.tab;
    const selectedTab = document.getElementById(tabName);

    if (!selectedTab) {
        return;
    }

    tabLinks.forEach((item) => {
        const isSelected = item === tabLink;

        item.classList.toggle("active-link", isSelected);
        item.setAttribute("aria-selected", String(isSelected));
    });

    tabContents.forEach((item) => {
        const isSelected = item === selectedTab;

        item.classList.toggle("active-tab", isSelected);
        item.setAttribute("aria-hidden", String(!isSelected));
    });
}

tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", () => {
        activateTab(tabLink);
    });
});

const menuToggle = document.querySelector(".toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const sideMenu = document.querySelector(".menu");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isActive = menuToggle.classList.toggle("active");

        primaryNavigation?.classList.toggle("active", isActive);
        sideMenu?.classList.toggle("active", isActive);

        menuToggle.setAttribute("aria-expanded", String(isActive));
        menuToggle.setAttribute(
            "aria-label",
            isActive ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

const mobileNavigationLinks = document.querySelectorAll(
    ".primary-navigation a, .menu a"
);

mobileNavigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle?.classList.remove("active");
        primaryNavigation?.classList.remove("active");
        sideMenu?.classList.remove("active");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation menu");
    });
});

const copyright = document.getElementById("p1");

if (copyright) {
    copyright.innerHTML =
        `&nbsp;&nbsp; &copy; ${new Date().getFullYear()} Oscar Depp | All Rights Reserved`;
}