<template>
  <Teleport to="body">
    <template v-for="(modal, index) in stack" :key="modal.id">
      <Transition name="overlay" appear>
        <div
          v-if="(index === stack.length - 1 || stack.length === 1) && !modal.leaving"
          class="modal-overlay"
          :style="{ zIndex: 9998 + index * 2 }"
          @click="modal.closable && !modal.leaving ? closeTop() : null"
        />
      </Transition>
      <Transition name="modal" appear>
        <div
          v-if="!modal.leaving"
          class="modal-container"
          :class="[sizeClasses[modal.size], modal.props.containerClass]"
          :style="{
            zIndex: 9999 + index * 2,
            ...modal.props.containerStyle
          }"
          role="dialog"
          aria-modal="true"
        >
          <button
            v-if="modal.closable"
            class="modal-close"
            @click="close(modal.id)"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M1 1L13 13M13 1L1 13" />
            </svg>
          </button>
          <div
            class="modal-content"
            :class="[
              modal.props.contentClass,
              { 'modal-content-scrollable': modal.scrollable }
            ]"
          >
            <component :is="modal.component" v-bind="modal.props" @close="(val) => close(modal.id, val)" />
          </div>
        </div>
      </Transition>
    </template>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useModal } from '~/composables/useModal'

const { stack, close, closeTop } = useModal()

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && stack.value.length) {
    closeTop()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  will-change: opacity;
}

.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 2rem);
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
  will-change: transform, opacity;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
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

.modal-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.modal-close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 2px;
}

.modal-close:active {
  background: rgba(255, 255, 255, 0.14);
}

.modal-content {
  padding: 28px;
  max-height: calc(100dvh - 6rem);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.modal-content-scrollable {
  max-height: none;
  overflow-y: visible;
  overscroll-behavior: auto;
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

.modal-enter-active {
  transition: opacity 300ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-leave-active {
  transition: opacity 180ms cubic-bezier(0.4, 0, 1, 1), transform 200ms cubic-bezier(0.4, 0, 1, 1);
}
.modal-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.94) translateY(16px);
}
.modal-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95) translateY(8px);
}
</style>