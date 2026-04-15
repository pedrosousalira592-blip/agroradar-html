const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const liveDate = document.querySelector(".js-live-date");
const liveTime = document.querySelector(".js-live-time");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const feedback = document.querySelector("[data-form-feedback]");

const weatherData = {
  sorriso: {
    label: "Sorriso (MT)",
    temp: "29°C",
    condition: "Sol entre nuvens, chuva rápida no fim da tarde e boa umidade no solo.",
    rain: "62%",
    humidity: "71%",
    wind: "12 km/h",
    window: "pulverização até 15h"
  },
  "luis-eduardo": {
    label: "Luís Eduardo (BA)",
    temp: "31°C",
    condition: "Calor persistente, pancadas isoladas e atenção para vento mais seco no meio da tarde.",
    rain: "38%",
    humidity: "56%",
    wind: "16 km/h",
    window: "plantio com cautela"
  },
  cascavel: {
    label: "Cascavel (PR)",
    temp: "24°C",
    condition: "Céu encoberto, chuva moderada e ambiente favorável para recomposição hídrica.",
    rain: "78%",
    humidity: "83%",
    wind: "10 km/h",
    window: "colheita após 14h"
  }
};

function updateLiveStamp() {
  const now = new Date();
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (liveDate) {
    liveDate.textContent = dateFormatter.format(now);
  }

  if (liveTime) {
    liveTime.textContent = timeFormatter.format(now);
  }
}

function setWeather(city) {
  const selected = weatherData[city];

  if (!selected) {
    return;
  }

  document.querySelector("[data-weather-city-label]").textContent = selected.label;
  document.querySelector("[data-weather-temp]").textContent = selected.temp;
  document.querySelector("[data-weather-condition]").textContent = selected.condition;
  document.querySelector("[data-weather-rain]").textContent = selected.rain;
  document.querySelector("[data-weather-humidity]").textContent = selected.humidity;
  document.querySelector("[data-weather-wind]").textContent = selected.wind;
  document.querySelector("[data-weather-window]").textContent = selected.window;

  document.querySelectorAll("[data-city]").forEach((button) => {
    const isActive = button.dataset.city === city;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

if (header) {
  const toggleHeaderState = () => {
    header.classList.toggle("is-compact", window.scrollY > 24);
  };

  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState, { passive: true });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-city]").forEach((button) => {
  button.addEventListener("click", () => {
    setWeather(button.dataset.city);
  });
});

if (newsletterForm && feedback) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "Inscrição recebida. O resumo do AgroRadar chega na próxima edição.";
    newsletterForm.reset();
  });
}

updateLiveStamp();
setInterval(updateLiveStamp, 60000);
setWeather("sorriso");
