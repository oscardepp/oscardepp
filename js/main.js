const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

function openTab(event, tabName) {
    tabLinks.forEach((tabLink) => {
        tabLink.classList.remove("active-link");
    });

    tabContents.forEach((tabContent) => {
        tabContent.classList.remove("active-tab");
    });

    event.currentTarget.classList.add("active-link");

    const selectedTab = document.getElementById(tabName);

    if (selectedTab) {
        selectedTab.classList.add("active-tab");
    }
}

const menuToggle = document.querySelector(".toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const sideMenu = document.querySelector(".menu");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        primaryNavigation?.classList.toggle("active");
        sideMenu?.classList.toggle("active");
    });
}

const copyright = document.getElementById("p1");

if (copyright) {
    copyright.innerHTML =
        `&nbsp;&nbsp; &copy; ${new Date().getFullYear()} Oscar Depp | All Rights Reserved`;
}

window.openTab = openTab;