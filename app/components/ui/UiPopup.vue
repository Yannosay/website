<template>
  <Teleport to="body">
    <Transition name="overlay" appear>
      <div
        v-if="active"
        class="popup-overlay"
        @click.self="close"
        @keydown.escape.prevent="close"
      />
    </Transition>
    <Transition name="popup" appear>
      <div
        v-if="active"
        ref="containerRef"
        class="popup-container"
        :class="sizeClass"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
      >
        <button
          class="popup-close"
          @click="close"
          :aria-label="closeLabel"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M2 2L14 14M14 2L2 14" />
          </svg>
        </button>
        <div class="popup-content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg', 'xl'].includes(v)
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Dialog'
  },
  closeLabel: {
    type: String,
    default: 'Close dialog'
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'opened', 'closed'])

const active = ref(false)
const containerRef = ref(null)
let scrollPosition = 0
let originalOverflow = ''

const sizeClass = computed(() => `popup-${props.size}`)

const lockScroll = () => {
  scrollPosition = window.scrollY
  originalOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
}

const unlockScroll = () => {
  document.body.style.overflow = originalOverflow
  document.body.style.paddingRight = ''
}

const open = () => {
  active.value = true
  lockScroll()
  emit('opened')
}

const close = () => {
  active.value = false
  unlockScroll()
  emit('update:modelValue', false)
  emit('close')
}

watch(() => props.modelValue, (val) => {
  val ? open() : close()
}, { immediate: true })

onBeforeUnmount(() => {
  unlockScroll()
})
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  will-change: opacity;
}

.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: calc(100% - 3rem);
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 40px 80px rgba(0, 0, 0, 0.5);
  will-change: transform, opacity;
}

.popup-sm { max-width: 420px; }
.popup-md { max-width: 560px; }
.popup-lg { max-width: 720px; }
.popup-xl { max-width: 920px; }

.popup-content {
  padding: 28px;
  max-height: calc(100dvh - 6rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

.popup-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
  outline: none;
}

.popup-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.popup-close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 2px;
}

.popup-close:active {
  background: rgba(255, 255, 255, 0.14);
}

.overlay-enter-active {
  transition: opacity 300ms ease;
}

.overlay-leave-active {
  transition: opacity 200ms ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.popup-enter-active {
  transition: opacity 300ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.popup-leave-active {
  transition: opacity 150ms ease, transform 200ms ease;
}

.popup-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.94) translateY(16px);
}

.popup-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.97);
}
</style>