import { handlerPath } from "@libs/handler-resolver";

const authenticateAdmin = {
  handler: `${handlerPath(__dirname)}/handler.authenticateAdminHandler`,
  events: [
    {
      http: { cors: true, method: "post", path: "admin" },
    },
  ],
};

export default {
  authenticateAdmin,
};
