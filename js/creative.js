const creativeTabLinks = document.querySelectorAll("#shortstory .tab-links");
const creativeTabContents = document.querySelectorAll("#shortstory .tab-contents");

creativeTabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", () => {
        const tabName = tabLink.dataset.tab;

        creativeTabLinks.forEach((item) => {
            item.classList.remove("active-link");
        });

        creativeTabContents.forEach((item) => {
            item.classList.remove("active-tab");
        });

        tabLink.classList.add("active-link");

        const target = document.getElementById(tabName);

        if (target) {
            target.classList.add("active-tab");
        }
    });
});
function openPage(pageName, element, color) {
    const tabContents = document.querySelectorAll(".tabcontent");
    const tabLinks = document.querySelectorAll(".tablink");

    tabContents.forEach((content) => {
        content.style.display = "none";
    });

    tabLinks.forEach((link) => {
        link.style.backgroundColor = "";
        link.style.color = "";
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }

    if (element) {
        element.style.backgroundColor = color;
        element.style.color = "black";
    }
}

function myFunction() {
    const navigation = document.getElementById("hr");

    if (!navigation) {
        return;
    }

    if (navigation.style.display === "block") {
        navigation.style.display = "none";
    } else {
        navigation.style.display = "block";
    }
}

window.openPage = openPage;
window.myFunction = myFunction;

const defaultTab = document.getElementById("defaultOpen");

if (defaultTab) {
    defaultTab.click();
}