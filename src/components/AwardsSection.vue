<template>
  <section class="awards">
    <div class="awards__container">
      <h2 class="section-title">{{ content.awards.sectionTitle }}</h2>
      
      <!-- Notable awards -->
      <div class="awards__featured">
        <article 
          v-for="(award, index) in content.awards.featured" 
          :key="index"
          class="award-card"
        >
          <a
            :href="award.link"
            target="_blank"
            rel="noopener noreferrer"
            class="award-card__link"
          >
            <div class="award-card__image">
              <img 
                v-if="award.image" 
                :src="award.image" 
                :alt="award.title"
                @error="handleImageError"
              />
              <div v-else class="award-card__placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            </div>
            
            <div class="award-card__content">
              <h3 class="award-card__title">{{ award.title }}</h3>
              <p class="award-card__description">{{ award.description || 'Novel approaches to securing microservices architectures and cloud-native applications against emerging threats.' }}</p>
            </div>
            <div class="award-card__arrow" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </a>
        </article>
      </div>
      
      <!-- Other awards list -->
      <div v-if="content.awards.other?.length" class="awards__other">
        <h3 class="other-awards-title">Other Awards</h3>
        <ul class="other-awards-list">
          <li 
            v-for="(award, index) in content.awards.other" 
            :key="index"
            class="other-award-item"
          >
            <span class="other-award-item__title">{{ award.title }}</span>
            <span class="other-award-item__year">{{ award.year }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'AwardsSection'
})

const content = siteContent

const handleImageError = (e) => {
  e.target.style.display = 'none'
  const placeholder = e.target.parentElement.querySelector('.award-card__placeholder')
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
}
</script>

<style lang="scss" scoped>
.awards {
  position: relative;
  padding: 4rem 0;
  z-index: 1;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__featured {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin-bottom: 2.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  /* Other Awards */
  &__other {
    border-top: 1px solid var(--color-border);
    padding-top: 2rem;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  margin: 0 0 2.5rem;
}

.award-card {
  background: var(--color-card-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);

    .award-card__arrow {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  &__image {
    width: 100%;
    height: 180px;
    background: linear-gradient(135deg, #e0d4f7, #c4b5e8);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__link {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139, 92, 246, 0.4);
  }

  &__content {
    padding: 1.25rem;
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

  &__title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 0.75rem;
    line-height: 1.4;
    white-space: pre-line;
  }

  &__description {
    font-size: 0.8125rem;
    color: #6a6a8a;
    margin: 0;
    line-height: 1.5;
  }
}

.other-awards-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 1.25rem;
  text-align: center;
}

.other-awards-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.other-award-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(139, 92, 246, 0.05);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-primary);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
    transform: translateX(4px);
  }

  &__title {
    font-size: 0.875rem;
    color: var(--color-text);
  }

  &__year {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-primary);
  }
}
</style>
