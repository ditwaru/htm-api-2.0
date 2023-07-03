import { JSONResponses } from "@libs/api-gateway";
import { IAuthenticateAdmin } from "./schema";
import { getToken } from "./service";

export const authenticateAdminHandler = async (event: IAuthenticateAdmin) => {
  const getBody = () => {
    try {
      return JSON.parse(event.body as unknown as string);
    } catch (error) {
      const decoded = Buffer.from(event.body as unknown as string, "base64").toString();
      if (typeof decoded === "string") {
        return JSON.parse(decoded);
      }
      return decoded;
    }
  };
  try {
    const body = getBody();
    const { access_token } = await getToken(body);

    return JSONResponses.ok(access_token);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred logging into admin." });
  }
};
