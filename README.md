# Hiranmai Devarasetty — complete React portfolio

This is a **complete independent React project** matching the Create React App structure in your VS Code screenshot. You do not need your earlier portfolio files to run it. It includes the source code, `package.json`, HTML entry page, styling, content, and the visual assets.

## Start on your Mac

1. **Extract the ZIP** to a new folder, e.g. Downloads/Hiranmai_Portfolio_COMPLETE_Project.
2. **Open Terminal**. Type `cd ` (include the space), then drag the extracted folder from Finder onto the Terminal window, and press Return. This enters the correct directory without needing `code .`.
3. In Terminal, type these commands **one at a time**:

   ```bash
   npm install
   npm start
   ```

4. Visit `http://localhost:3000` in your browser. The React development server may open it automatically.

**Only run `npm install` the first time** (or when updating dependencies). Type no `const ...` JavaScript in Terminal.

### Optional: start from Finder

If macOS allows it, double-click `START_PORTFOLIO.command` in the extracted folder. The script checks for `npm`, installs dependencies once if needed, and starts the dev server. If macOS blocks the script, use the Terminal commands above instead.

## What's included

- `src/App.js`: full React UI, scroll butterfly, graph background, Signal / Orbit, map, contact modal.
- `src/App.css`: cinematic design and responsive animation styles.
- `src/index.css`: global defaults.
- `src/index.js`: React entry point.
- `src/content.js`: factual content from your originally shared portfolio component.
- `public/index.html`: HTML entry point.
- `public/usa-boston.svg`: U.S. illustration with Boston highlighted.
- `public/*.jpg`: concept illustrations for professional experiences; these are **not real workplace photos**.
- `public/favicon.svg`: basic HD favicon.
- `preview-standalone.html`: optional standalone design reference that can be opened without `npm` (not the React application).

## Functionality

**Signal** is navy/cyan, featuring the U.S. map and Boston/relocation information. **Orbit** is violet/peach, featuring a spatial universe. Both modes preserve the same content. The scroll journey goes Intro → Projects → Experience → Skills → Connect, and the butterfly arrives at the flower. Contact offers Full-time opportunity, Collaboration, and Just saying hello; submissions open an **email draft in your email app**, not a server-side message.

## Important limitations and checks

- No live form backend is included.
- A résumé file isn't included. Add a verified current PDF and a link if you want a resume download.
- **Your original information was preserved** from the shared code; review job dates/metrics against the latest version on your laptop before publishing.
- This package is separate from your existing GitHub project. It will **not** change your live website unless you deliberately replace/publish it.
- To create a production build later, run `npm run build`. The `homepage` field is already set for the `Portfolio` GitHub Pages path.
- You need Node.js / npm installed on your Mac and a connection to install npm packages. The preview HTML file works without installing dependencies.

## File layout

```text
Hiranmai_Portfolio_COMPLETE_Project/
├── package.json
├── README.md
├── START_PORTFOLIO.command
├── public/
│   ├── index.html
│   ├── favicon.svg
│   ├── usa-boston.svg
│   └── [four experience illustrations].jpg
├── src/
│   ├── index.js
│   ├── index.css
│   ├── App.js
│   ├── App.css
│   └── content.js
└── preview-standalone.html
```
