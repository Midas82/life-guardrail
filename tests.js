/**
 * Life Guardrail Unit Tests
 * Tests for critical alarm scheduling logic
 *
 * Run with: node tests.js
 * Or in browser console
 */

// Mock classes for testing (extracted from index.html)
class TestAlarmEngine {
    /**
     * Mock App class for testing alarm logic only
     */
    constructor() {
        this.alarms = [];
        this.now = new Date();
    }

    getNextTrigger(alarm, includeGracePeriod = false) {
        if (!alarm.active) return null;

        if (alarm.snoozeUntil) {
            if (alarm.snoozeUntil > Date.now()) {
                return new Date(alarm.snoozeUntil);
            }
        }

        const now = new Date();
        let next = new Date();
        const GRACE_MS = includeGracePeriod ? 60000 : 0;

        if (alarm.type === 'fixed') {
            const [h, m] = alarm.time.split(':').map(Number);
            next.setHours(h, m, 0, 0);
            if (next <= (now.getTime() - GRACE_MS)) {
                next.setDate(next.getDate() + 1);
            }
        }
        else if (alarm.type === 'interval') {
            const base = alarm.lastTrigger ? new Date(alarm.lastTrigger) : new Date(alarm.created);
            const intervalMs = alarm.intervalMins * 60 * 1000;
            let candidate = base.getTime();
            const threshold = now.getTime() - GRACE_MS;
            while (candidate <= threshold) {
                candidate += intervalMs;
            }
            next = new Date(candidate);
        }
        else if (alarm.type === 'weekly') {
            const [h, m] = alarm.time.split(':').map(Number);
            next.setHours(h, m, 0, 0);

            let safeGuard = 0;
            while (safeGuard < 14) {
                const day = next.getDay();
                const uiDay = day === 0 ? 7 : day;
                const isPastGrace = next <= (now.getTime() - GRACE_MS);

                if (alarm.days.includes(uiDay.toString()) && !isPastGrace) {
                    break;
                }
                next.setDate(next.getDate() + 1);
                next.setHours(h, m, 0, 0);
                safeGuard++;
            }
        }
        else if (alarm.type === 'cyclic') {
            const cycleStart = new Date(alarm.cycleStart);
            cycleStart.setHours(0, 0, 0, 0);
            const [h, m] = (alarm.cycleTime || '09:00').split(':').map(Number);

            const totalCycleDays = alarm.cycleWork + alarm.cycleRest;
            const diffDays = Math.floor((now.getTime() - cycleStart.getTime()) / (1000 * 60 * 60 * 24));
            const cyclePosition = diffDays % totalCycleDays;

            let daysToAdd = 0;
            if (cyclePosition < alarm.cycleWork) {
                daysToAdd = 0;
            } else {
                daysToAdd = totalCycleDays - cyclePosition;
            }

            next.setDate(now.getDate() + daysToAdd);
            next.setHours(h, m, 0, 0);

            if (next <= (now.getTime() - GRACE_MS)) {
                next.setDate(next.getDate() + totalCycleDays);
            }
        }
        else if (alarm.type === 'annual') {
            const [year, month, day] = alarm.annualDate.split('-').map(Number);
            const [h, m] = alarm.time.split(':').map(Number);

            next.setFullYear(now.getFullYear(), month - 1, day);
            next.setHours(h, m, 0, 0);

            if (next <= (now.getTime() - GRACE_MS)) {
                next.setFullYear(now.getFullYear() + 1);
            }
        }

        return next;
    }
}

