<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center">
    <DynamicCursor />
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-white/50 mb-8">Page <b>{{ error?.url }}</b> not found.</p>
      <a href="/" class="cta">Go home</a>
    </div>
  </div>
</template>

<script setup>
const error = useError()
</script>