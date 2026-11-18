import type { PostHog } from "posthog-js";
import { ANALYTICS_ON, INTERNAL_KEY, POSTHOG_HOST, POSTHOG_TOKEN } from "./analytics";

/**
 * Analytics in the browser: PostHog and the click events. Same setup as buildsomethingeveryday.com.
 * Google Analytics itself is the Google tag in `src/components/Analytics.astro`.
 *
 * Click events: a link or button with `data-track="<event>"` sends that event, with one param
 * per `data-track-<param>` attribute (`data-track-event-slug="x"` becomes `event_slug: "x"`),
 * to Google Analytics 4 and to PostHog. Params are slugs and fixed ids only, never personal data.
 * The event table is in AGENTS.md (Analytics): a new button that matters gets a row there and a
 * name here.
 */
export const TRACK_EVENTS = ["rsvp_click", "maps_click", "social_click", "contact_click"] as const;
export type TrackEvent = (typeof TRACK_EVENTS)[number];
export type TrackParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: TrackParams) => void;
  }
}

let client: PostHog | undefined;
// Clicks made before PostHog has loaded wait here (it loads when the browser is idle).
const waiting: [TrackEvent, TrackParams | undefined][] = [];

/** True on a browser where `?internal=1` was opened once: one of our own devices. */
export function isInternalDevice(): boolean {
  try {
    return localStorage.getItem(INTERNAL_KEY) === "1";
  } catch {
    return false;
  }
}

/** Never throws and never blocks the click: analytics must not break a button or a link. */
export function track(name: TrackEvent, params?: TrackParams): void {
  try {
    window.gtag?.("event", name, params);
  } catch {
    // The Google tag failed or was replaced by a blocker: ignore.
  }
  try {
    if (client) client.capture(name, params);
    else if (POSTHOG_TOKEN && waiting.length < 20) waiting.push([name, params]);
  } catch {
    // Same for PostHog.
  }
}

/**
 * PostHog, loaded after the page is drawn: `posthog-js` is a separate file fetched once the
 * browser is idle, so it is not part of the first load.
 *
 * `defaults: "2026-05-30"` captures the page view by itself, so the site sends none of its own.
 * Autocapture (clicks), session replay with every input masked (`data-ph-mask` masks the text
 * of anything else marked sensitive), heatmaps and web vitals are on. Replay only records when
 * "Record user sessions" is on in the PostHog project. The Privacidad page describes all of it.
 * `ui_host` keeps PostHog's own links pointing at its app when `api_host` is the proxy.
 */
function startPostHog(): void {
  if (!POSTHOG_TOKEN) return;
  const internal = isInternalDevice();
  const load = () => {
    import("posthog-js")
      .then(({ default: posthog }) => {
        posthog.init(POSTHOG_TOKEN, {
          api_host: POSTHOG_HOST,
          ui_host: "https://us.posthog.com",
          defaults: "2026-05-30",
          session_recording: { maskAllInputs: true, maskTextSelector: "[data-ph-mask]" },
          capture_performance: { web_vitals: true },
          capture_heatmaps: true,
          // Our own devices: no replay, and every event carries `internal: true` so the
          // project's internal-users filter drops them. `loaded` runs inside init before the
          // first page view, so that one is tagged too. `register` persists in PostHog's own
          // storage, so a device switched back with ?internal=0 unregisters it.
          disable_session_recording: internal,
          loaded: (ph) => {
            if (internal) ph.register({ internal: true });
            else ph.unregister("internal");
          },
        });
        client = posthog;
        for (const [name, params] of waiting.splice(0)) posthog.capture(name, params);
      })
      .catch(() => {
        // Blocked by an extension or offline: the site works the same without analytics.
      });
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(load, { timeout: 2000 });
  } else {
    setTimeout(load, 1);
  }
}

function isTrackEvent(name: string | null | undefined): name is TrackEvent {
  return TRACK_EVENTS.includes(name as TrackEvent);
}

/** One listener for the whole page: any click inside a `[data-track]` element sends its event. */
function bindClicks(): void {
  document.addEventListener("click", (event) => {
    const el = event.target instanceof Element ? event.target.closest("[data-track]") : null;
    const name = el?.getAttribute("data-track");
    if (!el || !isTrackEvent(name)) return;
    const params: TrackParams = {};
    for (const attr of Array.from(el.attributes)) {
      if (attr.name.startsWith("data-track-")) {
        params[attr.name.slice("data-track-".length).replace(/-/g, "_")] = attr.value;
      }
    }
    track(name, params);
  });
}

/** Called once per page from Analytics.astro. Does nothing in a build without analytics. */
export function startAnalytics(): void {
  if (!ANALYTICS_ON) return;
  bindClicks();
  startPostHog();
  // The footer line that confirms this browser is flagged as ours.
  if (isInternalDevice()) {
    document.querySelectorAll("[data-internal-note]").forEach((el) => el.removeAttribute("hidden"));
  }
}
