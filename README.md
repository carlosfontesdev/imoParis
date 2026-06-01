# Jeremy Pernain — Real Estate Landing Page

A frontend-only prototype landing page for an independent real estate advisor based in Paris.

## Stack

- HTML5
- Bootstrap 5.3 (CDN)
- Bootstrap Icons (CDN)
- Google Fonts: Cormorant Garamond + Inter
- Vanilla JavaScript (no frameworks)

## Getting started

Open `index.html` in a browser, or serve the folder locally:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

> A local server is recommended so relative asset paths resolve consistently.

## Folder structure

```
imobiliariaDemo/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css          # Brand styles & layout
│   │   └── animations.css     # Scroll reveal utilities
│   └── js/
│       └── main.js            # Hero scroll, nav, form, property data
└── README.md
```

Images are loaded from [Unsplash](https://unsplash.com) via CDN URLs. To self-host, download images into `assets/images/` and update paths in `index.html`, `style.css`, and `main.js`.

## Features

- **Cinematic hero** — 150vh scroll zone with Eiffel Tower background, parallax, and scroll-synced typography
- **Personal branding** — centered on Jeremy Pernain as an independent advisor
- **Sections** — About, Services, Why Me, Featured Properties, Contact, Footer
- **Scroll animations** — Intersection Observer reveals; respects `prefers-reduced-motion`
- **Contact form** — client-side success message only (no backend)
- **Placeholder data** — statistics and property listings for demonstration

## ASP.NET MVC integration notes

When moving to MVC:

1. Split `index.html` into `_Layout.cshtml` (nav + footer) and partial views per section (`_Hero`, `_About`, etc.).
2. Move `assets/` to `wwwroot/assets/`.
3. Replace CDN Bootstrap with local copies or LibMan/npm if preferred.
4. Convert the `properties` array in `main.js` to a Razor model or API endpoint.
5. Wire the contact form to a controller action (`[HttpPost]` on `ContactController`).
6. Update image URLs to use `@Url.Content("~/assets/images/...")`.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `IntersectionObserver`, CSS `clamp()`, and `backdrop-filter`.

## License

Prototype for demonstration purposes.
