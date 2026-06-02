document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Sticky Navbar
  // ===============================
  const navbar = document.querySelector(".navbar");

  const onScroll = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  };

  window.addEventListener("scroll", onScroll);
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
  // Footer year
  // ===============================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
