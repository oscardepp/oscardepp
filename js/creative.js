const creativeTabLinks = document.querySelectorAll("#shortstory .tab-links");
const creativeTabContents = document.querySelectorAll("#shortstory .tab-contents");

function activateStoryTab(tabLink) {
    const tabName = tabLink.dataset.tab;
    const target = document.getElementById(tabName);

    if (!target) {
        return;
    }

    creativeTabLinks.forEach((item) => {
        const isSelected = item === tabLink;

        item.classList.toggle("active-link", isSelected);
        item.setAttribute("aria-selected", String(isSelected));
    });

    creativeTabContents.forEach((item) => {
        const isSelected = item === target;

        item.classList.toggle("active-tab", isSelected);
        item.setAttribute("aria-hidden", String(!isSelected));
    });
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

/* Press 1, 2, 3, 4, or 5 to open that story. */
document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;
    const isTyping =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.isContentEditable;

    if (isTyping) {
        return;
    }

    const index = Number(event.key) - 1;

    if (
        Number.isInteger(index) &&
        index >= 0 &&
        index < creativeTabLinks.length
    ) {
        creativeTabLinks[index].click();
    }
});

const pageTabs = document.querySelectorAll(".nav .tablink");
const pageContents = document.querySelectorAll(".tabcontent");

function openPage(pageName, selectedTab) {
    const selectedPage = document.getElementById(pageName);

    if (!selectedPage) {
        return;
    }

    pageContents.forEach((content) => {
        const isSelected = content === selectedPage;

        content.style.display = isSelected ? "block" : "none";
        content.setAttribute("aria-hidden", String(!isSelected));
    });

    pageTabs.forEach((tab) => {
        const isSelected = tab === selectedTab;

        tab.classList.toggle("active-page-tab", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
    });
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
        const isOpen = navigation.classList.toggle("mobile-open");

        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        mobileMenuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

const defaultTab = document.getElementById("defaultOpen");

if (defaultTab) {
    openPage(defaultTab.dataset.page, defaultTab);
}