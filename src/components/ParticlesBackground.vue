<template>
  <div class="particles-bg" ref="particlesContainer">
    <div class="particles-bg__gradient"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'ParticlesBackground'
})

const particlesContainer = ref(null)
let animationId = null
let particles = []
let canvas = null
let resizeHandler = null

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }
  
  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 2 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.opacity = Math.random() * 0.5 + 0.2
  }
  
  update() {
    this.x += this.speedX
    this.y += this.speedY
    
    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1
  }
  
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`
    ctx.fill()
  }
}

const initParticles = () => {
  const container = particlesContainer.value
  if (!container) return
  
  // Create canvas
  canvas = document.createElement('canvas')
  canvas.className = 'particles-canvas'
  container.appendChild(canvas)
  
  const ctx = canvas.getContext('2d')
  
  resizeHandler = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  resizeHandler()
  window.addEventListener('resize', resizeHandler)
  
  // Create particles
  const particleCount = Math.min(90, Math.floor(window.innerWidth / 12))
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas))
  }
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw connections
    particles.forEach((particle, i) => {
      particle.update()
      particle.draw(ctx)
      
      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x
        const dy = particles[j].y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    })
    
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
}

onMounted(() => {
  initParticles()
})

onUnmounted(() => {
  // Clean up animation
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  
  // Clean up resize listener
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  
  // Clean up canvas
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas)
    canvas = null
  }
  
  // Clear particles
  particles = []
})
</script>

<style lang="scss" scoped>
.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.particles-bg__gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 50%),
    radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139, 92, 246, 0.1), transparent 50%),
    radial-gradient(ellipse 60% 40% at 0% 100%, rgba(139, 92, 246, 0.08), transparent 50%);

  .light & {
    background: 
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.08), transparent 50%),
      radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139, 92, 246, 0.05), transparent 50%),
      radial-gradient(ellipse 60% 40% at 0% 100%, rgba(139, 92, 246, 0.04), transparent 50%);
  }
}

:deep(.particles-canvas) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
