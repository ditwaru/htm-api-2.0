import { handlerPath } from "@libs/handler-resolver";

const validateJWT = {
  handler: `${handlerPath(__dirname)}/handler.validateJWTHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "admin/validate",
      },
    },
  ],
};

export default {
  validateJWT,
};
