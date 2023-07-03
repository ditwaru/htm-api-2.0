import { handlerPath } from "@libs/handler-resolver";

const getCalendarEvents = {
  handler: `${handlerPath(__dirname)}/handler.getCalendarEventsHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "events",
      },
    },
  ],
};

const postCalendarEvents = {
  handler: `${handlerPath(__dirname)}/handler.postCalendarEventsHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "events",
        authorizer: {
          name: "validateJWT",
        },
      },
    },
  ],
};

const putCalendarEvents = {
  handler: `${handlerPath(__dirname)}/handler.putCalendarEventsHandler`,
  events: [
    {
      http: {
        method: "put",
        path: "events/{id}",
        authorizer: {
          name: "validateJWT",
        },
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

const getCalendarEventById = {
  handler: `${handlerPath(__dirname)}/handler.getCalendarEventByIdHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "events/{id}",
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

const deleteCalendarEvent = {
  handler: `${handlerPath(__dirname)}/handler.deleteCalendarEventHandler`,
  events: [
    {
      http: {
        method: "delete",
        path: "events/{id}",
        authorizer: {
          name: "validateJWT",
        },
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

export default {
  getCalendarEvents,
  postCalendarEvents,
  putCalendarEvents,
  getCalendarEventById,
  deleteCalendarEvent,
};
