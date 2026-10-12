
/* Mobile navigation */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


/* Hero slideshow with changing pictures and write-ups */
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDotsContainer = document.getElementById("heroDots");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let heroIndex = 0;
let heroTimer;

heroSlides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show slide ${index + 1}`);

  dot.addEventListener("click", () => {
    showHeroSlide(index);
    restartHeroTimer();
  });

  heroDotsContainer.appendChild(dot);
});

const heroDots = Array.from(heroDotsContainer.querySelectorAll("button"));

function showHeroSlide(index) {
  heroIndex = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === heroIndex);
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === heroIndex);
  });
}

function nextHeroSlide() {
  showHeroSlide(heroIndex + 1);
}

function previousHeroSlide() {
  showHeroSlide(heroIndex - 1);
}

function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, 1500);
}

function restartHeroTimer() {
  startHeroTimer();
}

heroNext.addEventListener("click", () => {
  nextHeroSlide();
  restartHeroTimer();
});

heroPrev.addEventListener("click", () => {
  previousHeroSlide();
  restartHeroTimer();
});

showHeroSlide(0);
startHeroTimer();


/* Product gallery: load images 1.jpeg to 20.jpeg */
const galleryTrack = document.getElementById("galleryTrack");
const galleryDotsContainer = document.getElementById("galleryDots");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

const totalProducts = 20;
let galleryIndex = 0;
let galleryTimer;

for (let number = 1; number <= totalProducts; number++) {
  const card = document.createElement("div");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = `${number}.jpeg`;
  image.alt = `De Great Amalite Ventures product ${number}`;
  image.loading = number <= 3 ? "eager" : "lazy";

  card.appendChild(image);
  galleryTrack.appendChild(card);
}

function getVisibleProducts() {
  if (window.innerWidth <= 700) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  return 3;
}

function getMaximumGalleryIndex() {
  return Math.max(0, totalProducts - getVisibleProducts());
}

function createGalleryDots() {
  galleryDotsContainer.innerHTML = "";

  for (let i = 0; i <= getMaximumGalleryIndex(); i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show product position ${i + 1}`);

    dot.addEventListener("click", () => {
      galleryIndex = i;
      updateGallery();
      restartGalleryTimer();
    });

    galleryDotsContainer.appendChild(dot);
  }
}

function updateGallery() {
  const cards = Array.from(galleryTrack.children);

  if (!cards.length) {
    return;
  }

  galleryIndex = Math.min(galleryIndex, getMaximumGalleryIndex());
  galleryIndex = Math.max(galleryIndex, 0);

  const cardWidth = cards[0].getBoundingClientRect().width;
  const trackStyle = window.getComputedStyle(galleryTrack);
  const gap = parseFloat(trackStyle.gap) || 0;
  const distance = galleryIndex * (cardWidth + gap);

  galleryTrack.style.transform = `translateX(-${distance}px)`;

  const dots = Array.from(galleryDotsContainer.querySelectorAll("button"));

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === galleryIndex);
  });
}

function nextGallerySlide() {
  if (galleryIndex >= getMaximumGalleryIndex()) {
    galleryIndex = 0;
  } else {
    galleryIndex++;
  }

  updateGallery();
}

function previousGallerySlide() {
  if (galleryIndex <= 0) {
    galleryIndex = getMaximumGalleryIndex();
  } else {
    galleryIndex--;
  }

  updateGallery();
}

function startGalleryTimer() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(nextGallerySlide, 1000);
}

function restartGalleryTimer() {
  startGalleryTimer();
}

galleryNext.addEventListener("click", () => {
  nextGallerySlide();
  restartGalleryTimer();
});

galleryPrev.addEventListener("click", () => {
  previousGallerySlide();
  restartGalleryTimer();
});

function refreshGallery() {
  createGalleryDots();
  updateGallery();
}

window.addEventListener("resize", refreshGallery);

refreshGallery();
startGalleryTimer();


/* Floating Contact Us panel */
const floatingContactButton =
  document.getElementById("floatingContactButton");

const floatingContactPanel =
  document.getElementById("floatingContactPanel");

const closeContactPanel =
  document.getElementById("closeContactPanel");

function toggleContactPanel(forceOpen) {
  const shouldOpen =
    typeof forceOpen === "boolean"
      ? forceOpen
      : floatingContactPanel.hidden;

  floatingContactPanel.hidden = !shouldOpen;
  floatingContactButton.setAttribute(
    "aria-expanded",
    String(shouldOpen)
  );
}

floatingContactButton.addEventListener("click", () => {
  toggleContactPanel();
});

closeContactPanel.addEventListener("click", () => {
  toggleContactPanel(false);
});

document.addEventListener("click", (event) => {
  const clickedInsidePanel =
    floatingContactPanel.contains(event.target);

  const clickedButton =
    floatingContactButton.contains(event.target);

  if (!clickedInsidePanel && !clickedButton) {
    toggleContactPanel(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleContactPanel(false);
  }
});


/* Send enquiry to WhatsApp */
const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const customerName =
    document.getElementById("customerName").value.trim();

  const customerPhone =
    document.getElementById("customerPhone").value.trim();

  const customerLocation =
    document.getElementById("customerLocation").value.trim();

  const customerEmail =
    document.getElementById("customerEmail").value.trim();

  const productNeeded =
    document.getElementById("productNeeded").value.trim();

  if (
    !customerName ||
    !customerPhone ||
    !customerLocation ||
    !customerEmail ||
    !productNeeded
  ) {
    alert("Please complete all fields before sending your enquiry.");
    return;
  }

  const emailField = document.getElementById("customerEmail");

  if (!emailField.checkValidity()) {
    alert("Please enter a valid email address.");
    emailField.focus();
    return;
  }

  const message =
    `Hello De Great Amalite Ventures,\n\n` +
    `My name is ${customerName}.\n` +
    `My phone number is ${customerPhone}.\n` +
    `My location is ${customerLocation}.\n` +
    `My email address is ${customerEmail}.\n\n` +
    `Product enquiry:\n${productNeeded}`;

  const whatsappNumber = "2348067351573";

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});


/* Current year in the footer */
document.getElementById("currentYear").textContent =
  new Date().getFullYear();
