import { JSONResponses } from "@libs/api-gateway";
import { IGetCalendarEvents, IPostCalendarEvents, IPutCalendarEvents } from "./schema";
import { IPathParamWithID } from "@functions/common/schema";
import {
  deleteCalendarEvent,
  getCalendarEventById,
  getCalendarEvents,
  postCalendarEvent,
  putCalendarEvent,
} from "./service";

export const getCalendarEventsHandler = async (event: IGetCalendarEvents) => {
  try {
    const query = event.queryStringParameters;
    const data = await getCalendarEvents(query);
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred getting the events." });
  }
};

export const postCalendarEventsHandler = async (event: IPostCalendarEvents) => {
  try {
    const data = await postCalendarEvent(event);
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred posting the event." });
  }
};

export const putCalendarEventsHandler = async (event: IPutCalendarEvents) => {
  try {
    const data = putCalendarEvent(event);
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred updating the event." });
  }
};

export const getCalendarEventByIdHandler = async (event: IPathParamWithID) => {
  const { id } = event.pathParameters;

  try {
    const data = await getCalendarEventById(id);
    // todo this and blogs double check the notfound method is working
    if (!data) {
      return JSONResponses.notFound({ message: "The requested event could not be found." });
    }
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred retrieving the event." });
  }
};

export const deleteCalendarEventHandler = async (event: IPathParamWithID) => {
  const { id } = event.pathParameters;
  try {
    const data = await deleteCalendarEvent(id);
    if (!data) {
      return JSONResponses.notFound({ message: "The requested event could not be found." });
    }
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred deleting the event." });
  }
};
