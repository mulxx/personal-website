<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'BackToTopButton'
})

const isVisible = ref(false)
let ticking = false

const checkScroll = () => {
  isVisible.value = window.scrollY > 300
}

// Throttle scroll event for better performance
const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      checkScroll()
      ticking = false
    })
    ticking = true
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <transition name="fade">
    <button 
      v-if="isVisible"
      @click="scrollToTop"
      class="back-to-top"
      aria-label="Back to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  </transition>
</template>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: 5rem;
  right: 8rem;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
  transition: all 0.3s ease;
  z-index: 999;
  padding: 0;

  &:hover {
    background: var(--color-primary-light);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(var(--color-primary-rgb), 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}

/* Fade in/out animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
