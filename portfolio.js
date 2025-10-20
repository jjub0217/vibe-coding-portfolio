// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Smooth Scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#")) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Work cards hover effect enhancement
const workCards = document.querySelectorAll(".work-card");

workCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "all 0.3s ease";
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for scroll animation
const animateElements = document.querySelectorAll(
  ".stat-item, .work-card, .brand-logo"
);

animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease-out";
  observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  const isPercentage = target.toString().includes(".");

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = isPercentage
        ? `${target}%`
        : `${Math.ceil(target)}+`;
      clearInterval(timer);
    } else {
      element.textContent = isPercentage
        ? `${start.toFixed(1)}%`
        : `${Math.ceil(start)}+`;
    }
  }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statItems = document.querySelectorAll(".stat-item h3");
        const values = [100, 50, 30, 96.7];

        statItems.forEach((item, index) => {
          animateCounter(item, values[index]);
        });

        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".work-header");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add click event to contact buttons
const contactBtns = document.querySelectorAll(".contact-btn, .hire-btn");

contactBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "Contact form would open here! You can integrate this with your contact page or modal."
    );
  });
});

// Arrow button click events for work cards
const arrowBtns = document.querySelectorAll(".arrow-btn");

arrowBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    alert(`Opening project ${index + 1} details...`);
    // You can navigate to project detail page here
  });
});

// Services Accordion - Disabled (always expanded)
// const accordionItems = document.querySelectorAll(".accordion-item");

// accordionItems.forEach((item) => {
//   const header = item.querySelector(".accordion-header");

//   header.addEventListener("click", () => {
//     // Close all other accordion items
//     accordionItems.forEach((otherItem) => {
//       if (otherItem !== item) {
//         otherItem.classList.remove("active");
//       }
//     });

//     // Toggle current item
//     item.classList.toggle("active");
//   });
// });

// Portfolio Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.textContent.toLowerCase();

    portfolioCards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();

      if (filter === "all" || cardText.includes(filter)) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease-in";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll(".testimonial-card");
const prevBtn = document.querySelector(".testimonial-nav.prev");
const nextBtn = document.querySelector(".testimonial-nav.next");

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    currentTestimonial =
      (currentTestimonial - 1 + testimonialCards.length) %
      testimonialCards.length;
    showTestimonial(currentTestimonial);
  });

  nextBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  });
}

// Contact Form
const contactForm = document.querySelector(".contact-form form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    // Simple validation
    if (name && email && message) {
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
}

// Social Media Cards Click Events
const socialCards = document.querySelectorAll(".social-card");

socialCards.forEach((card) => {
  card.addEventListener("click", () => {
    const platform = card.classList[1]; // Get the platform class (facebook, instagram, etc.)
    alert(`Opening ${platform} profile...`);
    // You can add actual links here
  });
});

// Portfolio Cards Click Events
const portfolioArrows = document.querySelectorAll(".portfolio-arrow");

portfolioArrows.forEach((arrow, index) => {
  arrow.addEventListener("click", () => {
    alert(`Opening project ${index + 1} details...`);
    // You can navigate to project detail page here
  });
});

// View More Button
const viewMoreBtn = document.querySelector(".view-more-btn");

if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
    alert("Loading more projects...");
    // You can add functionality to load more projects here
  });
}

// Add CSS animation for portfolio filter
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

console.log("Portfolio website loaded successfully!");
