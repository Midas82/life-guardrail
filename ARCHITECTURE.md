# Life Guardrail Architecture

## Overview

Life Guardrail is a Progressive Web App (PWA) alarm and reminder system. All code runs client-side with zero cloud dependency. Data persists locally in the browser.

---

## Alarm Types Specification

### 1. Fixed Daily Time
**Triggers**: Same time every day (24-hour cycle)

**Configuration**:
- `time` (HH:MM): Time in 24-hour format
- Example: "09:00" triggers at 9 AM every day

**Next Trigger Logic**:
```
Set next time to HH:MM today
If that time has passed, move to tomorrow HH:MM
```

**Use Cases**: Daily meetings, medication reminders, wake-up alarms

---

### 2. Recurring Interval
**Triggers**: Every N minutes from creation time

**Configuration**:
- `intervalMins` (number): Minutes between triggers
- `created` (ISO datetime): Base time from which intervals are calculated
- `lastTrigger` (ISO datetime): Time of last trigger, used to calculate next

**Next Trigger Logic**:
```
base = lastTrigger || created
next = base + intervalMins * 60000 milliseconds
While next < now, add intervalMins until next > now
```

**Use Cases**: Recurring breaks, periodic notifications, stretch reminders

**Note**: Intervals are counted from creation/last trigger, not wall time. Example:
- Created at 2 PM, interval 45 min → triggers at 2:45, 3:30, 4:15, etc.
- Does not care about actual clock times

---

### 3. Weekly Custom
**Triggers**: Specific days at specific time each week

**Configuration**:
- `time` (HH:MM): Time in 24-hour format
- `days` (array of numbers): Which days of week (1-5 = Mon-Fri, 7 = Sun)
- Example: [1, 3, 5] = Monday, Wednesday, Friday

**Next Trigger Logic**:
```
Set time to HH:MM today
Loop through next 14 days:
  If day-of-week is in days array AND time is not in past:
    Return that date+time
  Otherwise move to next day
```

**Day Numbering**:
- 1 = Monday
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday (rare, for completeness)
- 7 = Sunday

**Use Cases**: Team meetings (Mon/Wed/Fri), class schedules, recurring events

**Note**: Does not skip holidays or special dates. Same time every selected day.

---

### 4. Cyclic (Work/Rest)
**Triggers**: Marks active days in a repeating work/rest cycle

**Configuration**:
- `cycleWork` (days): Length of work period
- `cycleRest` (days): Length of rest period
- `cycleStart` (date): When the cycle began
- `cycleTime` (HH:MM): Time to trigger on work days (default 09:00)
- Example: 4 days work, 2 days rest, starting Jan 1 → cycles through 4-on, 2-off indefinitely

**Next Trigger Logic**:
```
totalCycleDays = cycleWork + cycleRest
daysSinceStart = floor((now - cycleStart) / 86400000)
positionInCycle = daysSinceStart % totalCycleDays

If positionInCycle < cycleWork:
  // We're in a work day, trigger today at cycleTime
  daysToAdd = 0
Else:
  // We're in rest period, wait for next work period
  daysToAdd = totalCycleDays - positionInCycle

next = today + daysToAdd at cycleTime
```

**Use Cases**: Shift rotations, on-call schedules, work cycles (4 days on, 3 days off)

**Implementation Notes**:
- If the calculated time is in the past, pushes to next cycle
- Cycle position is 0-indexed within each cycle period
- Works across year boundaries

---

### 5. Annual Event
**Triggers**: Same date and time every calendar year

**Configuration**:
- `annualDate` (YYYY-MM-DD): Date (month and day only, year is ignored)
- `time` (HH:MM): Time in 24-hour format
- Example: annualDate="12-25", time="08:00" → every December 25 at 8 AM

**Next Trigger Logic**:
```
Set next to MM-DD at HH:MM in current year
If next has passed:
  Roll forward to MM-DD next year at HH:MM
```

**Use Cases**: Birthdays, anniversaries, holidays, yearly events

**Note**: Year stored in annualDate is ignored. Only month and day matter.

---

## Reliability Architecture

### Problem
How do we ensure alarms trigger reliably when:
- Browser tab can be suspended (mobile)
- User can lock device
- System can be under heavy load
- User can be away from device

### Solution: Redundant Notification Methods

**Method 1: System Notifications**
- Uses Notification API
- Works even if app tab is in background
- Requires user to grant permission first
- Fallback: Visual overlay if notification fails

