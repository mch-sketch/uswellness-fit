# US Wellness Community Investigation

A publication-led editorial page at USWellness.fit. US Wellness is the organization presenting the article's investigation. It is separate from Healistix, which appears only in the recommendation portion of the article. Cloudflare Workers Static Assets serves public/ without a frontend framework.

## Commands

npm install
npm run check
npm run dev
npm run deploy

To verify against the original supplied article:

node scripts/check.mjs "PATH_TO_ORIGINAL_PASTED_TEXT"

## Copy fidelity

scripts/source-copy.json preserves the original 53 source content units unchanged. The rendered page preserves 52 units exactly. The sole user-authorized wording change removes the literal `"Us vs. Them" ` prefix from the comparison heading, resulting in `Sourcing & Quality Breakdown`. The checker explicitly allows this one exception while verifying the original manifest against the pasted source.

All article sentences, full title/subtitle, comparison cells, claims, reviews, FAQ, stock statement and CTA are otherwise exact. Only document scaffolding, Section X prefixes, internal Hook/Presell labels, JPG+ attachment artifacts, parenthetical link instructions and image-generation prompts are omitted. No new editorial claims, authors, institutional badges or star ratings are introduced.

## Publication design

A small original US Wellness masthead, ordinary white page, Georgia serif headline/body and rust accents establish a reading experience. Main text is 720px wide; images and the table break out to 880px on desktop. The mobile comparison preserves the semantic three-column table as labelled two-cell rows below each criterion.

There are no sales banners, sticky shop bars, repeated jar photographs, floating sidebars or Healistix hero branding. The four source benefit strings become numbered prose sections. One small original jar appears only in the recommendation. One exact-wording official-store link appears at the end, with utm_source=uswellness, utm_medium=advertorial and utm_campaign=seamoss_comparison.

## Images

The original US Wellness logo remains unchanged. Four generated unbranded editorial illustrations are used once each and captioned `Illustration`:

- public/images/editorial/samples.webp: introductory gel samples, 1448x1086
- public/images/editorial/origin.webp: sourcing comparison, 1536x1024
- public/images/editorial/routine.webp: supplement routine, 1536x1024
- public/images/editorial/spoon.webp: texture and spoon, 1448x1086

Image prompts/provenance are in design/image-prompts.json, managed by the deployment owner. The sole product cutout is the existing assets/hx-pilot-mango-front.webp copied as public/images/mango-jar.webp, with label art unchanged. Other unused files in public/images are previous-version assets, not referenced by the article.

## Verification

Source check passed: 53 source units validated against the original, 52 rendered verbatim plus the single authorized heading change. Browser checks at1440x1000 and390x844 confirm53 expected content units in rendered text, no horizontal overflow, all images loaded, one recommendation jar, four editorial images, one product link, no sticky bar, working FAQ controls and no JavaScript errors. Full-page screenshots were visually inspected and remain in ignored qa/.


## Publication home and article routing

The publication home is https://uswellness.fit/ (public/index.html). The sea moss article is a separate page at https://uswellness.fit/research/sea-moss/ (public/research/sea-moss/index.html). Home presents only the publication identity, source category and one article link with an unbranded sample thumbnail. It contains no Healistix branding, product link or fabricated additional articles. Article canonical and og:url identify the nested page. Masthead/footer logo links return to publication home; the 404 link opens the article. Sitemap lists both URLs.

Route QA at1440x1000 and390x844 confirms home-to-article and logo-back-home navigation, correct separate canonicals, all53 expected article units, loaded images, no horizontal overflow and no JavaScript errors. Evidence: qa/page-route-results.json and home/article route screenshots.

## Additional graphics and vitality page

- Current investigation: /research/sea-moss/ with source-to-spoon, mineral-map and daily-use SVG diagrams under public/images/editorial/graphics/. These illustrate existing source statements without adding efficacy numbers or outcome claims.
- Earlier vitality feature: /research/sea-moss-vitality/. The original supplied page is adapted with US Wellness publisher branding, local assets and working official-store navigation. Its52 original paragraphs and7 Sample markers are retained.
- Legacy CSS/JS is page-local and compatible with the existing Content Security Policy. All17 imported image assets are under public/images/vitality/.
- Run node scripts/check-vitality.mjs for the legacy page, alongside npm run check for the current article.
- The source page's promotional prices, subscription figures, discount, eBook, countdown and guarantee were reproduced, not verified against current Shopify terms. No checkout or subscription was implemented on US Wellness.
- No Google Ads or Meta campaign URLs were changed by this publication.

## Google Ads landing-page recommendation

Keep Shopping traffic on the matching Healistix product detail page. Consider a Search experiment for a suitable editorial destination only after claims, destination relevance and cross-domain purchase measurement have been reviewed. Do not assume the legacy prescription-comparison and sexual-performance copy is Google Ads eligible.

Official references:
- https://support.google.com/merchants/answer/4752265
- https://support.google.com/adspolicy/answer/176031
- https://business.google.com/in/ad-tools/google-ad-experiments/
