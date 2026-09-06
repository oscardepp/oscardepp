const creativeTabLinks = document.querySelectorAll("#shortstory .tab-links");
const creativeTabContents = document.querySelectorAll(
  "#shortstory .tab-contents",
);
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
/* =========================================================
   Keyboard shortcuts for stories
   ========================================================= */
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
/* =========================================================
   Main Creative tabs
   ========================================================= */
const pageTabs = document.querySelectorAll(".nav .tablink");
const pageContents = document.querySelectorAll(".tabcontent");
const creativeSections = [
  {
    label: "Short Stories",
    page: "ShortStory",
  },
  {
    label: "Poetry",
    page: "Poetry",
  },
  {
    label: "Photography",
    page: "Photography",
  },
];
const creativeSectionTitle = document.getElementById(
  "creative-current-section",
);
const creativePreviousButton = document.querySelector(".creative-nav-prev");
const creativeNextButton = document.querySelector(".creative-nav-next");
const creativePreviousLabel = creativePreviousButton?.querySelector(
  ".creative-nav-edge-label",
);
const creativeNextLabel = creativeNextButton?.querySelector(
  ".creative-nav-edge-label",
);
let currentCreativePage = "";

function setCreativeSectionTitle(text) {
  if (!creativeSectionTitle) {
    return;
  }

  creativeSectionTitle.getAnimations().forEach((animation) => {
    animation.cancel();
  });

  const fadeOut = creativeSectionTitle.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0)",
      },
      {
        opacity: 0,
        transform: "translateY(-7px)",
      },
    ],
    {
      duration: 110,
      easing: "ease-in",
      fill: "forwards",
    },
  );

  fadeOut.finished
    .then(() => {
      creativeSectionTitle.textContent = text;
      creativeSectionTitle.animate(
        [
          {
            opacity: 0,
            transform: "translateY(7px)",
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        {
          duration: 180,
          easing: "cubic-bezier(.22, .61, .36, 1)",
          fill: "forwards",
        },
      );
    })
    .catch(() => {});
}

function updateCreativeNavigation(pageName) {
  const currentIndex = creativeSections.findIndex(
    (section) => section.page === pageName,
  );

  if (currentIndex === -1) {
    return;
  }

  const previousSection =
    creativeSections[
      (currentIndex - 1 + creativeSections.length) % creativeSections.length
    ];
  const nextSection =
    creativeSections[(currentIndex + 1) % creativeSections.length];

  if (creativePreviousLabel) {
    creativePreviousLabel.textContent = previousSection.label;
  }

  if (creativeNextLabel) {
    creativeNextLabel.textContent = nextSection.label;
  }

  setCreativeSectionTitle(creativeSections[currentIndex].label);
}

function navigateCreativeSection(section) {
  if (section.href) {
    window.location.href = section.href;
    return;
  }

  const tab = Array.from(pageTabs).find(
    (item) => item.dataset.page === section.page,
  );

  if (tab) {
    openPage(section.page, tab);
  }
}
function openPage(pageName, selectedTab) {
  const selectedPage = document.getElementById(pageName);
  if (!selectedPage) {
    return;
  }

  currentCreativePage = pageName;
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
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

  updateCreativeNavigation(pageName);
}
pageTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    openPage(tab.dataset.page, tab);
  });
});

creativePreviousButton?.addEventListener("click", () => {
  const currentIndex = creativeSections.findIndex(
    (section) => section.page === currentCreativePage,
  );

  if (currentIndex !== -1) {
    navigateCreativeSection(
      creativeSections[
        (currentIndex - 1 + creativeSections.length) % creativeSections.length
      ],
    );
  }
});

creativeNextButton?.addEventListener("click", () => {
  const currentIndex = creativeSections.findIndex(
    (section) => section.page === currentCreativePage,
  );

  if (currentIndex !== -1) {
    navigateCreativeSection(
      creativeSections[(currentIndex + 1) % creativeSections.length],
    );
  }
});

document.addEventListener("keydown", (event) => {
  const activeElement = document.activeElement;
  const isTyping =
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement?.isContentEditable;

  if (isTyping || currentCreativePage === "") {
    return;
  }

  const currentIndex = creativeSections.findIndex(
    (section) => section.page === currentCreativePage,
  );

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    navigateCreativeSection(
      creativeSections[
        (currentIndex - 1 + creativeSections.length) % creativeSections.length
      ],
    );
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    navigateCreativeSection(
      creativeSections[(currentIndex + 1) % creativeSections.length],
    );
  }
});
/* =========================================================
   Mobile navigation
   ========================================================= */
