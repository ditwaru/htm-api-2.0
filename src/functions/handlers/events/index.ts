import { handlerPath } from "@libs/handler-resolver";

const getCalendarEvents = {
  handler: `${handlerPath(__dirname)}/handler.getCalendarEventsHandler`,
  events: [
    {
      http: { cors: true, method: "get", path: "events" },
    },
  ],
};

const postCalendarEvents = {
  handler: `${handlerPath(__dirname)}/handler.postCalendarEventsHandler`,
  events: [
    {
      http: {
        cors: true,
        method: "post",
        path: "events",
        authorizer: {
          name: "jwtAuthorizer",
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
        cors: true,
        method: "put",
        path: "events/{id}",
        authorizer: {
          name: "jwtAuthorizer",
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
        cors: true,
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
        cors: true,
        method: "delete",
        path: "events/{id}",
        authorizer: {
          name: "jwtAuthorizer",
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
