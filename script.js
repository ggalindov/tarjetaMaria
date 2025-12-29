// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section)
})

// Add staggered animation to photo collage items
const photoItems = document.querySelectorAll(".photo-collage > div")
photoItems.forEach((item, index) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px)"

  setTimeout(
    () => {
      item.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    },
    600 + index * 200,
  )
})

// Add subtle parallax effect on scroll
let ticking = false
let lastScrollTop = 0

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const header = document.querySelector(".card-header")
        if (header && scrollTop < 300) {
          header.style.transform = `translateY(${scrollTop * 0.15}px)`
        }
        lastScrollTop = scrollTop
        ticking = false
      })
      ticking = true
    }
  },
  { passive: true },
)

// Add touch-friendly hover effects for mobile
if ("ontouchstart" in window) {
  const photoElements = document.querySelectorAll(".photo-collage > div")

  photoElements.forEach((photo) => {
    photo.addEventListener("touchstart", function () {
      this.classList.add("touch-active")
    })

    photo.addEventListener("touchend", function () {
      setTimeout(() => {
        this.classList.remove("touch-active")
      }, 300)
    })
  })
}

function createSparkle() {
  const sparklesContainer = document.querySelector(".sparkles-container")
  if (!sparklesContainer) return

  const sparkle = document.createElement("div")
  sparkle.className = "sparkle"

  const startX = Math.random() * window.innerWidth
  const duration = 3 + Math.random() * 4
  const delay = Math.random() * 2
  const size = 2 + Math.random() * 4

  sparkle.style.left = startX + "px"
  sparkle.style.width = size + "px"
  sparkle.style.height = size + "px"
  sparkle.style.animationDuration = duration + "s"
  sparkle.style.animationDelay = delay + "s"

  sparklesContainer.appendChild(sparkle)

  setTimeout(
    () => {
      sparkle.remove()
    },
    (duration + delay) * 1000,
  )
}

// Create sparkles continuously
setInterval(createSparkle, 300)

// Create initial batch of sparkles
for (let i = 0; i < 15; i++) {
  setTimeout(createSparkle, i * 200)
}
