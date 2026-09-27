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
          :aria-label="modal.props.ariaLabel || 'Dialog'"
        >
          <button
            v-if="modal.closable"
            type="button"
            class="modal-close"
            @click="close(modal.id)"
            :aria-label="$t('modal.close')"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
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
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useModal } from '~/composables/useModal'

const { stack, close, closeTop } = useModal()

const sizeClasses = {
  sm: 'modal-size-sm',
  md: 'modal-size-md',
  lg: 'modal-size-lg',
  xl: 'modal-size-xl'
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getTopDialog() {
  const dialogs = document.querySelectorAll('.modal-container[role="dialog"]')
  return dialogs.length ? dialogs[dialogs.length - 1] : null
}

function getFocusable(container) {
  if (!container) return []
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => {
    if (el.hasAttribute('disabled')) return false
    if (el.getAttribute('aria-hidden') === 'true') return false
    return true
  })
}

let lastFocused = null

function handleKeydown(event) {
  if (!stack.value.length) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeTop()
    return
  }

  if (event.key !== 'Tab') return

  const topDialog = getTopDialog()
  if (!topDialog) return

  const focusable = getFocusable(topDialog)
  if (!focusable.length) {
    event.preventDefault()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement

  if (event.shiftKey) {
    if (active === first || !topDialog.contains(active)) {
      event.preventDefault()
      last.focus()
    }
  } else {
    if (active === last || !topDialog.contains(active)) {
      event.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(
  () => stack.value.filter((m) => !m.leaving).length,
  async (count, previous) => {
    if (count > 0 && (previous === 0 || previous === undefined)) {
      lastFocused = document.activeElement
      await nextTick()
      const topDialog = getTopDialog()
      if (topDialog) {
        const focusable = getFocusable(topDialog)
        if (focusable.length) {
          focusable[0].focus()
        } else {
          topDialog.setAttribute('tabindex', '-1')
          topDialog.focus()
        }
      }
    } else if (count === 0 && previous > 0) {
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus()
      }
      lastFocused = null
    }
  },
  { flush: 'post' }
)
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

.modal-size-sm { max-width: 24rem; }
.modal-size-md { max-width: 32rem; }
.modal-size-lg { max-width: 42rem; }
.modal-size-xl { max-width: 56rem; }

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

.overlay-enter-active { transition: opacity 300ms ease; }
.overlay-leave-active { transition: opacity 200ms ease; }
.overlay-enter-from,
.overlay-leave-to { opacity: 0; }

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

@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal-container {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .modal-enter-active,
  .modal-leave-active,
  .overlay-enter-active,
  .overlay-leave-active { transition-duration: 0.001ms; }
}
</style>
