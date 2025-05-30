// Sticky Navbar Effect & Scroll Progress Bar
document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const progressBar = document.querySelector(".progress-bar");
  
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  
  const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrollProgress + "%";
});

// Theme Toggle (Light/Dark Mode)
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// Smooth Section Fade-In Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});

// Navbar Auto-Collapse on Mobile After Click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  });
});
