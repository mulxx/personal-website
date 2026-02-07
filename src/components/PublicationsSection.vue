<template>
  <section class="publications">
    <div class="publications__container">
      <h2 class="section-title">{{ content.publications.sectionTitle }}</h2>

      <div 
        v-for="(category, catIndex) in content.publications.categories" 
        :key="catIndex"
        class="publications__category"
      >
        <h3 class="category-title">{{ category.name }}</h3>
        
        <div class="publications__list">
          <article 
            v-for="(pub, pubIndex) in category.items" 
            :key="pubIndex"
            class="publication-item"
            @click="openPublication(pub.link)"
          >
            <div class="publication-item__content">
              <h4 class="publication-item__title">{{ pub.title }}</h4>
              <p class="publication-item__authors">{{ pub.authors }}</p>
              <p class="publication-item__venue">
                <em>{{ pub.venue }}</em>
                <span v-if="pub.year">, {{ pub.year }}</span>
              </p>
              <div v-if="pub.tags && pub.tags.length" class="publication-item__tags">
                <span 
                  v-for="tag in pub.tags" 
                  :key="tag"
                  class="publication-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="publication-item__link" v-if="pub.link && pub.link !== '#'">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'PublicationsSection'
})

const content = siteContent

const openPublication = (link) => {
  if (link && link !== '#') {
    window.open(link, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.publications {
  position: relative;
  padding: 4rem 0;
  z-index: 1;

  &__container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__category {
    margin-bottom: 2.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  margin: 0 0 3rem;
}

.category-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0 0 1rem;
  padding-left: 1rem;
  border-left: 3px solid var(--color-primary);
}

.publication-item {
  background: var(--color-card-light);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);

    .publication-item__link {
      opacity: 1;
    }
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 0.375rem;
    line-height: 1.4;
  }

  &__authors {
    font-size: 0.8125rem;
    color: #4a4a6a;
    margin: 0 0 0.25rem;
    line-height: 1.4;
  }

  &__venue {
    font-size: 0.8125rem;
    color: #6a6a8a;
    margin: 0;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  &__link {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
}

.publication-tag {
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 0.1875rem 0.5rem;
  background: rgba(139, 92, 246, 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
}
</style>
