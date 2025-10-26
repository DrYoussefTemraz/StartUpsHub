// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://55ea126c6075b2f59ca73ab8f9aba4ed@o4510251807670272.ingest.us.sentry.io/4510251816779776",

  // Disable heavy client-side integrations to stop background traffic
  integrations: [],

  // Turn off tracing in dev to avoid extra network requests
  tracesSampleRate: 0,

  // Reduce client logs
  enableLogs: false,

  // Disable Replay entirely
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Avoid sending PII by default
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;