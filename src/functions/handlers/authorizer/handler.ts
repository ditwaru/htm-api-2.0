import { JSONResponses } from "@libs/api-gateway";
import { IAuthorizer, IValidateJWT } from "./schema";
import { authenticateToken } from "./service";
import { IAMPolicyBuilder } from "@functions/utils/IAMPolicyBuilder";

export const jwtAuthorizer = async (event: IAuthorizer, context, callback) => {
  try {
    const methodArn = event.methodArn;
    const token = event.authorizationToken;
    const payload = await authenticateToken(token);
    const today = new Date().getTime();
    const expiration = payload.exp * 1000; // js dates use milliseconds
    if (expiration < today) {
      throw new Error("expired token");
    }
    const policy = IAMPolicyBuilder({ userId: payload.username, effect: "Allow", methodArn });
    callback(null, policy);
  } catch (err) {
    console.error(err);
    callback("Unauthorized");
  }
};

export const validateJWTHandler = async (event: IValidateJWT) => {
  // this function does nothing except call the jwtAuthorizer and return 200 or 403
  try {
    return JSONResponses.ok();
  } catch (err) {
    console.error(err);
    return JSONResponses.forbidden("Permission not granted for this resource.");
  }
};
