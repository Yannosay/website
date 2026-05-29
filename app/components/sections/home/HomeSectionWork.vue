<template>
  <section id="work" class="section">
    <div class="header">
      <div>
        <p class="eyebrow reveal">Selected work</p>
        <h2 class="section-heading reveal reveal-d1">What I <em>make.</em></h2>
      </div>
      <span class="count reveal">03 projects</span>
    </div>
    <div class="list">
      <div v-for="(item,i) in items" :key="item.name" :class="['item', 'reveal', `reveal-d${i}`]">
        <span class="num">{{ String(i+1).padStart(2,'0') }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="type">{{ item.type }}</span>
        <div class="right">
        <span class="arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
defineProps({ items: Array })
</script>
<style scoped>
.section { padding:9rem 4rem; border-top:1px solid var(--line) }
.header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:5rem; flex-wrap:wrap; gap:2rem }
.count { font-size:0.6rem; font-weight:200; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted) }
.list { display:flex; flex-direction:column }
.item {
  display:grid; grid-template-columns:3rem 1fr 1fr auto; align-items:center; gap:3rem;
  padding:2.4rem 0; border-bottom:1px solid var(--line); position:relative; cursor:default;
}
.item:first-child { border-top:1px solid var(--line) }
.item::before {
  content:''; position:absolute; inset:0; background:rgba(255,255,255,0.02); opacity:0;
  transition:opacity 0.3s var(--ease); pointer-events:none;
}
.item:hover::before { opacity:1 }
.item:hover .arrow { opacity:1; transform:translateX(6px) }
.num { font-size:0.6rem; font-weight:200; color:var(--muted); letter-spacing:0.1em }
.name { font-family:var(--font-sans); font-weight:900; font-size:clamp(1.4rem,3vw,2.6rem); letter-spacing:-0.03em; line-height:1 }
.type { font-family:var(--font-serif); font-style:italic; font-size:clamp(0.88rem,1.5vw,1.05rem); color:var(--muted) }
.right { display:flex; align-items:center; gap:1rem }
.arrow {
  width: 2.4rem; 
  height: 2.4rem; 
  border-radius: 50%;
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: var(--white);
  
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  

  opacity: 0.25;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 3); 
}



@media (max-width:640px) {
  .section { padding:5.5rem 1.4rem }
  .item { grid-template-columns:2rem 1fr auto; gap:1.2rem }
  .type, .right :deep(.badge) { display:none }
}
</style>