import { handlerPath } from "@libs/handler-resolver";

const getBlogs = {
  handler: `${handlerPath(__dirname)}/handler.getBlogsHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "blogs",
      },
    },
  ],
};

const postBlogs = {
  handler: `${handlerPath(__dirname)}/handler.postBlogsHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "blogs",
        authorizer: {
          name: "validateJWT",
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
        method: "put",
        path: "blogs/{id}",
        authorizer: {
          name: "validateJWT",
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
        method: "delete",
        path: "blogs/{id}",
        authorizer: {
          name: "validateJWT",
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
