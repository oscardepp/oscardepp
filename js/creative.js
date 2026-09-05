const creativeTabLinks =
    document.querySelectorAll("#shortstory .tab-links");

const creativeTabContents =
    document.querySelectorAll("#shortstory .tab-contents");


function activateStoryTab(tabLink) {
    const tabName =
        tabLink.dataset.tab;

    const target =
        document.getElementById(tabName);

    if (!target) {
        return;
    }

    creativeTabLinks.forEach((item) => {
        const isSelected =
            item === tabLink;

        item.classList.toggle(
            "active-link",
            isSelected
        );

        item.setAttribute(
            "aria-selected",
            String(isSelected)
        );
    });

    creativeTabContents.forEach((item) => {
        const isSelected =
            item === target;

        item.classList.toggle(
            "active-tab",
            isSelected
        );

        item.setAttribute(
            "aria-hidden",
            String(!isSelected)
        );
    });
}


creativeTabLinks.forEach((tabLink) => {
    tabLink.addEventListener(
        "click",
        () => {
            activateStoryTab(tabLink);
        }
    );
});


/* =========================================================
   Keyboard shortcuts for stories
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {
        const activeElement =
            document.activeElement;

        const isTyping =
            activeElement instanceof HTMLInputElement ||
            activeElement instanceof HTMLTextAreaElement ||
            activeElement?.isContentEditable;

        if (isTyping) {
            return;
        }

        const index =
            Number(event.key) - 1;

        if (
            Number.isInteger(index) &&
            index >= 0 &&
            index < creativeTabLinks.length
        ) {
            creativeTabLinks[index].click();
        }
    }
);


/* =========================================================
   Main Creative tabs
   ========================================================= */

const pageTabs =
    document.querySelectorAll(
        ".nav .tablink"
    );

const pageContents =
    document.querySelectorAll(
        ".tabcontent"
    );


function openPage(
    pageName,
    selectedTab
) {
    const selectedPage =
        document.getElementById(
            pageName
        );

    if (!selectedPage) {
        return;
    }

    pageContents.forEach((content) => {
        const isSelected =
            content === selectedPage;

        content.style.display =
            isSelected
                ? "block"
                : "none";

        content.setAttribute(
            "aria-hidden",
            String(!isSelected)
        );
    });

    pageTabs.forEach((tab) => {
        const isSelected =
            tab === selectedTab;

        tab.classList.toggle(
            "active-page-tab",
            isSelected
        );

        tab.setAttribute(
            "aria-selected",
            String(isSelected)
        );
    });
}


pageTabs.forEach((tab) => {
    tab.addEventListener(
        "click",
        () => {
            openPage(
                tab.dataset.page,
                tab
            );
        }
    );
});


/* =========================================================
   Mobile navigation
   ========================================================= */

const mobileMenuButton =
    document.querySelector(
        ".nav .creative-toggle"
    );

const navigation =
    document.getElementById("hr");


