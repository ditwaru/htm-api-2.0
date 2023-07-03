import { JSONResponses } from "@libs/api-gateway";
import { IValidateJWT } from "./schema";
import { authenticateToken } from "./service";

export const validateJWTHandler = async (event: IValidateJWT) => {
  try {
    const { headers } = event;
    const payload = await authenticateToken(headers.Authorization);
    const today = new Date().getTime();
    const expiration = payload.exp * 1000; // js dates use milliseconds
    if (expiration < today) {
      throw new Error("expired token");
    }

    return {
      principalId: payload.username, // The principal user identification associated with the token sent by the client.
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
    };
  } catch (err) {
    console.error(err);
    return JSONResponses.unauthorized({ message: "User has not been authorized." });
  }
};