const mobileMenuButton = document.querySelector(".nav .creative-toggle");
const navigation = document.getElementById("hr");
const desktopCreativeMenuButton = document.querySelector(
  ".creative-section-menu-toggle",
);

function closeDesktopCreativeMenu() {
  navigation?.classList.remove("desktop-open");
  desktopCreativeMenuButton?.setAttribute("aria-expanded", "false");
}

desktopCreativeMenuButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = navigation?.classList.toggle("desktop-open") ?? false;
  desktopCreativeMenuButton.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  if (
    !navigation?.contains(event.target) &&
    !desktopCreativeMenuButton?.contains(event.target)
  ) {
    closeDesktopCreativeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDesktopCreativeMenu();
  }
});

if (mobileMenuButton && navigation) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("mobile-open");
    mobileMenuButton.classList.toggle("active", isOpen);
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });
}
const creativeMenuItems = document.querySelectorAll(
  ".header-right a, .header-right .tablink",
);
creativeMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    navigation?.classList.remove("mobile-open");
    mobileMenuButton?.classList.remove("active");
    mobileMenuButton?.setAttribute("aria-expanded", "false");
    mobileMenuButton?.setAttribute("aria-label", "Open navigation menu");
    closeDesktopCreativeMenu();
  });
});
/* =========================================================
   Default tab
   ========================================================= */
const defaultTab = document.getElementById("defaultOpen");
if (defaultTab) {
  openPage(defaultTab.dataset.page, defaultTab);
}
/* =========================================================
   Copyright
   ========================================================= */
const creativeCopyright = document.getElementById("creative-copyright");
if (creativeCopyright) {
  creativeCopyright.innerHTML = `&copy; ${new Date().getFullYear()} Oscar Depp | All Rights Reserved`;
}
/* =========================================================
   Photography metadata
   ========================================================= */
function getPhotoMetadata(photo) {
  if (photo.location || photo.date) {
    return {
      location: photo.location || "",
      date: photo.date || "",
    };
  }
  const details = (photo.details || "").trim();
  const months =
    "January|February|March|April|May|June|" +
    "July|August|September|October|November|December";
  const match = details.match(
    new RegExp(`^(.*?)\\.?\\s*(${months}\\s+\\d{4})\\.?$`, "i"),
  );
  if (match) {
    return {
      location: match[1].trim(),
      date: match[2].trim(),
    };
  }
  return {
    location: details,
    date: "",
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
  december: 12,
};
function getPhotoMonth(photo) {
  const metadata = getPhotoMetadata(photo);
  const dateText = metadata.date.trim();
  const match = dateText.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const month = monthNumbers[match[1].toLowerCase()];
    const year = Number(match[2]);
    if (month && Number.isFinite(year)) {
      return {
        year,
        month,
        key: `${year}-${String(month).padStart(2, "0")}`,
      };
    }
  }
  const filenameMatch = (photo.src || "").match(
    /(?:^|\/)(\d{4})-(\d{2})-(\d{2})-/,
  );
  if (filenameMatch) {
    const year = Number(filenameMatch[1]);
    const month = Number(filenameMatch[2]);
    return {
      year,
      month,
      key: `${year}-${String(month).padStart(2, "0")}`,
    };
  }
  return null;
}
function getPrecisePhotoDate(photo) {
  const match = (photo.src || "").match(/(?:^|\/)(\d{4})-(\d{2})-(\d{2})-/);
  if (!match) {
    return 0;
  }
  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  ).getTime();
}
/* =========================================================
   Media creation
   ========================================================= */
function createMedia(photo) {
  let media;
  if (photo.type === "video") {
    media = document.createElement("video");
    media.muted = true;
    media.loop = true;
    media.autoplay = true;
    media.playsInline = true;
  } else {
    media = document.createElement("img");
    media.decoding = "async";
    media.alt = (photo.title || "").replace(/<[^>]*>/g, "");
  }
  media.src = photo.src;
  return media;
}
/* =========================================================
   Overlay
   ========================================================= */
