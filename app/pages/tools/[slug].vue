<template>
  <section class="tool-detail">
    <div class="tool-detail__container">
      <img
        :src="tool.logo"
        :alt="tool.name"
        class="tool-detail__logo"
        width="640"
        height="320"
        decoding="async"
      />
      <p class="tool-detail__description">{{ tool.longDescription }}</p>

      <div class="tool-detail__actions">
        <a
          :href="tool.downloadUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="tool-detail__btn tool-detail__btn--primary"
        >
          {{ $t('tools.download') }}
        </a>
        <a
          :href="tool.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="tool-detail__btn tool-detail__btn--secondary"
        >
          {{ $t('tools.github') }}
        </a>
      </div>

      <div v-if="tool.docsUrl" class="tool-detail__docs">
        <p class="tool-detail__docs-text">{{ $t('tools.docsHeading') }}</p>
        <a
          :href="tool.docsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="tool-detail__docs-link"
        >
          {{ $t('tools.docsLink') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tools } from '~/data/tools'

const route = useRoute()
const slug = String(route.params.slug || '')
const tool = tools.find((t) => t.slug === slug)

if (!tool) {
  throw createError({ statusCode: 404, statusMessage: 'Tool not found' })
}

useCanonical(`/tools/${tool.slug}`)

useHead({
  title: `${tool.name} – Yannosay Productions`,
  meta: [
    { name: 'description', content: tool.description },
    { property: 'og:title', content: tool.name },
    { property: 'og:description', content: tool.description },
    { property: 'og:image', content: tool.logo }
  ]
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.longDescription,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        url: tool.docsUrl || tool.downloadUrl || undefined
      })
    }
  ]
})
</script>

<style lang="scss" scoped>
.tool-detail {
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;

  &__container {
    max-width: 720px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__logo {
    width: 100%;
    max-width: 320px;
    height: auto;
    margin-bottom: 2.5rem;
    object-fit: contain;
  }

  &__description {
    font-size: 1.05rem;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.8;
    max-width: 60ch;
    margin-bottom: 3rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 4rem;
  }

  &__btn {
    padding: 0.75rem 2rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 0.75rem;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(0) scale(0.98); }

    &--primary {
      background-color: var(--white);
      color: var(--black);

      &:hover { background-color: rgba(255, 255, 255, 0.88); }
    }

    &--secondary {
      background-color: rgba(255, 255, 255, 0.06);
      color: var(--white);
      border: 1px solid rgba(255, 255, 255, 0.1);

      &:hover { background-color: rgba(255, 255, 255, 0.1); }
    }
  }

  &__docs {
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    width: 100%;
  }

  &__docs-text {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--white);
    margin-bottom: 0.75rem;
  }

  &__docs-link {
    font-size: 0.88rem;
    font-weight: 400;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover { color: var(--white); }
  }
}

@media (max-width: 640px) {
  .tool-detail {
    padding: 4rem 1.2rem;

    &__description { font-size: 0.95rem; margin-bottom: 2rem; }
    &__actions { flex-direction: column; width: 100%; }
    &__btn { text-align: center; }
  }
}
</style>
