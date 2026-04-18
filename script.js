// ============================================================
// QUICK CHANGE GUIDE
// ============================================================
//
// TO ADD/EDIT A PROJECT:
//   Edit the PROJECTS array below. Each object = one card.
//   Set "link" to null if no public repo exists.
//
// TO ADD/EDIT SKILLS:
//   Edit the SKILLS object below. Keys = group names,
//   values = arrays of skill strings.
//
// TO CHANGE HERO TEXT:
//   Edit index.html → section id="hero"
//   Look for <!-- EDITABLE: Hero --> comments.
//
// TO CHANGE ABOUT TEXT:
//   Edit index.html → section id="about"
//   Look for <!-- EDITABLE: About --> comments.
//
// TO CHANGE ACCENT COLOR:
//   Edit styles.css → :root → --color-accent
//
// TO ADD A NEW SKILL GROUP:
//   Add a new key-value pair to the SKILLS object below.
//
// ============================================================


// ============================================================
// DATA — Edit these to update site content
// ============================================================

const PROJECTS = [
  {
    title: "Automatic Text Evaluation with LLMs",
    subtitle: "Master's Thesis",
    description:
      "Open-source framework for automated text evaluation using LLMs with custom Chain-of-Thought reasoning, dynamic memory slots, and tool-calling to automate metric selection. Trained on a synthetic dataset of 7,000+ evaluation conversations.",
    achievement: "97% success rate on single-metric evaluation",
    stack: ["Python", "LLMs", "HuggingFace", "Docker", "Git"],
    link: null,
    linkLabel: null,
  },
  {
    title: "DictatorShipping",
    subtitle: "Desktop App",
    description:
      "Local, offline dictation app with hold-to-dictate via system hotkey. Faster Whisper for real-time speech-to-text, live waveform visualization, silence detection, and optional formality rewriting through a local Ollama LLM.",
    achievement: "Fully offline speech-to-text with local LLM rewriting",
    stack: ["Python", "Faster Whisper", "CTranslate2", "Ollama"],
    link: "https://github.com/MatteBelle/DictatorShipping",
    linkLabel: "View on GitHub",
  },
  {
    title: "LLM Benchmarking in Summarization",
    subtitle: "Research Project",
    description:
      "Systematic benchmarking of LLMs across 1B, 7B, and 13B parameter scales on PubMed biomedical summarization. Compared standard, one-shot, and refactored prompting strategies with BART Score evaluation.",
    achievement: "Multi-scale LLM comparison across 3 prompting strategies",
    stack: ["Python", "Jupyter", "HuggingFace", "W&B"],
    link: "https://github.com/MatteBelle/LLMs-Benchmarking-in-summarization",
    linkLabel: "View on GitHub",
  },
  {
    title: "IoT Light Tracking for Plants",
    subtitle: "IoT + Machine Learning",
    description:
      "End-to-end IoT system for plant light monitoring using ESP32 with dual LDR sensors. Python backend with InfluxDB and Grafana dashboards, Telegram bot for alerts, and XGBoost model for light prediction with automatic plant-position suggestions.",
    achievement: "AI-driven light prediction with automatic optimization",
    stack: ["Python", "ESP32", "InfluxDB", "Grafana", "XGBoost", "MQTT"],
    link: "https://github.com/MatteBelle/Light-Tracking-for-Plants",
    linkLabel: "View on GitHub",
  },
  {
    title: "2121TLMS — Platform Survival Game",
    subtitle: "Team Project",
    description:
      "2D survival platformer built in Java with Swing and FXGL in a 4-person team. Features physics-based movement, enemy AI, weapon systems, and score tracking. Designed with UML planning and MVC architecture.",
    achievement: "Full game loop with physics, AI, and weapon systems",
    stack: ["Java", "FXGL", "Swing", "MVC", "JUnit"],
    link: "https://github.com/MatteBelle/OOP20-2121TLMS",
    linkLabel: "View on GitHub",
  },
];

const SKILLS = {
  Languages: ["Python", "Java", "SQL", "JavaScript", "HTML/CSS", "C", "Prolog"],
  "AI / ML": [
    "LLMs",
    "NLP",
    "Prompt Engineering",
    "Chain-of-Thought",
    "Tool-Calling",
    "HuggingFace",
  ],
  Tools: [
    "Git",
    "Docker",
    "Claude",
    "Copilot",
    "Slurm",
    "VS Code",
    "IntelliJ",
    "Jupyter",
    "W&B",
  ],
  Systems: [
    "Agentic Systems",
    "Distributed Agents",
    "REST APIs",
    "Data Pipelines",
    "FastAPI",
    "Flask",
    "MQTT",
  ],
};


// ============================================================
// RENDERING
// ============================================================

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(
    (project, i) => `
    <article class="project-card reveal" style="--delay: ${i * 0.12}s">
      <span class="project-subtitle">${project.subtitle}</span>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <p class="project-achievement">
        <span class="achievement-icon">&#9670;</span> ${project.achievement}
      </p>
      <div class="project-stack">
        ${project.stack.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      ${
        project.link
          ? `<div class="project-link"><a href="${project.link}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">${project.linkLabel}</a></div>`
          : ""
      }
    </article>
  `
  ).join("");
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.innerHTML = Object.entries(SKILLS)
    .map(
      ([group, skills], i) => `
    <div class="skill-group reveal" style="--delay: ${i * 0.1}s">
      <h3 class="skill-group-title">${group}</h3>
      <div class="skill-tags">
        ${skills.map((s) => `<span class="tag">${s}</span>`).join("")}
      </div>
    </div>
  `
    )
    .join("");
}


// ============================================================
// SCROLL REVEAL (Intersection Observer)
// ============================================================

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay =
            getComputedStyle(entry.target).getPropertyValue("--delay") || "0s";
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}


// ============================================================
// NAVBAR
// ============================================================

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          navbar.classList.add("nav-hidden");
        } else {
          navbar.classList.remove("nav-hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Active section highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}


// ============================================================
// MOBILE NAV
// ============================================================

function initMobileNav() {
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}


// ============================================================
// INIT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  initScrollReveal();
  initNavbar();
  initMobileNav();
});
