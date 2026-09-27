<template>
  <section class="tools-page">
    <div class="tools-page__container">
      <PageHeader
        :eyebrow="$t('tools.eyebrow')"
        :title="$t('tools.heading')"
        :lede="$t('tools.lede')"
      />
      <div class="tools-page__grid">
        <NuxtLink
          v-for="tool in tools"
          :key="tool.slug"
          :to="`/tools/${tool.slug}`"
          class="tool-card"
        >
          <div class="tool-card__media">
            <img
              :src="tool.logo"
              :alt="tool.name"
              width="400"
              height="200"
              decoding="async"
              loading="lazy"
            />
          </div>
          <p class="tool-card__description">{{ tool.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PageHeader from '~/components/ui/PageHeader.vue'
import { tools } from '~/data/tools'

useCanonical('/tools')

useHead({
  title: 'Tools – Yannosay Productions',
  meta: [
    { name: 'description', content: "Overview of Yannosay Productions' premium tools." },
    { property: 'og:title', content: 'Tools – Yannosay Productions' },
    { property: 'og:description', content: "Overview of Yannosay Productions' premium tools." }
  ]
})
</script>

<style lang="scss" scoped>
@use '~/assets/css/components/page' as page;

.tools-page {
  @include page.page;

  &__container { @include page.container; }
  &__grid { @include page.grid; }
}

.tool-card {
  @include page.card;
  @include page.card-interactive;

  &__media { @include page.card-media; }

  &__description { @include page.card-body; }
}
</style>
