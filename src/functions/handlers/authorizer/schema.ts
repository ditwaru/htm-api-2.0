import { APIGatewayProxyEvent } from "aws-lambda";

export interface IValidateJWT extends APIGatewayProxyEvent {
  headers: {
    Authorization: string;
  };
}
