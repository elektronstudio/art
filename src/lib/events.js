//@ts-check
import { ref } from 'vue';

import {
  config,
  fetchSheet,
  getDiff,
  replace,
  sortEvents,
} from './';

export const events = ref([]);

const processEvent = (event) => {
  if (event.description) {
    event.intro = `${event.description.split(/\n/)[0]}.`;
    event.description = `<p>${event.description.replace(/\n/g, "</p><p>")}</p>`;
  }
  // const fromDate = createDate(event.fromdate, event.fromtime);
  // const toDate = createDate(event.todate, event.totime);
  // event.from = fromDate !== "Invalid Date" ? fromDate : "";
  // event.to = toDate !== "Invalid Date" ? toDate : "";
  event = { ...event, ...getDiff(event) };
  if (event.streamkey) {
    event.streamkeys = event.streamkey.split(",").map((key) => key.trim());
  } else {
    event.streamkeys = [event.eventid];
  }
  if (event.fientaid) {
    event.ticketUrl = replace(config.fientaTicketUrl, {
      fientaid: event.fientaid,
    });
  }
  return event;
};

export const loadEvents = () => {
  [
    config.eventsUrl1,
    config.eventsUrl2,
    ,
    config.eventsUrl3,
    ,
    config.eventsUrl4,
  ]
    .filter((url) => url)
    .forEach((url) =>
      fetchSheet(url).then(({ rows }) =>
        (events.value = [...events.value, ...rows.map(processEvent)])
          .map((e) => {
            console.log(e.hidden === "TRUE");
            return e;
          })
          .filter((event) => event.hidden !== "TRUE")
          .sort(sortEvents)
      )
    );
};
