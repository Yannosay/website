<template>
  <header class="page-header">
    <p v-if="eyebrow" class="page-header__eyebrow">{{ eyebrow }}</p>
    <h1 class="page-header__title">{{ title }}</h1>
    <p v-if="lede" class="page-header__lede">{{ lede }}</p>
    <div v-if="$slots.actions" class="page-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  lede?: string
}>()
</script>

<style scoped>
.page-header {
  max-width: 48rem;
  margin: 0 auto 5rem;
  text-align: center;
}

.page-header__eyebrow {
  font-size: 0.6rem;
  font-weight: 200;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.4rem;
}

.page-header__title {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  letter-spacing: -0.04em;
  line-height: 0.92;
}

.page-header__lede {
  margin: 1.5rem auto 0;
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.8;
  max-width: 44ch;
}

.page-header__actions {
  margin-top: 2.25rem;
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .page-header {
    margin-bottom: 3rem;
  }
}
</style>
