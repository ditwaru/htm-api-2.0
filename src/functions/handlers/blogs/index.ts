import { handlerPath } from "@libs/handler-resolver";

const getBlogs = {
  handler: `${handlerPath(__dirname)}/handler.getBlogsHandler`,
  events: [
    {
      http: { cors: true, method: "get", path: "blogs" },
    },
  ],
};

const postBlogs = {
  handler: `${handlerPath(__dirname)}/handler.postBlogsHandler`,
  events: [
    {
      http: {
        cors: true,
        method: "post",
        path: "blogs",
        authorizer: {
          name: "jwtAuthorizer",
        },
      },
    },
  ],
};

const putBlogs = {
  handler: `${handlerPath(__dirname)}/handler.putBlogsHandler`,
  events: [
    {
      http: {
        cors: true,
        method: "put",
        path: "blogs/{id}",
        authorizer: {
          name: "jwtAuthorizer",
        },
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

const getBlogById = {
  handler: `${handlerPath(__dirname)}/handler.getBlogByIdHandler`,
  events: [
    {
      http: {
        cors: true,
        method: "get",
        path: "blogs/{id}",
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

const deleteBlog = {
  handler: `${handlerPath(__dirname)}/handler.deleteBlogHandler`,
  events: [
    {
      http: {
        cors: true,
        method: "delete",
        path: "blogs/{id}",
        authorizer: {
          name: "jwtAuthorizer",
        },
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

export default {
  getBlogs,
  postBlogs,
  putBlogs,
  getBlogById,
  deleteBlog,
};
