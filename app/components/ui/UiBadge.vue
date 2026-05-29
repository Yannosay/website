<template>
  <span class="badge"><slot /></span>
</template>
<style scoped>
.badge {
  font-size:0.58rem; letter-spacing:0.15em; text-transform:uppercase; font-weight:200;
  color:var(--white); background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.15); padding:0.35rem 0.9rem; border-radius:999px;
  white-space:nowrap;
}
</style>