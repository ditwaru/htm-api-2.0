import { JSONResponses } from "@libs/api-gateway";
import { IAuthenticateAdmin } from "./schema";
import { getToken } from "./service";
import { decodeEvent } from "@functions/utils/functions";

export const authenticateAdminHandler = async (possiblyEncodedEvent: IAuthenticateAdmin) => {
  let event = possiblyEncodedEvent;
  if (possiblyEncodedEvent.isBase64Encoded) {
    event = decodeEvent(possiblyEncodedEvent);
  }
  try {
    const body = JSON.parse(event.body as unknown as string);
    const { access_token } = await getToken(body);

    return JSONResponses.ok(access_token);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred logging into admin." });
  }
};
