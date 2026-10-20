# Iopia — See the idea

A frontend-only product demonstration built with React, TypeScript, Vite, Lucide, and animated SVG. No backend, accounts, API calls, AI generation, or video files. Fonts are bundled locally.

## Run locally

Use Node.js 22 or newer (validated with Node 24).

```sh
cd /workspace/Iopia
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

Open the development server address printed by Vite in your local browser. For a production build:

```sh
npm run build
npm run preview
```

## Present the demo

1. Scroll through the landing page. The desktop process showcase moves horizontally with normal vertical scrolling; mobile and reduced-motion layouts use a normal horizontally scrollable row.
2. Enter any topic or select an example and press Enter. Every topic opens **Activation Functions: How Neural Networks Bend Space** after a simulated 4.1-second introduction. Skip and replay are available.
3. The 60-second lesson starts automatically, except with reduced motion. Play/pause, restart, seeking, scene navigation, captions, speed, and expanded view are functional.
4. Open **Explore the Math** to compare ReLU, sigmoid, and tanh at a shared input. Leaving the lesson for another tool pauses playback.
5. Ask the simulated tutor a question. Responses use local keyword matching, not a model. Notes can be saved in browser storage or downloaded as text. Complete the three-question quiz for scored feedback.

The coding workspace and personalized learning paths shown on the landing page are product concepts, not implemented tools. References are explicitly mock suggestions, not retrieved sources. There is no voiceover; captions provide the silent presentation.

## Mathematical model

The lesson has one authoritative `requestAnimationFrame` playback clock. Renderers derive their entire visual state from its time, so backward seeking reproduces the same frame. The five scene intervals are [0,10), [10,20), [20,35), [35,50), [50,60]. Reduced motion shows a static representative illustration per scene and disables ambient motion.

The ReLU plot is an element-wise activation graph. The neighboring surface is explicitly a derived height plot, `ReLU(x₁) + ReLU(x₂)`, rather than a claim that the input plane uniformly bends. The classification example uses fixed illustrative weights: four ReLU features produce `h(x) = |x₁| + |x₂|`; thresholding at 1.6 gives a diamond boundary in original input space. Both displayed classes are separated by that threshold; this does not imply a single ReLU can separate arbitrary datasets. The scene names use “linear layers” conversationally, while equations and explanations identify the maps with biases as affine.

## Validation

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

On this cloud machine, Chromium is already installed; use:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

The browser tests exercise the prompt transition, deterministic seeking, playback and pause, captions, speed, restart, activation calculations, note saving/download, tutor replies, quiz completion, replay, mobile navigation, reduced motion, and absence of external runtime requests. The test server runs on port 5174.

## Project layout

- `src/App.tsx`: landing page, transition, workspace, and supporting tools.
- `src/components/Visuals.tsx`: vector identity and real-time SVG diagrams.
- `src/lesson/data.ts`: fixed scenes, captions, quiz, and tutor explanations.
- `src/lesson/usePlayback.ts`: playback clock and transport state.
- `src/lesson/math.js`: shared activation and classification model, covered by unit tests.
- `src/styles.css`: responsive visual design and reduced-motion fallbacks.

## Logo and reference

The original uploaded `iopia.html` remains untouched outside this checkout. Its canvas, chapters, contextual tutor, notes, and quiz informed the new workspace.

The logo shown inline in chat was not supplied as a downloadable file. The current `Logo` component uses a **temporary blue–violet vector book/play mark**, not the original artwork. Replace that component's vector with the original image asset when it is available. No replacement or altered version of the original logo is claimed.

Setup and build commands do not create commits or push changes. Use the existing isolated checkout; no Git worktree is required.
