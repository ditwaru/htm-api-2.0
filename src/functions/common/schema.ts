import { APIGatewayProxyEvent } from "aws-lambda";

export interface IPathParamWithID extends Omit<APIGatewayProxyEvent, "pathParameters"> {
  pathParameters: {
    id: string;
  };
}
