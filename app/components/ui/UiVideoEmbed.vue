<template>
  <div class="video" @click="load">
    <Transition name="fade">
      <div v-if="!loaded" class="thumb">
        <div class="play-btn">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <span class="label">Watch the introduction</span>
      </div>
    </Transition>
    <iframe v-if="loaded" :src="src" allowfullscreen allow="autoplay; encrypted-media" title="Video" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({ videoId: String })
const loaded = ref(false)
const src = ref('')
const load = () => {
  if (!loaded.value) {
    src.value = `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1`
    loaded.value = true
  }
}
</script>
<style scoped>
.video { border-radius:1.2rem; overflow:hidden; aspect-ratio:16/9; position:relative; background:#141414; border:1px solid var(--line); cursor:pointer }
.thumb { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.2rem; transition:background 0.3s }
.video:hover .thumb { background:rgba(255,255,255,0.02) }
.play-btn {
  width:80px; height:80px; border-radius:50%; background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; color:white;
  transition: transform 0.5s cubic-bezier(0.34, 1.75, 0.64, 1), background 0.3s ease, border-color 0.3s ease;
}
.video:hover .play-btn { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.4); transform:scale(1.06) }
.video:active .play-btn {
  transform:scale(0.9);
  background:rgba(255,255,255,0.2);
  border-color:rgba(255,255,255,0.8);
  transition: transform 0.05s cubic-bezier(0.2, 0, 0.8, 1), background 0.05s ease, border-color 0.05s ease;
}
.label { font-size:0.6rem; font-weight:200; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted) }
iframe { position:absolute; inset:0; width:100%; height:100%; border:none }
.fade-enter-active, .fade-leave-active { transition:opacity 0.3s }
.fade-enter-from, .fade-leave-to { opacity:0 }


</style>