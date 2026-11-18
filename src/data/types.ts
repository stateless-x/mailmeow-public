export type Lang = 'th' | 'en';
export const LANGS: readonly Lang[] = ['th', 'en'];
/** A value that exists in both languages. Both must be non-empty. */
export type Bi<T = string> = { th: T; en: T };

export type PageKind = 'landing' | 'migrate' | 'about' | 'privacy' | 'terms' | 'thanks';

interface PageBase {
  /** URL segment after /th/ or /en/. '' is the landing page. */
  slug: string;
  status: 'live' | 'planned';
}

export interface LivePage extends PageBase {
  status: 'live';
  kind: PageKind;
  /** Gates the robots meta tag and the sitemap entry. */
  indexable: boolean;
  title: Bi;
  description: Bi;
  /** Link label, from copy/landing.md §12. header = also shown in the top bar. */
  nav?: { label: Bi; header: boolean };
}

/** No route, no sitemap entry, no nav link. */
export interface PlannedPage extends PageBase {
  status: 'planned';
  plannedFor: string;
}

export type PageEntry = LivePage | PlannedPage;

export interface Feature {
  id: string;
  status: 'live' | 'planned';
  /** One line, as listed on /about. */
  label: Bi;
  /** live only: a test or doc path (relative to the mailmeow repo root). */
  proof?: string;
  /** planned only: when it is expected. */
  plannedFor?: string;
  /** Slug of the page that explains it. Must exist in PAGES. */
  linksTo?: string;
  /** false keeps it out of the JSON-LD featureList (still listed on /about). Used for the Resend row:
   *  Resend is named only where it helps someone switching (copy/landing.md, Rules). */
  inJsonLd?: false;
}

export interface Creator {
  id: string;
  name: string;
  alternateName: string[];
  jobTitle: Bi;
  url: string;
}

export interface Entity {
  name: string;
  url: string;
  docsUrl: string;
  /** Public contact address. Unset until the owner picks one; a production build fails while unset. */
  contactEmail: string | undefined;
  /** false until the docs site serves. */
  docsLive: boolean;
  /** Fills {LAST_VERIFIED} on /about. Update when the live/planned lists are re-checked. */
  lastVerified: string;
  /** Fills {date} on /privacy. */
  privacyUpdated: string;
  /** Fills {date} on /terms. */
  termsUpdated: string;
  /** Fills {date} in the product privacy notice on /privacy. */
  privacyProductUpdated: string;
  creator: Creator;
}

/** A paragraph or a bulleted list, in the order the legal copy gives them. */
export type LegalBlock = { p: Bi } | { ul: Bi<string[]> };
export interface LegalSection {
  heading: Bi;
  blocks: LegalBlock[];
}
