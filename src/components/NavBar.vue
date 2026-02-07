<template>
  <header 
    class="navbar" 
    :class="{ 'navbar--scrolled': isScrolled }"
  >
    <div class="navbar__container">
      <!-- Logo / Brand Name -->
      <a href="#home" class="navbar__brand" @click.prevent="scrollToSection('home')">
        {{ content.navigation.brand }}
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="navbar__nav">
        <ul class="navbar__menu">
          <li 
            v-for="item in content.navigation.items" 
            :key="item.href"
            class="navbar__menu-item"
          >
            <a 
              :href="item.href" 
              class="navbar__link"
              :class="{ 'navbar__link--active': activeSection === item.href.slice(1) }"
              @click.prevent="scrollToSection(item.href.slice(1))"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="navbar__actions">
        <!-- Theme Toggle Button -->
        <button 
          class="navbar__theme-toggle" 
          @click="toggleTheme"
          :aria-label="isLightMode ? 'Switch to dark mode' : 'Switch to light mode'"
        >
          <transition name="fade" mode="out-in">
            <svg v-if="isLightMode" key="moon" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else key="sun" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </transition>
        </button>

        <!-- Mobile Menu Button -->
        <button 
          class="navbar__mobile-toggle"
          :class="{ 'navbar__mobile-toggle--open': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          :aria-label="content.navigation.menuButtonLabel"
        >
          <span class="navbar__mobile-toggle-line"></span>
          <span class="navbar__mobile-toggle-line"></span>
          <span class="navbar__mobile-toggle-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="navbar__mobile-menu">
        <ul class="navbar__mobile-list">
          <li 
            v-for="(item, index) in content.navigation.items" 
            :key="item.href"
            class="navbar__mobile-item"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <a 
              :href="item.href" 
              class="navbar__mobile-link"
              :class="{ 'navbar__mobile-link--active': activeSection === item.href.slice(1) }"
              @click.prevent="handleMobileNavClick(item.href.slice(1))"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'NavBar'
})

const content = siteContent

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isLightMode = ref(false)
const activeSection = ref('home')

let ticking = false

const updateActiveSection = () => {
  const sections = content.navigation.items.map(item => item.href.slice(1))
  
  for (const section of [...sections].reverse()) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 150) {
        activeSection.value = section
        break
      }
    }
  }
}

// Throttle scroll event for better performance
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      isScrolled.value = currentScrollY > 50
      updateActiveSection()
      ticking = false
    })
    ticking = true
  }
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleMobileNavClick = (sectionId) => {
  isMobileMenuOpen.value = false
  setTimeout(() => {
    scrollToSection(sectionId)
  }, 100)
}

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value
  document.documentElement.classList.toggle('light', isLightMode.value)
  localStorage.setItem('theme', isLightMode.value ? 'light' : 'dark')
}

onMounted(() => {
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isLightMode.value = true
    document.documentElement.classList.add('light')
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* Fallback background for browsers that don't support backdrop-filter */
  background: rgba(255, 255, 255, 0.9);
  /* Modern browsers with backdrop support */
  background: linear-gradient(180deg, rgba(var(--color-primary-rgb), 0.06), transparent);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;

  &--scrolled {
    border-bottom-color: var(--color-border);
    background: linear-gradient(180deg, rgba(var(--color-primary-rgb), 0.08), rgba(var(--color-primary-rgb), 0.02));
    /* Strengthen the backdrop effect when scrolled */
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
  }
}

.navbar__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__brand {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.12s ease;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-1px);
  }
}

.navbar__nav {
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
}

.navbar__menu {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 6px;

  &:hover {
    color: var(--color-text);
    background: rgba(var(--color-primary-rgb), 0.04);
  }

  &--active {
    color: var(--color-text-on-card);
    background: var(--color-card-light);
    border-radius: 6px;
  }
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    box-shadow: var(--shadow-glow);
  }

  .icon {
    width: 18px;
    height: 18px;
  }
}

.navbar__mobile-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 8px;

  @media (min-width: 1024px) {
    display: none;
  }

  &--open {
    .navbar__mobile-toggle-line {
      &:nth-child(1) {
        transform: rotate(45deg) translate(4px, 4px);
      }
      
      &:nth-child(2) {
        opacity: 0;
      }
      
      &:nth-child(3) {
        transform: rotate(-45deg) translate(4px, -4px);
      }
    }
  }
}

.navbar__mobile-toggle-line {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
  transition: all 0.3s ease;
}

.navbar__mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem;
}

.navbar__mobile-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__mobile-item {
  animation: slideIn 0.3s ease forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.navbar__mobile-link {
  display: block;
  padding: 0.875rem 1rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover,
  &--active {
    background: var(--color-bg-hover);
    color: var(--color-primary);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
