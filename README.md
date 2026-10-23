# Dony Prihantoro — portfolio

A static portfolio for Dony's personal products and selected work built with teams. Published at [deserthaze13.github.io/dony-portfolio](https://deserthaze13.github.io/dony-portfolio/).

## Structure

```text
index.html                 Page content, styles, and small interactions
assets/images/profile/     Portrait
assets/images/personal/    Personal project previews
assets/images/client/      Client project previews approved for public display
```

GitHub Pages serves the repository root. There is no build step or package dependency. To preview locally, run `python3 -m http.server 8000` from this directory and open `http://localhost:8000/`.

## Updating the portfolio

1. Edit `index.html` and keep the visible project copy short. Longer app and development details belong in collapsed `<details>` sections.
2. Put new visuals in the matching `assets/images/` folder and reference them from `index.html` with relative paths.
3. Use only public or cleared client imagery. Do not commit client source code, credentials, internal documents, private dashboards, or user data.
4. Verify the desktop and mobile layout, then push to `main`. GitHub Pages deploys from the repository root.

Client projects are presented as team work, with high-level descriptions only. Personal products are shown separately.
