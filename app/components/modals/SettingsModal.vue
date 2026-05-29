<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-sm font-medium text-white">Dynamic Cursor</h3>
        <p class="text-xs text-white/40 mt-1">When off, uses your native mouse cursor</p>
      </div>
      <button
        @click="toggle"
        class="relative w-10 h-6 rounded-full transition-colors duration-200"
        :class="enabled ? 'bg-white' : 'bg-white/10'"
      >
        <div
          class="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
          :class="enabled ? 'translate-x-[18px] bg-black' : 'translate-x-[2px] bg-white/40'"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDynamicCursor } from '~/composables/useDynamicCursor'

const { enabled, toggle } = useDynamicCursor()
</script>