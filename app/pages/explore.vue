<template>
  <section class="explore">
    <div class="explore__container">
      <PageHeader
        :eyebrow="$t(explorePage.eyebrowKey)"
        :title="$t(explorePage.headingKey)"
        :lede="$t(explorePage.ledeKey)"
      />

      <section
        v-for="(section, sIdx) in explorePage.sections"
        :key="section.id"
        class="explore-section"
        :class="['reveal', `reveal-d${Math.min(sIdx + 1, 4)}`]"
      >
        <div v-if="section.image" class="explore-section__heading">
          <img
            :src="section.image"
            :alt="section.imageAltKey ? $t(section.imageAltKey) : ''"
            decoding="async"
            loading="lazy"
          >
        </div>

        <DragScroller class="explore-section__scroller">
          <ExploreCard
            v-for="entry in section.entries"
            :key="entry.id"
            :entry="entry"
          />
        </DragScroller>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import PageHeader from '~/components/ui/PageHeader.vue'
import ExploreCard from '~/components/ui/ExploreCard.vue'
import DragScroller from '~/components/ui/DragScroller.vue'
import { explorePage } from '~/data/explore'

useCanonical('/explore')

useHead({
  title: 'Explore – Yannosay Productions',
  meta: [
    { name: 'description', content: 'Everything Yannosay Productions makes: coding tools, games, films, illustrations, videos, and the news that ties it together.' },
    { property: 'og:title', content: 'Explore – Yannosay Productions' },
    { property: 'og:description', content: 'Everything Yannosay Productions makes: coding tools, games, films, illustrations, videos, and the news that ties it together.' }
  ]
})
</script>

<style lang="scss" scoped>
@use '~/assets/css/components/page' as page;

.explore {
  --explore-bg: #000;
  @include page.page;

  &__container {
    max-width: 72rem;
    margin: 0 auto;
    width: 100%;
  }
}

.explore-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-top: 7rem;
  width: 100%;

  &:first-of-type {
    margin-top: 0;
  }
}

.explore-section__heading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    max-width: 512px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.explore-section__scroller {
  width: 100%;
  min-width: 0;
}

@media (max-width: 640px) {
  .explore-section {
    gap: 2rem;
    margin-top: 5rem;
  }

  .explore-section__heading img {
    max-width: 220px;
  }
}
</style>