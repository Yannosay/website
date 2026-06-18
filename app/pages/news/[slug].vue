<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">
    <NewsSectionArticle :slug="slug" />
  </div>
</template>

<script setup>
import NewsSectionArticle from '~/components/sections/news/NewsSectionArticle.vue';

const route = useRoute()
const slug = route.params.slug

const { data: article } = await useAsyncData(`news-article-${slug}`, () =>
  $fetch(`/api/news/${slug}`, {
    baseURL: 'https://news-api.yp-worker.workers.dev',
    headers: { Accept: 'application/json' }
  })
)

useHead({
  title: () => article.value?.title ? `${article.value.title} – Yannosay Productions` : 'Announcement – Yannosay Productions'
})
</script>