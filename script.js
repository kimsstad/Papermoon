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
    website: "https://calmwatersplett.co.za/",
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
    mockups: [
      "./pics/cwphone.webp",
      "./pics/cwlaptop.webp",
    ],
    stats: [
      {
        label: "Reach",
        copy: "More people discovering the property.",
      },
      {
        label: "Conversion",
        copy: "More enquiries and bookings.",
      },
    ],
  },
  {
    id: 2,
    title: "The World Can Wait",
    website: "https://theworldcanwait.com/",
    category: "Band Website",
    role: "Website Design & Dev",
    year: "2024",
    img: "./pics/bandpic1.webp",
    intro:
      "A website for a Namibian punk-rock band, built to capture identity, energy, and atmosphere without losing clarity.",
    sectionTitle: "The Challenge",
    copy: [
      "The World Can Wait needed a site that felt true to the band's punk-rock identity while still presenting their music, visuals, and story in a way that felt intentional and easy to navigate. The challenge was creating something expressive and raw without letting the experience become chaotic.",
      "We built the website from concept through execution, shaping a visual direction that balances attitude with structure. The final result gives the band a stronger digital presence, a distinct online world, and a platform that feels aligned with their sound.",
    ],
    impactTitle: "Impact",
    mockups: [
      "./pics/worldcanwait1.webp",
      "./pics/worldcanwait2.webp",
    ],
    stats: [
      {
        label: "Clarity",
        copy: "Clearer access to music and content.",
      },
      {
        label: "Connection",
        copy: "Stronger link between the band and listeners.",
      },
    ],
  },
  {
    id: 3,
    title: "Kim Stadtherr",
    website: "https://www.kimstadtherr.com/",
    category: "Musician Website",
    role: "Website Design & Dev",
    year: "2025",
    img: "./pics/kim1.webp",
    intro:
      "A personal artist website built around a signal transmission concept, designed to feel immersive, atmospheric, and closely tied to the music itself.",
    sectionTitle: "The Challenge",
    copy: [
      "Kim Stadtherr's music needed a digital space that felt as intentional and atmospheric as the work itself, without relying on a conventional artist website structure.",
      "The site was built around a signal transmission concept, where songs exist as 'transmissions' and the interface behaves like a system. This creates a more immersive experience while still keeping key content clear and accessible.",
      "The result is a website that balances clarity with atmosphere, giving the music a distinctive, cohesive space to live online.",
    ],
    impactTitle: "Impact",
    mockups: [
      "./pics/ksphone.webp",
      "./pics/kslaptop.webp",
    ],
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
    title: "JB Padel",
    category: "Coaching Website",
    role: "Website Design",
    year: "2026",
    img: "./pics/padel1.webp",
    intro:
      "A coaching website designed to feel focused, polished, and approachable while giving the brand a stronger digital presence.",
    sectionTitle: "The Challenge",
    copy: [
      "JP Padel Coaching needed a website that could present coaching services clearly while still feeling premium and personal. The challenge was finding the right balance between credibility, usability, and a visual identity that felt modern rather than generic.",
      "We designed and built a site that gives the coaching brand a clearer structure, stronger presence, and a more confident online home. The final result supports enquiries, communicates expertise, and makes the offering easier to understand at a glance.",
    ],
    impactTitle: "Impact",
    mockups: [
      "./pics/JBphone.webp",
      "./pics/jblaptop.webp",
    ],
    stats: [
      {
        label: "Clarity",
        copy: "Clearer services and coaching structure.",
      },
      {
        label: "Conversion",
        copy: "More enquiries and session bookings.",
      },
    ],
  },
];
const touchInteractiveElements = document.querySelectorAll(
  ".hero-title-group, .service-item, .project-card, .service-card, .work-card, .light-action, .dark-action, .contact-email"
);
const socialPlatformMatchers = {
  instagram: /(^|\.)instagram\.com$/i,
  facebook: /(^|\.)facebook\.com$/i,
  tiktok: /(^|\.)tiktok\.com$/i,
  youtube: /(^|\.)youtube\.com$/i,
};

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
  const titleLinkNode = document.querySelector("[data-project-title-link]");
  const roleNode = document.querySelector("[data-project-role]");
  const yearNode = document.querySelector("[data-project-year]");
  const imageNode = document.querySelector("[data-project-image]");
  const introNode = document.querySelector("[data-project-intro]");
  const sectionTitleNode = document.querySelector("[data-project-section-title]");
  const copyNodes = document.querySelectorAll("[data-project-copy]");
  const impactTitleNode = document.querySelector("[data-project-impact-title]");
  const statLabelNodes = document.querySelectorAll("[data-project-stat-label]");
  const statCopyNodes = document.querySelectorAll("[data-project-stat-copy]");
  const mockupImages = document.querySelectorAll(".case-study-mockup img");

  if (!titleNode || !yearNode || !imageNode) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const projectId = Number(params.get("id"));
  const project = projectsData.find((item) => item.id === projectId) || projectsData[0];

  titleNode.textContent = project.title;
  if (titleLinkNode) {
    if (project.website) {
      titleLinkNode.setAttribute("href", project.website);
      titleLinkNode.setAttribute("target", "_blank");
      titleLinkNode.setAttribute("rel", "noreferrer");
      titleLinkNode.classList.remove("is-static");
      titleLinkNode.removeAttribute("aria-disabled");
    } else {
      titleLinkNode.removeAttribute("href");
      titleLinkNode.removeAttribute("target");
      titleLinkNode.removeAttribute("rel");
      titleLinkNode.classList.add("is-static");
      titleLinkNode.setAttribute("aria-disabled", "true");
    }
  }
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

  if (project.mockups?.length) {
    mockupImages.forEach((node, index) => {
      if (project.mockups[index]) {
        node.setAttribute("src", project.mockups[index]);
      }
    });
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

// GA4 tracking code
function runGaCallback(callback) {
  if (typeof callback === "function") {
    callback();
  }
}

function sendGaEvent(eventName, params, callback) {
  if (typeof window.gtag !== "function") {
    runGaCallback(callback);
    return;
  }

  let settled = false;
  const done = () => {
    if (settled) {
      return;
    }

    settled = true;
    runGaCallback(callback);
  };

  window.gtag("event", eventName, {
    ...params,
    transport_type: "beacon",
    event_callback: done,
  });

  window.setTimeout(done, 500);
}

function getTrackedLinkText(link) {
  const text = link.textContent?.trim();
  return text || link.getAttribute("aria-label") || link.getAttribute("title") || "";
}

function getTrackedLinkUrl(link) {
  const href = link.getAttribute("href");

  if (!href) {
    return "";
  }

  return new URL(href, window.location.href).href;
}

function isWhatsappUrl(url) {
  return /wa\.me|api\.whatsapp\.com|whatsapp\.com/i.test(url);
}

function getSocialPlatform(url) {
  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    return "";
  }

  const hostname = parsedUrl.hostname.toLowerCase();

  if (socialPlatformMatchers.instagram.test(hostname)) {
    return "instagram";
  }

  if (socialPlatformMatchers.facebook.test(hostname)) {
    return "facebook";
  }

  if (socialPlatformMatchers.tiktok.test(hostname)) {
    return "tiktok";
  }

  if (
    socialPlatformMatchers.youtube.test(hostname) ||
    hostname === "youtu.be"
  ) {
    return "youtube";
  }

  return "";
}

