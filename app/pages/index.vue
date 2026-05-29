<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">
    <HomeSectionHero />
    <HomeSectionWork :items="workItems" />
    <HomeSectionSinth />
    <HomeSectionFilms :items="filmItems" />
    <HomeSectionMore :items="moreItems" />
  </div>
</template>

<script setup>
const { workItems, filmItems, moreItems } = useSiteData()

useHead({
  title: 'Yannosay Productions',
  meta: [
    { name: 'description', content: 'We do..' },
    { property: 'og:description', content: 'We do...' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: '/assets/img.png' },
    { property: 'og:image', content: '/assets/img.png' }
  ]
})


</script>