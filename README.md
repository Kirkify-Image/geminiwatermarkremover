Gemini Watermark Remover
Clean Gemini exports in seconds, directly in the browser.

Gemini Watermark Remover is a free, privacy-first web app for removing the Gemini export watermark from original Gemini-generated images. It runs locally in the browser, avoids server-side image uploads, and is built on top of the open-source @pilio/gemini-watermark-remover engine.

Live site: https://gemini-watermarkremover.org/

Highlights
Free local Gemini cleanup
No signup
No cloud upload
Before / after comparison slider
Download clean output as PNG
Built for Gemini exports, not generic image editing
Open-source and easy to self-host
English, Portuguese, and Spanish landing pages
Why This Tool Feels Different
Most editors treat watermark removal as a generic retouching or inpainting problem. That often means invented pixels, softer edges, and inconsistent texture around the repaired area.

This project is designed for one specific job: cleaning Gemini export images. Instead of painting over the mark with a generic AI fill, it uses Reverse Alpha Blending to reconstruct the blended pixels mathematically. In practice, that usually produces sharper edges and a cleaner result on original Gemini exports.

How It Works
Upload an original Gemini export in PNG, JPG, or WebP format.
The browser processes the file locally using the Gemini watermark engine.
Reverse Alpha Blending reconstructs the marked region.
You compare the result and download a clean PNG.
If the result shows No Change, the file is usually a screenshot, a recompressed image, or a file that does not contain the expected Gemini watermark pattern.

Privacy
The core value of this project is local processing.

Your source image does not need to be uploaded to a remote image-processing backend. The cleanup pipeline runs in the browser, which makes the tool useful for sensitive visuals, client work, and unreleased assets.

If you fork or self-host this project, review your own analytics, hosting, and logging setup so that your deployment still matches that privacy promise.

Best Results
For the cleanest output:

Start from the original Gemini export whenever possible
Avoid screenshots, compressed re-saves, or cropped derivatives
Re-export the image from Gemini if the cleanup result looks incomplete
Original exports preserve the blend data that the restoration logic depends on.

Demo
Production site:

https://gemini-watermarkremover.org/
Site preview asset:

src/assets/hero.png
Tech Stack
React 19
Vite 8
@vitejs/plugin-react
@pilio/gemini-watermark-remover
Plain CSS
Local Development
Prerequisites
Node.js 18+ recommended
npm
Install dependencies
npm install
Run the dev server
npm run dev
Build for production
npm run build
Preview the production build
npm run preview
Project Structure
.
├── index.html
├── pt/
├── es/
├── public/
├── src/
│   ├── App.jsx
│   ├── AppPt.jsx
│   ├── AppEs.jsx
│   ├── main.jsx
│   ├── main-pt.jsx
│   ├── main-es.jsx
│   ├── style.css
│   └── assets/
├── vite.config.js
└── package.json
Internationalization
This repository ships separate entry points for:

English
Portuguese
Spanish
Vite builds all three pages from:

index.html
pt/index.html
es/index.html
Limitations
Best results come from original Gemini exports
Non-standard overlays may not be detected
Heavily compressed screenshots can reduce restoration quality
Mobile browsers are supported, but lower-end devices may be slower
FAQ
Is this tool free?
Yes. The site is free to use and does not require signup.

Does it upload images to a server?
The cleanup flow is designed to run locally in the browser rather than sending the source image to a remote image-processing backend.

What output format does it generate?
The cleaned result is exported as a PNG.

Is this better than generic AI fill?
For original Gemini exports, usually yes. This tool is tuned for the Gemini watermark pattern and uses Reverse Alpha Blending instead of generic inpainting.

SEO and Distribution Notes
This project currently includes static backlink badges and directory references in the HTML for launch platform verification. If you fork this repository for your own product or domain, review those links in index.html and the footer before deployment.

Contributing
Issues and pull requests are welcome.

If you contribute, keep changes:

focused
easy to review
aligned with the privacy-first, local-processing positioning
Please run a production build before opening a PR:

npm run build
Credits
Watermark engine: @pilio/gemini-watermark-remover
Product site and interface: this repository
License
This project is licensed under the MIT License. See LICENSE.
