import { handlerPath } from "@libs/handler-resolver";

const jwtAuthorizer = {
  handler: `${handlerPath(__dirname)}/handler.jwtAuthorizer`,
};

const validateJWT = {
  handler: `${handlerPath(__dirname)}/handler.validateJWTHandler`,
  events: [
    {
      http: {
        cors: true,
        method: "get",
        path: "admin/validate",
        authorizer: {
          name: "jwtAuthorizer",
        },
      },
    },
  ],
};

export default {
  jwtAuthorizer,
  validateJWT,
};
