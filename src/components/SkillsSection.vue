<template>
  <section class="skills">
    <div class="skills__container">
      <h2 class="section-title">{{ content.methodSkills.sectionTitle }}</h2>
      
      <!-- Skills groups -->
      <div class="skills__groups">
        <div 
          v-for="(group, index) in content.methodSkills.groups" 
          :key="index"
          class="skill-group"
        >
          <h3 class="skill-group__title">{{ group.name }}</h3>
          <div class="skill-group__tags">
            <span 
              v-for="skill in group.skills" 
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Additional Experience (if any) -->
      <div v-if="content.methodSkills.additionalExperience?.length" class="additional-experience">
        <h3 class="additional-experience__title">Additional Experience</h3>
        <div class="experience-list">
          <div 
            v-for="(exp, index) in content.methodSkills.additionalExperience" 
            :key="index"
            class="experience-item"
          >
            <div class="experience-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div class="experience-item__content">
              <h4 class="experience-item__title">{{ exp.title }}</h4>
              <p class="experience-item__description">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'SkillsSection'
})

const content = siteContent
</script>

<style lang="scss" scoped>
.skills {
  position: relative;
  padding: 4rem 0;
  z-index: 1;

  &__container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  margin: 0 0 2.5rem;
}

.skill-group {
  text-align: center;

  &__title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-primary);
    margin: 0 0 1rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
}

.skill-tag {
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.375rem 0.875rem;
  background: var(--color-card-light);
  color: #4a4a6a;
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-2px);
  }
}

/* Additional Experience */
.additional-experience {
  border-top: 1px solid var(--color-border);
  padding-top: 2.5rem;

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    text-align: center;
    margin: 0 0 1.5rem;
  }
}

.experience-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.experience-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-card-light);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
  }

  &__icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-sm);
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 0.25rem;
  }

  &__description {
    font-size: 0.8125rem;
    color: #6a6a8a;
    margin: 0;
    line-height: 1.4;
  }
}
</style>
