<template>
  <div class="flex flex-col gap-6">
    <div>
      <h3 class="text-lg font-medium text-white">Download {{ package }}</h3>
      <p class="text-sm text-white/50 mt-2">This is an Test Modal. If you are not an Mod, ignore it.</p>
    </div>
    <div class="flex gap-3 justify-end">
      <button
        @click="emit('close')"
        class="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        Cancel
      </button>
      <a
        href="https://npmjs.com/package/@yannosay/sinth"
        target="_blank"
        rel="noopener noreferrer"
        class="px-5 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors inline-block text-center"
      >
        Primary Button
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({ package: String })
const emit = defineEmits(['close'])
</script>