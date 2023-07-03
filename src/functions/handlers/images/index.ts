import { handlerPath } from "@libs/handler-resolver";

const getAllImages = {
  handler: `${handlerPath(__dirname)}/handler.getAllImagesHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "images",
        authorizer: {
          name: "validateJWT",
        },
      },
    },
  ],
};
const postImages = {
  handler: `${handlerPath(__dirname)}/handler.postImagesHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "images",
        authorizer: {
          name: "validateJWT",
        },
      },
    },
  ],
};
const postAboutImages = {
  handler: `${handlerPath(__dirname)}/handler.postAboutImagesHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "images/about",
        authorizer: {
          name: "validateJWT",
        },
      },
    },
  ],
};

export default {
  getAllImages,
  postImages,
  postAboutImages,
};
