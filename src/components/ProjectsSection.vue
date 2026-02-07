<template>
  <section class="projects">
    <div class="projects__container">
      <!-- Title bar with View more toggle -->
      <div class="projects__header">
        <h2 class="section-title">{{ content.projects.sectionTitle }}</h2>
        <a v-if="(content.projects.items || []).length > 6" href="#" class="projects__view-more" @click.prevent="handleViewMore">
          {{ showAll ? 'Show less' : content.projects.viewMoreText }}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </div>
      
      <div class="projects__grid">
        <article 
          v-for="(project, index) in displayedProjects" 
          :key="index"
          class="project-card"
          @click="openProject(project.link)"
        >
          <!-- Image Area -->
          <div class="project-card__image">
            <img 
              v-if="project.image" 
              :src="project.image" 
              :alt="project.title"
              @error="handleImageError"
            />
            <div v-else class="project-card__placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          </div>
          
          <!-- Card Header -->
          <div class="project-card__header">
            <span class="project-card__category">{{ project.category }}</span>
            <span 
              class="project-card__status"
              :class="getStatusClass(project.status)"
            >
              {{ project.status }}
            </span>
          </div>
          
          <!-- Card Content -->
          <div class="project-card__body">
            <h3 class="project-card__title">{{ project.title }}</h3>
            <p class="project-card__description">{{ project.description }}</p>
          </div>
          
          <!-- Technology Tags -->
          <div class="project-card__tags">
            <span 
              v-for="tag in project.tags" 
              :key="tag"
              class="project-tag"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              {{ tag }}
            </span>
          </div>
          
          <!-- Hover Arrow -->
          <div class="project-card__arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'ProjectsSection'
})

const content = siteContent

const showAll = ref(false)
const displayedProjects = computed(() => {
  const items = content.projects.items || []
  return showAll.value ? items : items.slice(0, 6)
})

const openProject = (link) => {
  if (link && link !== '#') {
    window.open(link, '_blank')
  }
}

const handleViewMore = () => {
  showAll.value = !showAll.value
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
  const placeholder = e.target.parentElement.querySelector('.project-card__placeholder')
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
}

const getStatusClass = (status) => {
  const statusLower = (status || '').toLowerCase()
  if (statusLower.includes('completed')) {
    return 'status--completed'
  } else if (statusLower.includes('progress')) {
    return 'status--in-progress'
  }
  return ''
}
</script>

<style lang="scss" scoped>
.projects {
  position: relative;
  padding: 4rem 0;
  z-index: 1;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 2.5rem;
  }

  &__view-more {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary);

      svg {
        transform: translateX(4px);
      }
    }

    svg {
      transition: transform 0.2s ease;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  margin: 0;
}

.project-card {
  background: var(--color-card-light);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(139, 92, 246, 0.15);

    .project-card__arrow {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  &__image {
    width: calc(100% + 2.5rem);
    height: 180px;
    background: linear-gradient(135deg, #e0d4f7, #c4b5e8);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
    /* pull image to card edges (card has 1.25rem padding) */
    margin: -1.25rem -1.25rem 1rem -1.25rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139, 92, 246, 0.4);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  &__category {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__status {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    text-transform: capitalize;
  }

  &__body {
    flex: 1;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 0.5rem;
    line-height: 1.4;
  }

  &__description {
    font-size: 0.8125rem;
    color: #4a4a6a;
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__arrow {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-md);
    opacity: 0;
    transform: translate(8px, -8px);
    transition: all 0.3s ease;
  }
}

.status {
  &--completed {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  &--in-progress {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }
}

.project-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  background: transparent;
  color: #f59e0b;
  border: 1px solid #f59e0b;
  border-radius: var(--radius-sm);

  svg {
    color: #f59e0b;
  }
}
</style>