if (
    mobileMenuButton &&
    navigation
) {
    mobileMenuButton.addEventListener(
        "click",
        () => {
            const isOpen =
                navigation.classList.toggle(
                    "mobile-open"
                );

            mobileMenuButton.classList.toggle(
                "active",
                isOpen
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileMenuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        }
    );
}


const creativeMenuItems =
    document.querySelectorAll(
        ".header-right a, .header-right .tablink"
    );


creativeMenuItems.forEach((item) => {
    item.addEventListener(
        "click",
        () => {
            navigation?.classList.remove(
                "mobile-open"
            );

            mobileMenuButton?.classList.remove(
                "active"
            );

            mobileMenuButton?.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuButton?.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    );
});


/* =========================================================
   Default tab
   ========================================================= */

const defaultTab =
    document.getElementById(
        "defaultOpen"
    );


if (defaultTab) {
    openPage(
        defaultTab.dataset.page,
        defaultTab
    );
}


/* =========================================================
   Copyright
   ========================================================= */

const creativeCopyright =
    document.getElementById(
        "creative-copyright"
    );


if (creativeCopyright) {
    creativeCopyright.innerHTML =
        `&copy; ${new Date().getFullYear()} Oscar Depp | All Rights Reserved`;
}


/* =========================================================
   Photography metadata
   ========================================================= */

function getPhotoMetadata(photo) {
    if (
        photo.location ||
        photo.date
    ) {
        return {
            location:
                photo.location || "",

            date:
                photo.date || ""
        };
    }

    const details =
        (photo.details || "").trim();

    const months =
        "January|February|March|April|May|June|" +
        "July|August|September|October|November|December";

    const match =
        details.match(
            new RegExp(
                `^(.*?)\\.?\\s*(${months}\\s+\\d{4})\\.?$`,
                "i"
            )
        );

    if (match) {
        return {
            location:
                match[1].trim(),

            date:
                match[2].trim()
        };
    }

    return {
        location:
            details,

        date:
            ""
    };
}


const monthNumbers = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12
};


function getPhotoMonth(photo) {
    const metadata =
        getPhotoMetadata(photo);

    const dateText =
        metadata.date.trim();

    const match =
        dateText.match(
            /^([A-Za-z]+)\s+(\d{4})$/
        );

    if (match) {
        const month =
            monthNumbers[
            match[1].toLowerCase()
            ];

        const year =
            Number(match[2]);

        if (
            month &&
            Number.isFinite(year)
        ) {
            return {
                year,
                month,

                key:
                    `${year}-${String(month).padStart(2, "0")}`
            };
        }
    }

    const filenameMatch =
        (photo.src || "").match(
            /(?:^|\/)(\d{4})-(\d{2})-(\d{2})-/
        );

    if (filenameMatch) {
        const year =
            Number(
                filenameMatch[1]
            );

        const month =
            Number(
                filenameMatch[2]
            );

        return {
            year,
            month,

            key:
                `${year}-${String(month).padStart(2, "0")}`
        };
    }

    return null;
}


function getPrecisePhotoDate(photo) {
    const match =
        (photo.src || "").match(
            /(?:^|\/)(\d{4})-(\d{2})-(\d{2})-/
        );

    if (!match) {
        return 0;
    }

    return new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3])
    ).getTime();
}


/* =========================================================
   Media creation
   ========================================================= */

function createMedia(photo) {
    let media;

    if (
        photo.type === "video"
    ) {
        media =
            document.createElement(
                "video"
            );

        media.muted = true;
        media.loop = true;
        media.autoplay = true;
        media.playsInline = true;

    } else {
        media =
            document.createElement(
                "img"
            );

        media.decoding =
            "async";

        media.alt =
            (photo.title || "")
                .replace(
                    /<[^>]*>/g,
                    ""
                );
    }

    media.src =
        photo.src;

    return media;
}


/* =========================================================
   Overlay
   ========================================================= */

function createOverlay(photo) {
    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "overlay";


    const text =
        document.createElement(
            "div"
        );

    text.className =
        "text";


    const title =
        document.createElement(
            "div"
        );

    title.className =
        "photo-title";

    title.textContent =
        photo.title || "";


    const metadata =
        getPhotoMetadata(photo);


    const meta =
        document.createElement(
            "div"
        );

    meta.className =
        "photo-meta";


    if (metadata.location) {
        const location =
            document.createElement(
                "span"
            );

        location.className =
            "photo-location";

        location.textContent =
            metadata.location;

        meta.appendChild(
            location
        );
    }


    if (metadata.date) {
        const date =
            document.createElement(
                "span"
            );

        date.className =
            "photo-date";

        date.textContent =
            metadata.date;

        meta.appendChild(
            date
        );
    }


    text.appendChild(
        title
    );


    if (
        metadata.location ||
        metadata.date
    ) {
        text.appendChild(
            meta
        );
    }


    overlay.appendChild(
        text
    );

    return overlay;
}


/* =========================================================
   Preloading cache
   ========================================================= */

const mediaCache =
    new Map();


