<template>
  <UiPillButton @click="handleOpen">Open Popup</UiPillButton>
</template>

<script setup>
import { useModal } from '~/composables/useModal'
import SinthDownloadModal from '~/components/modals/SinthDownloadModal.vue'

const modal = useModal()

const handleOpen = () => {
  modal.open(
    SinthDownloadModal,
    { package: 'sinth' },
    { size: 'md', scrollable: false, closable: true }
  )
}
</script>