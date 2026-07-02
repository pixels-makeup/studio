const BOOKING_CONFIG = {
  calendarId: "littlehamster516@gmail.com",
  notificationEmail: "littlehamster516@gmail.com",
  webAppUrl: "https://script.google.com/macros/s/AKfycbwr53AxuED3AVtyoN4-rGZb_fPeKW-QP-eKpKd8MKCH1tJnfEoQfMYgmgb6Jr2A0fHU/exec",
  siteAcceptUrl: "https://pixels-makeup.github.io/studio/",
  timezone: "America/Los_Angeles",
  serviceDurationMinutes: 180,
  slotIntervalMinutes: 60,
  dayStartHour: 8,
  dayEndHour: 22,
  studioName: "Pixels Makeup Studio"
};

function doGet(event) {
  const params = event.parameter || {};
  const callback = params.callback || "callback";

  try {
    let payload;

    if (params.action === "availability") {
      payload = getAvailability(params);
    } else if (params.action === "request") {
      payload = createPendingRequest(params);
    } else if (params.action === "accept") {
      payload = acceptBookingRequest(params);
      if (!params.callback) return HtmlService.createHtmlOutput(payload.message);
    } else {
      payload = { ok: false, error: "Unknown action" };
    }

    return jsonp(callback, payload);
  } catch (error) {
    return jsonp(callback, { ok: false, error: error.message });
  }
}

function getAvailability(params) {
  const dateKey = required(params.date, "date");
  const duration = Number(params.duration || BOOKING_CONFIG.serviceDurationMinutes);
  const date = parseDateKey(dateKey);
  const dayStart = new Date(date);
  dayStart.setHours(BOOKING_CONFIG.dayStartHour, 0, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(BOOKING_CONFIG.dayEndHour, 0, 0, 0);

  const calendar = CalendarApp.getCalendarById(BOOKING_CONFIG.calendarId);
  if (!calendar) throw new Error("Calendar not found.");

  const events = calendar.getEvents(dayStart, dayEnd).map(event => ({
    start: event.getStartTime().getTime(),
    end: event.getEndTime().getTime()
  }));

  getPendingRequests()
    .filter(request => request.date === dateKey)
    .forEach(request => {
      const start = parseDateTime(request.date, request.time);
      const end = new Date(start.getTime() + Number(request.duration || duration) * 60000);
      events.push({ start: start.getTime(), end: end.getTime() });
    });

  const slots = [];
  for (
    let hour = BOOKING_CONFIG.dayStartHour;
    hour <= BOOKING_CONFIG.dayEndHour - duration / 60;
    hour += BOOKING_CONFIG.slotIntervalMinutes / 60
  ) {
    const slotStart = new Date(date);
    slotStart.setHours(Math.floor(hour), (hour % 1) * 60, 0, 0);
    const slotEnd = new Date(slotStart.getTime() + duration * 60000);
    const available = !events.some(event => slotStart.getTime() < event.end && slotEnd.getTime() > event.start);

    slots.push({
      time: Utilities.formatDate(slotStart, BOOKING_CONFIG.timezone, "HH:mm"),
      available
    });
  }

  return { ok: true, date: dateKey, slots };
}

function createPendingRequest(params) {
  const request = {
    token: Utilities.getUuid(),
    createdAt: new Date().toISOString(),
    date: required(params.date, "date"),
    time: required(params.time, "time"),
    service: required(params.serviceName || params.service, "service"),
    name: required(params.name, "name"),
    instagram: params.instagram || "",
    wechat: params.wechat || "",
    location: required(params.location, "location"),
    event: required(params.event, "event"),
    notes: params.notes || "",
    duration: Number(params.duration || BOOKING_CONFIG.serviceDurationMinutes),
    timezone: params.timezone || BOOKING_CONFIG.timezone
  };

  const pending = getPendingRequests();
  pending.push(request);
  savePendingRequests(pending);

  MailApp.sendEmail({
    to: BOOKING_CONFIG.notificationEmail,
    subject: `Booking request: ${request.name} - ${request.service}`,
    htmlBody: buildRequestEmail(request)
  });

  return { ok: true, token: request.token };
}

function acceptBookingRequest(params) {
  const token = required(params.token, "token");
  const pending = getPendingRequests();
  const index = pending.findIndex(request => request.token === token);
  if (index === -1) return { ok: false, message: "This request was already accepted or cannot be found." };

  const request = pending[index];
  const calendar = CalendarApp.getCalendarById(BOOKING_CONFIG.calendarId);
  if (!calendar) throw new Error("Calendar not found.");

  const start = parseDateTime(request.date, request.time);
  const end = new Date(start.getTime() + Number(request.duration) * 60000);
  const title = `${request.name} ${request.service}`;

  calendar.createEvent(title, start, end, {
    location: request.location,
    description: [
      `Status: Confirmed`,
      `Name: ${request.name}`,
      `Service: ${request.service}`,
      `Instagram: ${request.instagram}`,
      `WeChat: ${request.wechat}`,
      `Event: ${request.event}`,
      `Location: ${request.location}`,
      `Notes: ${request.notes}`
    ].join("\n")
  });

  pending.splice(index, 1);
  savePendingRequests(pending);

  return { ok: true, message: "Booking accepted and added to Google Calendar." };
}

function buildRequestEmail(request) {
  const acceptUrl = `${BOOKING_CONFIG.siteAcceptUrl}?bookingAction=accept&token=${encodeURIComponent(request.token)}`;
  return `
    <h2>New booking request</h2>
    <p><strong>Date:</strong> ${request.date}</p>
    <p><strong>Time:</strong> ${request.time}</p>
    <p><strong>Service:</strong> ${request.service}</p>
    <p><strong>Name:</strong> ${request.name}</p>
    <p><strong>Instagram:</strong> ${request.instagram || "-"}</p>
    <p><strong>WeChat:</strong> ${request.wechat || "-"}</p>
    <p><strong>Location:</strong> ${request.location}</p>
    <p><strong>Event:</strong> ${request.event}</p>
    <p><strong>Notes:</strong> ${request.notes || "-"}</p>
    <p><a href="${acceptUrl}" style="display:inline-block;padding:12px 18px;background:#17100d;color:#fff;text-decoration:none;border-radius:999px;">Accept and add to Google Calendar</a></p>
  `;
}

function getPendingRequests() {
  const raw = PropertiesService.getScriptProperties().getProperty("pendingRequests");
  return raw ? JSON.parse(raw) : [];
}

function savePendingRequests(requests) {
  PropertiesService.getScriptProperties().setProperty("pendingRequests", JSON.stringify(requests));
}

function required(value, name) {
  if (!value) throw new Error(`Missing ${name}.`);
  return value;
}

function parseDateKey(dateKey) {
  const parts = dateKey.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function parseDateTime(dateKey, time) {
  const date = parseDateKey(dateKey);
  const parts = time.split(":").map(Number);
  date.setHours(parts[0], parts[1] || 0, 0, 0);
  return date;
}

function jsonp(callback, payload) {
  const safeCallback = callback.replace(/[^\w.$]/g, "");
  return ContentService
    .createTextOutput(`${safeCallback}(${JSON.stringify(payload)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
