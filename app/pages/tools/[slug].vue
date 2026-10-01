<template>
  <section v-if="detail" class="tool-detail">
    <div class="tool-detail__container">
      <img
        v-if="detail.image"
        :src="detail.image"
        :alt="detail.name"
        class="tool-detail__logo"
        width="640"
        height="320"
        decoding="async"
      >

      <p class="tool-detail__description">{{ detail.description }}</p>

      <div v-if="detail.buttons.length" class="tool-detail__actions">
        <template v-for="btn in detail.buttons" :key="btn.id">
          <a
            v-if="btn.href"
            :href="btn.href"
            :target="btn.external ? '_blank' : undefined"
            :rel="btn.external ? 'noopener noreferrer' : undefined"
            class="tool-detail__btn"
            :class="btn.variant === 'filled' ? 'tool-detail__btn--primary' : 'tool-detail__btn--secondary'"
          >
            {{ btn.label }}
          </a>
          <NuxtLink
            v-else-if="btn.to"
            :to="btn.to"
            class="tool-detail__btn"
            :class="btn.variant === 'filled' ? 'tool-detail__btn--primary' : 'tool-detail__btn--secondary'"
          >
            {{ btn.label }}
          </NuxtLink>
        </template>
      </div>

      <div v-if="detail.sections.length" class="tool-detail__sections">
        <div v-for="(section, i) in detail.sections" :key="i" class="tool-detail__docs">
          <p class="tool-detail__docs-text">{{ section.heading }}</p>
          <p v-if="section.body" class="tool-detail__docs-body">{{ section.body }}</p>
          <a
            v-if="section.link"
            :href="section.link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="tool-detail__docs-link"
          >
            {{ section.link.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { findExploreEntry, type ExploreButton } from '~/data/explore'
import { tools } from '~/data/tools'

interface DetailButton {
  id: string
  label: string
  variant: 'filled' | 'ghost'
  href?: string
  to?: string
  external: boolean
}

interface DetailSection {
  heading: string
  body?: string
  link?: { label: string; href: string }
}

interface DetailView {
  name: string
  image: string
  description: string
  buttons: DetailButton[]
  sections: DetailSection[]
}

const route = useRoute()
const { t } = useI18n()
const slug = String(route.params.slug || '')

const detail = computed<DetailView | null>(() => {
  const entry = findExploreEntry(slug)

  if (entry && entry.detail) {
    const buttonSource: readonly ExploreButton[] = entry.detail.buttons ?? []
    const buttons: DetailButton[] = buttonSource.map(btn => {
      const isExternal = btn.action.kind === 'external'
      const href = isExternal ? (btn.action.href ?? '') : undefined
      const to = !isExternal ? (btn.action.to ?? '') : undefined
      return {
        id: btn.id,
        label: t(btn.labelKey),
        variant: btn.variant,
        href,
        to,
        external: isExternal
      }
    })

    const sections: DetailSection[] = (entry.detail.sections ?? []).map(s => ({
      heading: t(s.headingKey),
      body: s.bodyKey ? t(s.bodyKey) : undefined,
      link: s.link ? { label: t(s.link.labelKey), href: s.link.href } : undefined
    }))

    return {
      name: t(entry.nameKey),
      image: entry.detail.image ?? entry.image ?? '',
      description: t(entry.detail.longDescriptionKey),
      buttons,
      sections
    }
  }

  const tool = tools.find(x => x.slug === slug)
  if (!tool) return null

  return {
    name: tool.name,
    image: tool.logo,
    description: tool.longDescription,
    buttons: [
      { id: 'download', label: 'Download here', variant: 'filled', href: tool.downloadUrl, external: true },
      { id: 'github', label: 'Visit on GitHub', variant: 'ghost', href: tool.githubUrl, external: true }
    ],
    sections: tool.docsUrl
      ? [{
          heading: 'Our Official Documentation',
          link: { label: 'View Docs', href: tool.docsUrl }
        }]
      : []
  }
})

if (!detail.value) {
  throw createError({ statusCode: 404, statusMessage: 'Tool not found' })
}

useCanonical(`/tools/${slug}`)

useHead(() => ({
  title: `${detail.value?.name ?? 'Tool'} – Yannosay Productions`,
  meta: [
    { name: 'description', content: detail.value?.description ?? '' },
    { property: 'og:title', content: detail.value?.name ?? '' },
    { property: 'og:description', content: detail.value?.description ?? '' },
    { property: 'og:image', content: detail.value?.image ?? '' }
  ]
}))
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

  &__sections {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
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

  &__docs-body {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.7;
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