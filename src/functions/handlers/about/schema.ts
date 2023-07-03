import { APIGatewayProxyEvent } from "aws-lambda";

export interface IPutAboutText extends Omit<APIGatewayProxyEvent, "body"> {
  body: {
    title: string;
    content: string;
  };
}
