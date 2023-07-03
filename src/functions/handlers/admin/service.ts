import axios from "axios";
import { IAuthenticateAdmin } from "./schema";

const clientId = process.env.APP_CLIENT_ID;

export const getToken = async (eventBody: IAuthenticateAdmin["body"]) => {
  const { code, appClientSecret, cognitoDomain, redirectUri } = eventBody;
  const base64Secret = Buffer.from(`${clientId}:${appClientSecret}`).toString("base64");

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  const headers = {
    headers: {
      Authorization: `Basic ${base64Secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const { data } = await axios.post(`${cognitoDomain}/oauth2/token`, params, headers);
  return data;
};
