// Global variables
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize slider if slides exist
  if (slides.length > 0) {
    initializeSlider();
  }

  // Initialize mobile navigation
  initializeMobileNav();

  // Initialize form validation if contact form exists
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    initializeFormValidation();
  }

  // Initialize gallery modal if gallery exists
  if (document.querySelector(".gallery-grid")) {
    initializeGalleryModal();
  }
});

// Image Slider Functionality
function initializeSlider() {
  const dotsContainer = document.querySelector(".slider-dots");

  // Clear existing dots and create new ones
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index + 1));
      dotsContainer.appendChild(dot);
    });
    dots = document.querySelectorAll(".dot"); // Update dots reference
  }

  // Add event listeners for prev/next buttons
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));

  // Auto-advance slides every 5 seconds
  setInterval(() => changeSlide(1), 5000);

  // Show first slide
  showSlide(0);
}

// Global function for HTML onclick
function changeSlide(direction) {
  slides[currentSlideIndex].classList.remove("active");
  dots[currentSlideIndex].classList.remove("active");

  currentSlideIndex += direction;

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  showSlide(currentSlideIndex);
}

// Global function for HTML onclick
function goToSlide(slideIndex) {
  slides[currentSlideIndex].classList.remove("active");
  dots[currentSlideIndex].classList.remove("active");

  currentSlideIndex = slideIndex - 1;
  showSlide(currentSlideIndex);
}

function showSlide(slideIndex) {
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

// Mobile Navigation
function initializeMobileNav() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
}

// Form Validation
function initializeFormValidation() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Real-time validation
  nameInput.addEventListener("blur", function () {
    validateName();
  });

  emailInput.addEventListener("blur", function () {
    validateEmail();
  });

  messageInput.addEventListener("blur", function () {
    validateMessage();
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // If all fields are valid, show success message
    if (isNameValid && isEmailValid && isMessageValid) {
      showSuccessMessage();
      form.reset();
      clearErrors();
    }
  });
}

function validateName() {
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  const name = nameInput.value.trim();

  if (name === "") {
    showError(nameError, "Name is required");
    return false;
  } else if (name.length < 2) {
    showError(nameError, "Name must be at least 2 characters long");
    return false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    showError(nameError, "Name can only contain letters and spaces");
    return false;
  } else {
    clearError(nameError);
    return true;
  }
}

function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const email = emailInput.value.trim();

  if (email === "") {
    showError(emailError, "Email is required");
    return false;
  } else if (!isValidEmail(email)) {
    showError(emailError, "Please enter a valid email address");
    return false;
  } else {
    clearError(emailError);
    return true;
  }
}

function validateMessage() {
  const messageInput = document.getElementById("message");
  const messageError = document.getElementById("messageError");
  const message = messageInput.value.trim();

  if (message === "") {
    showError(messageError, "Message is required");
    return false;
  } else if (message.length < 10) {
    showError(messageError, "Message must be at least 10 characters long");
    return false;
  } else if (message.length > 1000) {
    showError(messageError, "Message must be less than 1000 characters");
    return false;
  } else {
    clearError(messageError);
    return true;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.style.display = "none";
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    clearError(element);
  });
}

function showSuccessMessage() {
  const successMessage = document.getElementById("formSuccess");
  const form = document.getElementById("contactForm");

  form.style.display = "none";
  successMessage.style.display = "block";

  // Hide success message and show form again after 5 seconds
  setTimeout(function () {
    successMessage.style.display = "none";
    form.style.display = "block";
  }, 5000);
}

// Gallery Modal Functionality
function initializeGalleryModal() {
  const modal = document.getElementById("imageModal");

  // Close modal when clicking the X
  const closeBtn = document.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
}

function openModal(imageSrc, title, description) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");

  modalImage.src = imageSrc;
  modalImage.alt = title;
  modalTitle.textContent = title;
  modalDescription.textContent = description;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Add loading animation for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    // If image is already loaded (cached)
    if (img.complete) {
      img.style.opacity = "1";
    } else {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";
    }
  });
});

// Add scroll-to-top functionality
document.addEventListener("DOMContentLoaded", function () {
  // Create scroll-to-top button
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = "↑";
  scrollButton.className = "scroll-to-top";
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #3498db;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  });

  // Scroll to top when clicked
  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add hover effect
  scrollButton.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#2980b9";
    this.style.transform = "scale(1.1)";
  });

  scrollButton.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#3498db";
    this.style.transform = "scale(1)";
  });
});

// Add animation on scroll for elements
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    ".feature-card, .value-card, .category-card, .gallery-item, .faq-item"
  );

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
});

// Performance optimization: Lazy loading for images
document.addEventListener("DOMContentLoaded", function () {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
});
