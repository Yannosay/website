<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">
    <NewsSectionList />
  </div>
</template>

<script setup>
useHead({
  title: 'Announcements – Yannosay Productions',
  meta: [
    { name: 'description', content: 'Latest news and updates from Yannosay Productions.' },
    { property: 'og:description', content: 'Latest news and updates from Yannosay Productions.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>