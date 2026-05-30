<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">
    <NewsSectionArticle :slug="slug" />
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

useHead({
  title: `${slug.replace(/-/g, ' ')} – Yannosay Productions`
})
</script>