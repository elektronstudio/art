export const config = {
  streamUrl: import.meta.env.VITE_STREAM_URL || "",
  calendarUrl: import.meta.env.VITE_CALENDAR_URL || "",
  indexUrl: import.meta.env.VITE_INDEX_URL || "",
  wsUrl: import.meta.env.VITE_WS_URL || "",
  historyUrl: import.meta.env.VITE_HISTORY_URL || "",
  corsUrl: "https://api.allorigins.win/get?url=${url}&${random}",
  userIdle: 10000,
  messageDelay: 20,
  perfStart: "2021-04-01T18:00:00.002Z",
};
