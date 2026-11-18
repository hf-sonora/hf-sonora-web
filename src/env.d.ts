// Build-time analytics settings (see "Analytics" in AGENTS.md). All three are public values
// that end up in the page; none is a secret.
interface ImportMetaEnv {
  /** Google Analytics 4 measurement ID (G-...). Unset: the site runs without Google Analytics. */
  readonly PUBLIC_GA4_ID?: string;
  /** PostHog public client token (phc_...). Unset: the site runs without PostHog. */
  readonly PUBLIC_POSTHOG_PROJECT_TOKEN?: string;
  /** PostHog ingestion host. Unset: https://us.i.posthog.com */
  readonly PUBLIC_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
