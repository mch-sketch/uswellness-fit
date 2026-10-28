# US Wellness Community Investigation

US Wellness is the publication organization conducting the supplied article's research. It is not Healistix. The page must read as a straightforward article; Healistix is introduced only as the later recommendation.

Preserve all source content units in scripts/source-copy.json. The only authorized wording exception is the comparison heading, shortened to Sourcing & Quality Breakdown by removing the literal Us vs. Them prefix. No imported men's-health claims, invented authors, studies, institution badges or star ratings.

Visitors read the article, examine the comparison and sourcing, then encounter the recommendation, exact benefit paragraphs, source testimonials and FAQs. A single final official-store link retains the source CTA wording and US Wellness campaign parameters. No top sales message or sticky sales element.

The page is static Cloudflare Workers hosting, stores no visitor records and installs no analytics. Original US Wellness logo and Healistix product artwork remain unaltered; four contextual unbranded images are editorial illustrations.


## Publication home and article routing

The publication home is https://uswellness.fit/ (public/index.html). The sea moss article is a separate page at https://uswellness.fit/research/sea-moss/ (public/research/sea-moss/index.html). Home presents only the publication identity, source category and one article link with an unbranded sample thumbnail. It contains no Healistix branding, product link or fabricated additional articles. Article canonical and og:url identify the nested page. Masthead/footer logo links return to publication home; the 404 link opens the article. Sitemap lists both URLs.

Route QA at1440x1000 and390x844 confirms home-to-article and logo-back-home navigation, correct separate canonicals, all53 expected article units, loaded images, no horizontal overflow and no JavaScript errors. Evidence: qa/page-route-results.json and home/article route screenshots.
