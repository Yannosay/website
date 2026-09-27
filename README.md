# Yannosay Productions — Website

Production site for Yannosay Productions, built with Nuxt 4 and deployed to Cloudflare Pages. The news feed is served by a separate Cloudflare Worker backed by KV (`news-api/`).

## Requirements

- Node.js 20 or newer
- pnpm 9 or newer

## Local development

    pnpm install
    pnpm dev

The site serves at http://localhost:3000.

## Type checking

    pnpm typecheck

## Production build

    pnpm build

Output is written to `dist/`.

## Deployment

Site:

    pnpm exec wrangler pages deploy dist

News worker:

    cd news-api
    pnpm exec wrangler deploy

## Environment variables

Set in Cloudflare Pages (Production and Preview) or in a local `.env`:

- `NUXT_PUBLIC_NEWS_API` — base URL of the news worker. Defaults to `https://news-api.yp-worker.workers.dev`.
- `NUXT_PUBLIC_SITE_URL` — canonical site URL. Defaults to `https://yannosay.com`.

## Project layout

- `app/` — Nuxt application (components, composables, layouts, pages, plugins, assets).
- `server/` — Nitro server routes and utilities (markdown renderer, text utilities, RSS, sitemap, news proxy).
- `i18n-config/` — i18n configuration and locale messages (`locales/en.json`, `locales/de.json`).
- `public/` — static assets served as-is.
- `news-api/` — Cloudflare Worker that serves the news feed from KV.
- `scripts/` — helper scripts (news publishing).
- `wrangler.toml` — Cloudflare Pages project configuration.

## Assets required in `public/`

Place these files before the first production deploy. The site references them directly:

- `public/og/og-default.png` — 1200×630 PNG used for Open Graph and Twitter previews.
- `public/favicon.ico`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/apple-touch-icon.png`
- `public/assets/images/logo/logo.png` — site logo.
- `public/assets/images/sinth/sinthbanner-progress.webp` — Sinth banner.

Article banners are referenced by URL or by absolute path under `public/`. If you drop a banner at `public/news/<slug>/banner.webp`, publish with `-Banner "/news/<slug>/banner.webp"`.

## News system

### Storage

Two KV keys hold the entire news corpus:

- `news:list` — JSON array of article summaries. One entry per published article.
- `news:article:<slug>` — JSON object with the full article, including the raw Markdown source.

### Article schema

All fields except `slug`, `title`, `date` and `content` are optional. The worker computes or fills in missing fields on read.

- `slug` (string, required) — URL-safe identifier. `[a-z0-9-]`, max 128 characters.
- `title` (string, required)
- `date` (string, required) — `YYYY-MM-DD`.
- `content` (string, required) — Markdown source.
- `updated` — `YYYY-MM-DD`. Shown on the article page as "Updated ...".
- `excerpt` — Plain-text summary. If omitted, generated from `content`.
- `banner` — URL or absolute path under `public/`. Shown on the article page and card.
- `bannerAlt` — Alt text for the banner. Falls back to `title`.
- `author` — String. Shown in byline.
- `tags` — Array of strings.
- `featured` — Boolean. Featured articles sort to the top of the list.
- `draft` — Boolean. Drafts are excluded from all public endpoints.
- `readingTimeMinutes` — Integer. Computed from `content` if absent.

### Publishing

Use `scripts/publish-news.ps1`:

    ./scripts/publish-news.ps1 `
        -Slug "comprehensive-revision" `
        -Title "Comprehensive revision for YP" `
        -ContentPath "./news-api/news.md" `
        -Banner "https://cdn.example.com/banner.webp" `
        -BannerAlt "Cover art" `
        -Author "Yannosay" `
        -Tags "update", "design" `
        -Featured

The script writes both the article key and updates `news:list`, computing excerpt and reading time at the same time.

### Preview rendering

Markdown is rendered server-side by the site. Raw HTML inside Markdown is escaped (`html: false` in marked). External links get `target="_blank" rel="noopener noreferrer"`. Images get `loading="lazy"` and `decoding="async"`.

Supported extras via GFM: tables, task lists, strikethrough, autolinks. Code blocks are syntax-highlighted via highlight.js.

### Public endpoints

Site (proxied to worker):

- `GET /api/news` — list of summaries.
- `GET /api/news/<slug>` — full article with pre-rendered HTML.
- `GET /rss.xml` — RSS feed.
- `GET /sitemap.xml` — sitemap including news articles.

Worker (direct):

- `GET /api/news`
- `GET /api/news/<slug>`

### Internationalisation

`@nuxtjs/i18n` is configured with `strategy: 'no_prefix'`. Both locales share the same URL; the active locale is stored in a `yp_locale` cookie and read on the server so SSR renders the correct language.

## Publishing news

See [
ews-api/PUBLISHING.md](news-api/PUBLISHING.md) for the complete guide to publishing, updating, and managing news articles.