function preloadPhoto(photo) {
    if (
        mediaCache.has(photo.src)
    ) {
        return mediaCache.get(
            photo.src
        );
    }

    const promise =
        new Promise(
            (resolve, reject) => {

                if (
                    photo.type ===
                    "video"
                ) {
                    const video =
                        document.createElement(
                            "video"
                        );

                    video.muted = true;
                    video.loop = true;
                    video.autoplay = true;
                    video.playsInline = true;

                    video.addEventListener(
                        "loadeddata",
                        () => {
                            resolve(video);
                        },
                        {
                            once: true
                        }
                    );

                    video.addEventListener(
                        "error",
                        reject,
                        {
                            once: true
                        }
                    );

                    video.src =
                        photo.src;

                    return;
                }


                const img =
                    new Image();

                img.decoding =
                    "async";

                img.loading =
                    "eager";


                img.onload =
                    async () => {

                        try {
                            await img.decode();
                        } catch (_) {
                            // Still usable.
                        }

                        resolve(img);
                    };


                img.onerror =
                    reject;


                img.src =
                    photo.src;
            }
        );


    mediaCache.set(
        photo.src,
        promise
    );

    return promise;
}


function prepareMedia(
    media,
    photo
) {
    media.classList.add(
        "tile-media"
    );

    if (
        media instanceof
        HTMLImageElement
    ) {
        media.alt =
            (photo.title || "")
                .replace(
                    /<[^>]*>/g,
                    ""
                );
    }
}


/* =========================================================
   Counter
   ========================================================= */

function updateTileCounter(tile) {
    const counter =
        tile.querySelector(
            ".photo-stack-counter"
        );

    if (!counter) {
        return;
    }


    const photos =
        tile._photos || [];


    const currentIndex =
        Number(
            tile.dataset.photoIndex ||
            0
        );


    if (
        photos.length <= 1
    ) {
        counter.hidden =
            true;

        return;
    }


    counter.hidden =
        false;

    counter.textContent =
        `${currentIndex + 1} / ${photos.length}`;
}


/* =========================================================
   Change image smoothly
   ========================================================= */
async function changeTilePhoto(
    tile,
    direction = 1,
    wrap = true
) {
    if (
        tile.classList.contains(
            "is-changing"
        )
    ) {
        return;
    }

    const photos =
        tile._photos || [];

    if (photos.length <= 1) {
        return;
    }

    const currentIndex =
        Number(
            tile.dataset.photoIndex || 0
        );

    let nextIndex =
        currentIndex + direction;


    /*
        MOBILE:
        stop at first / last image.

        DESKTOP:
        wrap around if wrap === true.
    */
    if (wrap) {
        nextIndex =
            (
                nextIndex +
                photos.length
            ) % photos.length;
    } else {
        if (
            nextIndex < 0 ||
            nextIndex >= photos.length
        ) {
            return;
        }
    }


    const nextPhoto =
        photos[nextIndex];

    tile.classList.add(
        "is-changing"
    );


    try {
        const cachedMedia =
            await preloadPhoto(
                nextPhoto
            );

        const nextMedia =
            cachedMedia.cloneNode(
                true
            );

        prepareMedia(
            nextMedia,
            nextPhoto
        );

        nextMedia.classList.add(
            "incoming-media"
        );

        nextMedia.classList.add(
            direction > 0
                ? "from-right"
                : "from-left"
        );


        const currentMedia =
            tile.querySelector(
                ":scope > .current-media"
            );

        const currentOverlay =
            tile.querySelector(
                ":scope > .overlay:not(.incoming-overlay)"
            );

        const nextOverlay =
            createOverlay(
                nextPhoto
            );

        nextOverlay.classList.add(
            "incoming-overlay"
        );


        tile.insertBefore(
            nextMedia,
            currentOverlay ||
            tile.firstChild
        );

        tile.appendChild(
            nextOverlay
        );


        requestAnimationFrame(
            () => {
                requestAnimationFrame(
                    () => {

                        nextMedia.classList.add(
                            "is-entering"
                        );

                        if (currentMedia) {
                            currentMedia.classList.add(
                                direction > 0
                                    ? "exit-left"
                                    : "exit-right"
                            );
                        }

                        if (currentOverlay) {
                            currentOverlay.classList.add(
                                "is-exiting"
                            );
                        }

                    }
                );
            }
        );


        window.setTimeout(
            () => {

                currentMedia?.remove();
                currentOverlay?.remove();

                nextMedia.classList.remove(
                    "incoming-media",
                    "from-right",
                    "from-left",
                    "is-entering"
                );

                nextMedia.classList.add(
                    "current-media"
                );

                nextOverlay.classList.remove(
                    "incoming-overlay"
                );

                tile.dataset.photoIndex =
                    String(nextIndex);

                updateTileCounter(
                    tile
                );

                tile.classList.remove(
                    "is-changing"
                );


                /*
                    Preload the next valid image.
                */
                let preloadIndex =
                    nextIndex + 1;

                if (
                    preloadIndex <
                    photos.length
                ) {
                    preloadPhoto(
                        photos[preloadIndex]
                    ).catch(() => { });

                } else if (wrap) {
                    preloadPhoto(
                        photos[0]
                    ).catch(() => { });
                }

            },
            300
        );

    } catch (error) {

        console.error(
            "Could not load next photo:",
            error
        );

        tile.classList.remove(
            "is-changing"
        );
    }
}

