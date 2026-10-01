<template>
  <svg
    class="explore-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ name: string }>()

const FALLBACK = 'm8 6-6 6 6 6M16 6l6 6-6 6'

const ICONS = new Map<string, string>([
  ['code', 'm8 6-6 6 6 6M16 6l6 6-6 6'],
  ['terminal', 'M3 4h18v16H3zM7 10l2.5 2.5L7 15M12.5 15H17'],
  ['plug', 'M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6zM12 17v5'],
  ['gamepad', 'M7 6h10a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-2a5 5 0 0 1 5-5zM7 12h3M8.5 10.5v3M15.5 11h.01M17.5 13h.01'],
  ['film', 'M3 4h18v16H3zM7 4v16M17 4v16M3 8h4M3 12h4M3 16h4M17 8h4M17 12h4M17 16h4'],
  ['play', 'M8 5v14l11-7z'],
  ['palette', 'M12 3a9 9 0 1 0 0 18 3 3 0 0 0 3-3 3 3 0 0 1 3-3h1a3 3 0 0 0 3-3 9 9 0 0 0-10-6zM7.5 12h.01M8.5 8.5h.01M12 7h.01M15.5 8.5h.01'],
  ['newspaper', 'M3 5h15v14H3zM18 8h3v9a2 2 0 0 1-2 2h-1M6 8h9M6 11h9M6 14h6'],
  ['users', 'M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 20v-2a4 4 0 0 0-3-3.87M16 2.13a4 4 0 0 1 0 7.75'],
  ['spark', 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'],
  ['book', 'M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3zM18 4v16M15 20h3'],
  ['globe', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18']
])

const iconPath = computed<string>(() => ICONS.get(props.name) ?? FALLBACK)
</script>

<style scoped>
.explore-icon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>