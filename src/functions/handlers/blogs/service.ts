import { deleteCommon, getCommonById, getCommonQuery, getPagination, writeToDB } from "@functions/common/service";
import { BLOGS } from "@functions/utils/globals";
import { IPostBlogs, IPutBlogs } from "./schema";
import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";

export const getBlogs = async (query: APIGatewayProxyEventQueryStringParameters) => {
  const Items = await getCommonQuery(BLOGS);
  if (!query?.page) return Items;
  return getPagination(Items, query.page);
};

export const getBlogById = async (id: string) => {
  return getCommonById(id, BLOGS);
};

export const deleteBlog = async (id: string) => {
  return deleteCommon(id, BLOGS);
};

export const postBlogs = async (event: IPostBlogs) => {
  return writeToDB(event, BLOGS, ["title", "content", "published"]);
};

export const putBlogs = async (event: IPutBlogs) => {
  return writeToDB(event, BLOGS, ["title", "content", "published"]);
};
