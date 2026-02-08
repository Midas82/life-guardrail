# Life Guardrail 🔔

**A Progressive Web App for managing schedules, habits, and recurring reminders—offline-first, reliable, and beautiful.**

Keep yourself accountable to your commitments with guardrails that never let you slip through the cracks.

---

## ✨ Features

### 📅 5 Flexible Alarm Types

- **Fixed Daily Time** — Same time every day (e.g., 9 AM standup)
- **Recurring Interval** — Every N minutes (e.g., "stretch break every 45m")
- **Weekly Custom** — Specific days at a specific time (e.g., Mon/Wed/Fri at 3 PM)
- **Cyclic (Work/Rest)** — Enforces work/rest cycles (e.g., 4 days on, 2 days off)
- **Annual Event** — Yearly reminder (e.g., birthday reminder, anniversary)

### 🔊 20+ Alarm Sounds

Choose from a curated library of synthesized sounds:
- **Alerts**: Cyberpunk Glitch, Digital Alarm, Klaxon, Police Siren
- **Ambient**: Zen Gong, Metal Chime, Pulse Drone, Ship's Bell
- **Emergency**: Air Raid Siren, Tornado Warning, Nuclear Alert
- **Tech**: Data Stream, Sonar Ping, Industrial Clank
- **Custom**: Upload your own audio file (MP3, WAV, etc.)

### 🎯 Reliability Features

**Guaranteed Alarms** — Multiple notification methods ensure you never miss it:
- 🔔 **System Notifications** — Works even if app is in background
- 📳 **Vibration** — Works with sound off (great for silent mode)
- 🔆 **Screen Wake Lock** — Keeps screen on during alarm (mobile)
- 🔊 **Loud Audio** — Built-in sound synthesis with volume boost

**Visual Feedback**:
- Real-time countdown timer on each alarm card
- Next trigger time displays prominently
- Progress bar showing time until alarm
- Full-screen overlay when alarm triggers

### 🎨 Customization

- **5 Accent Colors** — Gold, Cyan, Magenta, Lime, Purple (tap theme button)
- **Snooze Function** — 10-minute snooze on any triggered alarm
- **Toggle Alarms** — Temporarily disable without deleting
- **Custom Sounds** — Record or upload your own audio

### 📱 Full PWA Support

- **Offline-First** — Works completely offline after first load
- **Installable** — Add to home screen on iOS/Android or Windows/Mac
- **Persistent Data** — All alarms saved locally in browser
- **No Account Needed** — Zero cloud dependency, 100% privacy

### 🔒 Privacy-First

- ✅ All data stored locally on your device
- ✅ No cloud sync, no servers, no tracking
- ✅ No ads, no analytics, no third-party code
- ✅ Source code is open for inspection

---

## 🚀 Getting Started

### Quick Start (No Installation)

