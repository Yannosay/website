<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">
    <NewsSectionArticle :key="route.fullPath" :slug="slug" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NewsSectionArticle from '~/components/sections/news/NewsSectionArticle.vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
</script>