function createOverlay(photo) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const text = document.createElement("div");
  text.className = "text";
  const title = document.createElement("div");
  title.className = "photo-title";
  title.textContent = photo.title || "";
  const metadata = getPhotoMetadata(photo);
  const meta = document.createElement("div");
  meta.className = "photo-meta";
  if (metadata.location) {
    const location = document.createElement("span");
    location.className = "photo-location";
    location.textContent = metadata.location;
    meta.appendChild(location);
  }
  if (metadata.date) {
    const date = document.createElement("span");
    date.className = "photo-date";
    date.textContent = metadata.date;
    meta.appendChild(date);
  }
  text.appendChild(title);
  if (metadata.location || metadata.date) {
    text.appendChild(meta);
  }
  overlay.appendChild(text);
  return overlay;
}
/* =========================================================
   Preloading cache
   ========================================================= */
const mediaCache = new Map();
function preloadPhoto(photo) {
  if (mediaCache.has(photo.src)) {
    return mediaCache.get(photo.src);
  }
  const promise = new Promise((resolve, reject) => {
    if (photo.type === "video") {
      const video = document.createElement("video");
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
          once: true,
        },
      );
      video.addEventListener("error", reject, {
        once: true,
      });
      video.src = photo.src;
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.onload = async () => {
      try {
        await img.decode();
      } catch (_) {
        // Still usable.
      }
      resolve(img);
    };
    img.onerror = reject;
    img.src = photo.src;
  });
  mediaCache.set(photo.src, promise);
  return promise;
}
function prepareMedia(media, photo) {
  media.classList.add("tile-media");
  if (media instanceof HTMLImageElement) {
    media.alt = (photo.title || "").replace(/<[^>]*>/g, "");
  }
}
/* =========================================================
   Counter
   ========================================================= */
function updateTileCounter(tile) {
  const counter = tile.querySelector(".photo-stack-counter");
  if (!counter) {
    return;
  }
  const photos = tile._photos || [];
  const currentIndex = Number(tile.dataset.photoIndex || 0);
  if (photos.length <= 1) {
    counter.hidden = true;
    return;
  }
  counter.hidden = false;
  counter.textContent = `${currentIndex + 1} / ${photos.length}`;
}
/* =========================================================
   Change image smoothly
   ========================================================= */
async function changeTilePhoto(tile, direction = 1, wrap = true) {
  if (tile.classList.contains("is-changing")) {
    return;
  }
  const photos = tile._photos || [];
  if (photos.length <= 1) {
    return;
  }
  const currentIndex = Number(tile.dataset.photoIndex || 0);
  let nextIndex = currentIndex + direction;
  /*
        MOBILE:
        stop at first / last image.
        DESKTOP:
        wrap around if wrap === true.
    */
  if (wrap) {
    nextIndex = (nextIndex + photos.length) % photos.length;
  } else {
    if (nextIndex < 0 || nextIndex >= photos.length) {
      return;
    }
  }
  const nextPhoto = photos[nextIndex];
  tile.classList.add("is-changing");
  try {
    const cachedMedia = await preloadPhoto(nextPhoto);
    const nextMedia = cachedMedia.cloneNode(true);
    prepareMedia(nextMedia, nextPhoto);
    nextMedia.classList.add("incoming-media");
    nextMedia.classList.add(direction > 0 ? "from-right" : "from-left");
    const currentMedia = tile.querySelector(":scope > .current-media");
    const currentOverlay = tile.querySelector(
      ":scope > .overlay:not(.incoming-overlay)",
    );
    const nextOverlay = createOverlay(nextPhoto);
    nextOverlay.classList.add("incoming-overlay");
    tile.insertBefore(nextMedia, currentOverlay || tile.firstChild);
    tile.appendChild(nextOverlay);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextMedia.classList.add("is-entering");
        if (currentMedia) {
          currentMedia.classList.add(
            direction > 0 ? "exit-left" : "exit-right",
          );
        }
        if (currentOverlay) {
          currentOverlay.classList.add("is-exiting");
        }
      });
    });
    window.setTimeout(() => {
      currentMedia?.remove();
      currentOverlay?.remove();
      nextMedia.classList.remove(
        "incoming-media",
        "from-right",
        "from-left",
        "is-entering",
      );
      nextMedia.classList.add("current-media");
      nextOverlay.classList.remove("incoming-overlay");
      tile.dataset.photoIndex = String(nextIndex);
      updateTileCounter(tile);
      tile.classList.remove("is-changing");
      /*
                    Preload the next valid image.
                */
      let preloadIndex = nextIndex + 1;
      if (preloadIndex < photos.length) {
        preloadPhoto(photos[preloadIndex]).catch(() => {});
      } else if (wrap) {
        preloadPhoto(photos[0]).catch(() => {});
      }
    }, 300);
  } catch (error) {
    console.error("Could not load next photo:", error);
    tile.classList.remove("is-changing");
  }
}
/* =========================================================
   Subtle mouse tilt
   ========================================================= */
