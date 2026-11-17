// Everything on this site runs on Hermosillo time: America/Hermosillo, UTC-7, no daylight saving.
// Never use the visitor's time zone.
export const TZ = "America/Hermosillo";
export const OFFSET = "-07:00";

/** ISO timestamp with the Hermosillo offset, e.g. 2026-12-03T18:00:00-07:00 */
export function isoAt(date: string, time: string): string {
  return `${date}T${time}:00${OFFSET}`;
}

/** Start of the event as a Date (absolute instant). */
export function startsAt(e: { date: string; start: string }): Date {
  return new Date(isoAt(e.date, e.start));
}

/** An event counts as upcoming until its end time (or midnight that day) in Hermosillo. */
export function endsAt(e: { date: string; end?: string }): Date {
  return new Date(isoAt(e.date, e.end ?? "23:59"));
}

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es-MX", { timeZone: TZ, ...opts });

/** "JUEVES 3 DE DICIEMBRE" */
export function longDate(d: Date): string {
  return fmt({ weekday: "long", day: "numeric", month: "long" })
    .format(d)
    .replace(",", "")
    .toUpperCase();
}

/** "3 DIC 2026" */
export function shortDate(d: Date): string {
  return fmt({ day: "numeric", month: "short", year: "numeric" })
    .format(d)
    .replace(/\./g, "")
    .replace(/ de /g, " ")
    .toUpperCase();
}

/** "6:00 PM" */
export function clock(date: string, time: string): string {
  return fmt({ hour: "numeric", minute: "2-digit", hour12: true })
    .format(new Date(isoAt(date, time)))
    .replace(/\s?a\.\s?m\./i, " AM")
    .replace(/\s?p\.\s?m\./i, " PM")
    .replace(/ /g, " ");
}
