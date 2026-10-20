# Harshiv Tailor — Digital Field Dossier

A responsive personal portfolio designed around cybersecurity × connected mobility. It uses custom SVG artwork, a restrained signal palette, accessible navigation, a printable CV page, project and credential sections, and SEO metadata. There is no paid domain or build step required.

## Before you publish

This is a strong first version, but a few personal details still need confirmation. Open `site-config.js` and update:

1. **Email and LinkedIn** are now configured. GitHub is omitted until you provide a profile URL.
2. **Education** — add the exact institution name and dates for your BCA, and confirm the current program's official name. Adjust the period for current studies if needed.
3. **Projects** — review titles, descriptions, and project status. Add a repository/demo URL only if it is public, safe to share, and ready for employers.
4. **Skills** — remove any technology you would not feel comfortable discussing in an interview.
5. **Certifications** — your Certificate Course in Entrepreneurship (CCE), dated June 4, 2025, is listed. Its PDF is included at `assets/certificate-cce.pdf`.
6. **Search preview** — in `index.html`, update the title, description, Open Graph text, and JSON-LD if you change the name or focus. Replace the image metadata only if you change `assets/social-card.png` (the SVG source is also included for editing).
7. **Sitemap** — replace `YOUR-USERNAME` in `sitemap.xml` with the final public site URL. If using Netlify, use your actual `your-site-name.netlify.app` URL instead.

## Preview on your computer

Unzip the folder and double-click `index.html`. The site is static, so the main page and printable CV work without a server. An internet connection is needed for the optional Google Fonts; system font fallbacks are included.

## Publish for free with GitHub Pages (recommended)

GitHub Pages supports a public static portfolio under a `github.io` address, so no custom domain is necessary. On the free plan, use a public repository.

1. Create or sign in to a GitHub account at https://github.com/.
2. Create a **public** repository named exactly `YOUR-USERNAME.github.io` (replace the username with your GitHub username).
3. Upload the *contents* of this folder (not the enclosing folder) to the repository's root. `index.html` should be at the top level next to `styles.css`.
4. Open **Settings → Pages**. Under the build/deployment section, choose deploying from the `main` branch and the `/ (root)` folder, then save.
5. Your website address will be `https://YOUR-USERNAME.github.io/`. Publishing or updates may take several minutes.
6. Replace the placeholder URL in `sitemap.xml`, then upload/commit that update.

Official guide: https://docs.github.com/en/pages/quickstart

## Alternative: Netlify

1. Create a free account at https://www.netlify.com/.
2. Choose the manual deploy / drag-and-drop option in the Netlify dashboard.
3. Drag the **uncompressed folder contents** (or a ZIP containing the site files) into the deploy area.
4. Netlify provides a site URL ending in `.netlify.app`. You can change the site name in the project settings if a name is available.
5. Update `sitemap.xml` with that exact URL and redeploy.

Netlify's free offering and usage limits can change; review its current plan before deploying: https://www.netlify.com/pricing/

## CV as PDF

Open **View CV** on the homepage. On the CV page, select **Print / Save as PDF** and choose “Save as PDF” in the browser's print dialog. The print stylesheet removes the navigation controls and formats the CV for A4 paper.

## Search visibility

The site includes a descriptive page title, meta description, Open Graph preview tags, a Person structured-data block, a robots file, and a sitemap template. These give search engines useful signals; they do **not** guarantee that Google will index the site or display a particular preview. After deployment, submit the final URL in Google Search Console and request indexing. Keep the page public, useful, accurate, and updated.

Google Search Console: https://search.google.com/search-console/about

## Privacy note

Only publish information you want publicly discoverable. Do not add a home address, student number, identity documents, private certificate files, or personal phone number unless you have a clear professional reason. A professional email is usually enough.
