# US Wellness Community

An independent static editorial presell page for `uswellness.fit`, linking to the official Healistix sea moss gel product page. No framework or build pipeline is required. Cloudflare Workers Static Assets serves `public/` directly.

## Run and publish

```sh
npm install
npm run check
npm run dev
npm run deploy
```

Cloudflare account authentication and the custom domain are configured by the deployment owner. `wrangler.jsonc` names the Worker `uswellness-fit`. No credentials are stored here.

## Content

The supplied editorial establishes the comparison and first-spoonful conversion story. The published adaptation keeps the brand, St. Lucia sourcing, real fruit, comparison, daily use, FAQs and official-store CTA. It does not present unsupported 80% statistics, 12-brand laboratory testing, mineral counts, supplement replacement promises or invented verified-buyer testimonials as independent facts. Sourcing and ingredients are framed as Healistix label statements. Availability is checked on the destination store rather than asserted on this page.

All product links carry `utm_source=uswellness`, `utm_medium=advertorial`, `utm_campaign=seamoss_comparison`. The CTA opens the same tab, preserving normal mobile navigation. No analytics scripts, forms or advertising cookies are installed.

## Assets

Existing Healistix assets are reused without label alteration:

| Shipped file | Local source |
| --- | --- |
| `public/images/mango-jar.webp` | `assets/hx-pilot-mango-front.webp` |
| `public/images/mango-morning.webp` | `assets/hx-mango-lifestyle-v9.png.webp` |
| `public/images/st-lucia.webp` | `assets/hx-pdp2-stlucia.webp` |
| `public/images/sea-moss-spoon.webp` | `assets/hx-pdp2-spoon.webp` |
| `public/fonts/*.woff` | Existing Forma DJR fonts from `assets/` |

## Design

A warm paper and deep forest editorial system with a strong publication masthead, large Forma headline, Georgia reading text, real product imagery and a readable comparison table. Desktop has article navigation; mobile uses an unobtrusive persistent product CTA. Native details controls work without JavaScript. Reduced-motion preferences, visible focus, image dimensions and local fonts are included. Privacy information is available in a keyboard-accessible native dialog. All assets are self-hosted; no remote dependencies load in the visitor's browser.

## Verification

Run `npm run check` for asset paths, internal anchors, image alt text/dimensions, tracked CTA URLs, canonical domain and content integrity. Browser QA evidence, when generated, stays in ignored `qa/`.
