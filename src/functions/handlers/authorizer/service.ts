import { CognitoJwtVerifier } from "aws-jwt-verify";

const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
const USER_POOL_ID = process.env.USER_POOL_ID;

export const authenticateToken = async (token: string) => {
  if (token == null) throw new Error("No token present");

  const verifier = CognitoJwtVerifier.create({
    userPoolId: USER_POOL_ID,
    tokenUse: "access",
    clientId: APP_CLIENT_ID,
  });

  return verifier.verify(token);
};