/* =========================================================
   Subtle mouse tilt
   ========================================================= */

function applyTileTilt(
    tile,
    event
) {
    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }


    const rect =
        tile.getBoundingClientRect();


    const x =
        (
            event.clientX -
            rect.left
        ) /
        rect.width;


    const y =
        (
            event.clientY -
            rect.top
        ) /
        rect.height;


    const rotateY =
        (x - 0.5) * 2;


    const rotateX =
        (0.5 - y) * 1.8;


    tile.style.setProperty(
        "--tile-rotate-x",
        `${rotateX}deg`
    );


    tile.style.setProperty(
        "--tile-rotate-y",
        `${rotateY}deg`
    );
}


function resetTileTilt(tile) {
    tile.style.setProperty(
        "--tile-rotate-x",
        "0deg"
    );

    tile.style.setProperty(
        "--tile-rotate-y",
        "0deg"
    );
}


/* =========================================================
   Interactive month tile
   ========================================================= */
function createInteractiveTile(
    photos
) {
    photos.sort(
        (a, b) =>
            getPrecisePhotoDate(b) -
            getPrecisePhotoDate(a)
    );

    const tile =
        document.createElement(
            "div"
        );

    tile.className =
        "container photo-tile";

    tile._photos =
        photos;

    tile.dataset.photoIndex =
        "0";


    /* =====================================================
       First photo
       ===================================================== */

    const firstPhoto =
        photos[0];

    const firstMedia =
        createMedia(
            firstPhoto
        );

    firstMedia.classList.add(
        "tile-media",
        "current-media"
    );

    tile.appendChild(
        firstMedia
    );

    tile.appendChild(
        createOverlay(
            firstPhoto
        )
    );


    /* =====================================================
       Counter
       ===================================================== */

    const counter =
        document.createElement(
            "div"
        );

    counter.className =
        "photo-stack-counter";

    counter.setAttribute(
        "aria-hidden",
        "true"
    );

    tile.appendChild(
        counter
    );

    updateTileCounter(
        tile
    );


    /* =====================================================
       Preload next image
       ===================================================== */

    if (
        photos.length > 1
    ) {
        preloadPhoto(
            photos[1]
        ).catch(
            () => {}
        );
    }


    /* =====================================================
       Mobile touch handling
       ===================================================== */

    let touchStartX =
        null;

    let touchStartY =
        null;

    let lastTouchTime =
        0;


    tile.addEventListener(
        "pointerdown",
        (event) => {

            if (
                event.pointerType !==
                "touch"
            ) {
                return;
            }

            touchStartX =
                event.clientX;

            touchStartY =
                event.clientY;
        }
    );


    tile.addEventListener(
        "pointerup",
        (event) => {

            if (
                event.pointerType !==
                "touch"
            ) {
                return;
            }

            lastTouchTime =
                Date.now();


            if (
                touchStartX === null ||
                touchStartY === null
            ) {
                return;
            }


            const deltaX =
                event.clientX -
                touchStartX;

            const deltaY =
                event.clientY -
                touchStartY;


            touchStartX =
                null;

            touchStartY =
                null;


            /*
                If user is scrolling vertically,
                do not change the photo.
            */
            if (
                Math.abs(deltaY) >
                    Math.abs(deltaX) &&
                Math.abs(deltaY) >
                    20
            ) {
                return;
            }


            /*
                Swipe:
                swipe left  -> next
                swipe right -> previous
            */
            if (
                Math.abs(deltaX) >=
                35
            ) {
                changeTilePhoto(
                    tile,

                    deltaX > 0
                        ? -1
                        : 1,

                    false
                );

                return;
            }


            /*
                Tap:
                left half  -> previous
                right half -> next

                On mobile we DO NOT wrap.
            */
            const rect =
                tile.getBoundingClientRect();

            const tapX =
                event.clientX -
                rect.left;

            const direction =
                tapX <
                rect.width / 2
                    ? -1
                    : 1;

            changeTilePhoto(
                tile,
                direction,
                false
            );
        }
    );


    /* =====================================================
       Desktop click
       ===================================================== */

    tile.addEventListener(
        "click",
        (event) => {

            /*
                Safari/iPhone may fire a click
                immediately after pointerup.
                Ignore that duplicate click.
            */
            if (
                Date.now() -
                    lastTouchTime <
                600
            ) {
                return;
            }


            if (
                photos.length <= 1
            ) {
                return;
            }


            const rect =
                tile.getBoundingClientRect();

            const clickX =
                event.clientX -
                rect.left;

            const direction =
                clickX <
                rect.width / 2
                    ? -1
                    : 1;


            /*
                Desktop keeps wrapping:
                last -> first
                first -> last
            */
            changeTilePhoto(
                tile,
                direction,
                true
            );
        }
    );


    /* =====================================================
       Desktop mouse tilt
       ===================================================== */

    tile.addEventListener(
        "pointermove",
        (event) => {

            if (
                event.pointerType ===
                "mouse"
            ) {
                applyTileTilt(
                    tile,
                    event
                );
            }
        }
    );


    tile.addEventListener(
        "pointerleave",
        () => {

            resetTileTilt(
                tile
            );
        }
    );


    return tile;
}


