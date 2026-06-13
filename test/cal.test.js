const test = require('node:test');
const assert = require('node:assert/strict');
const { buildCalendarUrl, calendarTimestamp } = require('../cal.js');

test('calendarTimestamp formats date as YYYYMMDDTHHMMSS', () => {
  const d = new Date('2026-06-21T19:05:00');
  assert.equal(calendarTimestamp(d), '20260621T190500');
});

test('buildCalendarUrl creates expected calendar URL params', () => {
  const meetup = {
    start: '2026-06-21 19:00',
    timezone: 'America/New_York',
    duration_hours: 3,
    venue: {
      name: 'Time Out Market Boston',
      address: '401 Park Dr, Boston, MA 02215'
    },
    discussion_url: 'https://osdc.zulipchat.com/#narrow/channel/406743-boston/topic/2026-06.20meetup/near/599135248'
  };

  const url = buildCalendarUrl(meetup);
  assert.ok(url, 'URL should be generated');

  const parsed = new URL(url);
  assert.equal(parsed.origin + parsed.pathname, 'https://calendar.google.com/calendar/render');

  const params = parsed.searchParams;
  assert.equal(params.get('action'), 'TEMPLATE');
  assert.equal(params.get('text'), 'Boston Open Dev Meetup');
  assert.equal(params.get('dates'), '20260621T190000/20260621T220000');
  assert.equal(params.get('ctz'), 'America/New_York');
  assert.equal(params.get('location'), 'Time Out Market Boston, 401 Park Dr, Boston, MA 02215');
  assert.equal(
    params.get('details'),
    'Discuss: Zulip thread: https://osdc.zulipchat.com/#narrow/channel/406743-boston/topic/2026-06.20meetup/near/599135248\n\nhttps://bostonopen.dev'
  );
});

test('buildCalendarUrl returns null for invalid date input', () => {
  const meetup = {
    start: 'not-a-date',
    timezone: 'America/New_York',
    duration_hours: 3,
    venue: { name: 'X', address: 'Y' },
    discussion_url: 'https://example.com'
  };

  assert.equal(buildCalendarUrl(meetup), null);
});
