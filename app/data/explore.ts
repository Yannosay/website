export type ExploreActionKind = 'route' | 'external'
export type ExploreButtonVariant = 'filled' | 'ghost'

export interface ExploreAction {
  kind: ExploreActionKind
  to?: string
  href?: string
}

export interface ExploreButton {
  id: string
  labelKey: string
  variant: ExploreButtonVariant
  action: ExploreAction
}

export interface ExploreDetailLink {
  labelKey: string
  href: string
}

export interface ExploreDetailSection {
  headingKey: string
  bodyKey?: string
  link?: ExploreDetailLink
}

export interface ExploreDetail {
  image?: string
  imageAltKey?: string
  longDescriptionKey: string
  buttons?: readonly ExploreButton[]
  sections?: readonly ExploreDetailSection[]
}

export interface ExploreEntry {
  id: string
  image?: string
  imageAltKey?: string
  hideName?: boolean
  nameKey: string
  descKey: string
  cardTo?: string
  cardHref?: string
  detail?: ExploreDetail
}

export interface ExploreSection {
  id: string
  image?: string
  imageAltKey?: string
  entries: readonly ExploreEntry[]
}

export interface ExplorePageConfig {
  eyebrowKey: string
  headingKey: string
  ledeKey: string
  sections: readonly ExploreSection[]
}

export const explorePage: ExplorePageConfig = {
  eyebrowKey: 'explore.eyebrow',
  headingKey: 'explore.heading',
  ledeKey: 'explore.lede',

  sections: [
    {
      id: 'coding',
      image: '/assets/images/explore/coding.png',
      imageAltKey: 'explore.sectionAlts.coding',
      entries: [
        {
          id: 'sinth',
          image: '/assets/images/sinth/sinthbanner-progress.webp',
          imageAltKey: 'explore.entries.sinth.name',
          hideName: true,
          nameKey: 'explore.entries.sinth.name',
          descKey: 'explore.entries.sinth.desc',
          cardTo: '/tools/sinth',
          detail: {
            image: '/assets/images/sinth/sinthbanner-progress.webp',
            imageAltKey: 'explore.entries.sinth.name',
            longDescriptionKey: 'explore.details.sinth.longDescription',
            buttons: [
              {
                id: 'download',
                labelKey: 'explore.buttons.downloadHere',
                variant: 'filled',
                action: { kind: 'external', href: 'https://www.npmjs.com/package/@yannosay/sinth' }
              },
              {
                id: 'github',
                labelKey: 'explore.buttons.visitGithub',
                variant: 'ghost',
                action: { kind: 'external', href: 'https://github.com/yannosay/sinth' }
              }
            ],
            sections: [
              {
                headingKey: 'explore.details.sinth.docsHeading',
                link: {
                  labelKey: 'explore.buttons.viewDocs',
                  href: 'https://sinth.yannosay.com'
                }
              }
            ]
          }
        },
      ]
    },
    {
      id: 'playground',
      image: '/assets/images/explore/playground.png',
      imageAltKey: 'explore.sectionAlts.coding',
      entries: [
        {
          id: 'games',
          image: '/assets/images/games/logo.webp',
          imageAltKey: 'explore.entries.games.name',
          hideName: true,
          nameKey: 'explore.entries.games.name',
          descKey: 'explore.entries.games.desc',
          cardTo: '/games'
        },
        {
          id: 'movies',
          image: '/assets/images/movies/logo.webp',
          imageAltKey: 'explore.entries.movies.name',
          hideName: true,
          nameKey: 'explore.entries.movies.name',
          descKey: 'explore.entries.movies.desc',
          cardTo: '/movies'
        },
        {
          id: 'youtube',
          image: '/assets/images/youtube/logo.webp',
          imageAltKey: 'explore.entries.youtube.name',
          hideName: true,
          nameKey: 'explore.entries.youtube.name',
          descKey: 'explore.entries.youtube.desc',
          cardHref: 'https://www.youtube.com/@yannosay'
        },

        
      ]
    }
  ]
}

export function findExploreEntry(id: string): ExploreEntry | null {
  for (const section of explorePage.sections) {
    for (const entry of section.entries) {
      if (entry.id === id) return entry
    }
  }
  return null
}