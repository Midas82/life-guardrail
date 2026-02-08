# 🚀 Deploy to midas82.github.io

## Setup Options

You have several options for deploying Life Guardrail to your GitHub Pages site.

---

## Option 1: Subdirectory on GitHub Pages (Easiest)

Deploy to: `https://midas82.github.io/life-guardrail/`

### Steps

1. **Clone your midas82.github.io repository** (if not already done)
```bash
git clone https://github.com/Midas82/midas82.github.io.git
cd midas82.github.io
```

2. **Create PWA directory structure**
```bash
mkdir -p pwa/life-guardrail
```

3. **Copy app files**
```bash
cp /tmp/life-guardrail/{index.html,sw.js,manifest.webmanifest,icon-512.png} pwa/life-guardrail/
```

4. **Update manifest.webmanifest** to use correct paths
```json
{
    "start_url": "/life-guardrail/.",
    "icons": [
        {
            "src": "/life-guardrail/icon-512.png",
            ...
        }
    ]
}
```

5. **Commit and push**
```bash
git add pwa/life-guardrail/
git commit -m "Add Life Guardrail PWA app"
git push origin main
```

6. **Access at**: `https://midas82.github.io/life-guardrail/`

---

## Option 2: Create PWA Hub Page

Create an index page listing all your PWAs.

### Create pwa/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Midas PWA Suite</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
            background: #000;
            color: #fff;
            padding: 40px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            color: #FFD700;
            margin-bottom: 40px;
        }
        .pwa-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }
        .pwa-card {
            background: #1a1a1a;
            border: 2px solid #FFD700;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .pwa-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
        .pwa-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        .pwa-name {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .pwa-desc {
            font-size: 0.9rem;
            color: #ccc;
            margin-bottom: 15px;
        }
        .pwa-link {
            display: inline-block;
            background: #FFD700;
            color: #000;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s;
        }
        .pwa-link:hover {
            background: #DAA520;
        }
    </style>
</head>
<body>
    <h1>🎯 Midas PWA Suite</h1>

    <div class="pwa-grid">
        <!-- Life Guardrail -->
        <div class="pwa-card">
            <div class="pwa-icon">🔔</div>
            <div class="pwa-name">Life Guardrail</div>
            <div class="pwa-desc">Smart alarm & reminder system with offline support</div>
            <a href="./life-guardrail/" class="pwa-link">Open App</a>
        </div>

        <!-- Add more PWAs here -->
        <!-- Template:
        <div class="pwa-card">
            <div class="pwa-icon">EMOJI</div>
            <div class="pwa-name">App Name</div>
            <div class="pwa-desc">Description</div>
            <a href="./app-folder/" class="pwa-link">Open App</a>
        </div>
        -->
    </div>

    <p style="text-align: center; margin-top: 40px; color: #999;">
        All apps work offline. Click "Open App" to install as native app.
    </p>
</body>
</html>
```

### Steps

1. **Create pwa/index.html** with the code above
2. **Add each PWA as a subdirectory**:
   ```
   pwa/
   ├── index.html (hub page)
   ├── life-guardrail/
   │   ├── index.html
   │   ├── sw.js
   │   ├── manifest.webmanifest
   │   └── icon-512.png
   └── other-apps/
   ```
3. **Push to GitHub**
4. **Access at**: `https://midas82.github.io/pwa/`

---

## Option 3: Replace Old PWAs

If you have old/broken PWAs, you can replace them:

### Steps

1. **Delete old PWA directory**
```bash
rm -rf pwa/old-app-name
```

2. **Copy new app**
```bash
cp -r /tmp/life-guardrail pwa/life-guardrail
```

3. **Update start_url in manifest.webmanifest**
```json
"start_url": "/pwa/life-guardrail/."
```

4. **Commit and push**
```bash
git add .
git commit -m "Replace old PWA with Life Guardrail"
git push origin main
```

---

## File Structure Examples

### Option 1 (Subdirectory)
```
midas82.github.io/
├── pwa/
│   └── life-guardrail/
│       ├── index.html
│       ├── sw.js
│       ├── manifest.webmanifest
│       └── icon-512.png
└── index.html (main site)
```

Access: `https://midas82.github.io/pwa/life-guardrail/`

---

### Option 2 (Hub Page)
```
midas82.github.io/
├── pwa/
│   ├── index.html (hub page with all apps)
│   ├── life-guardrail/
│   │   ├── index.html
│   │   ├── sw.js
│   │   ├── manifest.webmanifest
│   │   └── icon-512.png
│   ├── app2/
│   └── app3/
└── index.html (main site)
```

Access: `https://midas82.github.io/pwa/` (shows hub)

---

## Quick Deploy Script

Use this to automate deployment:

```bash
#!/bin/bash
# deploy-pwa.sh

REPO_DIR="$HOME/projects/midas82.github.io"
SOURCE_DIR="/tmp/life-guardrail"
DEST_DIR="$REPO_DIR/pwa/life-guardrail"

# Copy files
mkdir -p "$DEST_DIR"
cp "$SOURCE_DIR/index.html" "$DEST_DIR/"
cp "$SOURCE_DIR/sw.js" "$DEST_DIR/"
cp "$SOURCE_DIR/manifest.webmanifest" "$DEST_DIR/"
cp "$SOURCE_DIR/icon-512.png" "$DEST_DIR/"

# Update manifest if needed
sed -i 's|"start_url": "."|"start_url": "/pwa/life-guardrail/."|g' "$DEST_DIR/manifest.webmanifest"

# Commit and push
cd "$REPO_DIR"
git add pwa/life-guardrail/
git commit -m "Update Life Guardrail PWA"
git push origin main

echo "✅ Deployed to GitHub Pages!"
```

Run with:
```bash
chmod +x deploy-pwa.sh
./deploy-pwa.sh
```

---

## After Deployment

### Verify It Works

1. Visit your app URL (e.g., `https://midas82.github.io/pwa/life-guardrail/`)
2. Check browser console (F12) for any errors
3. Verify service worker registered (Application tab)
4. Test offline mode (DevTools → Network → Offline)

### Install as App

- **Desktop**: Click install button in address bar
- **Mobile**: Menu → Install app / Add to home screen

---

## Update in the Future

To update the app:

1. **Make changes** to life-guardrail repo
2. **Commit and push** to GitHub
3. **Update** on GitHub Pages:
```bash
cp -r /tmp/life-guardrail/* ~/projects/midas82.github.io/pwa/life-guardrail/
cd ~/projects/midas82.github.io
git add .
git commit -m "Update Life Guardrail"
git push
```

---

## Troubleshooting

### App not working at subdirectory path?
- Update `start_url` in manifest.webmanifest
- Update `navigator.serviceWorker.register('./sw.js')` path if needed
- Check browser console for 404 errors

### Service Worker not registering?
- Ensure site is HTTPS (GitHub Pages is always HTTPS ✅)
- Check service worker file exists at correct path
- Clear browser cache (Ctrl+Shift+Delete)

### Install button not showing?
- HTTPS required (GitHub Pages provides this ✅)
- Manifest.webmanifest must be valid JSON
- Try different browser

---

## Recommended: Use Option 2 (Hub Page)

This gives you:
- ✅ Clean organization with all PWAs visible
- ✅ Easy to add more PWAs later
- ✅ Professional presentation
- ✅ Single entry point for users
- ✅ Easy to manage multiple apps

---

**Ready to deploy?** 🚀

Let me know which option you prefer and I'll help you set it up!
