import { APIGatewayProxyEvent } from "aws-lambda";

export interface IAuthenticateAdmin extends Omit<APIGatewayProxyEvent, "body"> {
  body: {
    code: string;
    appClientSecret: string;
    cognitoDomain: string;
    redirectUri: string;
  };
}
