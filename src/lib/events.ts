import { getCollection, type CollectionEntry } from "astro:content";
import { endsAt, startsAt } from "./time";

export type Evento = CollectionEntry<"eventos">;

/** Splits meetups into upcoming (soonest first) and past (newest first), in Hermosillo time. */
export async function getEventos(now = new Date()) {
  const all = (await getCollection("eventos")).filter((e) => !e.data.draft);
  const upcoming = all
    .filter((e) => endsAt(e.data) >= now)
    .sort((a, b) => +startsAt(a.data) - +startsAt(b.data));
  const past = all
    .filter((e) => endsAt(e.data) < now)
    .sort((a, b) => +startsAt(b.data) - +startsAt(a.data));
  return { upcoming, past, next: upcoming[0] };
}

/** Prefix a site path with the base path (needed while we live under /<repo>/ on GitHub Pages). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}
