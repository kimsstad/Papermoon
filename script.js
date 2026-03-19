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
    title: "Calm Waters Plett",
    category: "Web Design & Dev",
    role: "End-to-End Website Build",
    year: "2024",
    img: "./pics/sewell1.webp",
    caseStudyImg: "./pics/sewell2.webp",
    intro:
      "A full website design and development project for a Plettenberg Bay holiday rental and property management agency.",
    sectionTitle: "The Project",
    copy: [
      "Calm Waters Plett needed a website built from the ground up to present its holiday home rentals, guesthouse offering, and property management services with more clarity and confidence. The brief was to create a site that felt calm and welcoming while helping both guests and property owners quickly understand what the business offers.",
      "We handled the project from start to finish, shaping the site structure, messaging direction, visual design, and front-end build. The final website reflects the brand's 'your home is our home' philosophy, highlights the appeal of Plettenberg Bay, and gives the business a polished digital presence it can keep growing with.",
    ],
    impactTitle: "Impact",
    stats: [
      {
        label: "140%",
        copy: "Increase in engagement",
      },
      {
        label: "2.5x",
        copy: "Longer session duration",
      },
    ],
  },
  {
    id: 2,
    title: "The World Can Wait",
    category: "Band Website",
    role: "Website Design & Dev",
    year: "2023",
    img: "./pics/guitar.webp",
    intro:
      "A website for a Namibian punk-rock band, built to capture identity, energy, and atmosphere without losing clarity.",
    sectionTitle: "The Challenge",
    copy: [
      "The World Can Wait needed a site that felt true to the band's punk-rock identity while still presenting their music, visuals, and story in a way that felt intentional and easy to navigate. The challenge was creating something expressive and raw without letting the experience become chaotic.",
      "We built the website from concept through execution, shaping a visual direction that balances attitude with structure. The final result gives the band a stronger digital presence, a distinct online world, and a platform that feels aligned with their sound.",
    ],
    impactTitle: "Impact",
    stats: [
      {
        label: "140%",
        copy: "Increase in engagement",
      },
      {
        label: "2.5x",
        copy: "Longer session duration",
      },
    ],
  },
  {
    id: 3,
    title: "Kim Stadtherr Music",
    category: "Musician Website",
    role: "Website Design & Dev",
    year: "2023",
    img: "./pics/kim1.webp",
    intro:
      "A personal artist and musician website designed to feel expressive, atmospheric, and closely tied to the music itself.",
    sectionTitle: "The Challenge",
    copy: [
      "Kim Stadtherr Music needed a website that could hold music, identity, and visual atmosphere in one place without feeling overly polished or disconnected from the artist's voice. The goal was to create something personal and memorable while still making key content easy to navigate.",
      "We developed the site from concept through build, shaping an experience that balances clarity with mood. The finished website gives the project a stronger digital presence and creates a more intentional space for listeners to connect with the music.",
    ],
    impactTitle: "Impact",
    stats: [
      {
        label: "Audience",
        copy: "A clearer home for music, artist identity, and discovery.",
      },
      {
        label: "Atmosphere",
        copy: "A website that feels aligned with the tone and world of the project.",
      },
    ],
  },
  {
    id: 4,
    title: "JP Padel Coaching",
    category: "Coaching Website",
    role: "Website Design & Dev",
    year: "2024",
    img: "./pics/padel1.webp",
    intro:
      "A coaching website designed to feel focused, polished, and approachable while giving the brand a stronger digital presence.",
    sectionTitle: "The Challenge",
    copy: [
      "JP Padel Coaching needed a website that could present coaching services clearly while still feeling premium and personal. The challenge was finding the right balance between credibility, usability, and a visual identity that felt modern rather than generic.",
      "We designed and built a site that gives the coaching brand a clearer structure, stronger presence, and a more confident online home. The final result supports enquiries, communicates expertise, and makes the offering easier to understand at a glance.",
    ],
    impactTitle: "Impact",
    stats: [
      {
        label: "Clarity",
        copy: "A cleaner path to services, positioning, and enquiry actions.",
      },
      {
        label: "Presence",
        copy: "A stronger coaching brand translated into a more polished web experience.",
      },
    ],
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
  const roleNode = document.querySelector("[data-project-role]");
  const yearNode = document.querySelector("[data-project-year]");
  const imageNode = document.querySelector("[data-project-image]");
  const introNode = document.querySelector("[data-project-intro]");
  const sectionTitleNode = document.querySelector("[data-project-section-title]");
  const copyNodes = document.querySelectorAll("[data-project-copy]");
  const impactTitleNode = document.querySelector("[data-project-impact-title]");
  const statLabelNodes = document.querySelectorAll("[data-project-stat-label]");
  const statCopyNodes = document.querySelectorAll("[data-project-stat-copy]");

  if (!titleNode || !yearNode || !imageNode) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const projectId = Number(params.get("id"));
  const project = projectsData.find((item) => item.id === projectId) || projectsData[0];

  titleNode.textContent = project.title;
  if (roleNode && project.role) {
    roleNode.textContent = project.role;
  }
  yearNode.textContent = project.year;
  imageNode.setAttribute("src", project.caseStudyImg || project.img);
  imageNode.setAttribute("alt", project.title);
  document.title = `${project.title} | Papermoon`;

  if (introNode && project.intro) {
    introNode.textContent = project.intro;
  }

  if (sectionTitleNode && project.sectionTitle) {
    sectionTitleNode.textContent = project.sectionTitle;
  }

  if (project.copy?.length) {
    copyNodes.forEach((node, index) => {
      node.textContent = project.copy[index] || "";
    });
  }

  if (impactTitleNode && project.impactTitle) {
    impactTitleNode.textContent = project.impactTitle;
  }

  if (project.stats?.length) {
    statLabelNodes.forEach((node, index) => {
      node.textContent = project.stats[index]?.label || "";
    });

    statCopyNodes.forEach((node, index) => {
      node.textContent = project.stats[index]?.copy || "";
    });
  }
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
