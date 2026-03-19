const header = document.querySelector(".site-header");
const themeSections = document.querySelectorAll("[data-theme]");
const revealElements = document.querySelectorAll(".reveal-up, .reveal-right");
const navLinks = document.querySelectorAll("[data-nav-link]");
const navTargets = document.querySelectorAll("[data-nav-section]");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const projectsData = [
  {
    id: 1,
    title: "Lumina",
    category: "E-Commerce",
    year: "2024",
    img: "https://images.unsplash.com/photo-1637536701369-f815af927b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcG9ydHJhaXQlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc3MzgyMjAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Overture",
    category: "Portfolio",
    year: "2023",
    img: "https://images.unsplash.com/photo-1622551557390-f20221b206aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwb2dyYXBoeSUyMG1hZ2F6aW5lJTIwbGF5b3V0fGVufDF8fHx8MTc3MzgyMjAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Archiva",
    category: "Corporate",
    year: "2023",
    img: "https://images.unsplash.com/photo-1769283991436-9ce2354aaaf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZXxlbnwxfHx8fDE3NzM4MjIwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Vibe Studio",
    category: "Agency",
    year: "2024",
    img: "https://images.unsplash.com/photo-1760143769741-9a215acf44cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGlnaXRhbCUyMGFydCUyMGFic3RyYWN0JTIwYmx1ZXxlbnwxfHx8fDE3NzM4MjIwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];
const touchInteractiveElements = document.querySelectorAll(
  ".hero-title-group, .service-item, .project-card, .service-card, .work-card, .light-action, .dark-action, .contact-email"
);

function setCurrentYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function updateHeaderTheme() {
  const probeY = 40;
  let nextTheme = "dark";

  themeSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom >= probeY) {
      nextTheme = section.dataset.theme || "dark";
    }
  });

  header.classList.toggle("is-dark", nextTheme === "dark");
  header.classList.toggle("is-light", nextTheme === "light");
}

function updateHeroParallax() {
  if (prefersReducedMotion) {
    return;
  }

  const scrollY = window.scrollY;
  const capped = Math.min(scrollY, 1000);
  const offset = (capped / 1000) * 300;
  document.documentElement.style.setProperty("--hero-parallax", `${offset}px`);
}

function setupRevealObserver() {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function updateActiveNavLink() {
  const probeY = window.innerHeight * 0.35;
  let currentSection = "";

  navTargets.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom >= probeY) {
      currentSection = section.dataset.navSection || "";
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.dataset.navLink || "";
    link.classList.toggle("is-active", targetId === currentSection);
  });
}

function setMobileMenuState(isOpen) {
  if (!mobileMenuToggle || !mobileMenu) {
    return;
  }

  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

function setupMobileMenu() {
  if (!mobileMenuToggle || !mobileMenu) {
    return;
  }

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    setMobileMenuState(!isOpen);
  });

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener("click", () => setMobileMenuState(false));
  }

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => setMobileMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenuState(false);
    }
  });
}

function setupTouchInteractions() {
  if (!("ontouchstart" in window) && navigator.maxTouchPoints === 0) {
    return;
  }

  const clearTouchStates = (activeElement = null) => {
    touchInteractiveElements.forEach((element) => {
      if (element !== activeElement) {
        element.classList.remove("is-touch-active");
      }
    });
  };

  touchInteractiveElements.forEach((element) => {
    element.addEventListener(
      "touchstart",
      () => {
        clearTouchStates(element);
        element.classList.add("is-touch-active");
      },
      { passive: true }
    );

    element.addEventListener("touchend", () => {
      window.setTimeout(() => {
        element.classList.remove("is-touch-active");
      }, 180);
    });

    element.addEventListener("touchcancel", () => {
      element.classList.remove("is-touch-active");
    });
  });

  document.addEventListener("touchstart", (event) => {
    if (!event.target.closest(".hero-title-group, .service-item, .project-card, .service-card, .work-card, .light-action, .dark-action, .contact-email")) {
      clearTouchStates();
    }
  });
}

function populateCaseStudyPage() {
  const titleNode = document.querySelector("[data-project-title]");
  const yearNode = document.querySelector("[data-project-year]");
  const imageNode = document.querySelector("[data-project-image]");

  if (!titleNode || !yearNode || !imageNode) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const projectId = Number(params.get("id"));
  const project = projectsData.find((item) => item.id === projectId) || projectsData[0];

  titleNode.textContent = project.title;
  yearNode.textContent = project.year;
  imageNode.setAttribute("src", project.img);
  imageNode.setAttribute("alt", project.title);
  document.title = `${project.title} | Papermoon`;
}

function finalizeLoadAnimations() {
  if (prefersReducedMotion) {
    return;
  }

  const loadAnimatedElements = document.querySelectorAll(".reveal-load");

  loadAnimatedElements.forEach((element) => {
    element.addEventListener(
      "animationend",
      () => {
        element.classList.add("is-visible");
        element.classList.remove("reveal-load");
      },
      { once: true }
    );
  });
}

function onScroll() {
  updateHeaderTheme();
  updateHeroParallax();
  updateActiveNavLink();
}

setCurrentYear();
setMobileMenuState(false);
setupMobileMenu();
setupTouchInteractions();
populateCaseStudyPage();
finalizeLoadAnimations();
setupRevealObserver();
onScroll();

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    setMobileMenuState(false);
  }

  onScroll();
});
