// i18n
const params = new URLSearchParams(window.location.search);
const langParam = params.get("lang")?.toLowerCase();

const supportedLanguages = ["en", "fr", "de", "es", "ja", "pt"];

let lang = supportedLanguages.includes(langParam)
  ? langParam
  : navigator.language.slice(0, 2).toLowerCase();

if (!supportedLanguages.includes(lang)) {
  lang = "en";
}

fetch(`./i18n/${lang}.json`)
  .then((res) => res.json())
  .then((dictionary) => {
    translatePage(dictionary);
  })
  .catch((error) => {
    console.error("Translation loading failed:", error);
  });

function translatePage(dictionary) {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    let translation = dictionary[key];

    if (translation && translation.includes("{{price}}")) {
      const match = el.innerHTML.match(/\$?[\d.,]+\b/);
      const price = match ? match[0] : "";
      translation = translation.replace("{{price}}", price);
    }

    if (translation) {
      el.innerHTML = translation;
    }
  });
}

if (lang === "fr" || lang === "de") {
  const offerHeader = document.querySelectorAll(".offer-item-header");
  const offerPrice = document.querySelectorAll(".offer-item-price");
  const header = document.querySelector(".baner-header");
  const linkFooter = document.querySelectorAll(".nav-item a");
  if (linkFooter) {
    linkFooter.forEach((link) => {
      link.style.fontSize = "9px";
    });
  }
  if (header) {
    header.style.fontSize = "40px";
  }
  if (offerHeader) {
    offerHeader.forEach((el) => (el.style.fontSize = "14px"));
  }
  if (offerPrice) {
    offerPrice.forEach((el) => (el.style.fontSize = "12px"));
  }
}
// events
const offerItems = document.querySelectorAll(".offer-item");
const bestOffer = document.querySelector(".bestOffer");
const continueBtn = document.querySelector(".offer-button");
const gradient = document.querySelector(".gradient");

offerItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    offerItems.forEach((el) => el.classList.remove("offer-item_active"));
    item.classList.add("offer-item_active");

    if (index === 0) {
      bestOffer.classList.add("bestOffer_active");
      gradient.style.display = "none";
    } else {
      gradient.style.display = "block";
      bestOffer.classList.remove("bestOffer_active");
    }
  });
});

continueBtn.addEventListener("click", () => {
  let activeIndex = -1;

  offerItems.forEach((offer, index) => {
    if (offer.classList.contains("offer-item_active")) {
      activeIndex = index;
    }
  });

  if (activeIndex === 0) {
    window.location.href = "https://apple.com/";
  } else if (activeIndex === 1) {
    window.location.href = "https://google.com/";
  }
});
