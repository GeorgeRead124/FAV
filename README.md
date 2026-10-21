# You Are My Favorite Universe

A Vite + React + TypeScript site. No backend, no accounts, no API keys. All personal content lives in **`src/data/config.ts`**.

## 1. Prerequisites
Node.js 20 or newer and Git.

## 2–3. Install and run
```bash
npm install
npm run dev        # local site, usually http://localhost:5173
```

## 4. Add your photos (name them exactly like this)
Put files in `public/assets/images/`:
`photo-1.jpg` … `photo-6.jpg` (portrait 4:5 works best) and `album-cover.jpg` (square).
Until a `.jpg` exists, the matching `.svg` placeholder is shown with a visible "Placeholder" badge.
Want more photos or other names? Edit the `photos` list in `config.ts`.

## 5. Add your song
Put your **licensed** MP3 at `public/assets/audio/our-song.mp3`.
To use a different filename, change `song.file` in `config.ts`. Set `song.title`, `song.artist` and `song.message` too.
Until the file exists, the site says "Song file not found" and plays silence from `silent.wav`. It never pretends music is playing.

## 6. Personalize messages
Edit `src/data/config.ts`: names, welcome text, 20 reasons, letters, game questions (`photo` = index of the photo, `answer` = index 0–2 of the right option), hidden-heart messages, future ideas, closing text. Search for `EDIT ME`.
Your apology letter is already in `finalLetter`.

## 7. Build
```bash
npm run build      # outputs to dist/
npm run preview
```

## 8–9. Deploy to GitHub Pages with GitHub Actions
1. Create a GitHub repository and push this project to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The workflow in `.github/workflows/deploy.yml` builds and publishes.
4. Your site appears at `https://<username>.github.io/<repo-name>/`.
`vite.config.ts` uses `base: './'`, so all asset paths are relative and work under any repo name.

## 10. Troubleshooting
- **Photos show "Placeholder"**: the file name or folder is wrong. It must be `public/assets/images/photo-1.jpg`, lowercase.
- **"Song file not found"**: check `public/assets/audio/our-song.mp3` and that `song.file` matches. Filenames are case-sensitive on GitHub Pages.
- **Music does not start**: browsers only allow sound after a click. The START button triggers it; if blocked, use the play button shown.
- **Blank page after deploy**: confirm Pages source is "GitHub Actions" and that `npm run build` passes locally.
- **Updated files not showing**: hard-refresh (Ctrl/Cmd+Shift+R).
