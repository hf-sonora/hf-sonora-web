// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// SITE_URL and BASE_PATH come from the deploy workflow (.github/workflows/deploy.yml).
// On GitHub Pages without a custom domain the site lives under /<repo-name>/.
// Once we have our own domain, BASE_PATH becomes "/".
const site = process.env.SITE_URL ?? "http://localhost:4321";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  integrations: [sitemap()],
});
