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
    tabLink.addEventListener("click", () => {
        activateStoryTab(tabLink);
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

// const mobileMenuButton = document.querySelector(".nav .icon");
const mobileMenuButton = document.querySelector(".nav .creative-toggle");
const navigation = document.getElementById("hr");

if (mobileMenuButton && navigation) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("mobile-open");

        mobileMenuButton.classList.toggle("active", isOpen);
        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        mobileMenuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

const creativeMenuItems = document.querySelectorAll(
    ".header-right a, .header-right .tablink"
);

creativeMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
        navigation?.classList.remove("mobile-open");
        mobileMenuButton?.classList.remove("active");
        mobileMenuButton?.setAttribute("aria-expanded", "false");
        mobileMenuButton?.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    });
});

const defaultTab = document.getElementById("defaultOpen");

if (defaultTab) {
    openPage(defaultTab.dataset.page, defaultTab);
}

const creativeCopyright = document.getElementById("creative-copyright");

if (creativeCopyright) {
    creativeCopyright.innerHTML =
        `&copy; ${new Date().getFullYear()} Oscar Depp | All Rights Reserved`;
}

async function loadPhotography() {
    const grid = document.getElementById("photo-grid");

    if (!grid) {
        return;
    }

    try {
        const response = await fetch("photos.json");

        if (!response.ok) {
            throw new Error(`Could not load photos.json: ${response.status}`);
        }

        const photos = await response.json();

        const columns = Array.from({ length: 4 }, () => {
            const column = document.createElement("div");
            column.className = "column";
            grid.appendChild(column);
            return column;
        });

        photos.forEach((photo, index) => {
            const container = document.createElement("div");
            container.className = "container";

            let media;

            if (photo.type === "video") {
                media = document.createElement("video");

                media.muted = true;
                media.loop = true;
                media.autoplay = true;
                media.playsInline = true;
            } else {
                media = document.createElement("img");

                media.loading = "lazy";
                media.decoding = "async";

                // Remove any HTML tags from the title for alt text.
                media.alt = photo.title.replace(/<[^>]*>/g, "");
            }

            media.src = photo.src;
            media.style.width = "100%";

            const overlay = document.createElement("div");
            overlay.className = "overlay";

            const text = document.createElement("div");
            text.className = "text";

            const title = document.createElement("div");
            title.textContent = photo.title;

            const details = document.createElement("span");
            details.textContent = photo.details || "";

            text.appendChild(title);
            text.appendChild(document.createElement("br"));
            text.appendChild(details);

            overlay.appendChild(text);
            container.appendChild(media);
            container.appendChild(overlay);

            // Existing photos keep their current column.
            // Future photos can omit "column" and will be
            // distributed automatically.
            const columnNumber =
                photo.column ?? ((index % columns.length) + 1);

            const columnIndex = Math.max(
                0,
                Math.min(columns.length - 1, columnNumber - 1)
            );

            columns[columnIndex].appendChild(container);
        });
    } catch (error) {
        console.error("Photography could not be loaded:", error);

        const message = document.createElement("p");
        message.textContent = "Photography could not be loaded.";
        grid.appendChild(message);
    }
}

loadPhotography();