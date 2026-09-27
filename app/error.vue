<template>
  <div class="error-page">
    <DynamicCursor />
    <div class="error-page__content">
      <h1 class="error-page__code">{{ code }}</h1>
      <p class="error-page__message">
        <template v-if="statusCode === 404">{{ $t('common.error.notFound') }}</template>
        <template v-else>{{ $t('common.error.serverError') }}</template>
      </p>
      <NuxtLink to="/" class="error-page__link">{{ $t('common.error.goHome') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DynamicCursor from '~/components/global/DynamicCursor.vue'

const props = defineProps({
  error: { type: Object, default: null }
})

const statusCode = computed(() => Number(props.error?.statusCode) || 500)
const code = computed(() => String(statusCode.value))
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--black);
  color: var(--white);

  &__content { text-align: center; }

  &__code {
    font-size: 3.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  &__message {
    color: rgba(255, 255, 255, 0.55);
    margin-bottom: 2rem;
  }

  &__link {
    color: var(--white);
    text-decoration: none;
    font-weight: 500;

    &:hover { text-decoration: underline; }
  }
}
</style>