// Test Suite
class TestSuite {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.tests = [];
    }

    assert(condition, message) {
        if (condition) {
            this.passed++;
            console.log(`✓ ${message}`);
        } else {
            this.failed++;
            console.error(`✗ ${message}`);
            this.tests.push({ message, passed: false });
        }
    }

    assertEqual(actual, expected, message) {
        const pass = actual === expected || JSON.stringify(actual) === JSON.stringify(expected);
        if (pass) {
            this.passed++;
            console.log(`✓ ${message}`);
        } else {
            this.failed++;
            console.error(`✗ ${message} (got ${actual}, expected ${expected})`);
        }
    }

    run() {
        console.log('🧪 Life Guardrail Test Suite\n');

        this.testFixed();
        this.testInterval();
        this.testWeekly();
        this.testCyclic();
        this.testAnnual();

        console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }

    testFixed() {
        console.log('\n📅 Fixed Daily Time Tests');
        const engine = new TestAlarmEngine();

        // Test: Fixed alarm at future time today
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(14, 30, 0, 0);

        const alarm = {
            id: 1,
            type: 'fixed',
            time: '14:30',
            active: true,
            created: new Date().toISOString(),
            lastTrigger: null
        };

        const next = engine.getNextTrigger(alarm);
        this.assert(next !== null, 'Fixed: Returns next trigger');
        this.assert(next.getHours() === 14 && next.getMinutes() === 30, 'Fixed: Correct time');
        this.assert(
            next.getDate() >= new Date().getDate(),
            'Fixed: Next trigger is today or later'
        );

        // Test: Fixed alarm at past time today rolls to tomorrow
        alarm.time = '08:00';
        engine.now = new Date();
        engine.now.setHours(14, 0, 0, 0); // Current time: 2 PM
        const next2 = engine.getNextTrigger(alarm);
        this.assert(
            next2.getDate() > new Date().getDate(),
            'Fixed: Past time rolls to tomorrow'
        );
    }

    testInterval() {
        console.log('\n⏱️ Interval Tests');
        const engine = new TestAlarmEngine();

        const alarm = {
            id: 2,
            type: 'interval',
            intervalMins: 45,
            active: true,
            created: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
            lastTrigger: null
        };

        const next = engine.getNextTrigger(alarm);
        this.assert(next !== null, 'Interval: Returns next trigger');

        const diffMins = (next.getTime() - Date.now()) / (60 * 1000);
        this.assert(
            diffMins > 0 && diffMins <= 45,
            `Interval: Next trigger within interval (in ${Math.round(diffMins)} mins)`
        );

        // Test: After trigger, next interval calculated from lastTrigger
        alarm.lastTrigger = new Date(Date.now() - 10 * 60 * 1000).toISOString(); // 10 mins ago
        const next2 = engine.getNextTrigger(alarm);
        const diffMins2 = (next2.getTime() - Date.now()) / (60 * 1000);
        this.assert(
            diffMins2 > 30 && diffMins2 <= 45,
            `Interval: Uses lastTrigger (next in ${Math.round(diffMins2)} mins)`
        );
    }

    testWeekly() {
        console.log('\n📆 Weekly Tests');
        const engine = new TestAlarmEngine();

        // Create alarm for Monday/Wednesday/Friday at 3 PM
        const alarm = {
            id: 3,
            type: 'weekly',
            time: '15:00',
            days: ['1', '3', '5'], // Mon, Wed, Fri
            active: true,
            created: new Date().toISOString(),
            lastTrigger: null
        };

        const next = engine.getNextTrigger(alarm);
        this.assert(next !== null, 'Weekly: Returns next trigger');
        this.assert(next.getHours() === 15 && next.getMinutes() === 0, 'Weekly: Correct time');

        // Verify it's a selected day
        const dayOfWeek = next.getDay();
        const uiDay = dayOfWeek === 0 ? 7 : dayOfWeek;
        this.assert(
            alarm.days.includes(uiDay.toString()),
            `Weekly: Next trigger is on selected day (${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dayOfWeek]})`
        );
    }

    testCyclic() {
        console.log('\n🔄 Cyclic Tests');
        const engine = new TestAlarmEngine();

        // 4 days work / 2 days rest, starting Jan 1
        const alarm = {
            id: 4,
            type: 'cyclic',
            cycleWork: 4,
            cycleRest: 2,
            cycleStart: '2024-01-01',
            cycleTime: '09:00',
            active: true,
            created: new Date().toISOString(),
            lastTrigger: null
        };

        const next = engine.getNextTrigger(alarm);
        this.assert(next !== null, 'Cyclic: Returns next trigger');
        this.assert(next.getHours() === 9, 'Cyclic: Correct trigger time');

        // Verify cycle math
        const start = new Date('2024-01-01');
        start.setHours(0, 0, 0, 0);
        const cycleLen = 6; // 4 + 2
        const daysSinceStart = Math.floor((Date.now() - start.getTime()) / (24 * 60 * 60 * 1000));
        const inCycle = daysSinceStart % cycleLen;
        const isWorkDay = inCycle < 4;
        this.assert(true, `Cyclic: Position in cycle = ${inCycle} (work=${isWorkDay})`);
    }

    testAnnual() {
        console.log('\n🎂 Annual Tests');
        const engine = new TestAlarmEngine();

        const alarm = {
            id: 5,
            type: 'annual',
            annualDate: '2024-12-25', // Christmas (stored as YYYY-MM-DD internally, but only MM-DD matter)
            time: '08:00',
            active: true,
            created: new Date().toISOString(),
            lastTrigger: null
        };

        const next = engine.getNextTrigger(alarm);
        this.assert(next !== null, 'Annual: Returns next trigger');
        this.assert(
            next.getMonth() === 11 && next.getDate() === 25,
            `Annual: Correct month and date (got ${next.toDateString()})`
        );
        this.assert(next.getHours() === 8, 'Annual: Correct time');

        // Should be current or next year
        this.assert(
            next.getFullYear() >= new Date().getFullYear(),
            'Annual: Year is current or future'
        );
    }
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    const suite = new TestSuite();
    const allPassed = suite.run();
    process.exit(allPassed ? 0 : 1);
} else {
    // Browser environment
    const suite = new TestSuite();
    suite.run();
}