**Method 2: Vibration**
- Uses Vibration API (mobile)
- Works even with audio muted
- Pattern: [500, 200, 500, 200, 500, 200, 1000, 500] milliseconds (buzz-buzz-buzz)
- Repeats every 4 seconds until dismissed
- Fallback: Audio if vibration unavailable

**Method 3: Screen Wake Lock**
- Uses Screen Wake Lock API
- Keeps device screen on during alarm
- Prevents automatic screen off
- User can toggle on/off per alarm
- Fallback: User sees overlay even if dismissed

**Method 4: Audio (Synthesized or Uploaded)**
- Built-in Web Audio API synthesizer with 20+ sounds
- Looping audio until dismissed
- Max volume (gain boost 2.0)
- Fallback: System notification only

### Trigger Detection

**Every 1 second** (`tick()` method):
1. Check if any alarm should trigger
2. Calculate next trigger time for each enabled alarm
3. Check if current time is within 60-second grace period of trigger time
4. Verify alarm hasn't triggered in last 65 seconds (debounce)
5. If all checks pass: trigger alarm

**Grace Period**: ±60 seconds around scheduled trigger time
- Catches alarms even if app was paused and resumed slightly off schedule
- Trade-off: Could trigger up to 60 seconds early/late in rare cases

**Debounce**: 65-second minimum between triggers
- Prevents duplicate triggers if app pauses/resumes near trigger time
- Longer than grace period to ensure clean separation

---

## Data Storage

### LocalStorage (Alarms Configuration)
- Stores JSON serialized alarm objects
- Key: `guardrail_alarms`
- Size: Up to ~5-10 MB per domain
- Format: `[{id, title, type, time, ...}, ...]`
- Persists even after browser close
- Cleared on: Browser clear cache, system factory reset

### IndexedDB (Custom Audio Files)
- Stores audio blobs for custom alarm sounds
- Database: `GuardrailAudioDB`
- Object Store: `sounds`
- Key: `snh_{alarmId}`
- Size: Up to 50+ MB per domain (varies by browser)
- Persists across sessions

### Service Worker (Offline Cache)
- Cache Name: `life-guardrail-v4`
- Caches: index.html, manifest.webmanifest
- Strategy: Cache-first, network fallback
- Activation: Removes old cache versions

---

## Classes

### App
Main application controller

**Properties**:
- `alarms` (array): All alarm objects
- `db` (Database): IndexedDB wrapper
- `reliability` (ReliabilityManager): Notifications, vibration, wake lock
- `now` (Date): Current time, updated every second
- `synth` (SoundSynthesizer): Web Audio API synthesizer

**Methods**:
- `tick()`: Called every 1 second, checks alarms
- `getNextTrigger(alarm, includeGracePeriod)`: Calculates next trigger time
- `checkAlarms()`: Checks each alarm, triggers if needed
- `trigger(alarm)`: Executes when alarm triggers
- `save()`: Persists alarms to localStorage
- `render()`: Renders alarm cards to UI
- `saveForm()`: Validates and saves form input
- `snoozeAlarm()`: Postpones triggered alarm by configured duration
- `exportAlarms()`: Downloads alarms as JSON
- `importAlarms()`: Uploads and restores from JSON backup

### ReliabilityManager
Handles notifications, vibration, and wake lock

**Methods**:
- `requestNotificationPermission()`: Asks user for notification permission
- `showNotification(title, options)`: Shows system notification
- `startVibration()`: Starts vibration pattern
- `stopVibration()`: Stops vibration
- `requestWakeLock()`: Requests screen wake lock
- `releaseWakeLock()`: Releases wake lock
- `toggleWakeLock()`: Toggle on/off

### Database
IndexedDB wrapper for custom audio storage

**Methods**:
- `init()`: Opens/initializes database
- `saveSound(id, blob)`: Stores audio blob
- `getSound(id)`: Retrieves audio blob

### SoundSynthesizer
Web Audio API sound generation

**Methods**:
- `init()`: Initializes AudioContext
- `play(type, loop)`: Plays synthesized sound
- `preview(type)`: Plays 2-second preview
- `stop()`: Stops audio

