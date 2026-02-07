<template>
  <section id="home" class="overview">
    <div class="overview__container">
      <div class="overview__content">
        <!-- Left side text content  -->
        <div class="overview__text">
          <h1 class="overview__name">
            {{ content.personal.name }}<span class="overview__nickname">({{ content.personal.nickname }})</span>
          </h1>
          
          <p class="overview__welcome">
            {{ content.overview.welcome }} {{ content.overview.description }}
            <span v-if="content.overview.note" class="overview__note">{{ content.overview.note }}</span>
          </p>
          
          <p class="overview__background">
            {{ content.overview.background }}
            <span v-if="content.overview.backgroundNote" class="overview__note">{{ content.overview.backgroundNote }}</span>
          </p>
          
          <!-- Contact Information -->
          <div class="overview__contact-info">
            <div class="overview__contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{{ content.personal.institution }}({{ content.personal.location }})</span>
            </div>
            <div class="overview__contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              <a :href="`mailto:${content.personal.email}`">{{ content.personal.email }}</a>
            </div>
            <div v-for="link in visibleSocialLinks" :key="link.platform" class="overview__contact-item">
              <component :is="getSocialIcon(link.platform)" />
              <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label.toLowerCase() }}</a>
            </div>
          </div>
          
          <!-- Buttons -->
          <div class="overview__buttons">
            <a 
              v-for="button in content.overview.buttons" 
              :key="button.text"
              :href="getHref(button.link)"
              :download="button.icon === 'download' ? getFilename(button.link) : null"
              class="overview__button"
              :class="`overview__button--${button.style}`"
            >
              <svg v-if="button.icon === 'download'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              {{ button.text }}
            </a>
          </div>
        </div>
        
        <!-- Right side avatar -->
        <div class="overview__avatar-wrapper">
          <div class="overview__avatar-circle">
            <img 
              :src="content.personal.avatar" 
              :alt="content.personal.name"
              class="overview__avatar"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
      
      <!-- Research Snapshot Card -->
      <div class="research-snapshot">
        <h2 class="research-snapshot__title">{{ content.researchSnapshot.sectionTitle }}</h2>
        
        <div class="research-snapshot__content">
          <div class="research-snapshot__column">
            <h3 class="research-snapshot__subtitle">{{ content.researchSnapshot.coreResearch.title }}</h3>
            <ul class="research-snapshot__list">
              <li v-for="item in content.researchSnapshot.coreResearch.items" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
          
          <div class="research-snapshot__divider"></div>
          
          <div class="research-snapshot__column">
            <h3 class="research-snapshot__subtitle">{{ content.researchSnapshot.currentStatus.title }}</h3>
            <ul class="research-snapshot__list">
              <li v-for="item in content.researchSnapshot.currentStatus.items" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        
        <div class="research-snapshot__keywords">
          <span class="research-snapshot__keywords-label">Keywords</span>
          <div class="research-snapshot__tags">
            <span 
              v-for="keyword in content.researchSnapshot.keywords" 
              :key="keyword"
              class="research-snapshot__tag"
            >
              {{ keyword }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, h } from 'vue'
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'OverviewSection'
})

const content = siteContent

const visibleSocialLinks = computed(() => 
  content.socialLinks.filter(link => link.url)
)

// Social icon components mapping
const socialIcons = {
  github: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'social-icon' }, [
    h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })
  ]),
  twitter: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'social-icon' }, [
    h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' })
  ]),
  linkedin: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'social-icon' }, [
    h('path', { d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' })
  ]),
  googleScholar: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'social-icon' }, [
    h('path', { d: 'M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z' })
  ])
}

const getSocialIcon = (platform) => socialIcons[platform] ?? socialIcons.github

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23e0d4f7"/><stop offset="100%" style="stop-color:%23c4b5e8"/></linearGradient></defs><rect width="200" height="200" fill="url(%23bg)"/></svg>'
}

const getHref = (link) => {
  if (!link) return '#'
  // Absolute http(s) or anchor links are returned as-is
  if (/^https?:\/\//.test(link) || link.startsWith('#')) return link
  
  const base = import.meta.env.BASE_URL || '/'
  // If link already includes the base prefix, return as-is
  if (link.startsWith(base)) return link
  // If link is absolute-root (starts with '/'), strip leading slash and prepend base
  if (link.startsWith('/')) return base + link.replace(/^\//, '')
  // Otherwise assume relative path and prepend base
  return base + link
}

const getFilename = (link) => {
  if (!link) return ''
  try {
    const parts = link.split('/')
    return parts[parts.length - 1] || ''
  } catch {
    return ''
  }
}
</script>

<style lang="scss" scoped>
.overview {
  position: relative;
  min-height: 100vh;
  padding: 100px 0 60px;
  z-index: 1;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: start;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr auto;
    }
  }

  &__text {
    max-width: 700px;
  }

  &__name {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 1.5rem;
    line-height: 1.2;
  }

  &__nickname {
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  &__welcome {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin: 0 0 1rem;
  }

  &__background {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }

  &__note {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  &__contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    margin-bottom: 1.5rem;
  }

  &__contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);

    svg,
    :deep(.social-icon) {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    a {
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;

    svg {
      width: 16px;
      height: 16px;
    }

    &--primary {
      background: var(--color-primary);
      color: white;

      &:hover {
        background: var(--color-primary-dark);
        transform: translateY(-2px);
      }
    }

    &--secondary {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);

      &:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }
    }
  }

  &__avatar-wrapper {
    display: flex;
    justify-content: center;
  }

  &__avatar-circle {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, #e0d4f7, #c4b5e8);

    @media (min-width: 768px) {
      width: 280px;
      height: 280px;
    }
  }

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Research Snapshot */
.research-snapshot {
  background: var(--color-card-light);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: var(--radius-xl);
  padding: 2rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 1.5rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr auto 1fr;
      gap: 2rem;
    }
  }

  &__column {
    min-width: 0;
  }

  &__subtitle {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 1rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      font-size: 0.875rem;
      color: #4a4a6a;
      line-height: 1.5;
    }
  }

  &__divider {
    display: none;
    width: 1px;
    background: rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
      display: block;
    }
  }

  &__keywords {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__keywords-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 0.75rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tag {
    padding: 0.375rem 0.875rem;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: var(--radius-full);
    font-size: 0.8125rem;
    color: #1a1a2e;
    transition: all 0.2s;

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  }
}
</style>
