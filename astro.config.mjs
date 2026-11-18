// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// SITE_URL and BASE_PATH come from the deploy workflow (.github/workflows/deploy.yml).
// Production is https://hackersfounders.mx with BASE_PATH "/".
const site = process.env.SITE_URL ?? "http://localhost:4321";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  integrations: [sitemap()],
});
