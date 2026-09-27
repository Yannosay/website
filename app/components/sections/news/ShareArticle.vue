<template>
  <section class="share">
    <h2 class="share__heading">{{ $t('news.share.heading') }}</h2>
    <div class="share__row" role="group" :aria-label="$t('news.share.heading')">
      <a
        :href="xUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="share-btn"
        :aria-label="$t('news.share.aria.x')"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      <a
        :href="emailUrl"
        class="share-btn"
        :aria-label="$t('news.share.aria.email')"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </a>

      <button
        type="button"
        class="share-btn"
        :class="{ 'share-btn--copied': copied }"
        @click="copyLink"
        :aria-label="copied ? $t('news.share.copied') : $t('news.share.aria.copy')"
        :aria-live="copied ? 'polite' : 'off'"
      >
        <svg v-if="!copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>

      <button
        v-if="canNativeShare"
        type="button"
        class="share-btn"
        @click="nativeShare"
        :aria-label="$t('news.share.aria.native')"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  slug: { type: String, required: true }
})

const config = useRuntimeConfig()

const articleUrl = computed(() => {
  const base = String(config.public.siteUrl || '').replace(/\/$/, '')
  return `${base}/news/${props.slug}`
})

const shareText = computed(() => props.title)

const xUrl = computed(() =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(articleUrl.value)}`
)

const emailUrl = computed(() =>
  `mailto:?subject=${encodeURIComponent(shareText.value)}&body=${encodeURIComponent(articleUrl.value)}`
)

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

const copyLink = async () => {
  if (import.meta.client && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(articleUrl.value)
      copied.value = true
      if (copiedTimer) clearTimeout(copiedTimer)
      copiedTimer = setTimeout(() => {
        copied.value = false
      }, 2200)
      return
    } catch {
      copied.value = false
    }
  }
  if (import.meta.client) {
    const input = document.createElement('input')
    input.value = articleUrl.value
    input.setAttribute('readonly', 'readonly')
    input.style.position = 'absolute'
    input.style.left = '-9999px'
    document.body.appendChild(input)
    input.select()
    try {
      document.execCommand('copy')
      copied.value = true
      if (copiedTimer) clearTimeout(copiedTimer)
      copiedTimer = setTimeout(() => {
        copied.value = false
      }, 2200)
    } catch {
      copied.value = false
    }
    document.body.removeChild(input)
  }
}

const canNativeShare = ref(false)

const nativeShare = async () => {
  if (!import.meta.client) return
  if (typeof navigator.share !== 'function') return
  try {
    await navigator.share({
      title: props.title,
      text: props.title,
      url: articleUrl.value
    })
  } catch {
    /* user cancelled */
  }
}

onMounted(() => {
  canNativeShare.value =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function'
})

onUnmounted(() => {
  if (copiedTimer) clearTimeout(copiedTimer)
})
</script>

<style scoped>
.share {
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.share__heading {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 1.25rem;
}

.share__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.share-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: var(--white);
}

.share-btn:focus-visible {
  outline: 2px solid var(--white);
  outline-offset: 3px;
}

.share-btn:active {
  transform: scale(0.94);
}

.share-btn--copied,
.share-btn--copied:hover {
  background: linear-gradient(135deg, #ffb1db 0%, #ffe5f3 100%);
  border-color: #ffe5f3;
  color: #0a0a0a;
}

@media (prefers-reduced-motion: reduce) {
  .share-btn {
    transition-duration: 0.001ms;
  }
  .share-btn:active {
    transform: none;
  }
}
</style>
