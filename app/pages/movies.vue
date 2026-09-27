<template>
  <section class="movies-page">
    <div class="movies-page__container">
      <PageHeader
        :eyebrow="$t('pages.movies.eyebrow')"
        :title="$t('pages.movies.heading')"
        :lede="$t('pages.movies.lede')"
      />
      <div class="movies-page__grid">
        <article class="movie-card">
          <p class="movie-card__label">{{ $t('pages.movies.status') }}</p>
          <h2 class="movie-card__title">—</h2>
          <p class="movie-card__body">{{ $t('pages.movies.lede') }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PageHeader from '~/components/ui/PageHeader.vue'

useCanonical('/movies')

useHead({
  title: 'Movies – Yannosay Productions',
  meta: [
    { name: 'description', content: 'Films from Yannosay Productions.' },
    { property: 'og:title', content: 'Movies – Yannosay Productions' },
    { property: 'og:description', content: 'Films from Yannosay Productions.' }
  ]
})
</script>

<style lang="scss" scoped>
@use '~/assets/css/components/page' as page;

.movies-page {
  @include page.page;

  &__container { @include page.container; }
  &__grid { @include page.grid; }
}

.movie-card {
  @include page.card;

  &__label { @include page.card-label; }
  &__title { @include page.card-title; }
  &__body { @include page.card-body; }
}
</style>