function applyTileTilt(tile, event) {
  if (window.matchMedia("(hover: none)").matches) {
    return;
  }
  const rect = tile.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  const rotateY = (x - 0.5) * 2;
  const rotateX = (0.5 - y) * 1.8;
  tile.style.setProperty("--tile-rotate-x", `${rotateX}deg`);
  tile.style.setProperty("--tile-rotate-y", `${rotateY}deg`);
}
function resetTileTilt(tile) {
  tile.style.setProperty("--tile-rotate-x", "0deg");
  tile.style.setProperty("--tile-rotate-y", "0deg");
}
/* =========================================================
   Mobile full-screen photo viewer
   ========================================================= */
let mobileViewer = null;
let mobileViewerPhotos = [];
let mobileViewerIndex = 0;
let scale = 1;
let translateX = 0;
let translateY = 0;
let mobileViewerChanging = false;
function ensureMobileViewer() {
  if (mobileViewer) {
    return mobileViewer;
  }
  const viewer = document.createElement("div");
  viewer.className = "mobile-photo-viewer";
  viewer.setAttribute("aria-hidden", "true");
  viewer.innerHTML = `
        <button
            class="mobile-viewer-close"
            type="button"
            aria-label="Close photo"
        >
            ×
        </button>
        <div class="mobile-viewer-stage"></div>
        <div class="mobile-viewer-info"></div>
        <div class="mobile-viewer-counter"></div>
    `;
  document.body.appendChild(viewer);
  const stage = viewer.querySelector(".mobile-viewer-stage");
  const closeButton = viewer.querySelector(".mobile-viewer-close");
  /* =====================================================
       Viewer helpers
       ===================================================== */
  const activePointers = new Map();
  let gesture = null;
  let pinch = null;
  let lastTapTime = 0;
  let tapTimer = null;
  function getViewerMedia() {
    return stage.querySelector(".mobile-viewer-media");
  }
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
  function clampScale(value) {
    return clamp(value, 1, 4);
  }
  function clampPan() {
    if (scale <= 1) {
      translateX = 0;
      translateY = 0;
      return;
    }
    /*
            Prevent the photo from being dragged
            infinitely away from the screen.
        */
    const maxX = (stage.clientWidth * (scale - 1)) / 2;
    const maxY = (stage.clientHeight * (scale - 1)) / 2;
    translateX = clamp(translateX, -maxX, maxX);
    translateY = clamp(translateY, -maxY, maxY);
  }
  function applyTransform(animate = false) {
    const media = getViewerMedia();
    if (!media) {
      return;
    }
    media.classList.toggle("zoom-settling", animate);
    media.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    if (animate) {
      window.setTimeout(() => {
        media.classList.remove("zoom-settling");
      }, 180);
    }
  }
  function resetZoom(animate = false) {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform(animate);
  }
  function getDistance(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }
  function getMidpoint(a, b) {
    return {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    };
  }
  /*
        Zoom around the point that was tapped
        instead of always zooming around the
        exact middle of the screen.
    */
  function zoomToPoint(targetScale, clientX, clientY) {
    const nextScale = clampScale(targetScale);
    if (nextScale <= 1) {
      resetZoom(true);
      return;
    }
    const rect = stage.getBoundingClientRect();
    const focalX = clientX - rect.left - rect.width / 2;
    const focalY = clientY - rect.top - rect.height / 2;
    const ratio = nextScale / scale;
    translateX = ratio * translateX + (1 - ratio) * focalX;
    translateY = ratio * translateY + (1 - ratio) * focalY;
    scale = nextScale;
    clampPan();
    applyTransform(true);
  }
  /* =====================================================
       Single tap / double tap
       ===================================================== */
  function handleTap(clientX, clientY) {
    const now = Date.now();
    const isDoubleTap = now - lastTapTime < 280;
    if (isDoubleTap) {
      window.clearTimeout(tapTimer);
      tapTimer = null;
      lastTapTime = 0;
      /*
                Double tap:
                1x -> 2.5x
                zoomed -> 1x
            */
      if (scale > 1.01) {
        resetZoom(true);
      } else {
        zoomToPoint(2.5, clientX, clientY);
      }
      return;
    }
    lastTapTime = now;
    /*
            Wait briefly to see whether this
            becomes a double tap.
            IMPORTANT:
            caption toggling is intentionally
            independent of zoom level.
        */
    tapTimer = window.setTimeout(() => {
      viewer.classList.toggle("show-info");
      lastTapTime = 0;
      tapTimer = null;
    }, 280);
  }
  /* =====================================================
       Close button
       ===================================================== */
  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeMobileViewer();
  });
  /* =====================================================
       Touch start
       ===================================================== */
  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") {
      return;
    }
    /*
                A live gesture should never
                inherit the double-tap easing.
            */
    getViewerMedia()?.classList.remove("zoom-settling");
    stage.setPointerCapture?.(event.pointerId);
    activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    /*
                First finger.
            */
    if (activePointers.size === 1) {
      gesture = {
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
        wasPinch: false,
      };
      return;
    }
    /*
                Second finger begins a pinch.
                From this point onward this
                entire gesture can NEVER be
                interpreted as a page swipe.
            */
    if (activePointers.size === 2) {
      const points = Array.from(activePointers.values());
      const midpoint = getMidpoint(points[0], points[1]);
      gesture.wasPinch = true;
      pinch = {
        distance: getDistance(points[0], points[1]),
        scale,
        translateX,
        translateY,
        centerX: midpoint.x,
        centerY: midpoint.y,
      };
    }
  });
  /* =====================================================
       Touch movement
       ===================================================== */
  stage.addEventListener(
    "pointermove",
    (event) => {
      if (
        event.pointerType !== "touch" ||
        !activePointers.has(event.pointerId)
      ) {
        return;
      }
      const previous = activePointers.get(event.pointerId);
      activePointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
      /* -------------------------------------------------
               PINCH ZOOM
               ------------------------------------------------- */
      if (activePointers.size >= 2 && pinch) {
        event.preventDefault();
        gesture.wasPinch = true;
        const points = Array.from(activePointers.values());
        const distance = getDistance(points[0], points[1]);
        const midpoint = getMidpoint(points[0], points[1]);
        if (pinch.distance <= 0) {
          return;
        }
        const nextScale = clampScale(pinch.scale * (distance / pinch.distance));
        const ratio = nextScale / pinch.scale;
        /*
                    Keep the point between the
                    fingers visually anchored.
                    Moving both fingers together
                    therefore naturally pans
                    while pinching too.
                */
        translateX =
          midpoint.x -
          pinch.centerX +
          ratio * pinch.translateX +
          (1 - ratio) * (pinch.centerX - stage.clientWidth / 2);
        translateY =
          midpoint.y -
          pinch.centerY +
          ratio * pinch.translateY +
          (1 - ratio) * (pinch.centerY - stage.clientHeight / 2);
        scale = nextScale;
        clampPan();
        /*
                    NO transition here.
                    Image follows fingers
                    directly.
                */
        applyTransform(false);
        return;
      }
      /* -------------------------------------------------
               ONE-FINGER PAN WHILE ZOOMED
               ------------------------------------------------- */
      if (activePointers.size === 1 && scale > 1.01 && previous) {
        event.preventDefault();
        const dx = event.clientX - previous.x;
        const dy = event.clientY - previous.y;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          gesture.moved = true;
        }
        translateX += dx;
        translateY += dy;
        clampPan();
        applyTransform(false);
        return;
      }
      /*
                At 1x we do not move the image.
                We merely measure the gesture
                so pointerup can decide whether
                it was a tap / swipe / close.
            */
      if (
        gesture &&
        (Math.abs(event.clientX - gesture.startX) > 8 ||
          Math.abs(event.clientY - gesture.startY) > 8)
      ) {
        gesture.moved = true;
      }
    },
    {
      passive: false,
    },
  );
  /* =====================================================
       Touch end
       ===================================================== */
  stage.addEventListener("pointerup", (event) => {
    if (event.pointerType !== "touch") {
      return;
    }
    activePointers.delete(event.pointerId);
    /*
                If this gesture EVER contained
                two fingers, do not allow the
                final finger lifting to become:
                - a caption tap
                - a left/right photo swipe
                - a swipe-down close
                This fixes the accidental
                next-photo jump after zooming.
            */
    if (gesture?.wasPinch) {
      if (activePointers.size === 0) {
        pinch = null;
        if (scale <= 1.02) {
          resetZoom(false);
        } else {
          clampPan();
          applyTransform(false);
        }
        gesture = null;
      }
      return;
    }
    if (!gesture) {
      return;
    }
    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const isTap = absX < 14 && absY < 14;
    const currentGesture = gesture;
    gesture = null;
    /* -------------------------------------------------
               ZOOMED:
               tap toggles caption,
               drag pans,
               NEVER change photo.
               ------------------------------------------------- */
    if (scale > 1.01) {
      if (isTap && !currentGesture.moved) {
        handleTap(event.clientX, event.clientY);
      }
      return;
    }
    /*
                Normalize tiny floating-point
                zoom leftovers back to 1x.
            */
    if (scale !== 1) {
      resetZoom(false);
    }
    /* -------------------------------------------------
               Swipe down closes viewer
               ------------------------------------------------- */
    if (deltaY > 80 && absY > absX) {
      closeMobileViewer();
      return;
    }
    /* -------------------------------------------------
               Horizontal navigation at 1x only
               ------------------------------------------------- */
    if (absX >= 50 && absX > absY) {
      changeMobileViewerPhoto(deltaX < 0 ? 1 : -1);
      return;
    }
    /* -------------------------------------------------
               Normal tap:
               ALWAYS toggle caption,
               including after zooming back out.
               ------------------------------------------------- */
    if (isTap) {
      handleTap(event.clientX, event.clientY);
    }
  });
  /* =====================================================
       Cancelled gesture
       ===================================================== */
  stage.addEventListener("pointercancel", (event) => {
    activePointers.delete(event.pointerId);
    if (activePointers.size === 0) {
      gesture = null;
      pinch = null;
    }
  });
  /* =====================================================
       Escape for desktop testing
       ===================================================== */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && viewer.classList.contains("active")) {
      closeMobileViewer();
    }
  });
  mobileViewer = viewer;
  return viewer;
}
function openMobileViewer(photos, startingIndex = 0) {
  /*
        Only use this viewer on touch/mobile
        devices. Desktop behavior stays as-is.
    */
  if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    return;
  }
  if (!Array.isArray(photos) || photos.length === 0) {
    return;
  }
  mobileViewerPhotos = photos;
  mobileViewerIndex = Math.max(0, Math.min(startingIndex, photos.length - 1));
  const viewer = ensureMobileViewer();
  viewer.classList.add("active", "show-info");
  viewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("mobile-viewer-open");
  renderMobileViewerPhoto();
}
function closeMobileViewer() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  if (!mobileViewer) {
    return;
  }
  mobileViewer.classList.remove("active", "show-info");
  mobileViewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("mobile-viewer-open");
  const stage = mobileViewer.querySelector(".mobile-viewer-stage");
  if (stage) {
    stage.innerHTML = "";
  }
}
async function changeMobileViewerPhoto(direction) {
  if (mobileViewerChanging || mobileViewerPhotos.length <= 1) {
    return;
  }

  const viewer = mobileViewer;
  const stage = viewer?.querySelector(".mobile-viewer-stage");
  const info = viewer?.querySelector(".mobile-viewer-info");
  const currentMedia = stage?.querySelector(".mobile-viewer-media");

  if (!viewer || !stage || !currentMedia) {
    return;
  }

  mobileViewerChanging = true;

  try {
    const nextIndex =
      (mobileViewerIndex + direction + mobileViewerPhotos.length) %
      mobileViewerPhotos.length;

    const nextPhoto = mobileViewerPhotos[nextIndex];
    const keepCaption = viewer.classList.contains("show-info");
    const moveX = direction > 0 ? -24 : 24;

    await preloadPhoto(nextPhoto).catch(() => null);

    currentMedia.classList.remove("zoom-settling");
    currentMedia.getAnimations().forEach((animation) => animation.cancel());

    const photoOut = currentMedia.animate(
      [
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) scale(1)",
        },
        {
          opacity: 0.86,
          transform: `translate3d(${moveX}px, 0, 0) scale(1)`,
        },
      ],
      {
        duration: 130,
        easing: "cubic-bezier(.4, 0, 1, 1)",
        fill: "forwards",
      },
    );

    const oldCaptionAnimations =
      keepCaption && info
        ? Array.from(info.children).map((element) =>
            element.animate(
              [
                {
                  opacity: 1,
                  transform: "translateY(0)",
                },
                {
                  opacity: 0,
                  transform: "translateY(5px)",
                },
              ],
              {
                duration: 100,
                easing: "ease-out",
                fill: "forwards",
              },
            ),
          )
        : [];

    await Promise.all([
      photoOut.finished.catch(() => {}),
      ...oldCaptionAnimations.map((animation) =>
        animation.finished.catch(() => {}),
      ),
    ]);

    mobileViewerIndex = nextIndex;
    scale = 1;
    translateX = 0;
    translateY = 0;

    renderMobileViewerPhoto();

    if (keepCaption) {
      viewer.classList.add("show-info");
    }

    const nextMedia = stage.querySelector(".mobile-viewer-media");

    nextMedia?.animate(
      [
        {
          opacity: 0.86,
          transform: `translate3d(${-moveX}px, 0, 0) scale(1)`,
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) scale(1)",
        },
      ],
      {
        duration: 180,
        easing: "cubic-bezier(.22, .61, .36, 1)",
      },
    );

    if (keepCaption && info) {
      Array.from(info.children).forEach((element, index) => {
        element.animate(
          [
            {
              opacity: 0,
              transform: "translateY(5px)",
            },
            {
              opacity: 1,
              transform: "translateY(0)",
            },
          ],
          {
            duration: 160,
            delay: index * 18,
            easing: "cubic-bezier(.22, .61, .36, 1)",
          },
        );
      });
    }
  } finally {
    window.setTimeout(() => {
      mobileViewerChanging = false;
    }, 190);
  }
}
function renderMobileViewerPhoto() {
  if (!mobileViewer || mobileViewerPhotos.length === 0) {
    return;
  }
  const photo = mobileViewerPhotos[mobileViewerIndex];
  const stage = mobileViewer.querySelector(".mobile-viewer-stage");
  const info = mobileViewer.querySelector(".mobile-viewer-info");
  const counter = mobileViewer.querySelector(".mobile-viewer-counter");
  stage.innerHTML = "";
  info.innerHTML = "";
  /*
        Full-screen image / video
    */
  const media = createMedia(photo);
  media.classList.add("mobile-viewer-media");
  stage.appendChild(media);
  /*
        Description
    */
  const metadata = getPhotoMetadata(photo);
  const title = document.createElement("div");
  title.className = "mobile-viewer-title";
  title.textContent = photo.title || "";
  info.appendChild(title);
  if (metadata.location) {
    const location = document.createElement("div");
    location.className = "mobile-viewer-location";
    location.textContent = metadata.location;
    info.appendChild(location);
  }
  if (metadata.date) {
    const date = document.createElement("div");
    date.className = "mobile-viewer-date";
    date.textContent = metadata.date;
    info.appendChild(date);
  }
  /*
        Example: 2 / 5
    */
  if (mobileViewerPhotos.length > 1) {
    counter.textContent = `${mobileViewerIndex + 1} / ${mobileViewerPhotos.length}`;
    counter.hidden = false;
  } else {
    counter.hidden = true;
  }
  /*
        Preload next image.
    */
  if (mobileViewerPhotos.length > 1) {
    const nextIndex = (mobileViewerIndex + 1) % mobileViewerPhotos.length;
    preloadPhoto(mobileViewerPhotos[nextIndex]).catch(() => {});
  }
}
/* =========================================================
   Interactive month tile
   ========================================================= */
