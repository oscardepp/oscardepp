const tabLinks = document.querySelectorAll(".about .tab-links");
const tabContents = document.querySelectorAll(".about .tab-contents");

function activateTab(tabLink) {
    const tabName = tabLink.dataset.tab;

    tabLinks.forEach((item) => {
        item.classList.remove("active-link");
        item.setAttribute("aria-selected", "false");
    });

    tabContents.forEach((item) => {
        item.classList.remove("active-tab");
    });

    tabLink.classList.add("active-link");
    tabLink.setAttribute("aria-selected", "true");

    const selectedTab = document.getElementById(tabName);

    if (selectedTab) {
        selectedTab.classList.add("active-tab");
    }
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
    });
}

const copyright = document.getElementById("p1");

if (copyright) {
    copyright.innerHTML =
        `&nbsp;&nbsp; &copy; ${new Date().getFullYear()} Oscar Depp | All Rights Reserved`;
}