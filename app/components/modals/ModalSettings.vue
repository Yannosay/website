<template>
  <div class="flex flex-col gap-8">
    <div>
      <h2 class="text-lg font-semibold text-white">{{ $t('settings.title') }}</h2>
      <p class="text-xs text-white/35 mt-0.5">{{ $t('settings.subtitle') }}</p>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
        {{ $t('settings.appearance.heading') }}
      </h3>
      <div class="flex items-center justify-between bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3.5 hover:bg-white/[0.04] transition-colors duration-200">
        <div>
          <p class="text-sm font-medium text-white">{{ $t('settings.appearance.cursor.label') }}</p>
          <p class="text-xs text-white/30 mt-0.5">{{ $t('settings.appearance.cursor.description') }}</p>
        </div>
        <button
          @click="toggleCursor"
          class="relative w-10 h-6 rounded-full transition-colors duration-200 shrink-0"
          :class="cursorEnabled ? 'bg-white' : 'bg-white/10'"
        >
          <div
            class="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
            :class="cursorEnabled ? 'translate-x-[18px] bg-black' : 'translate-x-[2px] bg-white/40'"
          />
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
        {{ $t('settings.language.heading') }}
      </h3>
      <div class="flex items-center justify-between bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3.5 hover:bg-white/[0.04] transition-colors duration-200">
        <div>
          <p class="text-sm font-medium text-white">{{ $t('settings.language.display.label') }}</p>
          <p class="text-xs text-white/30 mt-0.5">{{ $t('settings.language.display.description') }}</p>
        </div>

        <div class="relative shrink-0">
          <button
            @click="openDropdown = !openDropdown"
            ref="triggerRef"
            class="flex items-center justify-between gap-3 w-[150px] bg-white/[0.06] border border-white/[0.08] rounded-lg text-sm text-white/85 pl-3.5 pr-2.5 py-2 hover:bg-white/[0.08] transition-colors duration-150"
          >
            <span class="truncate">{{ currentLocaleLabel }}</span>
            <svg
              class="w-3.5 h-3.5 text-white/25 transition-transform duration-200 shrink-0"
              :class="{ '-rotate-180': openDropdown }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <Teleport to="body">
            <Transition name="dropdown">
              <div
                v-if="openDropdown"
                class="fixed z-[99999] min-w-[180px] bg-[#141414] border border-white/[0.06] rounded-xl p-1.5 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.9)]"
                :style="dropdownStyle"
              >
                <button
                  v-for="loc in locales"
                  :key="loc.code"
                  @click="setLocale(loc.code)"
                  class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors duration-100"
                  :class="locale === loc.code ? 'bg-white/[0.08] text-white' : 'text-white/45 hover:bg-white/[0.04] hover:text-white/70'"
                >
                  <span class="flex-1 text-left">{{ $t(loc.key) }}</span>
                  <svg
                    v-if="locale === loc.code"
                    class="w-4 h-4 text-white/70 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>
            </Transition>
          </Teleport>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDynamicCursor } from '~/composables/useDynamicCursor'

const { enabled: cursorEnabled, toggle: toggleCursor } = useDynamicCursor()
const { t, locale } = useI18n()

const openDropdown = ref(false)
const triggerRef = ref(null)
const dropdownStyle = ref({})

const locales = [
  { code: 'en', key: 'settings.language.options.en' },
  { code: 'de', key: 'settings.language.options.de' },
]

const currentLocaleLabel = computed(() => {
  const found = locales.find((l) => l.code === locale.value)
  return found ? t(found.key) : locale.value
})

function setLocale(code) {
  locale.value = code
  localStorage.setItem('locale', code)
  openDropdown.value = false
}

function updateDropdownPosition() {
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.bottom + 6}px`,
      right: `${window.innerWidth - rect.right}px`,
    }
  }
}

watch(openDropdown, (val) => {
  if (val) nextTick(updateDropdownPosition)
})

function handleClickOutside(event) {
  if (triggerRef.value?.contains(event.target)) return
  if (openDropdown.value) {
    const el = document.querySelector('.fixed.z-\\[99999\\]')
    if (el?.contains(event.target)) return
    openDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, { capture: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}
.dropdown-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}
.dropdown-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}
</style>