function createInteractiveTile(photos) {
  photos.sort((a, b) => getPrecisePhotoDate(b) - getPrecisePhotoDate(a));
  const tile = document.createElement("div");
  tile.className = "container photo-tile";
  tile._photos = photos;
  tile.dataset.photoIndex = "0";
  /* =====================================================
       First photo
       ===================================================== */
  const firstPhoto = photos[0];
  const firstMedia = createMedia(firstPhoto);
  if (firstMedia instanceof HTMLImageElement) {
    firstMedia.loading = "lazy";
  }
  firstMedia.classList.add("tile-media", "current-media");
  tile.appendChild(firstMedia);
  tile.appendChild(createOverlay(firstPhoto));
  /* =====================================================
       Counter
       ===================================================== */
  const counter = document.createElement("div");
  counter.className = "photo-stack-counter";
  counter.setAttribute("aria-hidden", "true");
  tile.appendChild(counter);
  updateTileCounter(tile);
  /* =====================================================
       Mobile touch handling
       ===================================================== */
  let touchStartX = null;
  let touchStartY = null;
  let lastTouchTime = 0;
  tile.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") {
      return;
    }
    touchStartX = event.clientX;
    touchStartY = event.clientY;
  });
  tile.addEventListener("pointerup", (event) => {
    if (event.pointerType !== "touch") {
      return;
    }
    lastTouchTime = Date.now();
    if (touchStartX === null || touchStartY === null) {
      return;
    }
    const deltaX = event.clientX - touchStartX;
    const deltaY = event.clientY - touchStartY;
    touchStartX = null;
    touchStartY = null;
    /*
                If the user was scrolling down
                the page, don't open the viewer.
            */
    if (Math.abs(deltaY) > 20 && Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }
    /*
                Only a normal tap opens the
                full-screen viewer.
            */
    if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
      const currentIndex = Number(tile.dataset.photoIndex || 0);
      openMobileViewer(tile._photos || [], currentIndex);
    }
  });
  /* =====================================================
       Desktop click
       ===================================================== */
  tile.addEventListener("click", (event) => {
    /*
                Safari/iPhone may fire a click
                immediately after pointerup.
                Ignore that duplicate click.
            */
    if (Date.now() - lastTouchTime < 600) {
      return;
    }
    if (photos.length <= 1) {
      return;
    }
    const rect = tile.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const direction = clickX < rect.width / 2 ? -1 : 1;
    /*
                Desktop keeps wrapping:
                last -> first
                first -> last
            */
    changeTilePhoto(tile, direction, true);
  });
  /* =====================================================
       Desktop mouse tilt
       ===================================================== */
  tile.addEventListener("pointermove", (event) => {
    if (event.pointerType === "mouse") {
      applyTileTilt(tile, event);
    }
  });
  tile.addEventListener("pointerleave", () => {
    resetTileTilt(tile);
  });
  return tile;
}
/* =========================================================
   Photography reveal and loading
   ========================================================= */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const desktopPhotography = window.matchMedia("(min-width: 701px)").matches;
