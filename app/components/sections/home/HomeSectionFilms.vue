<template>
  <section id="films" class="section">
    <div class="layout">
      <div>
        <p class="eyebrow reveal">Film</p>
        <h2 class="section-heading reveal reveal-d1">The Projects<br><em>Saga.</em></h2>
        <p class="body reveal reveal-d2">
          An ongoing cinematic series. Each entry captures a different project,
          moment, or idea — raw, unfiltered, completely independent.
        </p>
        <a href="https://www.youtube.com/playlist?list=PLXEG7VI6VCKWJDKdB7kc8WaSloREbPLvI"
           target="_blank" rel="noopener" class="cta reveal reveal-d3">
          Watch the playlist
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
      <div class="rows reveal reveal-d2">
        <a v-for="film in items" :key="film.title" :href="film.url" target="_blank" rel="noopener" class="row">
          <div>
            <div class="film-title">{{ film.title }}</div>
            <div class="meta">{{ film.meta }}</div>
          </div>
          <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>
<script setup>
defineProps({ items: Array });
</script>
<style scoped>
.section { padding:9rem 4rem; border-top:1px solid var(--line) }
.layout { display:grid; grid-template-columns:1fr 1.6fr; gap:8rem; align-items:start }
.body { font-size:0.82rem; font-weight:200; line-height:2; color:var(--muted); margin:1.8rem 0 2rem; max-width:38ch }
.cta {
  display:inline-flex; align-items:center; gap:0.6rem; font-size:0.62rem; font-weight:400;
  letter-spacing:0.18em; text-transform:uppercase; color:var(--white); text-decoration:none;
  border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:3px; transition:color 0.3s, border-color 0.3s;
}
.cta:hover { border-bottom-color:var(--white) }
.cta svg { transition:transform 0.3s }
.cta:hover svg { transform:translateX(4px) }
.rows { display:flex; flex-direction:column }
.row {
  display:flex; align-items:center; justify-content:space-between; padding:1.6rem 0;
  border-bottom:1px solid var(--line); text-decoration:none; color:var(--white);
  transition:padding-left 0.3s;
}
.row:first-child { border-top:1px solid var(--line) }
.row:hover { padding-left:0.6rem }
.row:hover .arrow { color:var(--white); transform:translateX(4px) }
.film-title { font-weight:900; font-size:1.05rem; letter-spacing:-0.02em }
.meta { font-size:0.6rem; font-weight:200; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); margin-top:0.2rem }
.arrow { color:var(--muted); font-size:1rem; transition:color 0.3s, transform 0.3s }
@media (max-width:860px) { .layout { grid-template-columns:1fr; gap:3.5rem } }
@media (max-width:640px) { .section { padding:5.5rem 1.4rem } }
</style>