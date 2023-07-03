import { IPathParamWithID } from "@functions/common/schema";
import { APIGatewayProxyEvent } from "aws-lambda";

export interface IGetCalendarEvents extends APIGatewayProxyEvent {}
export interface IPostCalendarEvents extends Omit<APIGatewayProxyEvent, "body"> {
  body: APIGatewayProxyEvent["body"] & {
    title?: string;
    content?: string;
    date?: number;
  };
}

export interface IPutCalendarEvents
  extends Omit<IPostCalendarEvents, "body">,
    Omit<IPathParamWithID, "pathParameters"> {
  body: IPostCalendarEvents["body"];
  pathParameters: IPathParamWithID["pathParameters"];
}