**Sound Types** (20+):
- `beeps`, `cyberpunk`, `zen`, `industrial`, `digital`
- `sonar`, `klaxon`, `chiptune`, `pulse`, `metalchime`
- `synthstab`, `heavy_industrial`, `cosmic_void`
- `emergency_broadcast`, `cyber_alert`, `data_stream`
- `air_raid`, `ships_bell`, `police_klaxon`, `tornado`, `nuclear`

---

## State Transitions

### Alarm Lifecycle

```
Create
  ↓
Save (localStorage)
  ↓
Enabled (toggle on)
  ↓
Check Every Second (getNextTrigger → checkAlarms)
  ↓
Trigger (if time matches + not too recent)
  ↓
Show Overlay + Notifications + Vibration + Audio
  ↓
User Action
  ├─ Dismiss → Stop all effects
  └─ Snooze → Update snoozeUntil, restart cycle
  ↓
Delete (user action)
  ↓
Remove from localStorage
```

### Snooze State

When snoozed:
```
{
  ...alarmData,
  snoozeUntil: 1707200400000  // Milliseconds until snooze expires
}
```

During snooze, `getNextTrigger()` returns the snooze time instead of normal schedule.
Once snooze time passes, alarm returns to normal schedule.

---

## Key Design Decisions

### Why Grace Period?
Mobile apps can be suspended. If exact time is 9:00 and app resumes at 9:00:30, we still want to trigger. Grace period catches these cases.

### Why Debounce?
If app pauses at 8:59:55 and resumes at 9:00:05, we don't want to trigger twice. 65-second debounce ensures one trigger per cycle.

### Why Local Storage Only?
Privacy, reliability, offline support. No server dependency = no single point of failure.

### Why Synthesized Audio?
- Smaller file size (no audio files to download)
- Works offline
- Customizable
- Can be modified without new app deployment

### Why Multiple Notification Methods?
Different devices, OS, and configurations support different APIs. Redundancy ensures at least one works.

---

## Limitations & Known Issues

1. **No Time Zone Support** — All times in local timezone
2. **No Recurring Exceptions** — Can't skip holidays
3. **No Cloud Sync** — Alarms don't sync across devices
4. **No Geolocation** — Can't trigger based on location
5. **No Siri/Google Assistant** — Voice control not integrated
6. **Grace Period Trade-off** — Can trigger up to 60s off schedule
7. **No Recurring Rules** — No iCal/RFC 5545 support
8. **Single Browser** — Alarms won't work in multiple browsers simultaneously

---

## Future Improvements

- [ ] Cloud sync (optional, encrypted)
- [ ] Exception handling (skip dates)
- [ ] Recurring rule engine (RFC 5545)
- [ ] Geolocation triggers
- [ ] Multiple snooze options
- [ ] Statistics/analytics
- [ ] Recurring pattern builder UI
- [ ] Voice activation
- [ ] Cross-device sync
- [ ] Time zone support
- [ ] Calendar integration

---

## Testing

### Critical Code Paths to Test

1. **getNextTrigger()** — All alarm types, edge cases (midnight, year boundary, etc.)
2. **checkAlarms()** — Grace period, debounce, multiple alarms
3. **trigger()** — Notifications, vibration, audio, overlay
4. **Snooze** — Correct snooze duration applied
5. **Import/Export** — Data integrity preserved

### Test Scenarios

- [ ] Alarm triggers within grace period
- [ ] Alarm doesn't trigger twice in 65 seconds
- [ ] Fixed alarms trigger every day
- [ ] Interval alarms calculate correctly from lastTrigger
- [ ] Weekly alarms skip non-selected days
- [ ] Cyclic alarms follow work/rest pattern
- [ ] Annual alarms trigger on correct date
- [ ] Custom audio files load and play
- [ ] Notifications work in background
- [ ] Vibration works with sound off
- [ ] Snooze duration is configurable
- [ ] Export preserves all alarm data
- [ ] Import validates and restores correctly
- [ ] Service Worker caches properly
- [ ] Offline mode works

---

## Deployment

### Requirements
- HTTPS (required for PWA, notifications, wake lock)
- Static file serving
- No build tools required (single HTML file)

### Files to Deploy
- `index.html` — Main app (2KB HTML + CSS + JS combined)
- `sw.js` — Service worker for offline support (59 bytes)
- `manifest.webmanifest` — PWA manifest (not required in code yet)
- `icon-512.png` — App icon (optional, for home screen)

### CDN-Friendly
All resources are static. Can be served from any CDN with HTTPS.

---

*Last Updated: 2026-02-07*
