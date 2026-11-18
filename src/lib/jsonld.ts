import type { Entity, Feature, Lang, LivePage } from '../data/types';
import { absoluteUrl, pagePath } from './seo';

export interface FaqItem {
  q: string;
  a: string;
}

interface Input {
  entity: Entity;
  features: Feature[];
  page: LivePage;
  lang: Lang;
  /** Plain-text FAQ, built from the same array as the visible FAQ. */
  faq?: FaqItem[];
  /** Plain-text breadcrumb label for the current page. */
  crumb?: string;
  homeLabel?: string;
  /** Organization description in this language (the landing meta description, so facts match). */
  orgDescription: string;
}

const orgId = (e: Entity) => `${e.url}/#organization`;

/** One @graph per page. No offers, no founder, no price anywhere (SITE.md §Structured data). */
export function buildJsonLd({ entity, features, page, lang, faq, crumb, homeLabel, orgDescription }: Input): object {
  const url = absoluteUrl(pagePath(lang, page.slug));
  const c = entity.creator;
  const graph: object[] = [
    {
      '@type': 'Organization',
      '@id': orgId(entity),
      name: entity.name,
      url: entity.url,
      description: orgDescription,
    },
    {
      '@type': 'Person',
      '@id': c.id,
      name: c.name,
      alternateName: c.alternateName,
      jobTitle: c.jobTitle[lang],
      url: c.url,
    },
  ];
  if (page.kind === 'landing') {
    graph.push(
      { '@type': 'WebSite', '@id': `${entity.url}/#website`, name: entity.name, url: entity.url, inLanguage: lang, publisher: { '@id': orgId(entity) }, creator: { '@id': c.id } },
      {
        '@type': 'SoftwareApplication',
        '@id': `${entity.url}/#software`,
        name: entity.name,
        applicationCategory: 'DeveloperApplication',
        description: page.description[lang],
        url,
        creator: { '@id': c.id },
        featureList: features.filter((f) => f.status === 'live' && f.inJsonLd !== false).map((f) => f.label[lang]),
      },
    );
  } else {
    graph.push({
      '@type': page.kind === 'about' ? 'AboutPage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title[lang],
      description: page.description[lang],
      inLanguage: lang,
      isPartOf: { '@id': `${entity.url}/#website` },
      publisher: { '@id': orgId(entity) },
    });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel ?? entity.name, item: absoluteUrl(pagePath(lang, '')) },
        { '@type': 'ListItem', position: 2, name: crumb ?? page.title[lang], item: url },
      ],
    });
  }
  if (faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
