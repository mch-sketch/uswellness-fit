# US Wellness Community Investigation

Static editorial presell for USWellness.fit. Cloudflare Workers Static Assets serves public/ directly, without a build framework. Original US Wellness logo and existing Healistix product artwork are used unchanged.

## Commands

npm install
npm run check
npm run dev
npm run deploy

For verification against the original supplied editorial, run:

node scripts/check.mjs "PATH_TO_ORIGINAL_PASTED_TEXT"

## Exact editorial copy

scripts/source-copy.json contains 53 exact source content units: publication, category, title, subtitle, every article paragraph, comparison heading/headers/cells, sourcing content, recommendation, benefits, Sarah and Elena reviews, all FAQs, stock statement and CTA.

The check confirms every unit occurs in rendered body text after whitespace and HTML entity normalization. Passing an original-source path also verifies every manifest unit occurs in that original file. Source punctuation, including em dashes, is preserved under the user's exact-copy instruction.

Only production scaffolding was omitted from the front-facing page: document labels, Section X prefixes, the Hook and Presell CTA internal labels, JPG+ 3 / JPG+ 4 attachment artifacts, the parenthetical link destination instruction and the image-generation prompts. No editorial sentence was rewritten or removed. No additional article claims or editorial tagline were authored.

## Product links

All three official-store links preserve the exact supplied CTA wording and use the Healistix product target with utm_source=uswellness, utm_medium=advertorial and utm_campaign=seamoss_comparison.

## Assets

public/images/mango-jar.webp: existing assets/hx-pilot-mango-front.webp
public/images/mango-morning.webp: existing assets/hx-mango-lifestyle-v9.png.webp
public/images/st-lucia.webp: existing assets/hx-pdp2-stlucia.webp
public/images/sea-moss-spoon.webp: existing assets/hx-pdp2-spoon.webp (retained existing asset)
public/images/uswellness-logo.jpg: original US Wellness Support Community logo, supplied by deployment owner
public/fonts/: existing Forma DJR fonts

## Verification

Exact source check: 53/53 source units present and matched to the original pasted file.
Desktop 1440x1000 and mobile 390x844: no page overflow; images and fonts loaded; native FAQ controls work; no JavaScript errors. Full-page captures were inspected. QA artifacts stay in ignored qa/.
