<template>
  <div class="settings-modal">
    <div class="settings-modal__heading-group">
      <h2 class="settings-modal__title">{{ $t('settings.title') }}</h2>
      <p class="settings-modal__subtitle">{{ $t('settings.subtitle') }}</p>
    </div>

    <div class="settings-modal__section">
      <h3 class="settings-modal__section-title">
        {{ $t('settings.appearance.heading') }}
      </h3>
      <div class="settings-modal__row">
        <div class="settings-modal__row-text">
          <p class="settings-modal__row-label">{{ $t('settings.appearance.cursor.label') }}</p>
          <p class="settings-modal__row-desc">{{ $t('settings.appearance.cursor.description') }}</p>
        </div>
        <button
          type="button"
          @click="toggleCursor"
          class="settings-modal__toggle"
          :class="cursorEnabled ? 'settings-modal__toggle--on' : 'settings-modal__toggle--off'"
          role="switch"
          :aria-checked="cursorEnabled ? 'true' : 'false'"
          :aria-label="$t('settings.appearance.cursor.label')"
        >
          <span
            class="settings-modal__toggle-knob"
            :class="cursorEnabled ? 'settings-modal__toggle-knob--on' : 'settings-modal__toggle-knob--off'"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <div class="settings-modal__section">
      <h3 class="settings-modal__section-title">
        {{ $t('settings.language.heading') }}
      </h3>
      <p class="settings-modal__warning">{{ $t('settings.language.warning') }}</p>
      <div class="settings-modal__row">
        <div class="settings-modal__row-text">
          <p class="settings-modal__row-label">{{ $t('settings.language.display.label') }}</p>
          <p class="settings-modal__row-desc">{{ $t('settings.language.display.description') }}</p>
        </div>

        <div class="settings-modal__dropdown-wrapper">
          <button
            type="button"
            @click="openDropdown = !openDropdown"
            ref="triggerRef"
            class="settings-modal__dropdown-trigger"
            aria-haspopup="listbox"
            :aria-expanded="openDropdown ? 'true' : 'false'"
            aria-controls="settings-locale-listbox"
          >
            <span class="settings-modal__dropdown-label">{{ currentLocaleLabel }}</span>
            <svg
              class="settings-modal__dropdown-chevron"
              :class="{ 'settings-modal__dropdown-chevron--open': openDropdown }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <Teleport to="body">
            <Transition name="dropdown">
              <div
                v-if="openDropdown"
                id="settings-locale-listbox"
                class="settings-modal__dropdown-menu"
                role="listbox"
                :aria-label="$t('settings.language.display.label')"
                :style="dropdownStyle"
                ref="menuRef"
              >
                <button
                  v-for="loc in locales"
                  :key="loc.code"
                  type="button"
                  role="option"
                  :aria-selected="locale === loc.code ? 'true' : 'false'"
                  @click="setLocale(loc.code)"
                  class="settings-modal__dropdown-item"
                  :class="{ 'settings-modal__dropdown-item--active': locale === loc.code }"
                >
                  <span class="settings-modal__dropdown-item-label">{{ $t(loc.key) }}</span>
                  <svg
                    v-if="locale === loc.code"
                    class="settings-modal__dropdown-check"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>
            </Transition>
          </Teleport>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDynamicCursor } from '~/composables/useDynamicCursor'

type LocaleCode = 'en' | 'de'
type LocaleEntry = { code: LocaleCode; key: string }

const { enabled: cursorEnabled, toggle: toggleCursor } = useDynamicCursor()
const { t, locale } = useI18n()

const openDropdown = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLDivElement | null>(null)
const dropdownStyle = ref<Record<string, string>>({})

const locales: LocaleEntry[] = [
  { code: 'en', key: 'settings.language.options.en' },
  { code: 'de', key: 'settings.language.options.de' }
]

const currentLocaleLabel = computed(() => {
  const current = locale.value as LocaleCode
  const found = locales.find((l) => l.code === current)
  return found ? t(found.key) : locale.value
})

function setLocale(code: LocaleCode) {
  locale.value = code
  openDropdown.value = false
  nextTick(() => {
    triggerRef.value?.focus()
  })
}

function updateDropdownPosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    top: `${rect.bottom + 6}px`,
    right: `${window.innerWidth - rect.right}px`
  }
}

watch(openDropdown, (val) => {
  if (val) nextTick(updateDropdownPosition)
})

function handleClickOutside(event: MouseEvent) {
  if (triggerRef.value?.contains(event.target as Node)) return
  if (!openDropdown.value) return
  if (menuRef.value?.contains(event.target as Node)) return
  openDropdown.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, { capture: true })
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, { capture: true })
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition)
})
</script>

<style lang="scss" scoped>
.settings-modal {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__heading-group {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--white);
  }

  &__subtitle {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.35);
    margin-top: 0.25rem;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__section-title {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.4);
  }

  &__warning {
    font-size: 0.7rem;
    color: rgba(255, 220, 120, 0.75);
    letter-spacing: 0.02em;
    margin-top: -0.35rem;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 0.75rem;
    padding: 0.95rem 1rem;
    transition: background-color 200ms;

    &:hover {
      background-color: rgba(255, 255, 255, 0.04);
    }
  }

  &__row-text {
    min-width: 0;
    flex: 1 1 auto;
  }

  &__row-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--white);
    line-height: 1.25;
  }

  &__row-desc {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.35);
    margin-top: 0.2rem;
    line-height: 1.4;
  }

  &__toggle {
    position: relative;
    width: 2.5rem;
    height: 1.5rem;
    border-radius: 9999px;
    transition: background-color 200ms;
    flex-shrink: 0;
    cursor: pointer;
    border: none;
    padding: 0;

    &--on {
      background-color: var(--white);
    }

    &--off {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.6);
      outline-offset: 2px;
    }
  }

  &__toggle-knob {
    position: absolute;
    top: 0.125rem;
    left: 0;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 9999px;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);

    &--on {
      transform: translateX(18px);
      background-color: var(--black);
    }

    &--off {
      transform: translateX(2px);
      background-color: rgba(255, 255, 255, 0.4);
    }
  }

  &__dropdown-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  &__dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    min-width: 130px;
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.5rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 0.625rem 0.5rem 0.85rem;
    cursor: pointer;
    transition: background-color 150ms;
    font-family: inherit;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    &:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.6);
      outline-offset: 2px;
    }
  }

  &__dropdown-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__dropdown-chevron {
    width: 0.875rem;
    height: 0.875rem;
    color: rgba(255, 255, 255, 0.35);
    transition: transform 200ms;
    flex-shrink: 0;

    &--open {
      transform: rotate(-180deg);
    }
  }

  &__dropdown-menu {
    position: fixed;
    z-index: 99999;
    min-width: 180px;
    background-color: #141414;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.75rem;
    padding: 0.375rem;
    box-shadow: 0 20px 60px -12px rgba(0, 0, 0, 0.9);
  }

  &__dropdown-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: background-color 100ms, color 100ms;
    cursor: pointer;
    border: none;
    background: none;
    color: rgba(255, 255, 255, 0.5);
    font-family: inherit;
    text-align: left;

    &:hover {
      background-color: rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.85);
    }

    &:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.6);
      outline-offset: -2px;
    }

    &--active {
      background-color: rgba(255, 255, 255, 0.08);
      color: var(--white);
    }
  }

  &__dropdown-item-label {
    flex: 1 1 0%;
    text-align: left;
  }

  &__dropdown-check {
    width: 1rem;
    height: 1rem;
    color: rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
}

.dropdown-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.dropdown-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition-duration: 0.001ms;
  }
}
</style>
