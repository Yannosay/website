<template>
  <div class="video">
    <button
      v-if="!loaded"
      type="button"
      class="thumb"
      @click="load"
      :aria-label="$t('home.sinth.watchVideo')"
    >
      <span class="play-btn" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </span>
      <span class="label">Watch the introduction</span>
    </button>
    <iframe
      v-if="loaded"
      :src="src"
      allowfullscreen
      allow="autoplay; encrypted-media; picture-in-picture"
      :title="videoTitle"
      loading="lazy"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  videoId: { type: String, required: true },
  videoTitle: { type: String, default: 'Sinth introduction video' }
})

const loaded = ref(false)
const src = ref('')

const load = () => {
  if (loaded.value) return
  const id = encodeURIComponent(props.videoId)
  src.value = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
  loaded.value = true
}
</script>

<style scoped>
.video {
  border-radius: 1.2rem;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  position: relative;
  background: #141414;
  border: 1px solid var(--line);
}

.thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  transition: background 0.3s;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
}

.thumb:focus-visible {
  outline: 2px solid var(--white);
  outline-offset: -6px;
  border-radius: 1.2rem;
}

.thumb:hover { background: rgba(255, 255, 255, 0.02); }

.play-btn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: transform 0.5s cubic-bezier(0.34, 1.75, 0.64, 1), background 0.3s ease, border-color 0.3s ease;
}

.thumb:hover .play-btn {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.06);
}

.thumb:active .play-btn {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
  transition: transform 0.05s cubic-bezier(0.2, 0, 0.8, 1), background 0.05s ease, border-color 0.05s ease;
}

.label {
  font-size: 0.6rem;
  font-weight: 200;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@media (prefers-reduced-motion: reduce) {
  .thumb:hover .play-btn,
  .thumb:active .play-btn { transform: none; }
}
</style>