const photoRevealObserver =
  typeof IntersectionObserver === "undefined"
    ? null
    : new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const tile = entry.target;
            tile.classList.add("is-visible");

            const photos = tile._photos || [];
            if (photos.length > 1) {
              preloadPhoto(photos[1]).catch(() => {});
            }

            observer.unobserve(tile);
          });
        },
        {
          rootMargin: "180px 0px 180px 0px",
          threshold: 0.03,
        },
      );

function prepareTileReveal(tile, index, columnIndex) {
  if (!desktopPhotography || prefersReducedMotion || !photoRevealObserver) {
    tile.classList.add("is-visible");
    return;
  }

  const offsets = [-34, -14, 14, 34];
  tile.classList.add("photo-reveal");
  tile.style.setProperty("--reveal-x", `${offsets[columnIndex] || 0}px`);
  tile.style.setProperty("--reveal-delay", `${Math.min(index, 7) * 55}ms`);
  photoRevealObserver.observe(tile);
}

/* =========================================================
   Load Photography
   ========================================================= */
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
    grid.innerHTML = "";
    const monthGroups = new Map();
    photos.forEach((photo, index) => {
      const month = getPhotoMonth(photo);
      const key = month ? month.key : `undated-${index}`;
      if (!monthGroups.has(key)) {
        monthGroups.set(key, {
          month,
          photos: [],
        });
      }
      monthGroups.get(key).photos.push(photo);
    });
    const groups = Array.from(monthGroups.values());
    groups.sort((a, b) => {
      if (!a.month && !b.month) {
        return 0;
      }
      if (!a.month) {
        return 1;
      }
      if (!b.month) {
        return -1;
      }
      if (a.month.year !== b.month.year) {
        return b.month.year - a.month.year;
      }
      return b.month.month - a.month.month;
    });
    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    const columnCount = isMobile ? 1 : 4;
    const columns = Array.from(
      {
        length: columnCount,
      },
      () => {
        const column = document.createElement("div");
        column.className = "column";
        grid.appendChild(column);
        return column;
      },
    );
    groups.forEach((group, index) => {
      const tile = createInteractiveTile(group.photos);
      const columnIndex = index % columns.length;
      prepareTileReveal(tile, index, columnIndex);
      columns[columnIndex].appendChild(tile);
    });
  } catch (error) {
    console.error("Photography could not be loaded:", error);
    const message = document.createElement("p");
    message.textContent = "Photography could not be loaded.";
    grid.appendChild(message);
  }
}
loadPhotography();
