<template>
  <div class="site-layout">
    <a href="#main" class="skip-link">{{ $t('common.skipToContent') }}</a>

    <header class="site-header">
      <nav class="site-nav" aria-label="Primary">
        <NuxtLink to="/" class="site-logo" aria-label="Yannosay Productions home">
          <img
            src="/assets/images/logo/logo.png"
            alt="Yannosay"
            class="site-logo__img"
            width="64"
            height="32"
            decoding="async"
          >
        </NuxtLink>
        <div class="site-nav__links">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="site-nav__link"
            active-class="site-nav__link--active"
          >
            {{ link.label }}
          </NuxtLink>
          <SettingsIcon />
        </div>
      </nav>
    </header>

    <main id="main" class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__top">
          <NuxtLink to="/" class="site-footer__brand" aria-label="Yannosay Productions home">
            <img
              src="/assets/images/logo/logo.png"
              alt=""
              class="site-footer__brand-img"
              width="56"
              height="28"
              decoding="async"
            >
            <span class="site-footer__brand-text">Yannosay</span>
          </NuxtLink>
          <div class="site-footer__nav">
            <template v-for="(link, index) in footerLinks" :key="link.to">
              <NuxtLink :to="link.to" class="site-footer__nav-link">{{ link.label }}</NuxtLink>
              <span v-if="index < footerLinks.length - 1" class="site-footer__nav-dot" aria-hidden="true">·</span>
            </template>
          </div>
        </div>
        <div class="site-footer__bottom">
          <p class="site-footer__copy">{{ $t('footer.rights', { year: currentYear }) }}</p>
          <p class="site-footer__credit">{{ $t('footer.credit') }}</p>
        </div>
      </div>
    </footer>

    <ModalLayer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SettingsIcon from '~/components/ui/SettingsIcon.vue'
import ModalLayer from '~/components/global/ModalLayer.vue'

const navLinks = [
  { to: '/news', label: 'News' },
  { to: '/games', label: 'Games' },
  { to: '/movies', label: 'Movies' },
  { to: '/tools', label: 'Tools' },
  { to: '/illustrations', label: 'Illustrations' },
  { to: '/youtube', label: 'YouTube' }
]

const footerLinks = [
  { to: '/games', label: 'Games' },
  { to: '/movies', label: 'Movies' },
  { to: '/tools', label: 'Tools' },
  { to: '/illustrations', label: 'Illustrations' },
  { to: '/youtube', label: 'YouTube' }
]

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.site-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--black);
  color: var(--white);
}

.site-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;

  @media (min-width: 768px) { padding: 0 2rem; }

  &__links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-size: 0.875rem;
    letter-spacing: 0.025em;

    @media (min-width: 768px) { gap: 2.5rem; }
  }

  &__link {
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 300ms;

    &:hover { color: var(--white); }

    &--active {
      color: var(--white);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        height: 1px;
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

.site-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &__img { height: 2rem; width: auto; }
}

.site-main {
  flex: 1 1 0%;
  padding-top: 4rem;
}

.site-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 4rem 0;

  &__inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: 768px) { padding: 0 2rem; }
  }

  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);

    @media (min-width: 768px) { flex-direction: row; }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  &__brand-img {
    height: 1.75rem;
    width: auto;
    opacity: 0.3;
    transition: opacity 500ms;

    .site-footer__brand:hover & { opacity: 0.6; }
  }

  &__brand-text {
    color: rgba(255, 255, 255, 0.2);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    transition: color 500ms;

    .site-footer__brand:hover & { color: rgba(255, 255, 255, 0.4); }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__nav-link {
    padding: 0.5rem 1rem;
    color: rgba(255, 255, 255, 0.25);
    text-decoration: none;
    border-radius: 9999px;
    transition: color 300ms, background-color 300ms;

    &:hover {
      color: rgba(255, 255, 255, 0.7);
      background-color: rgba(255, 255, 255, 0.03);
    }
  }

  &__nav-dot { color: rgba(255, 255, 255, 0.1); }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 2rem;

    @media (min-width: 768px) { flex-direction: row; }
  }

  &__copy {
    color: rgba(255, 255, 255, 0.15);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  &__credit {
    color: rgba(255, 255, 255, 0.1);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
}
</style>
