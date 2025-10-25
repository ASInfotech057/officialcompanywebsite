async function loadTemplate(targetSelector, templatePath, templateId) {
  const container = document.querySelector(targetSelector);
  if (!container) return;

  const response = await fetch(templatePath);
  const text = await response.text();

  // Create a temporary DOM to parse the template
  const temp = document.createElement("div");
  temp.innerHTML = text.trim();

  const template = temp.querySelector(`#${templateId}`);
  if (!template) {
    console.error(
      `Template with id "${templateId}" not found in ${templatePath}`,
    );
    return;
  }

  const clone = template.content.cloneNode(true);
  container.appendChild(clone);
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    loadTemplate("body", "/partials/navbar.html", "navbar-template"),
    loadTemplate("body", "/partials/footer.html", "footer-template"),
  ]).then(() => {
    // Add active class to current page in navigation
    const pagePath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").split(".")[0];
      console.log(href, pagePath);
      if (href === "index" && pagePath === "/") {
        link.classList.add("active");
      }

      if (pagePath.includes(href)) {
        link.classList.add("active");
      }
    });

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((n) => {
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Enhanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Add staggered animation for cards
      if (
        entry.target.classList.contains("service-card") ||
        entry.target.classList.contains("feature") ||
        entry.target.classList.contains("product-card")
      ) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out";
      }

      // Add bounce animation for icons
      if (
        entry.target.classList.contains("service-icon") ||
        entry.target.classList.contains("feature-icon")
      ) {
        setTimeout(() => {
          entry.target.style.animation = "bounce 1s ease-out";
        }, 200);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .feature, .product-card, .team-member, .value-item, .reason-item",
  );
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
  }
});

// Form validation for contact form
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    const submitBtn = document.querySelector("#submit-btn");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
