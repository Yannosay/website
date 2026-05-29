<template>
  <section id="sinth" class="section dark">
    <div class="grid">
      <div>
        <p class="eyebrow reveal">Featured tool</p>
        <h2 class="section-heading reveal reveal-d1">Sinth</h2>
        <p class="tagline reveal reveal-d2">"HTML, but sooo easy."</p>
        <p class="body reveal reveal-d2">
          A declarative, reactive language that compiles straight to HTML.
          Two-way binding in one line. Logic and UI side by side.
          No useState, no onChange, no e.target.value.
          Static pages ship zero JS.
        </p>
        <div class="pills reveal reveal-d3">
          <UiPillButton href="https://sinth.yannosay.com/docs" variant="filled">Download on NPM</UiPillButton>
          <UiPillButton href="https://github.com/yannosay/sinth">GitHub</UiPillButton>
          <UiPillButton href="https://discord.gg/SUvcrafTQm">Discord</UiPillButton>
        </div>
      </div>
      <div class="reveal reveal-d2">
        <UiVideoEmbed video-id="W0tOMTiIF0Q" />
      </div>
    </div>
  </section>
</template>
<style scoped>
.section { padding:9rem 4rem; border-top:1px solid var(--line) }
.dark { background:#0a0a0a }
.grid { display:grid; grid-template-columns:5fr 6fr; gap:6rem; align-items:center }
.tagline { font-family:var(--font-serif); font-style:italic; font-size:clamp(1.3rem,3vw,2rem); opacity:0; line-height:1.3; margin:1.8rem 0 1.4rem }
.body { font-size:0.82rem; font-weight:200; line-height:2; color:var(--muted); margin-bottom:2.2rem; max-width:44ch }
.pills { display:flex; gap:0.7rem; flex-wrap:wrap }
@media (max-width:860px) {
  .grid { grid-template-columns:1fr; gap:3.5rem }
}
@media (max-width:640px) {
  .section { padding:5.5rem 1.4rem }
}
</style>