import { handlerPath } from "@libs/handler-resolver";

const getAbout = {
  handler: `${handlerPath(__dirname)}/handler.getAboutHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "about",
      },
    },
  ],
};

const putAboutText = {
  handler: `${handlerPath(__dirname)}/handler.putAboutTextHandler`,
  events: [
    {
      http: {
        method: "put",
        path: "about",
      },
    },
  ],
};

export default {
  getAbout,
  putAboutText,
};
