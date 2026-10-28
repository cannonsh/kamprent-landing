# kamprent-landing

Pre-launch landing page for [kamprent.si](https://kamprent.si) (launch 12 January 2027). Static HTML and CSS, no build step. Look and copy follow the approved Kamprent design tokens and Slovenian voice.

## Files

- `index.html`, `style.css`, `signup.js`: the page and the email signup form
- `zasebnost.html`: privacy statement (the form collects emails)
- `functions/api/signup.js`: Cloudflare Pages Function that stores signups in D1
- `schema.sql`: the `signups` table

## Local preview

```bash
python3 -m http.server 8000
```

The form needs the Pages Function, so for a full test use `npx wrangler pages dev .` with a D1 binding named `DB`.

## Deploy (Cloudflare Pages)

1. Connect this repo as a Pages project, no build command, output directory `/`.
2. Bind the D1 database `kamprent-landing` to the project as `DB` (Settings, Bindings). The table is created from `schema.sql`.
3. Point `kamprent.si` at the project.
4. Email Routing forwards `info@kamprent.si`; it needs the zone to be active (nameservers switched).

## Before publishing

- The page deliberately shows no live counter of founding members; add one once the app exists.
