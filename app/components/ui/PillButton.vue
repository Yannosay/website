<template>
  <a :href="href" target="_blank" rel="noopener noreferrer" :class="['pill', variant]"><slot /></a>
</template>
<script setup>
defineProps({ href: String, variant: { type: String, default: 'ghost' } })
</script>
<style scoped>
.pill {
  padding:0.55rem 1.5rem; border-radius:999px; font-size:0.65rem; font-weight:400;
  letter-spacing:0.1em; text-transform:uppercase; text-decoration:none;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.6s cubic-bezier(0.34, 2.1, 0.64, 1), background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease; display:inline-block; cursor:pointer;
  backdrop-filter: blur(20px); user-select:none; -webkit-user-select:none;
  -webkit-backdrop-filter: blur(20px);
}
.pill:hover {
  transform:scale(1.05);
}
.pill:active {
  transform:scale(0.92);
  padding:0.55rem 1.2rem;
  transition: transform 0.05s cubic-bezier(0.2, 0, 0.8, 1), padding 0.05s cubic-bezier(0.2, 0, 0.8, 1), background 0.05s ease, border-color 0.05s ease, color 0.05s ease, box-shadow 0.05s ease;
}
.ghost {
  background:rgba(255,255,255,0.03); color:var(--white); border:1px solid rgba(255,255,255,0.08);
  box-shadow: 0 0 0 0 rgba(255,255,255,0);
}
.ghost:hover { 
  border-color:rgba(255,255,255,0.2); 
  background:rgba(255,255,255,0.06); 
  box-shadow: 0 0 20px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.02);
}
.filled {
  background:rgba(255, 255, 255, 0.9); color:var(--black); border:1px solid rgba(255,255,255,0.2);
  box-shadow: 0 0 20px rgba(255,255,255,0.1), inset 0 0 10px rgba(255,255,255,0.2);
}
.filled:hover { 
  background:rgba(255,255,255,0.95); 
  border-color:rgba(255,255,255,0.4); 
  box-shadow: 0 0 30px rgba(255,255,255,0.15), inset 0 0 15px rgba(255,255,255,0.3);
}
</style>