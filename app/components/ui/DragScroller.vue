<template>
  <div
    class="drag-scroller-wrap"
    :class="{
      'has-overflow-left': canScrollLeft,
      'has-overflow-right': canScrollRight
    }"
  >
    <div
      ref="viewportEl"
      class="drag-scroller"
      :class="{ 'is-draggable': canScroll, 'is-dragging': isDragging }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerLeave"
      @scroll.passive="onScroll"
    >
      <div ref="innerEl" class="drag-scroller__inner">
        <slot />
      </div>
    </div>

    <div
      v-show="canScroll"
      ref="trackEl"
      class="drag-scroller__track"
      @pointerdown="onTrackPointerDown"
      @pointermove="onTrackPointerMove"
      @pointerup="onTrackPointerUp"
      @pointercancel="onTrackPointerUp"
      @pointerleave="onTrackPointerUp"
    >
      <div
        class="drag-scroller__thumb"
        :style="thumbStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const DRAG_THRESHOLD_PX = 4

const viewportEl = ref<HTMLElement | null>(null)
const innerEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)

const canScroll = ref(false)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const isDragging = ref(false)

const scrollRatio = ref(0)
const thumbRatio = ref(1)

const thumbStyle = computed(() => ({
  width: `${thumbRatio.value * 100}%`,
  left: `${scrollRatio.value * (1 - thumbRatio.value) * 100}%`
}))

let isPending = false
let pointerStartX = 0
let scrollStartLeft = 0
let observer: ResizeObserver | null = null

let isTrackDragging = false
let trackPointerStartX = 0
let trackStartLeft = 0

function syncState() {
  const el = viewportEl.value
  if (!el) return

  const tolerance = 2
  const maxScroll = el.scrollWidth - el.clientWidth
  canScroll.value = maxScroll > tolerance
  canScrollLeft.value = el.scrollLeft > tolerance
  canScrollRight.value = el.scrollLeft < maxScroll - tolerance

  thumbRatio.value = canScroll.value
    ? Math.max(0.08, el.clientWidth / el.scrollWidth)
    : 1

  scrollRatio.value = maxScroll > 0
    ? el.scrollLeft / maxScroll
    : 0
}

function onScroll() {
  syncState()
}

function onPointerDown(event: PointerEvent) {
  if (event.pointerType === 'touch' || !canScroll.value) return
  const el = viewportEl.value
  if (!el) return

  isPending = true
  pointerStartX = event.clientX
  scrollStartLeft = el.scrollLeft
}

function onPointerMove(event: PointerEvent) {
  if (!isPending && !isDragging.value) return
  const el = viewportEl.value
  if (!el) return

  const deltaX = event.clientX - pointerStartX

  if (!isDragging.value) {
    if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return
    isDragging.value = true
    el.setPointerCapture(event.pointerId)
  }

  el.scrollLeft = scrollStartLeft - deltaX
}

function onPointerUp(event: PointerEvent) {
  const el = viewportEl.value

  if (isDragging.value && el && el.hasPointerCapture(event.pointerId)) {
    el.releasePointerCapture(event.pointerId)
  }

  isDragging.value = false
  isPending = false
}

function onPointerLeave() {
  if (!isDragging.value) isPending = false
}

function onTrackPointerDown(event: PointerEvent) {
  const viewport = viewportEl.value
  const track = trackEl.value
  if (!viewport || !track) return

  isTrackDragging = true
  trackPointerStartX = event.clientX
  trackStartLeft = viewport.scrollLeft
  track.setPointerCapture(event.pointerId)
}

function onTrackPointerMove(event: PointerEvent) {
  if (!isTrackDragging) return
  const viewport = viewportEl.value
  const track = trackEl.value
  if (!viewport || !track) return

  const viewportWidth = viewport.clientWidth
  const trackWidth = track.clientWidth
  if (trackWidth === 0) return

  const deltaX = event.clientX - trackPointerStartX
  const scrollPerPixel = viewport.scrollWidth / trackWidth

  viewport.scrollLeft = trackStartLeft + deltaX * scrollPerPixel
}

function onTrackPointerUp(event: PointerEvent) {
  if (!isTrackDragging) return
  const track = trackEl.value
  if (track && track.hasPointerCapture(event.pointerId)) {
    track.releasePointerCapture(event.pointerId)
  }
  isTrackDragging = false
}

onMounted(() => {
  syncState()

  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(syncState)
    if (viewportEl.value) observer.observe(viewportEl.value as unknown as Element)
    if (innerEl.value) observer.observe(innerEl.value as unknown as Element)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style lang="scss" scoped>
.drag-scroller-wrap {
  position: relative;
  width: 100%;
  min-width: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 2rem;
    width: 4rem;
    pointer-events: none;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, var(--explore-bg, #000) 15%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, var(--explore-bg, #000) 15%, transparent 100%);
  }

  &.has-overflow-left::before {
    opacity: 1;
  }

  &.has-overflow-right::after {
    opacity: 1;
  }
}

.drag-scroller {
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.is-draggable {
    cursor: grab;
  }

  &.is-dragging {
    cursor: grabbing;

    .drag-scroller__inner {
      user-select: none;
    }
  }

  img {
    -webkit-user-drag: none;
    user-select: none;
  }
}

.drag-scroller__inner {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
  width: max-content;
  min-width: 100%;
  box-sizing: border-box;

  > :deep(*) {
    flex: 0 0 auto;
  }
}

.drag-scroller__track {
  position: relative;
  width: 100%;
  height: 4px;
  margin-top: 1.25rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  touch-action: none;
}

.drag-scroller__thumb {
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.45);
  }
}

@media (max-width: 640px) {
  .drag-scroller__inner {
    gap: 1rem;
  }

  .drag-scroller__track {
    margin-top: 1rem;
  }
}
</style>