/* =========================================================
   Load Photography
   ========================================================= */

async function loadPhotography() {
    const grid =
        document.getElementById(
            "photo-grid"
        );


    if (!grid) {
        return;
    }


    try {
        const response =
            await fetch(
                "photos.json"
            );


        if (!response.ok) {
            throw new Error(
                `Could not load photos.json: ${response.status}`
            );
        }


        const photos =
            await response.json();


        grid.innerHTML =
            "";


        const monthGroups =
            new Map();


        photos.forEach(
            (photo, index) => {

                const month =
                    getPhotoMonth(
                        photo
                    );


                const key =
                    month
                        ? month.key
                        : `undated-${index}`;


                if (
                    !monthGroups.has(
                        key
                    )
                ) {
                    monthGroups.set(
                        key,
                        {
                            month,
                            photos: []
                        }
                    );
                }


                monthGroups
                    .get(key)
                    .photos
                    .push(photo);
            }
        );


        const groups =
            Array.from(
                monthGroups.values()
            );


        groups.sort(
            (a, b) => {

                if (
                    !a.month &&
                    !b.month
                ) {
                    return 0;
                }


                if (!a.month) {
                    return 1;
                }


                if (!b.month) {
                    return -1;
                }


                if (
                    a.month.year !==
                    b.month.year
                ) {
                    return (
                        b.month.year -
                        a.month.year
                    );
                }


                return (
                    b.month.month -
                    a.month.month
                );
            }
        );


        const columns =
            Array.from(
                {
                    length: 4
                },
                () => {

                    const column =
                        document.createElement(
                            "div"
                        );


                    column.className =
                        "column";


                    grid.appendChild(
                        column
                    );


                    return column;
                }
            );


        groups.forEach(
            (group, index) => {

                const tile =
                    createInteractiveTile(
                        group.photos
                    );


                const columnIndex =
                    index %
                    columns.length;


                columns[
                    columnIndex
                ].appendChild(
                    tile
                );
            }
        );


    } catch (error) {

        console.error(
            "Photography could not be loaded:",
            error
        );


        const message =
            document.createElement(
                "p"
            );


        message.textContent =
            "Photography could not be loaded.";


        grid.appendChild(
            message
        );
    }
}


loadPhotography();