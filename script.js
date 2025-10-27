document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Sticky Navbar & Scroll Progress
  // ===============================
  const navbar = document.querySelector(".navbar");
  const progressBar = document.querySelector(".progress-bar");

  const updateScrollProgress = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
    if (progressBar) {
      const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = scrollProgress + "%";
    }
  };

  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress(); // Alusta heti

  // ===============================
  // Theme Toggle (Light/Dark Mode)
  // ===============================
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-mode");
      // ARIA label toggle
      themeToggle.setAttribute("aria-pressed", isLight);
    });
  }

  // ===============================
  // Smooth Fade-In for Sections
  // ===============================
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // Fade-in vain kerran
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
  });

  // ===============================
  // Navbar Auto-Collapse on Mobile
  // ===============================
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarCollapse && navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
          // ARIA: päivitä expanded-status
          const toggleBtn = document.querySelector(".navbar-toggler");
          if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // ===============================
  // Smooth Hero Button Scroll
  // ===============================
  const heroContactButton = document.getElementById("hero-contact-btn");
  const contactSection = document.getElementById("contact");

  if (heroContactButton && contactSection) {
    heroContactButton.addEventListener("click", e => {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});
