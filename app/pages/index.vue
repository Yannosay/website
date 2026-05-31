<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">
    <HomeSectionHero />
    <HomeSectionWork :items="workItems" />
    <HomeSectionSinth />
    <HomeSectionNews />
    <HomeSectionFilms :items="filmItems" />
    <HomeSectionMore :items="moreItems" />
  </div>
</template>

<script setup>
const { workItems, filmItems, moreItems } = useSiteData()

useHead({
  title: 'Yannosay Productions',
  meta: [
    { name: 'description', content: 'Latest news and updates from Yannosay Productions.' },
    { property: 'og:description', content: 'Latest news and updates from Yannosay Productions.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: '/assets/img.png' },
    { property: 'og:image', content: '/assets/img.png' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/logo.png' }
  ]
})


</script>