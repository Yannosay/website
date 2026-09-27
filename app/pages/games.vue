<template>
  <section class="games-page">
    <div class="games-page__container">
      <PageHeader
        :eyebrow="$t('pages.games.eyebrow')"
        :title="$t('pages.games.heading')"
        :lede="$t('pages.games.lede')"
      />
      <div class="games-page__grid">
        <article class="game-card">
          <p class="game-card__label">{{ $t('pages.games.status') }}</p>
          <h2 class="game-card__title">Niquitia</h2>
          <p class="game-card__body">{{ $t('pages.games.niquitia') }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PageHeader from '~/components/ui/PageHeader.vue'

useCanonical('/games')

useHead({
  title: 'Games – Yannosay Productions',
  meta: [
    { name: 'description', content: 'Games from Yannosay Productions.' },
    { property: 'og:title', content: 'Games – Yannosay Productions' },
    { property: 'og:description', content: 'Games from Yannosay Productions.' }
  ]
})
</script>

<style lang="scss" scoped>
@use '~/assets/css/components/page' as page;

.games-page {
  @include page.page;

  &__container { @include page.container; }
  &__grid { @include page.grid; }
}

.game-card {
  @include page.card;

  &__label { @include page.card-label; }
  &__title { @include page.card-title; }
  &__body { @include page.card-body; }
}
</style>