1. **Open in Browser**: Visit [life-guardrail.midas82.com](https://midas82.github.io/life-guardrail/) (or deploy your own copy)
2. **Create First Alarm**: Tap the **+** button
3. **Set Details**: Title, type, time, sound, and other options
4. **Save**: Tap "Save Guardrail"
5. **Done!** Alarm will trigger at the scheduled time

### Install as App (Recommended)

#### iOS (Safari)
1. Open app in Safari browser
2. Tap **Share** (bottom right)
3. Tap **Add to Home Screen**
4. Name it "Life Guardrail"
5. Tap **Add**

#### Android (Chrome/Edge)
1. Open app in Chrome or Edge
2. Tap the **⋮** menu (top right)
3. Tap **Install app** or **Add to Home Screen**
4. Follow prompts

#### Windows/Mac/Linux (Desktop)
1. Open in Chrome, Edge, or other Chromium browser
2. Click **⌘+Create shortcut** (Mac) or **⋮ > Install app** (Windows)
3. App installs to taskbar/dock

---

## 📖 User Guide

### Creating Alarms

#### 1. Fixed Daily Time
Alarm triggers at the same time every day.

**Example**: Morning standup at 9:00 AM
- Type: `Fixed Daily Time`
- Time: `09:00`
- Sound: `Digital Alarm`
- Countdown: ✓

#### 2. Recurring Interval
Alarm repeats every N minutes from when it was created.

**Example**: Stretch break every 45 minutes
- Type: `Recurring Interval`
- Interval: `45` (minutes)
- Sound: `Zen Gong`
- Countdown: ✓

#### 3. Weekly Custom
Same time on selected days of the week.

**Example**: Team meetings Mon/Wed/Fri at 2 PM
- Type: `Weekly Custom`
- Time: `14:00`
- Days: Mon, Wed, Fri (check boxes)
- Sound: `Alert Klaxon`
- Countdown: ✓

#### 4. Cyclic (Work/Rest)
Creates a repeating cycle: X days working, Y days resting. Useful for shift patterns or productivity cycles.

**Example**: 4 days on, 2 days off starting Jan 1
- Type: `Cyclic (Work/Rest)`
- Work Days: `4`
- Rest Days: `2`
- Cycle Start: `2024-01-01`
- Sound: `Data Stream`
- Countdown: ✓ (shows days in cycle)

Note: Currently triggers at midnight on work days.

#### 5. Annual Event
Same date every year, useful for birthdays, anniversaries, holidays.

**Example**: Birthday reminder Dec 25 at 8 AM
- Type: `Annual Event`
- Date: `12-25` (month-day, no year)
- Time: `08:00`
- Sound: `Ship's Bell`
- Countdown: ✓

### Features by Alarm Card

**Toggle Switch** — Quickly enable/disable without deleting
**🔔 Next Trigger Time** — When alarm will next trigger
**⏱️ Countdown** — Time remaining (if enabled)
**✏️ Edit** — Modify the alarm
**🗑️ Delete** — Remove permanently (confirms first)

### Sound Options

**System Beep** — Simple beep (default fallback)

**Synth Sounds** (synthesized):
- Cyberpunk Glitch, Zen Gong, Industrial Clank, Digital Alarm
- Sonar Ping, Klaxon, Chiptune Arp, Pulse Drone
- Metal Chime, Synth Stab, Heavy Industrial, Cosmic Void
- Emergency Broadcast, Cyber Alert, Data Stream
- Air Raid Siren, Ship's Bell, Police Klaxon, Tornado Warning, Nuclear Alert

**Custom Upload**:
1. Select **Custom Upload...** from sound dropdown
2. Tap **📂 Choose Audio File**
3. Select an audio file (MP3, WAV, OGG, M4A, etc.)
4. File name displays when selected
5. Save alarm with custom sound

**Preview Sound** — Tap 🔊 button to hear 2-second preview before saving

### Screen Wake Lock (🔆 Button)

Prevents screen from turning off during alarms.

- On mobile, screen will stay awake while alarm is active
- Useful if you want visual + audio alarm confirmation
- Auto-releases when alarm dismissed
- Click again to toggle on/off

### Snooze Feature

When alarm triggers:
1. Full-screen overlay appears
2. Tap **DISMISS** to stop immediately
3. Tap **Snooze 10m** to delay 10 minutes
4. Alarm will trigger again in 10 minutes

### Countdown Bar

Optional progress bar below alarm time shows:
- **Visual**: Bar fills as alarm approaches
- **Text**: Time remaining (e.g., "2h 30m 45s")
- **Max Duration**:
  - Fixed: 24 hours
  - Interval: Your interval duration
  - Weekly: 7 days
  - Cyclic: Full cycle duration
  - Annual: 365 days

Toggle with "Show Countdown Bar?" checkbox.

---

## ⚙️ How It Works

### Reliability Architecture

**Problem**: Browser tabs can be suspended, timers lost, notifications ignored. How do we ensure alarms work?

**Solution**: Multiple redundant methods

1. **System Notification API** — Works in background even if app tab is closed
2. **Vibration API** — Works with sound off (Android/iOS)
3. **Screen Wake Lock** — Keeps display on to ensure you see it
4. **Regular Polling** — App checks every 1 second if alarm should trigger

If one method fails, others provide backup. Example: notification failed? Vibration will catch it. No vibration? Screen wake lock ensures you see the overlay.

### Data Storage

**Local Storage** — Alarm configurations
- Stored as JSON in browser `localStorage`
- Persists even after browser close
- Limit: ~5-10 MB per domain
- Survives browser updates, not factory reset

**IndexedDB** — Custom audio files
- Large files (audio blobs) stored separately
- More efficient than localStorage for binary data
- Same persistence as localStorage
- Limit: 50+ MB per domain (varies by browser)

**No Cloud Storage** — All data stays on your device. Switching devices? Export as JSON backup (see Advanced section).

### Service Worker (Offline Mode)

- **Install**: Caches app HTML, CSS, JS on first load
- **Activate**: Removes old cache versions
- **Fetch**: Serves from cache first, network second
- **Result**: App works completely offline after first load

---

## 📱 Browser Support

### Full Support ✅
- **Chrome 80+** — All features including notifications, vibration, wake lock
- **Edge 80+** — Same as Chrome
- **Firefox 80+** — All features except wake lock (buggy implementation)
- **Safari 16.4+** (iOS/macOS) — All features

### Partial Support ⚠️
- **Firefox (Desktop)** — Missing wake lock API
- **Older Safari** — Some notification features may not work

### Minimal Support ❌
- **IE11** — Not supported (ES6 required)
- **Opera Mini** — Not supported (limited JS support)

---

## 🔧 Advanced Usage

### Export & Backup (Manual for now)

To backup alarms:
1. Open browser dev tools (`F12`)
2. Go to **Console** tab
3. Run:
   ```javascript
   copy(JSON.stringify(localStorage.guardrail_alarms, null, 2))
   ```
4. Paste into a text file, save as `backup.json`

To restore:
1. Open dev tools console
2. Run:
   ```javascript
   localStorage.setItem('guardrail_alarms', `[paste your JSON here]`)
   location.reload()
   ```

**Note**: Custom audio files stored in IndexedDB are not currently exportable. We recommend re-uploading them after restore.

### Custom Domain Setup

To host your own copy:
1. Fork/clone the repository
2. Upload files to your web server:
   - `index.html`
   - `sw.js` (service worker)
   - `manifest.webmanifest` (PWA manifest)
3. Ensure server serves as HTTPS (required for PWA)
4. Access via your domain

---

## ⚠️ Known Limitations

1. **Browser Dependency** — App only works if browser is running. Phone sleep/shutdown = app not running.
2. **Suspend Risk** — Browser tab can be suspended on mobile if memory is low.
3. **Notification Delays** — Some Android devices delay notifications by seconds.
4. **No Recurring Across Years** — Weekly/daily alarms don't understand holidays or exceptions.
5. **Custom Audio Size** — Large audio files (>5MB) may exceed IndexedDB quota.
6. **No Cloud Sync** — Alarms don't sync across devices.
7. **Grace Period** — Alarms check every 1 second, so timing can be 0-1 seconds inaccurate.

### Workarounds

- **Shutdown survival**: Keep browser running on a dedicated device, or use system-level alarms
- **Notification reliability**: Pin the app, request notification permission, keep app active
- **Multi-device**: Export/import backups manually
- **Large audio files**: Use compressed formats or split into multiple smaller files

---

## 🐛 Troubleshooting

### Alarm Doesn't Trigger

**Check**:
1. Is alarm enabled? (toggle switch on card)
2. Sound selected? (should be green/visible)
3. Countdown timer showing? (verifies app is running)
4. Phone not in extreme power-saving mode?

**Debug**:
- Open browser console (`F12`)
- Look for errors (red text)
- Enable "Notification permission" if prompted

### Custom Sound Won't Play

1. Check file format (MP3, WAV, OGG supported)
2. Check file size (under 5 MB recommended)
3. Try different audio file
4. Check notification permission is granted

### Notification Not Appearing

1. Check notification permission (ask when app starts)
2. Android: Check "Do Not Disturb" settings
3. iOS: Check notification settings in phone Settings
4. Browser: Check notification permission in browser settings

### Alarm Triggers Multiple Times

This can happen if:
- App was paused/reopened near alarm time
- Browser crashed and recovered
- System clock changed

Try:
- Clear browser cache and reload
- Create new alarm instead of editing
- Restart browser

---

## 🛠️ Development

### Running Locally

```bash
# Clone repository
git clone https://github.com/midas82/life-guardrail.git
cd life-guardrail

# Serve locally (requires Python 3 or Node.js)
python3 -m http.server 8000
# or
npx http-server

# Open http://localhost:8000
```

### Project Structure

```
life-guardrail/
├── index.html           # Main app (HTML + CSS + JS combined)
├── sw.js                # Service Worker (offline caching)
├── manifest.webmanifest # PWA manifest (app metadata)
├── icon-512.png         # App icon (512x512)
└── README.md            # This file
```

### Classes

- **App** — Main controller, alarm logic, render loop
- **ReliabilityManager** — Notifications, vibration, wake lock
- **Database** — IndexedDB wrapper for custom audio
- **SoundSynthesizer** — Web Audio API sound generation

### Future Improvements

- [ ] Refactor to TypeScript/modules
- [ ] Unit tests for scheduling logic
- [ ] Export/import in UI
- [ ] Cloud sync (optional, encrypted)
- [ ] Recurring exceptions (holidays)
- [ ] Geolocation-based alarms
- [ ] Multiple snooze durations
- [ ] Keyboard shortcuts
- [ ] Dark/light theme toggle
- [ ] Localization (i18n)

---

## 📋 License

MIT License — Use freely, modify, share.

---

## 🤝 Contributing

Found a bug? Want a feature? Have a question?

[Report an issue on GitHub](https://github.com/midas82/life-guardrail/issues)

Include:
- What you were doing
- What happened
- What you expected
- Browser and OS version
- Console errors (if any)

---

## 💬 Questions?

**Q: Will my alarms sync across devices?**
A: Not yet. Data is local to each device. We're exploring optional encrypted cloud sync.

**Q: Can I use this on a shared device?**
A: Yes, but alarms are per-browser. Each user should use their own browser profile.

**Q: What if I need maximum reliability?**
A: Pair with system-level alarms. Run a dedicated browser tab on a device that stays on.

**Q: Can you add feature X?**
A: Maybe! Open an issue and let's discuss. Priority goes to reliability and usability.

---

**Made with ⚡ for productivity warriors. Guard your time, guard your life.**

---

*Last updated: 2026-02-07*
