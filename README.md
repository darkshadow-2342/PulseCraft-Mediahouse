# PulseCraft Mediahouse

A cinematic portfolio built around **Every frame is a story**: oversized editorial typography, a perspective-reactive opening image, a browsable exhibition, individual project stories, a motion archive, interactive services, a six-stage creative process and a direct-contact finale.

## Architecture

| Responsibility | Implementation | Reason |
| --- | --- | --- |
| Framework | React 19 and Next.js App Router conventions; Vinext/Vite adapter for Sites | Server-rendered content and independently addressable project pages on the provided hosting runtime |
| Language | Strict TypeScript | Explicit site, campaign, video, service, client, team and metric models |
| Motion | CSS masks, Web Animations, IntersectionObserver, requestAnimationFrame | GPU-friendly scene entrances and restrained interaction without a permanent animation loop |
| 3D | Native CSS perspective applied to photographic planes | Subtle depth without a WebGL dependency or mobile GPU burden |
| UI | Feature components plus existing Radix/Shadcn dialog and tabs primitives | Accessible focus handling, keyboard interaction and maintainable visual boundaries |
| Styling | Central CSS tokens, self-hosted fonts and feature-specific selectors | Rebrand without rewriting components; no external font requests |
| Content | Typed local modules through `lib/content/service.ts` | A future CMS can replace the adapter without changing the visual application |
| Media | Responsive WebP, poster-first video, progressive MP4 and optional Instagram embeds | Low initial transfer size and predictable playback |
| Hosting | Sites on Cloudflare Workers | Integrated source/version management and a portable worker build |

The provided hosting adapter is Vinext `1.0.0-beta.5`, as locked by the supplied Sites runtime. Application routes use standard Next.js conventions. It is not represented as an upstream stable Next.js server; validate platform compatibility before moving to a different host. The source can also be built using the installed upstream Next.js CLI for a separate Node/Vercel deployment, with that target verified independently.

## What is included

- Responsive home page and three addressable concept case studies.
- Primary configuration in `config/site.config.ts`.
- Design tokens in `styles/tokens.css`; motion constants in `config/motion.config.ts`.
- Typed projects, services, videos, process, industries, clients, team and metrics.
- Brief first-visit title sequence, native anchor navigation and subtle pointer depth.
- Previous/next project controls, touch swiping, keyboard arrows and direct project links.
- Three actual playable silent MP4 motion studies with posters.
- Lazy-loaded fullscreen film dialog with native playback, captions and sound controls.
- Opt-in Instagram embedding and original-post fallback. No scraping.
- Dynamic contact links with email, phone, WhatsApp, location and social profiles.
- Hidden empty client, team and metrics sections. No contact form or contact API.
- Per-project metadata, Open Graph/X metadata, a brand social card, canonical URLs, organization structured data, sitemap and robots.
- Reduced-motion preferences, visible keyboard focus, semantic sections, skip link and image failure states.
- Content validation, TypeScript and lint commands.

## Start locally

