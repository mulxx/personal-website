<template>
  <section class="research-interests">
    <div class="research-interests__container">
      <h2 class="section-title">{{ content.coreResearchInterests.sectionTitle }}</h2>
      
      <!-- Interest Pills -->
      <div class="research-interests__pills">
        <div 
          v-for="(interest, index) in content.coreResearchInterests.interests" 
          :key="index"
          class="interest-pill"
          :class="{ 'interest-pill--active': activeIndex === index }"
          @click="activeIndex = index"
          @mouseenter="activeIndex = index"
        >
          <span class="interest-pill__title">{{ interest.title }}</span>
          <div class="interest-pill__descriptions">
            <p v-for="desc in interest.descriptions" :key="desc">{{ desc }}</p>
          </div>
        </div>
      </div>
      
      <!-- Research Interests -->
      <div class="research-interests__questions-wrapper">
        <div class="research-interests__questions">
          <p 
            v-for="(question, index) in content.coreResearchInterests.researchQuestions" 
            :key="index"
            class="research-question"
          >
            {{ question }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'ResearchInterestsSection'
})

const content = siteContent
const activeIndex = ref(0)
</script>

<style lang="scss" scoped>
.research-interests {
  position: relative;
  padding: 4rem 0 0;
  z-index: 1;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__pills {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-bottom: 0;
  }

  &__questions-wrapper {
    background: var(--color-primary);
    margin-top: 3rem;
    margin-left: -2rem;
    margin-right: -2rem;
    padding: 3rem 2rem;
  }

  &__questions {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  margin: 0 0 2.5rem;
}

.interest-pill {
  background: var(--color-primary);
  border-radius: var(--radius-xl);
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow);
  }

  &__title {
    display: block;
    font-size: 0.9375rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.75rem;
  }

  &__descriptions {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    p {
      font-size: 0.8125rem;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      line-height: 1.4;
    }
  }
}

.research-question {
  font-size: 1.5rem;
  font-weight: 700;
  font-style: italic;
  color: #fbbf24;
  line-height: 1.5;
  margin: 0 0 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
}
</style>
