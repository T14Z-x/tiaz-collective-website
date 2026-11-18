# Tiaz Collective

An independent Next.js portfolio concept focused on long-form, scroll-led storytelling. It uses original sample copy and CSS/SVG artwork to explore pinned chapters, scroll reveals, parallax, and section navigation.

The interaction pacing was inspired by [Ondo Collective](https://ondocollective.jp/). This project is an independent recreation, is not affiliated with or endorsed by Ondo Collective, and does not include its branding or assets.

## Features

- Long, sticky scroll chapters with a staged hero transition
- Reveal-on-scroll and scroll-responsive artwork scaling
- Responsive section navigation with active-section tracking and Escape-to-close
- Mobile layouts and `prefers-reduced-motion` support
- Sample service, project, journal, and contact sections

## Getting started

### Requirements

- Node.js 20.9 or later
- npm

### Install and run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

The production server runs at [http://localhost:3000](http://localhost:3000) by default. To check TypeScript independently:

```bash
npm run typecheck
```

## Project structure

```text
app/
  globals.css   Visual design, responsive layouts, and motion styles
  layout.tsx    Root layout and page metadata
  page.tsx      Page content and client-side scroll interactions
```

## Before publishing or deploying

- Replace the fictional portfolio copy and sample project/team details with content you have permission to publish.
- Replace `hello@tiaz-collective.example` with a real contact address.
- The contact form is a front-end demo: it does not send or store submissions. Connect it to a backend or form service before using it for real inquiries.
- The privacy link is only an in-page placeholder, not a privacy policy.
- The stylesheet loads fonts from Google Fonts; fallback fonts are provided, but the intended typography requires a network connection.

## License

The original code and artwork in this repository are licensed under the MIT License. See [LICENSE](./LICENSE). Third-party dependencies and services remain subject to their own terms and licenses.