Use Node.js **22.13 or newer** and the pnpm version declared in `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed in the terminal. No secrets, databases or CMS credentials are required. `.env.example` describes future server-only integrations; the current site works without an `.env` file.

The scripts select the portable runtime outside the managed Sites environment. The ignored `.sites-runtime` directory is generated local tooling state and is not part of the source handoff.

## Development and production commands

```bash
pnpm dev             # Development server
pnpm typecheck       # Strict TypeScript check
pnpm lint            # Application linting
pnpm check:content   # Verify asset paths, links, slugs and content references
pnpm build           # Validate content and produce the Worker/client build
pnpm start           # Serve the built Worker locally with Wrangler
```

Keep `pnpm-lock.yaml` committed and use frozen installs in CI. Formatting settings are provided in `.editorconfig` and `.prettierrc.json` for your editor. No formatting package is added to the production bundle.

In the managed Sites workspace, use the platform build/preview workflow rather than starting an unrelated development server. Production publishing uses the generated `dist/server/index.js`, static client assets and `.openai/hosting.json`.

## Client editing

Read [the complete client editing guide](docs/CLIENT_EDITING.md).

| Change | Edit |
| --- | --- |
| Name, logos, favicon, contact, social links, SEO, navigation | `config/site.config.ts` |
| Colors, fonts, spacing, radii, CSS motion timings | `styles/tokens.css` |
| Intro and Web Animations timing | `config/motion.config.ts` |
| Project case studies | `content/campaigns.ts` |
| Images and focal positions | `content/media.ts` and `public/media/` |
| Films, Reels, Instagram links | `content/videos.ts` |
| Services | `content/services.ts` |
| Method | `content/process.ts` |
| Clients, team, verified outcomes | `content/clients.ts`, `content/team.ts`, `content/metrics.ts` |
| Industries | `content/industries.ts` |
| Editorial page copy | `content/editorial.ts` |

## Content status and launch

All three campaign examples are explicitly labeled **independent concepts**. Their images were generated for this demonstration; the films animate those stills. They are not real client work, real shoots or evidence of campaign outcomes. No clients, team members, awards or results are invented.

Email, phone, WhatsApp, social profiles and location are blank because none were supplied. Empty values do not create fake or disabled links. Supply at least one verified contact method before using the site to acquire leads.

For a business launch:

1. Add real contact details and social profiles.
2. Add approved project content and video, with captions where audio conveys information.
3. Remove the concepts or set `experience.showConcepts` to `false` after adding real work.
4. Add approved clients, people and measured results if available.
5. Update the canonical origin when connecting a custom domain.
6. Replace the social-preview artwork when rebranding.
7. Run the checks and verify the site on your actual target browsers and devices.

## Interaction and performance design

The browser keeps native scrolling and history. Portfolio and process controls do not depend on dragging or hover. Service and industry panels use accessible tabs. The film dialog uses a focus trap, Escape dismissal, a visible close action and focus return. The short intro does not lock scrolling and is disabled for reduced motion.

Images have stable dimensions and responsive local variants. Hero photography is prioritized; other imagery is lazy-loaded. Videos do not download on initial page load. Desktop hover previews start only on interaction, remain muted, stop when offscreen or hidden, and respect reduced-motion/data-saving preferences. Full video playback is loaded when the viewer opens. The media files are hosted with the site rather than relying on third-party demo URLs.

No continuously rendering WebGL scene, scroll hijacking, autoplay audio, contact database or form infrastructure is installed. Dependency catalog items inherited from the Sites starter remain locked but unused components are not imported into the application.

## Structure

See [the complete source tree](docs/PROJECT_TREE.md). Architectural ownership:

- `app/`: page assembly, route metadata, error boundaries, sitemap and robots.
- `features/`: self-contained hero, work, reels, services, process, studio, proof and contact experiences.
- `components/primitives/`: brand, section label, media and magnetic link primitives.
- `components/layout/`: navigation and footer.
- `components/ui/`: bundled accessible UI primitives.
- `config/`, `content/`: client-editable source of truth.
- `lib/content/`: normalized repository boundary for a future CMS.
- `lib/media/`, `lib/seo/`: direct contact and metadata generation.
- `providers/`: scene entrance lifecycle and cleanup.
- `styles/`: shared design tokens and font declarations.
- `public/`: optimized photographs, video studies, branding, licensed fonts and texture.
- `scripts/`, `build/`: content validation and provided runtime tooling.

## Deployment recommendation

Use the registered Sites project for this edition. Its hosting manifest contains only the project identity and null storage bindings; publishing pushes the exact source revision and deploys its built Worker. Access is private by default. Public launch or custom-domain changes can be made separately when real business content is ready.

For a different hosting platform, keep the content/feature modules and choose its supported Next.js adapter. The upstream commands are `pnpm exec next build` and `pnpm exec next start`; configure the selected provider to use those instead of the Sites build script. That alternative target is documented for portability, not claimed as verified in this delivery.

## Verification

The delivery is checked with strict TypeScript, application ESLint, content/asset validation and the Sites production build. Automated content checks confirm unique slugs, matching video references, actual local assets, valid contact schemes and required image metadata. No Lighthouse score or cross-browser certification is claimed. Live Instagram embeds remain dependent on an actual supplied post and Instagram availability.

Implementation references: [Next.js metadata conventions](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [accessible dialog behavior](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role).
