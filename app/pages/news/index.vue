<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">
    <NewsSectionList />
  </div>
</template>

<script setup>
import NewsSectionList from '~/components/sections/news/NewsSectionList.vue'

useCanonical('/news')

useHead({
  title: 'News – Yannosay Productions'
})
</script>
