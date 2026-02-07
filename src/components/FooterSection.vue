<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <p class="footer__copyright">{{ content.footer.copyright }}</p>
      </div>
      
      <div class="footer__links">
        <a 
          v-for="(link, index) in content.footer.links" 
          :key="index"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__link"
          :title="link.label"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { siteContent } from '../content/siteContent.js'

defineOptions({
  name: 'FooterSection'
})

const content = siteContent
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  z-index: 1;
  background: linear-gradient(0deg, rgba(var(--color-primary-rgb), 0.06), transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  color: var(--color-text);
}

.footer__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

.footer__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer__copyright {
  font-size: 0.875rem;
  color: var(--color-text);
  margin: 0;
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__link {
  font-size: 0.8125rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.12s ease;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-1px);
  }
}
</style>
