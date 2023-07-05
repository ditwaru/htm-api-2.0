import { APIGatewayProxyEvent } from "aws-lambda";

export interface IValidateJWT extends APIGatewayProxyEvent {
  headers: {
    Authorization: string;
  };
}

export interface IAuthorizer extends APIGatewayProxyEvent {
  methodArn: string;
  authorizationToken?: string;
}
