const creativeTabLinks = document.querySelectorAll("#shortstory .tab-links");
const creativeTabContents = document.querySelectorAll("#shortstory .tab-contents");

function activateStoryTab(tabLink) {
    const tabName = tabLink.dataset.tab;

    creativeTabLinks.forEach((item) => {
        item.classList.remove("active-link");
        item.setAttribute("aria-selected", "false");
    });

    creativeTabContents.forEach((item) => {
        item.classList.remove("active-tab");
    });

    tabLink.classList.add("active-link");
    tabLink.setAttribute("aria-selected", "true");

    const target = document.getElementById(tabName);

    if (target) {
        target.classList.add("active-tab");
    }
}

creativeTabLinks.forEach((tabLink) => {
    tabLink.setAttribute("role", "button");
    tabLink.setAttribute("tabindex", "0");

    tabLink.addEventListener("click", () => {
        activateStoryTab(tabLink);
    });

    tabLink.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateStoryTab(tabLink);
        }
    });
});

const pageTabs = document.querySelectorAll(".tablink");
const pageContents = document.querySelectorAll(".tabcontent");

function openPage(pageName, selectedTab) {
    pageContents.forEach((content) => {
        content.style.display = "none";
    });

    pageTabs.forEach((tab) => {
        tab.style.backgroundColor = "";
        tab.style.color = "";
        tab.setAttribute("aria-selected", "false");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }

    if (selectedTab) {
        selectedTab.style.backgroundColor = "hsla(236, 92%, 15%, 0.631)";
        selectedTab.style.color = "black";
        selectedTab.setAttribute("aria-selected", "true");
    }
}

pageTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        openPage(tab.dataset.page, tab);
    });
});

const mobileMenuButton = document.querySelector(".nav .icon");
const navigation = document.getElementById("hr");

if (mobileMenuButton && navigation) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = navigation.style.display === "block";

        navigation.style.display = isOpen ? "none" : "block";
        mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
    });
}

const defaultTab = document.getElementById("defaultOpen");

if (defaultTab) {
    openPage(defaultTab.dataset.page, defaultTab);
}