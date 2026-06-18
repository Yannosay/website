<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <DynamicCursor />
    <header class="fixed top-0 w-full z-50 border-b border-white/5 bg-black/90 backdrop-blur-xl">
      <nav class="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a href="/" class="flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="Yannosay" class="h-8 w-auto">
        </a>
        <div class="flex items-center gap-6 md:gap-10 text-sm tracking-wide">
          <NuxtLink to="/news" class="text-white/50 hover:text-white transition-colors duration-300">News</NuxtLink>          
          <NuxtLink to="/games" class="text-white/50 hover:text-white transition-colors duration-300">Games</NuxtLink>
          <NuxtLink to="/movies" class="text-white/50 hover:text-white transition-colors duration-300">Movies</NuxtLink>
          <NuxtLink to="/tools" class="text-white/50 hover:text-white transition-colors duration-300">Tools</NuxtLink>
          <NuxtLink to="/illustrations" class="text-white/50 hover:text-white transition-colors duration-300">Illustrations</NuxtLink>
          <NuxtLink to="/youtube" class="text-white/50 hover:text-white transition-colors duration-300">YouTube</NuxtLink>
          <SettingsIcon />
        </div>
      </nav>
    </header>
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <footer class="border-t border-white/[0.06] py-16">
      <!-- <w-image src="https://static.wikia.nocookie.net/tadc/images/a/a3/Zooble.webp/revision/latest?cb=20231105174924&path-prefix=id" width="144" height="271.6981132075472" left="513" top="4469" position="absolute" z-index="0"></w-image> -->
      <div class="max-w-7xl mx-auto px-6 md:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.04]">
          <a href="/" class="flex items-center gap-3 group">
            <img src="/assets/images/logo.png" alt="Yannosay" class="h-7 w-auto opacity-30 group-hover:opacity-60 transition-all duration-500">
            <span class="text-white/20 text-xs tracking-[0.2em] uppercase group-hover:text-white/40 transition-colors duration-500">Yannosay</span>
          </a>
          <div class="flex items-center gap-1 text-xs tracking-wider">
            <NuxtLink to="/games" class="px-4 py-2 text-white/25 hover:text-white/70 hover:bg-white/[0.03] rounded-full transition-all duration-300">Games</NuxtLink>
            <span class="text-white/10">·</span>
            <NuxtLink to="/movies" class="px-4 py-2 text-white/25 hover:text-white/70 hover:bg-white/[0.03] rounded-full transition-all duration-300">Movies</NuxtLink>
            <span class="text-white/10">·</span>
            <NuxtLink to="/tools" class="px-4 py-2 text-white/25 hover:text-white/70 hover:bg-white/[0.03] rounded-full transition-all duration-300">Tools</NuxtLink>
            <span class="text-white/10">·</span>
            <NuxtLink to="/illustrations" class="px-4 py-2 text-white/25 hover:text-white/70 hover:bg-white/[0.03] rounded-full transition-all duration-300">Illustrations</NuxtLink>
            <span class="text-white/10">·</span>
            <NuxtLink to="/youtube" class="px-4 py-2 text-white/25 hover:text-white/70 hover:bg-white/[0.03] rounded-full transition-all duration-300">YouTube</NuxtLink>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p class="text-white/15 text-xs tracking-wider">© 2026 Yannosay Productions</p>
          <p class="text-white/10 text-xs tracking-wider">Powered with Sinth</p>
        </div>
      </div>
    </footer>
    <ModalLayer />
  </div>
</template>

<script setup>
import DynamicCursor from '~/components/global/DynamicCursor.vue'
import SettingsIcon from '~/components/ui/SettingsIcon.vue'
import ModalLayer from '~/components/global/ModalLayer.vue'

if (import.meta.client) {import('../assets/src/libraries/SinthUI.js')}
</script>