<template>
  <section id="education" class="education">
    <div class="education__container">
      <h2 class="section-title">{{ content.education.sectionTitle }}</h2>
      
      <div class="education__list">
        <article 
          v-for="(edu, index) in content.education.items" 
          :key="index"
          class="education-card"
        >
          <div class="education-card__header">
            <div class="education-card__title-row">
              <h3 class="education-card__degree">{{ edu.degree }}</h3>
              <span class="education-card__status">{{ edu.status }}</span>
            </div>
            
            <div class="education-card__meta">
              <span class="education-card__school">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ edu.school }}, {{ edu.location }}
              </span>
              <span class="education-card__period">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ edu.period }}
              </span>
              <span class="education-card__gpa">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                GPA: {{ edu.gpa }}
              </span>
            </div>
          </div>
          
          <p class="education-card__thesis">{{ edu.thesis }}</p>
          
          <div class="education-card__achievements">
            <span class="education-card__achievements-label">Key Achievements</span>
            <div class="education-card__tags">
              <span 
                v-for="achievement in edu.achievements" 
                :key="achievement"
                class="education-card__tag"
              >
                {{ achievement }}
              </span>
            </div>
          </div>
        </article>
      </div>
      
      <p class="education__intro">{{ content.education.intro }}</p>
    </div>
  </section>
</template>

<script setup>
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'EducationSection'
})

const content = siteContent
</script>

<style lang="scss" scoped>
.education {
  position: relative;
  padding: 5rem 0;
  z-index: 1;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__intro {
    text-align: center;
    font-size: 1.2rem;
    color: var(--color-primary-light);
    line-height: 1.7;
    margin: 3rem auto 0;
    max-width: 800px;
  }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin: 0 0 3rem;
}

.education-card {
  background: var(--color-card-light);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem 2rem;
  transition: all 0.3s ease;

  .light & {
    background: var(--color-card-light);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  &__header {
    margin-bottom: 1rem;
  }

  &__title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  &__degree {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-on-card);
    margin: 0;
  }

  &__status {
    padding: 0.25rem 0.75rem;
    background: var(--color-success);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: var(--radius-full);
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  &__school,
  &__period,
  &__gpa {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);

    svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
  }

  &__thesis {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0 0 1.25rem;
  }

  &__achievements {
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.08);
  }

  &__achievements-label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-on-card);
    margin-bottom: 0.75rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tag {
    padding: 0.375rem 0.75rem;
    background: white;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: var(--radius-full);
    font-size: 0.8125rem;
    color: var(--color-text-on-card);
  }
}
</style>