function shouldDelayTrackedNavigation(event, link) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !link.hasAttribute("download") &&
    (!link.target || link.target === "_self")
  );
}

function setupGaLinkTracking() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest("a[href]");

    if (!link) {
      return;
    }

    const linkUrl = getTrackedLinkUrl(link);

    if (!linkUrl) {
      return;
    }

    const linkText = getTrackedLinkText(link);
    let eventName = "";
    let params = null;

    if (isWhatsappUrl(linkUrl)) {
      eventName = "contact_click";
      params = {
        contact_method: "whatsapp",
        link_text: linkText,
        link_url: linkUrl,
        page_location: window.location.href,
      };
    } else {
      const socialPlatform = getSocialPlatform(linkUrl);

      if (!socialPlatform) {
        return;
      }

      eventName = "social_click";
      params = {
        social_platform: socialPlatform,
        link_text: linkText,
        link_url: linkUrl,
        page_location: window.location.href,
      };
    }

    if (!shouldDelayTrackedNavigation(event, link)) {
      sendGaEvent(eventName, params);
      return;
    }

    event.preventDefault();
    sendGaEvent(eventName, params, () => {
      window.location.assign(linkUrl);
    });
  });
}

function getTrackedFormName(form) {
  return form.dataset.formName || form.getAttribute("name") || form.id || "form";
}

function setFormStatus(form, message) {
  const statusNode = form.querySelector("[data-form-status]");

  if (!statusNode) {
    return;
  }

  statusNode.textContent = message;
  statusNode.hidden = false;
}

function clearFormStatus(form) {
  const statusNode = form.querySelector("[data-form-status]");

  if (!statusNode) {
    return;
  }

  statusNode.textContent = "";
  statusNode.hidden = true;
}

function handleTrackedFormSuccess(form) {
  sendGaEvent("generate_lead", {
    form_name: getTrackedFormName(form),
    page_location: window.location.href,
  }, () => {
    form.reset();
    // Formspree currently returns `/thanks`, which does not exist on this GitHub Pages site.
    // Keep the success state on the current page instead of following the broken redirect.
    setFormStatus(
      form,
      "Thanks, your message has been sent. We'll be in touch soon."
    );
  });
}

function showReturnedFormSuccess() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("submitted") !== "1") {
    return;
  }

  const form = document.querySelector("form[data-form-name='contact_enquiry']");

  if (form) {
    setFormStatus(form, "Thanks, your message has been sent. We'll be in touch soon.");
  }

  params.delete("submitted");
  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
  window.history.replaceState({}, document.title, nextUrl);
}

function setupGaFormTracking() {
  const forms = document.querySelectorAll("form[data-form-name]");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearFormStatus(form);

      if (form.dataset.gaSubmitting === "true") {
        return;
      }

      form.dataset.gaSubmitting = "true";

      try {
        const response = await fetch(form.action, {
          method: (form.method || "POST").toUpperCase(),
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });
        const result = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error("Form submission failed.");
        }

        handleTrackedFormSuccess(form);
      } catch (error) {
        form.removeAttribute("data-ga-submitting");
        form.submit();
        return;
      }

      form.removeAttribute("data-ga-submitting");
    });
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
setupGaLinkTracking();
showReturnedFormSuccess();
setupGaFormTracking();
onScroll();

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    setMobileMenuState(false);
  }

  onScroll();
});
