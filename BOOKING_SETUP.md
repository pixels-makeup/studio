# Booking UI + Google Calendar Setup

This site runs on GitHub Pages, so Google Calendar access must happen through a backend. Use Google Apps Script as the backend because it can safely access `littlehamster516@gmail.com` Calendar and send approval emails.

## 1. Create Google Apps Script

1. Go to https://script.google.com/
2. Create a new project.
3. Replace the default code with the contents of `google-apps-script/booking-backend.gs`.
4. Save the project.

## 2. Deploy Web App

1. Click `Deploy` -> `New deployment`.
2. Select type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy and approve Calendar/Mail permissions.
6. Copy the Web App URL.

## 3. Connect The Site

Open `app.js` and replace:

```js
const BOOKING_API_URL = "";
```

with:

```js
const BOOKING_API_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
```

## 4. Booking Rules

Current defaults:

- Calendar: `littlehamster516@gmail.com`
- Request email: `littlehamster516@gmail.com`
- Available days: Monday to Sunday
- Service duration: 180 minutes
- Slot interval: 60 minutes
- Day window: 00:00 to 24:00
- Pending requests block the same time until accepted or cleared
- Clients must leave at least one contact method: WeChat, RedNote, phone, or Instagram

To change rules, edit `BOOKING_CONFIG` in `google-apps-script/booking-backend.gs` and the matching `bookingSettings` in `app.js`.

## 5. Accept Flow

1. Client submits a booking request on the site.
2. Apps Script stores it as Pending.
3. Apps Script emails `littlehamster516@gmail.com`.
4. Click the `Accept and add to Google Calendar` button in the email.
5. The button opens the site with `?bookingAction=accept&token=...`.
6. The site calls Apps Script to create the Google Calendar event and remove the Pending request.

The email intentionally links to the GitHub Pages site first instead of directly to `script.google.com`. This avoids Google multi-account redirects such as `/macros/u/3/s/...`, which can break Apps Script Web App links from Gmail.
