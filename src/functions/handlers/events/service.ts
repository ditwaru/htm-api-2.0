import { deleteCommon, getCommonById, getCommonQuery, getPagination, writeToDBv2 } from "@functions/common/service";
import { EVENTS } from "@functions/utils/globals";
import { IPostCalendarEvents, IPutCalendarEvents } from "./schema";
import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";

export const getCalendarEvents = async (query: APIGatewayProxyEventQueryStringParameters) => {
  const Items = await getCommonQuery(EVENTS);
  if (!query?.page) return Items;
  return getPagination(Items, query.page);
};

export const getCalendarEventById = async (id: string) => {
  return getCommonById(id, EVENTS);
};

export const deleteCalendarEvent = async (id: string) => {
  return deleteCommon(id, EVENTS);
};

export const postCalendarEvent = async (event: IPostCalendarEvents) => {
  return writeToDBv2(event, EVENTS);
};

export const putCalendarEvent = async (event: IPutCalendarEvents) => {
  return writeToDBv2(event, EVENTS);
};
