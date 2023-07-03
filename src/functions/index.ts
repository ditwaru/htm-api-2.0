import blogs from "./handlers/blogs";
import events from "./handlers/events";
import about from "./handlers/about";
import admin from "./handlers/admin";
import authorizer from "./handlers/authorizer";
import images from "./handlers/images";

export default {
  ...blogs,
  ...events,
  ...about,
  ...admin,
  ...images,
  ...authorizer,
};
