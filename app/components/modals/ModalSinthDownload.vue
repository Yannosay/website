<template>
  <div class="sinth-download">
    <div>
      <h3 class="sinth-download__title">{{ $t('modal.sinthDownload.title', { package }) }}</h3>
      <p class="sinth-download__description">{{ $t('modal.sinthDownload.description') }}</p>
    </div>
    <div class="sinth-download__actions">
      <button
        type="button"
        @click="emit('close')"
        class="sinth-download__btn sinth-download__btn--cancel"
      >
        {{ $t('modal.sinthDownload.cancel') }}
      </button>
      <a
        href="https://www.npmjs.com/package/@yannosay/sinth"
        target="_blank"
        rel="noopener noreferrer"
        class="sinth-download__btn sinth-download__btn--primary"
      >
        {{ $t('modal.sinthDownload.download') }}
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  package: { type: String, default: '' }
})
const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
@use '~/assets/css/components/modal' as modal;

.sinth-download {
  @include modal.modal-container;

  &__title { @include modal.modal-title; }
  &__description { @include modal.modal-description; }
  &__actions { @include modal.modal-actions; }

  &__btn {
    @include modal.modal-btn;

    &--cancel { @include modal.modal-btn-cancel; }
    &--primary { @include modal.modal-btn-primary; }
  }
}
</style>
