<template>
  <section class="illustrations-page">
    <div class="illustrations-page__container">
      <PageHeader
        :eyebrow="$t('pages.illustrations.eyebrow')"
        :title="$t('pages.illustrations.heading')"
        :lede="$t('pages.illustrations.lede')"
      />
      <div class="illustrations-page__grid">
        <article class="illustration-card">
          <p class="illustration-card__label">{{ $t('pages.illustrations.status') }}</p>
          <h2 class="illustration-card__title">—</h2>
          <p class="illustration-card__body">{{ $t('pages.illustrations.lede') }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PageHeader from '~/components/ui/PageHeader.vue'

useCanonical('/illustrations')

useHead({
  title: 'Illustrations – Yannosay Productions',
  meta: [
    { name: 'description', content: 'Illustrations from Yannosay Productions.' },
    { property: 'og:title', content: 'Illustrations – Yannosay Productions' },
    { property: 'og:description', content: 'Illustrations from Yannosay Productions.' }
  ]
})
</script>

<style lang="scss" scoped>
@use '~/assets/css/components/page' as page;

.illustrations-page {
  @include page.page;

  &__container { @include page.container; }
  &__grid { @include page.grid; }
}

.illustration-card {
  @include page.card;

  &__label { @include page.card-label; }
  &__title { @include page.card-title; }
  &__body { @include page.card-body; }
}
</style>
