# US Wellness publication redesign

White #ffffff, near-black #1e1a16, rust #b85c38, warm grey #6d645d, fine rules #e5dfd8. Original terracotta US Wellness logo is48px in the masthead. Georgia headline42px desktop/33px mobile; Georgia body18px at1.75 line height. Small Arial interface/byline text. No green palette or Healistix brand styling.

Single720px reading column with880px desktop image/table breakouts. Plain title, italic subtitle and exact publication/category byline. Introductory sample image follows the hook paragraphs. Origin image interrupts sourcing; routine and spoon images illustrate the first two exact benefit strings. All four have small Illustration captions, without image panels or decorative overlays.

The numbered01–04 benefits are continuous prose, using the exact source label and paragraph. Recommendation has one small floated original jar. Reviews are simple ruled quotations; FAQ uses native details controls initially open. The sole store CTA appears at the article end, without an urgency box. No navigation sidebar, floating product, big branded sections or sticky sales bar.

The three-column comparison uses restrained rust rules and ordinary row dividers. Mobile turns each criterion into a labelled two-cell row retaining all original data and headers. Native keyboard focus, alt text, true image dimensions and reduced-motion preference are respected.

Direction was based on Claude Sonnet4.6 read-only brief, with explicit user/parent overrides: white unboxed publication, no invented tagline/author, no stars, no mobile shop bar, source copy untouched except the authorized comparison heading.

QA: full-page desktop1440x1000 and mobile390x844 captures visually inspected. Both render53 expected source units,52 exact plus the authorized heading. No horizontal overflow/image failure/JavaScript error; all four editorial images loaded; one product jar and one contextual link; FAQ toggles work. Evidence in qa/publication-redesign-results.json and matching screenshots. No separate visual reviewer or Impeccable detector ran.


## Publication home and article routing

The publication home is https://uswellness.fit/ (public/index.html). The sea moss article is a separate page at https://uswellness.fit/research/sea-moss/ (public/research/sea-moss/index.html). Home presents only the publication identity, source category and one article link with an unbranded sample thumbnail. It contains no Healistix branding, product link or fabricated additional articles. Article canonical and og:url identify the nested page. Masthead/footer logo links return to publication home; the 404 link opens the article. Sitemap lists both URLs.

Route QA at1440x1000 and390x844 confirms home-to-article and logo-back-home navigation, correct separate canonicals, all53 expected article units, loaded images, no horizontal overflow and no JavaScript errors. Evidence: qa/page-route-results.json and home/article route screenshots.
