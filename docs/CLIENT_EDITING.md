# Client editing guide

The site is driven by configuration and content files. You do not need to edit a component to update company information, projects, services or contact methods.

## Brand and contact details

Edit `config/site.config.ts`.

- `brand.name`, `shortName`, `legalName`, `descriptor`: company identity. The default wordmark uses the configured short name and descriptor.
- `brand.tagline`, `statement`: brand philosophy.
- `brand.logo.light`, `dark`: optional custom logo paths. Empty strings use the dynamic wordmark. The header chooses the dark logo; the footer and intro choose the light logo.
- `brand.logo.mark`, `favicon`, `watermark`, `loader`: optional asset paths. The mark is displayed beside the wordmark. The watermark appears over the opening photograph when supplied.
- `contact.email`, `phone`, `whatsapp`, `location`: verified direct contact details. Leave unused fields empty. WhatsApp must be a complete `https://wa.me/...` URL, with an international phone number and no spaces.
- `social`: full HTTPS profile URLs. No profiles are assumed or invented.
- `seo.siteUrl`: the site's actual origin, with no trailing slash. Update this after connecting a custom domain.
- `seo.title`, `titleTemplate`, `description`, `keywords`, `ogImage`: metadata for search and sharing. Replace the photographic social card after a rebrand; rendered image text cannot change by changing a JavaScript variable.
- `navigation`: navigation labels and destinations. A `requires: 'clients'` entry appears only when clients are present.

Empty contact fields are omitted entirely. If all fields are empty, the contact scene displays a short availability note. Add at least one real contact channel before promoting the site externally.

## Theme and movement

Edit `styles/tokens.css` for palette, fonts, spacing, radii and CSS transition timings. Edit `config/motion.config.ts` for Web Animations timing, preloader frames and pointer depth. Feature-specific motion lives with its feature. Do not change component code for routine branding changes.

The self-hosted fonts are Nimbus Sans Narrow Bold, Nimbus Sans, and Nimbus Roman Italic. Their license and font embedding exception are included in `public/fonts/LICENSE.txt`.

## Projects

Edit `content/campaigns.ts`. Each project needs a unique `id` and URL-safe `slug`. Its page is generated automatically at `/work/[slug]`; metadata and sitemap use the same record.

```ts
{
  id: 'your-project',
  slug: 'your-project',
  title: 'Your project title',
  eyebrow: 'The idea in a few words',
  category: 'Brand campaign',
  description: 'A real description of the work.',
  services: ['Creative direction', 'Photography'],
  cover: {
    src: '/media/campaigns/your-project.webp',
    alt: 'Describe what the photograph shows.',
    width: 1600,
    height: 1067,
  },
  gallery: [],
  accent: '#672B35',
  concept: false,
  story: [
    { title: 'The brief', text: 'The actual challenge.' },
    { title: 'The idea', text: 'The creative response.' },
    { title: 'The execution', text: 'How the work was made.' },
  ],
}
```

Use `metrics` only for verified outcomes. Omit unavailable fields. Remove old concepts once real projects are supplied, or set `experience.showConcepts` to `false` to exclude them from the gallery, routes, video archive and sitemap. Keep at least one real campaign if you want the opening photograph and work gallery to remain present.

## Media

Place assets in `public/media/`. All paths in content begin with `/media/`, not `public/media/`.

For bundled responsive assets, create three images: `name-640.webp`, `name-1024.webp`, and `name.webp` at 1536 px width. Use `src: '/media/name.webp', responsive: true`. The media component selects the right file using an image loader. For other assets, leave `responsive` unset to use the original file. Supply accurate width, height and meaningful alt text. Use `position` for the focal point, for example `'60% 40%'`.

The included images are AI-generated visual concepts. The three included MP4s are silent eight-second camera-motion studies made from those stills. They are not live production footage, client campaigns or demonstrations of measured results.

## Videos and Instagram

Edit `content/videos.ts`.

Direct MP4:

```ts
source: {
  type: 'file',
  src: '/media/reels/your-film.mp4',
  mime: 'video/mp4',
  captions: '/media/reels/your-film.en.vtt',
  silent: false,
}
```

Provide captions for speech and meaningful audio. A progressive MP4 URL from a CDN also works. Adaptive HLS/DASH needs a future playback adapter; it is not required or installed for this edition.

Instagram:

```ts
source: { type: 'instagram', url: 'https://www.instagram.com/reel/REAL_POST_ID/' }
```

The viewer initially offers an explicit load action and an original-post link. It supports only valid Instagram post, Reel and TV URL patterns. The external player is never requested until a visitor chooses to load it. Instagram can refuse a post because of account, region or embedding restrictions; the original-post link remains available. No scraping, access tokens or invented posts are used. Real Instagram playback cannot be verified until a real public post is configured.

Hover previews are muted and disabled for touch, reduced-motion and data-saving preferences. They pause offscreen and when the browser tab is hidden. Fullscreen playback, playback position, captions and volume are available through native media controls. The dialog closes with Escape, returns focus to its trigger, and has a visible close button.

## Other content

| Update | File |
| --- | --- |
| Services and service images | `content/services.ts` |
| Process stages | `content/process.ts` |
| Industry labels and imagery | `content/industries.ts` |
| Page narrative and section copy | `content/editorial.ts` |
| Verified clients | `content/clients.ts` |
| Actual team members | `content/team.ts` |
| Verified results | `content/metrics.ts` |

Clients, team and metrics intentionally start as empty arrays and render no section. Adding real records enables their presentation. Client navigation appears with client records. No fabricated names, logos, testimonials, awards or results are included.

## Future CMS migration

The UI consumes normalized TypeScript records from `lib/content/service.ts`. Implement the same repository methods with your CMS of choice, validate its responses against `content/types.ts`, and keep the feature components unchanged. Keep credentials in server-only environment variables. The current edition requires no CMS, database, form backend, account system or secrets.
