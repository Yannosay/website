<template>
  <section class="news-article">
    <div v-if="pending" class="loading">
      <div class="spinner" />
    </div>

    <div v-else-if="error" class="error-state">
      <p>Unable to load this article.</p>
      <NuxtLink to="/news" class="retry-btn">← Back to announcements</NuxtLink>
    </div>

    <article v-else-if="article">
      <NuxtLink to="/news" class="back-link">← Back to announcements</NuxtLink>
      <h1 class="title">{{ article.title }}</h1>
      <time class="date" :datetime="article.date">
        {{ formatDate(article.date) }}
      </time>
      <div class="content" v-html="renderedContent" />
    </article>
  </section>
</template>

<script setup>
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('json', json)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return code
    }
  })
)

marked.setOptions({
  breaks: true,
  gfm: true,
  html: true
})

const props = defineProps({
  slug: { type: String, required: true }
})

const { data: article, pending, error } = await useAsyncData(
  `news-article-${props.slug}`,
  () =>
    $fetch(`/api/news/${props.slug}`, {
      baseURL: 'https://news-api.yp-worker.workers.dev',
      headers: { Accept: 'application/json' }
    }),
  { server: true }
)

const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  return marked.parse(article.value.content)
})

function formatDate(dateStr) {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.news-article {
  min-height: 100svh;
  padding: 6rem 2rem;
  max-width: 44rem;
  margin: 0 auto;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60svh;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60svh;
  gap: 1rem;
  color: var(--muted);
  text-align: center;
}

.back-link,
.retry-btn {
  display: inline-block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  margin-bottom: 2.5rem;
  transition: color 0.2s;
}

.back-link:hover,
.retry-btn:hover {
  color: var(--white);
}

.title {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.04em;
  line-height: 1.08;
}

.date {
  display: block;
  margin-top: 0.6rem;
  font-size: 0.875rem;
  color: var(--muted);
}

.content {
  margin-top: 2.5rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.05rem;
}

.content :deep(h2) {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--white);
}

.content :deep(h3) {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.35rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: var(--white);
}

.content :deep(p) {
  margin-bottom: 1rem;
}

.content :deep(strong) {
  font-weight: 600;
  color: var(--white);
}

.content :deep(a) {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.content :deep(a:hover) {
  opacity: 0.8;
}

.content :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.content :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.content :deep(li) {
  margin-bottom: 0.4rem;
}

.content :deep(blockquote) {
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.content :deep(code) {
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
  background: rgba(255, 255, 255, 0.06);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.content :deep(pre) {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
}

.content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 2rem 0;
}

.content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.content :deep(.hljs-string) {
  color: #a5d6ff;
}

.content :deep(.hljs-number) {
  color: #ffab70;
}

.content :deep(.hljs-literal) {
  color: #ffab70;
}

.content :deep(.hljs-keyword) {
  color: #c792ea;
}

.content :deep(.hljs-title) {
  color: #82aaff;
}

.content :deep(.hljs-type) {
  color: #ffcb6b;
}

.content :deep(.hljs-attr) {
  color: #c792ea;
}

.content :deep(.hljs-built_in) {
  color: #ffcb6b;
}

.content :deep(.hljs-comment) {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
}

.content :deep(.hljs-punctuation) {
  color: rgba(255, 255, 255, 0.5);
}

.content :deep(.hljs-property) {
  color: #80cbc4;
}

.content :deep(button) {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.content :deep(button:hover) {
  background: rgba(255, 255, 255, 0.14);
}
</style>