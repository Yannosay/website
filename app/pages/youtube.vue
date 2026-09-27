<template>
  <section class="youtube-page">
    <div class="youtube-page__container">
      <PageHeader
        :eyebrow="$t('pages.youtube.eyebrow')"
        :title="$t('pages.youtube.heading')"
        :lede="$t('pages.youtube.lede')"
      >
        <template #actions>
          <PillButton href="https://youtube.com/@yannosay" variant="filled">
            {{ $t('pages.youtube.visit') }}
          </PillButton>
        </template>
      </PageHeader>
      <p class="youtube-page__handle">youtube.com/@yannosay</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import PageHeader from '~/components/ui/PageHeader.vue'
import PillButton from '~/components/ui/PillButton.vue'

useCanonical('/youtube')

useHead({
  title: 'YouTube – Yannosay Productions',
  meta: [
    { name: 'description', content: 'Videos, roleplays, and behind-the-scenes from Yannosay Productions.' },
    { property: 'og:title', content: 'YouTube – Yannosay Productions' },
    { property: 'og:description', content: 'Videos, roleplays, and behind-the-scenes from Yannosay Productions.' }
  ]
})
</script>

<style lang="scss" scoped>
@use '~/assets/css/components/page' as page;

.youtube-page {
  @include page.page;
  min-height: 100svh;
  display: flex;
  align-items: center;

  &__container {
    @include page.container;
    width: 100%;
  }

  &__handle {
    margin: 1.5rem auto 0;
    text-align: center;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1rem;
    color: var(--muted);
  }
}
</style>
