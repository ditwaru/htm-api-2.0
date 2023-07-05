import { handlerPath } from "@libs/handler-resolver";

const getAllImages = {
  handler: `${handlerPath(__dirname)}/handler.getAllImagesHandler`,
  events: [
    {
      http: {
        cors: true,
        method: "get",
        path: "images",
        authorizer: {
          name: "jwtAuthorizer",
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
        cors: true,
        method: "post",
        path: "images",
        authorizer: {
          name: "jwtAuthorizer",
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
        cors: true,
        method: "post",
        path: "images/about",
        authorizer: {
          name: "jwtAuthorizer",
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
