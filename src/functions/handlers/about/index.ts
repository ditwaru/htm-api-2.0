import { handlerPath } from "@libs/handler-resolver";

const getAbout = {
  handler: `${handlerPath(__dirname)}/handler.getAboutHandler`,
  events: [
    {
      http: { cors: true, method: "get", path: "about" },
    },
  ],
};

const putAboutText = {
  handler: `${handlerPath(__dirname)}/handler.putAboutTextHandler`,
  events: [
    {
      http: { cors: true, method: "put", path: "about" },
    },
  ],
};

export default {
  getAbout,
  putAboutText,
};
