document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Sticky Navbar
  // ===============================
  const navbar = document.querySelector(".navbar");

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===============================
  // Scroll reveal (fade-in) + language bars
  // ===============================
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // ===============================
  // Active nav link on scroll
  // ===============================
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link[href^='#']");

  const spyObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(section => spyObserver.observe(section));

  // ===============================
  // Auto-collapse navbar on mobile
  // ===============================
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse && navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
          const toggleBtn = document.querySelector(".navbar-toggler");
          if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // ===============================
  // Project image carousels
  // ===============================
  document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = Array.from(carousel.querySelectorAll(".dot"));
    const prev = carousel.querySelector(".carousel-arrow.prev");
    const next = carousel.querySelector(".carousel-arrow.next");
    if (!track || slides.length === 0) return;

    let index = 0;
    const goTo = i => {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach((dot, n) => dot.classList.toggle("active", n === index));
    };

    dots.forEach((dot, n) => dot.addEventListener("click", () => goTo(n)));
    if (prev) prev.addEventListener("click", () => goTo(index - 1));
    if (next) next.addEventListener("click", () => goTo(index + 1));

    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
    });

    goTo(0);
  });

  // ===============================
  // Footer year
  // ===============================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
