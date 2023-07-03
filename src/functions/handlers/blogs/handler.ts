import { JSONResponses } from "@libs/api-gateway";
import { IGetBlogs, IPostBlogs, IPutBlogs } from "./schema";
import { IPathParamWithID } from "@functions/common/schema";
import { deleteBlog, getBlogById, getBlogs, postBlogs, putBlogs } from "./service";

export const getBlogsHandler = async (event: IGetBlogs) => {
  try {
    const query = event.queryStringParameters;
    const data = await getBlogs(query);
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred getting the blogs." });
  }
};

export const postBlogsHandler = async (event: IPostBlogs) => {
  try {
    const data = await postBlogs(event);
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred posting the blog." });
  }
};

export const putBlogsHandler = async (event: IPutBlogs) => {
  try {
    const data = await putBlogs(event);
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred updating the blog." });
  }
};

export const getBlogByIdHandler = async (event: IPathParamWithID) => {
  const { id } = event.pathParameters;

  try {
    const data = await getBlogById(id);
    if (!data) {
      return JSONResponses.notFound({ message: "The requested blog could not be found." });
    }
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred retrieving the blog." });
  }
};

export const deleteBlogHandler = async (event: IPathParamWithID) => {
  const { id } = event.pathParameters;

  try {
    const data = await deleteBlog(id);
    if (!data) {
      return JSONResponses.notFound({ message: "The requested blog could not be found." });
    }
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred deleting the blog." });
  }
};
