import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Each meetup is one Markdown file in src/content/eventos/.
// The file name (without .md) becomes the URL: /eventos/<file-name>
// The fields below are checked on every build, so a typo fails the build
// instead of breaking the live site.
const eventos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/eventos" }),
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Usa el formato AAAA-MM-DD"),
    start: z.string().regex(/^\d{2}:\d{2}$/, "Usa 24 h, ej. 18:00"),
    end: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    category: z.enum(["Build", "Learn", "Hang", "Hardware", "Found", "Raise", "Conference"]),
    venue_name: z.string(),
    address: z.string(),
    maps_url: z.string().url(),
    rsvp_url: z.string().url(),
    cover: z.string().optional(),
    cover_alt: z.string().optional(),
    photos: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    attendance: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { eventos };
