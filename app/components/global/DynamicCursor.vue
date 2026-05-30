<template>
  <div
    v-if="enabled"
    class="dynamic-cursor"
    :class="{
      'cursor-hovered': hovered,
      'cursor-pressed': pressed,
      'cursor-visible': visible
    }"
    :style="{
      left: `${mouse.x}px`,
      top: `${mouse.y}px`
    }"
    @dragstart.prevent
    @selectstart.prevent
  >
    <span v-if="cursorText && hovered" class="cursor-label">{{ cursorText }}</span>
  </div>
</template>

<script setup>
import { useDynamicCursor } from '~/composables/useDynamicCursor'

const { mouse, hovered, pressed, cursorText, visible, enabled } = useDynamicCursor()
</script>

<style scoped>
.dynamic-cursor {
  position: fixed;
  z-index: 99999;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1),
              height 250ms cubic-bezier(0.16, 1, 0.3, 1),
              background 250ms ease,
              box-shadow 250ms ease,
              border 250ms ease,
              opacity 200ms ease;
  opacity: 0;
  mix-blend-mode: difference;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor-visible {
  opacity: 1;
}

.cursor-hovered {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.1), 0 0 80px rgba(255, 255, 255, 0.03);
  mix-blend-mode: normal;
}

.cursor-pressed {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
}

.cursor-label {
  font-size: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  user-select: none;
}
</style>