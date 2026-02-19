document.addEventListener("DOMContentLoaded", function () {
  // Anniversary Date - February 18, 2020
  const anniversaryDate = new Date("2020-02-18T00:00:00");

  // Create floating hearts
  createHearts();

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Add scroll animations
  addScrollAnimations();

  // Smooth scroll for navigation links
  smoothScroll();

  // Add parallax effect to hero
  addParallaxEffect();
});

// Create floating hearts
function createHearts() {
  const container = document.getElementById("heartsContainer");
  const heartCount = 25;

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      createHeart(container);
    }, i * 200);
  }

  // Keep creating hearts periodically
  setInterval(() => {
    createHeart(container);
  }, 500);
}

function createHeart(container) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = '<i class="fas fa-heart"></i>';

  // Random position
  heart.style.left = Math.random() * 100 + "%";

  // Random size
  const size = Math.random() * 20 + 10;
  heart.style.fontSize = size + "px";

  // Random animation duration
  const duration = Math.random() * 5 + 5;
  heart.style.animationDuration = duration + "s";

  // Random delay
  heart.style.animationDelay = Math.random() * 2 + "s";

  // Random opacity
  heart.style.opacity = Math.random() * 0.5 + 0.3;

  container.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Update countdown
function updateCountdown() {
  const now = new Date();
  const anniversaryDate = new Date("2020-02-18T00:00:00");

  // Calculate time difference
  const diff = now - anniversaryDate;

  // Calculate time units
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Update DOM elements
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Add scroll animations using Intersection Observer
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe timeline items
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform =
      index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    item.style.transitionDelay = index * 0.1 + "s";
    observer.observe(item);
  });

  // Observe gallery items
  document.querySelectorAll(".gallery-item").forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    item.style.transitionDelay = index * 0.1 + "s";
    observer.observe(item);
  });

  // Observe love letter
  const loveLetter = document.querySelector(".love-letter");
  if (loveLetter) {
    loveLetter.style.opacity = "0";
    loveLetter.style.transform = "scale(0.9)";
    loveLetter.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(loveLetter);
  }

  // Intersection observer callback
  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) translateX(0) scale(1)";
        }
      });
    },
    { threshold: 0.1 },
  );

  // Re-observe with new observer
  document
    .querySelectorAll(".timeline-item, .gallery-item, .love-letter")
    .forEach((item) => {
      animateObserver.observe(item);
    });
}

// Smooth scroll for navigation
function smoothScroll() {
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
}

// Add parallax effect to hero section
function addParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");

    if (hero) {
      hero.style.backgroundPositionY = scrolled * 0.5 + "px";
    }
  });
}

