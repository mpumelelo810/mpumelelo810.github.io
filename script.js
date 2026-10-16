/* Portfolio interactions. No build tools or API keys required. */
(() => {
  "use strict";
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const setMenu = open => {
    if (!menuToggle || !navMenu) return;
    navMenu.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    const icon = menuToggle.querySelector("i");
    if (icon) icon.className = open ? "fas fa-xmark" : "fas fa-bars";
  };
  menuToggle?.addEventListener("click", () => setMenu(!navMenu.classList.contains("active")));
  document.querySelectorAll("#navMenu a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navMenu?.classList.contains("active")) {
      setMenu(false); menuToggle.focus();
    }
  });
  // Keep the portfolio in its selected dark-only theme.\n  document.body.classList.add("dark");\n\n  /* All projects are in the HTML. Search and filters need no network request. */
  const cards = [...document.querySelectorAll("#projectsGrid .project-card")];
  const filters = [...document.querySelectorAll(".project-filters .filter")];
  const search = document.getElementById("projectSearch");
  const count = document.getElementById("projectCount");
  const empty = document.getElementById("projectEmpty");
  const showAll = document.getElementById("showAllProjects");
  let category = "featured";
  const applyFilters = () => {
    const words = (search?.value || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      const categories = (card.dataset.category || "").split(" ");
      const matches = (category === "all" || categories.includes(category)) &&
        words.every(word => (card.dataset.search || "").includes(word));
      card.hidden = !matches;
      if (matches) { card.classList.add("visible"); visible += 1; }
    });
    filters.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (count) count.textContent = `${visible} of ${cards.length} repositories${category === "featured" ? " · Featured work" : ""}`;
    if (empty) empty.hidden = visible !== 0;
    if (showAll) showAll.hidden = category === "all" && words.length === 0;
  };
  const resetFilters = () => {
    category = "all";
    if (search) search.value = "";
    applyFilters();
  };
  filters.forEach(button => button.addEventListener("click", () => {
    category = button.dataset.filter; applyFilters();
  }));
  search?.addEventListener("input", () => {
    // Search beyond the initial featured selection.
    if (category === "featured" && search.value.trim()) category = "all";
    applyFilters();
  });
  search?.addEventListener("keydown", event => {
    if (event.key === "Escape") { search.value = ""; applyFilters(); }
  });
  document.getElementById("clearProjectFilters")?.addEventListener("click", () => {
    resetFilters(); search?.focus();
  });
  showAll?.addEventListener("click", () => { resetFilters(); search?.focus(); });
  if (cards.length) {
    document.querySelector(".project-tools")?.removeAttribute("hidden");
    applyFilters();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = [...document.querySelectorAll("[data-count]")];
  const finishCounter = counter => {
    counter.textContent = counter.dataset.count + (counter.dataset.suffix ?? "+");
  };
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.count);
        let value = 0;
        const tick = () => {
          value += Math.max(1, Math.ceil(target / 24));
          if (value >= target) finishCounter(counter);
          else { counter.textContent = value; requestAnimationFrame(tick); }
        };
        tick(); observer.unobserve(counter);
      });
    }, {threshold: 0.5});
    counters.forEach(counter => observer.observe(counter));
  } else counters.forEach(finishCounter);

  const revealElements = [...document.querySelectorAll(".skill-card, .fact, .timeline-item")];
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      });
    }, {threshold: 0.12});
    revealElements.forEach(element => observer.observe(element));
  } else revealElements.forEach(element => element.classList.add("visible"));
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll("#navMenu a")];
  const updateNavigation = () => {
    let current = "home";
    sections.forEach(section => { if (window.scrollY >= section.offsetTop - 140) current = section.id; });
    navLinks.forEach(link => {
      const active = link.getAttribute("href") === "#" + current;
      link.style.color = active ? "var(--accent)" : "";
      if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", updateNavigation, {passive: true});
  updateNavigation();
})();
