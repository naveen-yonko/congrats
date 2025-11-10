# All the Best — Animated Congratulation Page

This small static site shows a modern animated "All the Best" page you can host on GitHub Pages.

Files added
- `index.html` — main page with the message and canvas for confetti
- `styles.css` — styling and animations
- `script.js` — lightweight confetti script and controls

How to host on GitHub Pages (quick):

1. Create a new GitHub repository (or use an existing one).
2. From PowerShell in this folder, run the git commands below to initialize and commit locally, then add a remote and push. No other software is required for viewers — they can open the published link in any browser and won't need Python or any runtime installed.

```powershell
cd e:\EDUCATION\others\congrats
git init
# (optional) set your local commit identity if you haven't already
git config user.email "you@example.com"
git config user.name "Your Name"
git add .
git commit -m "Add congrats site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. On GitHub, go to repository Settings → Pages, then select the `main` branch and `/ (root)` folder and save. The site will be published on `https://<your-username>.github.io/<your-repo>/` in a few minutes and will render in any modern browser.

Preview locally
- You can open `index.html` directly in your browser (double-click the file) — no Python or server is required. Some browsers restrict local font/network loading in file:// mode; if you notice fonts not loading, then use the GitHub Pages link (best) or run a simple local server (optional).

Tips
- Edit the visible name by clicking on it in the page.
- Tweak particle counts in `script.js` if the animation is too heavy.

Enjoy and congrats to your friend! 🎉