// Add some interactive elements
document.addEventListener("mousemove", (e) => {
  const hearts = document.querySelectorAll(".floating-heart");
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  hearts.forEach((heart) => {
    heart.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Add letter opening animation
const loveLetter = document.querySelector(".love-letter");
if (loveLetter) {
  loveLetter.addEventListener("click", function () {
    this.classList.add("opened");
  });
}

// Add countdown celebration effect on milestone
function checkMilestone() {
  const now = new Date();
  const anniversaryDate = new Date("2020-02-18T00:00:00");
  const diff = now - anniversaryDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Add celebration class on anniversary day
  if (now.getMonth() === 1 && now.getDate() === 18) {
    document.body.classList.add("anniversary-day");
    createCelebration();
  }
}

function createCelebration() {
  // Add extra celebration effects
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const container = document.getElementById("heartsContainer");
      createHeart(container);
    }, i * 50);
  }
}

// Run milestone check
checkMilestone();

// Valentine Question Functions
function sayYes() {
  const valentineSection = document.getElementById("valentineSection");
  const mainContent = document.getElementById("mainContent");

  // Hide Valentine section with animation
  valentineSection.style.animation = "fadeOut 0.5s ease-out forwards";

  setTimeout(() => {
    // Hide Valentine section
    valentineSection.style.display = "none";

    // Show main content
    mainContent.style.display = "block";
    mainContent.style.animation = "fadeIn 0.5s ease-out";

    // Scroll to top
    window.scrollTo(0, 0);
  }, 500);
}

function sayNo() {
  const btnNo = document.getElementById("btnNo");
  const container = btnNo.parentElement;

  // Array of different positions around the container
  const positions = [
    { transform: "translateX(-200px)" },
    { transform: "translateX(200px)" },
    { transform: "translateY(-100px)" },
    { transform: "translateY(100px)" },
    { transform: "translate(-150px, -80px)" },
    { transform: "translate(150px, -80px)" },
    { transform: "translate(-150px, 80px)" },
    { transform: "translate(150px, 80px)" },
  ];

  // Get current position index from dataset or default to 0
  let currentIndex = parseInt(btnNo.dataset.moveIndex) || 0;

  // Move to next position (cycle through)
  const nextIndex = (currentIndex + 1) % positions.length;

  // Apply the new position
  btnNo.classList.add("moving");
  btnNo.style.transform = positions[nextIndex].transform;

  // Update the index
  btnNo.dataset.moveIndex = nextIndex;

  // Add some fun text changes
  const responses = [
    "Are you sure?",
    "Think again!",
    "Pretty please?",
    "Don't say no!",
    "Give it a chance!",
    "I'll wait...",
    "Pretty please with a cherry on top?",
    "Last chance!",
  ];

  btnNo.textContent = responses[nextIndex];
}

// Add fadeOut animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Unlock Special Memory Function
function unlockSpecial() {
  const lockedBox = document.getElementById("lockedBox");
  const unlockedContent = document.getElementById("unlockedContent");
  const surpriseGallery = document.querySelector(".surprise-gallery");

  // Hide locked box with animation
  lockedBox.style.animation = "fadeOut 0.5s ease-out forwards";

  setTimeout(() => {
    lockedBox.style.display = "none";

    // Show unlocked content
    unlockedContent.style.display = "block";
    unlockedContent.style.animation = "unlockReveal 0.8s ease-out";

    // Add show class for slide animation
    setTimeout(() => {
      surpriseGallery.classList.add("show");
    }, 300);

    // Create celebration hearts
    createCelebrationHearts();

    // Show alert with surprise message
    setTimeout(() => {
      alert(
        "💕 SURPRISE! 💕\n\nThis is our most precious moment together!\n\nI love you so much!\nHappy Valentine's Day! ❤️",
      );
    }, 500);
  }, 500);
}

function createCelebrationHearts() {
  const container = document.getElementById("heartsContainer");

  // Create extra celebration hearts
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createHeart(container);
    }, i * 100);
  }
}

// Open Giftbox Function
function openGiftbox() {
  const giftbox = document.getElementById("giftbox");
  const letterReveal = document.getElementById("letterReveal");

  // Animate giftbox opening
  giftbox.style.animation = "giftboxOpen 0.5s ease-out forwards";

  setTimeout(() => {
    giftbox.style.display = "none";

    // Show the love letter
    letterReveal.style.display = "block";
    letterReveal.style.animation = "letterReveal 0.8s ease-out";

    // Celebration effect
    createCelebrationHearts();
  }, 500);
}

// Add giftbox animation
const giftStyle = document.createElement("style");
giftStyle.textContent = `
  @keyframes giftboxOpen {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1) rotateX(20deg);
    }
    100% {
      transform: scale(0) rotateX(60deg);
      opacity: 0;
    }
  }
  @media (max-width: 600px) {
    .journey-card.featured {
      grid-column: span 1;
    }
  }
`;
document.head.appendChild(giftStyle);

// Anniversary Countdown
function updateValentineCountdown() {
  const now = new Date();

  // Our 5th Anniversary is February 18, 2025
  let anniversaryDate = new Date("2025-02-18T00:00:00");

  // If anniversary has passed, count to next year
  if (now > anniversaryDate) {
    anniversaryDate = new Date("2026-02-18T00:00:00");
  }

  const diff = anniversaryDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// Start Valentine countdown
if (document.getElementById("valentineCountdown")) {
  updateValentineCountdown();
  setInterval(updateValentineCountdown, 1000);
}

// Enter site function
function enterSite() {
  const countdownSection = document.getElementById("countdownSection");
  const mainContent = document.getElementById("mainContent");

  countdownSection.style.animation = "fadeOut 0.5s ease-out forwards";

  setTimeout(() => {
    countdownSection.style.display = "none";
    mainContent.style.display = "block";
    window.scrollTo(0, 0);
  }, 500);
}
