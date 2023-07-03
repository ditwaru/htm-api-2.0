import { IPathParamWithID } from "@functions/common/schema";
import { APIGatewayProxyEvent } from "aws-lambda";

export interface IGetBlogs extends APIGatewayProxyEvent {}
export interface IPostBlogs extends Omit<APIGatewayProxyEvent, "body"> {
  body: APIGatewayProxyEvent["body"] & {
    title?: string;
    content?: string;
    published?: number;
  };
}

export interface IPutBlogs extends Omit<IPostBlogs, "body">, Omit<IPathParamWithID, "pathParameters"> {
  body: IPostBlogs["body"];
  pathParameters: IPathParamWithID["pathParameters"];
}
