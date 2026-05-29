<template>
  <section class="hero">
    <div class="orb" />
    <h1 class="title">
      <span class="name">Yannosay</span>
      <span class="productions">Productions</span>
    </h1>
    <!-- <p class="sub">Games · Tools · Film</p> -->
    <div class="cta-row">
      <UiPillButton @click="handleOpen" variant="filled">Download Sinth</UiPillButton>
      <UiPillButton variant="ghost">Screensaver</UiPillButton>
      <UiPillButton variant="ghost">Discord</UiPillButton>
    </div>
  </section>
</template>
<style scoped>
.hero {
  min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; padding:0 4rem; position:relative; overflow:hidden;
}
.orb {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:55vw; height:55vw; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  animation:pulse 8s ease-in-out infinite alternate;
}
@keyframes pulse {
  from { transform:translate(-50%,-50%) scale(1); opacity:0.6 }
  to   { transform:translate(-50%,-50%) scale(1.15); opacity:1 }
}
.title { line-height:0.9; letter-spacing:-0.04em; display:flex; flex-direction:column; align-items:center }
.name {
  font-family:var(--font-sans); font-weight:900; font-size:clamp(4.5rem,12vw,11rem);
  color:var(--white); opacity:0; animation:rise 0.9s 0.1s var(--ease) forwards;
}
.productions {
  font-family:var(--font-serif); font-style:italic; font-weight:400;
  font-size:clamp(3rem,8.5vw,8rem); color:var(--white); opacity:0.0;
  animation:rise 0.9s 0.3s var(--ease) forwards;
}
.sub {
  margin-top:2.8rem; font-size:clamp(0.65rem,1.2vw,0.82rem); font-weight:200;
  letter-spacing:0.22em; text-transform:uppercase; color:var(--muted);
  opacity:0; animation:fadeIn 0.8s 0.7s var(--ease) forwards;
}
@keyframes rise {
  from { opacity:0; transform:translateY(40px) skewY(2deg) }
  to   { opacity:1; transform:translateY(0) skewY(0) }
}
.cta-row {
  margin-top:2.4rem; display:flex; gap:0.7rem; flex-wrap:wrap; justify-content:center;
  opacity:0;
  animation:fadeIn 0.8s 0.9s var(--ease) forwards;
}
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
@media (max-width:640px) { .hero { padding:0 1.4rem } }
</style>

<script setup>
import { useModal } from '~/composables/useModal'
import SinthDownloadModal from '~/components/modals/SinthDownloadModal.vue'

const modal = useModal()

const handleOpen = () => {
  modal.open(
    SinthDownloadModal,
    { package: 'Sinth' },
    { size: 'md', scrollable: false, closable: true }
  )
}
</script>