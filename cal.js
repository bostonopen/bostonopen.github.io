function calendarTimestamp(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate())
    ].join("") + "T" + [
        pad(date.getHours()),
        pad(date.getMinutes()),
        "00"
    ].join("");
}

function buildCalendarUrl(meetup) {
    const start = new Date(meetup.start.replace(" ", "T"));
    if (Number.isNaN(start.getTime())) {
        return null;
    }

    const durationHours = Number(meetup.duration_hours);
    const durationMs = (Number.isFinite(durationHours) && durationHours > 0 ? durationHours : 2) * 60 * 60 * 1000;
    const end = new Date(start.getTime() + durationMs);
    const details = "Discuss: Zulip thread: " + meetup.discussion_url + "\n\nhttps://bostonopen.dev";
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: "Boston Open Dev Meetup",
        dates: calendarTimestamp(start) + "/" + calendarTimestamp(end),
        ctz: meetup.timezone,
        location: meetup.venue.name + ", " + meetup.venue.address,
        details
    });

    return "https://calendar.google.com/calendar/render?" + params.toString();
}

function wireCalendarLink() {
    const dataNode = document.getElementById("next-meetup-data");
    const calendarLink = document.getElementById("gcal-link");
    if (!dataNode || !calendarLink) {
        return;
    }

    const meetup = JSON.parse(dataNode.textContent);
    const calendarUrl = buildCalendarUrl(meetup);
    if (!calendarUrl) {
        return;
    }

    calendarLink.href = calendarUrl;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        buildCalendarUrl,
        calendarTimestamp
    };
}

if (typeof document !== "undefined") {
    wireCalendarLink();
}
