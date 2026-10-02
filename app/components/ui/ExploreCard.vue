<template>
  <article class="explore-card">
    <component
      :is="wrapperTag"
      v-bind="wrapperAttrs"
      class="explore-card__inner"
    >
      <div class="explore-card__media">
        <img
          v-if="entry.image"
          :src="entry.image"
          :alt="entry.imageAltKey ? $t(entry.imageAltKey) : $t(entry.nameKey)"
          width="400"
          height="200"
          decoding="async"
          loading="lazy"
        >
      </div>
      <div class="explore-card__overlay">
        <h3 class="explore-card__name">{{ $t(entry.nameKey) }}</h3>
        <p class="explore-card__desc">{{ $t(entry.descKey) }}</p>
      </div>
    </component>
  </article>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import type { ExploreEntry } from '~/data/explore'

const props = defineProps<{ entry: ExploreEntry }>()

const wrapperTag = computed(() => {
  if (props.entry.cardHref) return 'a'
  if (props.entry.cardTo) return resolveComponent('NuxtLink')
  return 'div'
})

const wrapperAttrs = computed(() => {
  if (props.entry.cardHref) {
    return {
      href: props.entry.cardHref,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  if (props.entry.cardTo) {
    return { to: props.entry.cardTo }
  }
  return {}
})
</script>

<style lang="scss" scoped>
.explore-card {
  position: relative;
  width: 22rem;
  min-height: 240px;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.12);
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);

      .explore-card__media {
        opacity: 0.12;
        transform: scale(0.94);
      }

      .explore-card__overlay {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &:has(.explore-card__inner:focus-visible) {
    outline: 2px solid rgba(255, 255, 255, 0.45);
    outline-offset: 4px;

    .explore-card__media {
      opacity: 0.12;
      transform: scale(0.94);
    }

    .explore-card__overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:has(.explore-card__inner:active) {
    transform: scale(0.97);
    transition: transform 0.06s cubic-bezier(0.2, 0, 0.8, 1);
  }
}

.explore-card__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 240px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  outline: none;
}

.explore-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: opacity 320ms var(--ease, ease), transform 420ms var(--ease, ease);

  img {
    max-width: 220px;
    max-height: 120px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.explore-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.75rem 2.25rem;
  text-align: center;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 320ms var(--ease, ease), transform 320ms var(--ease, ease);
  pointer-events: none;
}

.explore-card__name {
  font-family: var(--font-sans, sans-serif);
  font-weight: 900;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--white, #fff);
  margin-bottom: 0.6rem;
  overflow-wrap: anywhere;
}

.explore-card__desc {
  font-size: 0.82rem;
  font-weight: 300;
  color: var(--muted, #888);
  line-height: 1.65;
  max-width: 30ch;
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .explore-card {
    width: 16rem;
    min-height: 200px;
  }

  .explore-card__inner {
    min-height: 200px;
    padding: 1.5rem;
  }

  .explore-card__media img {
    max-width: 180px;
    max-height: 100px;
  }

  .explore-card__overlay {
    padding: 1.25rem 1.5rem;
  }

  .explore-card__name {
    font-size: 1.05rem;
  }

  .explore-card__desc {
    font-size: 0.78rem;
  }
}
</style>