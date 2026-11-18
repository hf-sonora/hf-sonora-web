// Analytics settings, read at build time. The deploy workflow passes them from GitHub
// repository variables. A local build, CI and the pull-request preview have none, so those
// builds load no analytics and send nothing.
export const GA4_ID: string = import.meta.env.PUBLIC_GA4_ID ?? "";
export const POSTHOG_TOKEN: string = import.meta.env.PUBLIC_POSTHOG_PROJECT_TOKEN ?? "";
export const POSTHOG_HOST: string =
  import.meta.env.PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export const ANALYTICS_ON = Boolean(GA4_ID || POSTHOG_TOKEN);

/** localStorage key of the internal-device flag. Written only by the inline script in Analytics.astro. */
export const INTERNAL_KEY = "hf.internal";
