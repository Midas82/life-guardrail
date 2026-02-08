# 🖥️ Install Life Guardrail as Desktop App

## Option 1: PWA Installation (Recommended - No Build Required)

This is the easiest method. PWAs work as native-like apps on all platforms.

### Windows 10/11
1. Open the Life Guardrail web app in **Edge** or **Chrome**
2. Click the **⊕ Install** button (top-right address bar)
   - Or click **⋯** menu → **Apps** → **Install this site as an app**
3. Follow prompts
4. App appears in Start Menu & taskbar
5. Runs as standalone window
6. Works offline

**Result**: Desktop shortcut, Start Menu entry, native-like experience

### macOS
1. Open in **Safari** or **Chrome**
2. **Safari**: File → Add to Dock
3. **Chrome**: Click the **⊕** button or Menu → Install app
4. App opens as standalone window
5. Available in Applications folder

**Result**: App in Dock, Cmd+Space spotlight searchable

### Linux
1. Open in **Chrome**, **Edge**, or **Firefox** (recent versions)
2. Click **⋯** menu → **Create shortcut**
3. Check "Open as window"
4. Click Create
5. App icon appears on desktop

**Result**: Desktop icon, taskbar entry

---

## ✅ Features as Desktop App

When installed as PWA:
- ✅ Runs offline (service worker)
- ✅ No browser chrome (address bar hidden)
- ✅ Appears in app switcher (Alt+Tab)
- ✅ Works in background
- ✅ Push notifications work
- ✅ Full screen capable
- ✅ Separate from browser

---

## Option 2: Tauri (Advanced - Native Wrapper)

If you want a "truly native" feel with smaller footprint.

### What is Tauri?
- Desktop app framework (like Electron but lighter)
- Wraps web app in native window
- ~2MB download vs ~150MB for Electron
- Windows, macOS, Linux support

### Setup

```bash
# Install dependencies
cargo install tauri-cli
npm init tauri-app

# Or add to existing project
cargo tauri init

# Build
cargo tauri build

# Result: Native installers for all platforms
```

### Result
- Native .exe (Windows)
- .app (macOS)
- .AppImage or .deb (Linux)
- Smaller download
- Native performance

---

## Option 3: Electron (Advanced - Cross-Platform)

If you want maximum control and cross-platform support.

```bash
npm install electron

# Create main.js to wrap the web app
# Build distributable installers
npm run build
```

### Result
- Most flexibility
- Largest download (~150MB)
- Best for complex needs

---

## App Icon Setup ✅

### Current Icon File
- **Location**: `icon-512.png` (512×512 pixels)
- **Format**: PNG with transparency
- **Status**: ✅ Already configured

### Icon Sizing (All Platforms)

Current icon works for:
- ✅ Windows taskbar (32×32)
- ✅ macOS dock (256×256)
- ✅ Linux desktop (64×64, 128×128)
- ✅ Web favicon
- ✅ Home screen shortcut

### Optional: Add More Sizes

If you want to optimize for all devices:

```bash
# Create these sizes from icon-512.png:
- icon-192.png (Android home screen)
- icon-256.png (Optimized desktop)
- icon-384.png (Intermediate)
```

Manifest already configured for multiple sizes (see `manifest.webmanifest`).

---

## Quick Comparison

| Method | Effort | Size | Offline | Native Feel |
|--------|--------|------|---------|-------------|
| **PWA (Recommended)** | 2 clicks | 0MB | ✅ Yes | 8/10 |
| **Tauri** | Medium | 2-5MB | ✅ Yes | 10/10 |
| **Electron** | Hard | 150MB | ✅ Yes | 10/10 |

---

## Recommended: PWA Installation

### Why PWA is Best for Life Guardrail

1. **No Installation**: Just visit and click Install
2. **Works Offline**: Service Worker caches everything
3. **Native-like**: Runs in its own window
4. **Cross-Platform**: Windows/Mac/Linux from one codebase
5. **Auto-Updates**: Always latest version
6. **Privacy**: All data local, no analytics
7. **No Build Step**: Deploy as-is

### How Your Users Install It

**Windows**:
1. Open app in Chrome/Edge
2. Click **⊕ Install** button
3. Done! (2 seconds)

**Mac**:
1. Open in Safari
2. File → Add to Dock
3. Done! (2 seconds)

**Android**:
1. Chrome → Menu → Install app
2. Done! (2 seconds)

**iOS**:
1. Safari → Share → Add to Home Screen
2. Done! (3 seconds)

---

## Manifest Configuration ✅

Your `manifest.webmanifest` is already properly configured:

```json
{
    "short_name": "Guardrail",
    "name": "Life Guardrail",
    "start_url": ".",
    "display": "standalone",        // No browser UI
    "theme_color": "#000000",
    "background_color": "#000000",
    "icons": [
        {
            "src": "icon-512.png",
            "type": "image/png",
            "sizes": "192x192 512x512",
            "purpose": "any maskable"
        }
    ]
}
```

✅ Icon properly configured
✅ Standalone mode enabled
✅ Theme colors set
✅ App name customizable

---

## Next Steps

### For PWA (Recommended)
1. ✅ Deploy app to HTTPS server
2. Users visit URL
3. Users click Install (browser prompts)
4. Done!

### For Tauri/Electron
1. Install framework
2. Wrap this HTML app
3. Build installers
4. Distribute .exe / .app / .deb files

---

## Troubleshooting

### "Install button not appearing"
- **Solution**: Ensure HTTPS (PWAs require HTTPS)
- **Alternative**: Use http://localhost for local testing

### "Notifications not working in desktop app"
- **Solution**: Grant notification permission when prompted
- **Windows**: Check Settings → Apps → Notifications

### "App won't work offline"
- **Solution**: Service Worker needs HTTPS
- **Check**: DevTools → Application → Service Worker → Status

---

## File Locations After Installation

### Windows
- Start Menu: `%APPDATA%\Microsoft\Windows\Start Menu\Programs\`
- Local Data: `%APPDATA%\Local\midas82\life-guardrail\`

### macOS
- Applications: `/Applications/`
- App Data: `~/Library/Application Support/com.midas82.guardrail/`

### Linux
- Desktop: `~/.local/share/applications/`
- App Data: `~/.config/life-guardrail/`

---

## Your Current Setup

✅ **Already PWA-Ready**
- Service worker ✅
- Manifest ✅
- Icon ✅
- Responsive design ✅
- Offline support ✅

**Users can install right now!**

Just deploy to HTTPS server and they can install as desktop app.

---

*Choose PWA installation (simplest) or Tauri (most native) depending on your needs.*
