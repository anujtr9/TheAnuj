const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Toggle menu on hamburger click
menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("active");
  e.stopPropagation(); // prevent click from reaching document
});

// Close menu when clicking on a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// ...........nav
gsap.from(".navbar", {
  y: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
});

// ......................haro
gsap.from(".hero-left h1", { x: -80, opacity: 0, duration: 1 });
gsap.from(".hero-left h2", { x: -80, opacity: 0, duration: 1, delay: 0.3 });
gsap.from(".hero-left h5", { x: -80, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".hero-left .intro", { y: 40, opacity: 0, duration: 1, delay: 0.9 });
gsap.from(".actions", { y: 60, opacity: 0, duration: 1, delay: 1.2 });
gsap.from(".card-3d", { scale: 0.8, opacity: 0, duration: 1.2, delay: 1 });

// Vanilla Tilt for 3D effect
VanillaTilt.init(document.querySelector(".card-3d"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.4,
});

//   .....................about
// GSAP animations
gsap.from(".about-left", {
  x: -80,
  opacity: 0,
  duration: 1,
  scrollTrigger: ".about",
});
gsap.from(".about-right h2", {
  y: -40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  scrollTrigger: ".about",
});
gsap.from(".about-right p", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  stagger: 0.3,
  scrollTrigger: ".about",
});
gsap.from(".about-actions", {
  y: 60,
  opacity: 0,
  duration: 1,
  delay: 0.8,
  scrollTrigger: ".about",
});

// Vanilla Tilt 3D effect
VanillaTilt.init(document.querySelector(".about-card-3d"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.3,
});

//   ....................seervicess
// GSAP animations
gsap.from(".service-card", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: ".services",
});

// 3D Tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.4,
});

// ...........smooth scroll
// smooth-scroll.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  // Compute header height (update if header changes on resize)
  function getHeaderHeight() {
    return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
  }

  // Smooth scroll to target with offset
  function smoothScrollTo(targetEl, offset = 0) {
    if (!targetEl) return;
    const targetRect = targetEl.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + targetRect.top;
    const scrollToPos = Math.max(absoluteTop - offset, 0);

    // Native smooth scroll
    window.scrollTo({
      top: scrollToPos,
      behavior: "smooth",
    });
  }

  // Attach click handlers to in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // ignore empty or just "#" anchors
      if (!href || href === "#") return;

      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = getHeaderHeight() + 16; // 16px gap
        smoothScrollTo(targetEl, offset);
        // update URL hash without jumping
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });

  // OPTIONAL: ScrollSpy using IntersectionObserver
  // highlights .nav-link when section visible
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const offset = getHeaderHeight() + 20;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const link = document.querySelector(`.nav-link[href="#${id}"]`);
          if (link) {
            if (entry.isIntersecting) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          }
        });
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => observer.observe(s));
    // update observer on resize (header height might change)
    window.addEventListener("resize", () => {
      // re-create or ignore for simplicity; we'll just compute offset on the fly above
    });
  }
});

// .................testimonial
gsap.registerPlugin(ScrollTrigger);

// Animate testimonial cards on scroll
gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    rotationY: -15,
    duration: 1,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
  });
});

// Optional: 3D tilt effect on mouse move
document.querySelectorAll(".testimonial-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
});


// ....................contact


// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Text Animation
gsap.from(".contact-heading, .contact-para, #contact-form", {
  scrollTrigger: {
    trigger: ".contact-text",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1.2,
  ease: "power4.out"
});

// Floating Logos
gsap.to(".contact-logo", {
  y: (i) => (i % 2 === 0 ? 30 : -30),
  x: (i) => (i % 2 === 0 ? -20 : 20),
  repeat: -1,
  yoyo: true,
  duration: 3,
  ease: "sine.inOut"
});

// Slow rotation
gsap.to(".contact-logo", {
  rotation: 360,
  transformOrigin: "center",
  repeat: -1,
  duration: 18,
  ease: "linear"
});
 



// Make sure to include EmailJS SDK in your HTML
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

emailjs.init("kq9Yg2K6NEJn78-zf"); // Replace with your EmailJS Public Key

const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect form data
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    phone: contactForm.phone.value,
    message: contactForm.message.value,
  };

  emailjs
    .send("service_5g27sw5", "template_tinezmo", "#contact-form")
    .then(
      function (response) {
        showToast("Message sent successfully! 🚀", true);
        contactForm.reset();
      },
      function (error) {
        showToast("Oops! Something went wrong. ❌", false);
        console.error("EmailJS error:", error);
      }
    );
});

// Toast function
function showToast(message, success = true) {
  toast.textContent = message;
  toast.style.background = success ? "green" : "red";
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 3000);
}


// .....................................footer
// ..................footer
// Footer GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Floating animation
gsap.to(".footer-logo", {
  y: (i) => (i % 2 === 0 ? 20 : -20),
  repeat: -1,
  yoyo: true,
  duration: 3,
  ease: "sine.inOut",
  stagger: 0.3
});

// Slow rotation animation
gsap.to(".footer-logo", {
  rotationY: 360,
  repeat: -1,
  duration: 10,
  ease: "linear",
  transformOrigin: "center"
});

// Fade in when scrolled into view
gsap.from("#footer .footer-container", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 1.5,
  ease: "power4.out"
});
