# kamprent-landing

Pre-launch landing page for [kamprent.si](https://kamprent.si) (launch 12 January 2027). Static HTML and CSS, no build step. Look and copy follow the approved Kamprent design tokens and Slovenian voice.

## Files

- `index.html`, `style.css`, `signup.js`: the page and the email signup form
- `zasebnost.html`: privacy statement (the form collects emails)
- `functions/api/signup.js`: Cloudflare Pages Function that stores signups in a KV namespace

## Local preview

```bash
python3 -m http.server 8000
```

The form needs the Pages Function, so for a full test use `npx wrangler pages dev .` with a KV binding named `SIGNUPS`.

## Deploy (Cloudflare Pages)

1. Connect this repo as a Pages project, no build command, output directory `/`.
2. Create a KV namespace and bind it to the project as `SIGNUPS`.
3. Point `kamprent.si` at the project.

## Before publishing

- Confirm the contact address in `zasebnost.html` (currently `info@kamprent.si`).
- The page deliberately shows no live counter of founding members; add one once the app exists.
