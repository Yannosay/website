<template>
  <section id="more" class="section dark">
    <p class="eyebrow reveal">Everything else</p>
    <h2 class="section-heading reveal reveal-d1">And much <em>more.</em></h2>
    <div class="grid">
      <div v-for="(cell,i) in items" :key="cell.title" :class="['cell', 'reveal', `reveal-d${i+1}`]">
        <p class="label">{{ cell.label }}</p>
        <p class="title">{{ cell.title }}</p>
        <p class="body">{{ cell.body }}</p>
      </div>
    </div>
  </section>
</template>
<script setup>
defineProps({ items: Array });
</script>
<style scoped>
.section { padding:9rem 4rem; border-top:1px solid var(--line) }
.dark { background:#0a0a0a }
.grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line);
  border:1px solid var(--line); border-radius:1.2rem; overflow:hidden; margin-top:4rem;
}
.cell { background:#0a0a0a; padding:3rem 2.5rem; transition:background 0.3s }
.cell:hover { background:#141414 }
.label { font-size:0.58rem; letter-spacing:0.22em; font-weight:200; text-transform:uppercase; color:var(--muted); margin-bottom:1rem }
.title { font-weight:900; font-size:1.5rem; letter-spacing:-0.03em; line-height:1; margin-bottom:0.8rem }
.body { font-size:0.78rem; font-weight:200; color:var(--muted); line-height:1.9 }
@media (max-width:720px) { .grid { grid-template-columns:1fr } }
@media (max-width:640px) { .section { padding:5.5rem 1.4rem } }
</style>