import {
  AttributeValue,
  DeleteItemCommand,
  DeleteItemCommandInput,
  DynamoDB,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";

import { IPostBlogs, IPutBlogs } from "@functions/handlers/blogs/schema";
import { IPostCalendarEvents, IPutCalendarEvents } from "@functions/handlers/events/schema";
import { processMultiPartForm } from "@functions/utils/formHandler/formHandler";
import { slugifyTitle, getPublishedDate } from "@functions/utils/functions";
import { DEFAULT_PAGE_NUMBER } from "@functions/utils/globals";

const { REGION, DB_NAME } = process.env;
const client = new DynamoDB({ region: REGION });

type IWriteToDB = IPostBlogs | IPutBlogs | IPostCalendarEvents | IPutCalendarEvents;

export const getCommonQuery = async (category: string) => {
  const params: QueryCommandInput = {
    TableName: DB_NAME,
    KeyConditionExpression: "category = :category",
    ExpressionAttributeValues: { ":category": { S: category } },
  };
  const { Items } = await client.query(params);
  return parseDynamoData(Items);
};

export const getCommonById = async (id: string, category: string) => {
  const params: GetItemCommandInput = {
    TableName: DB_NAME,
    Key: {
      category: { S: category },
      id: { S: id },
    },
  };

  const { Item } = await client.send(new GetItemCommand(params));
  const [parsedData] = parseDynamoData([Item]);
  return parsedData;
};

export const deleteCommon = async (id: string, category: string) => {
  const params: DeleteItemCommandInput = {
    TableName: DB_NAME,
    Key: {
      category: { S: category },
      id: { S: id },
    },
    ReturnValues: "ALL_OLD",
  };
  const { Attributes } = await client.send(new DeleteItemCommand(params));
  return Attributes;
};

export const writeToDB = async (event: IWriteToDB, category: string, partsToExtract: string[]) => {
  const getId = () => event.pathParameters?.id || uuid();

  const getElementsForDB = async () => {
    if (event.headers["Content-Type"].includes("multipart/form-data")) {
      // there is an image
      return await processMultiPartForm(event, partsToExtract);
    }
    const body = JSON.parse(event.body as unknown as string);
    const { title, content, date, published, imageUrl } = body;
    return { title, content, date, published, imageUrl };
  };

  const elements = await getElementsForDB();
  Object.assign(elements, {
    slug: slugifyTitle(elements.title),
    published: getPublishedDate(elements.published),
  });

  const Item = {
    id: { S: getId() },
    category: { S: category },
  };

  for (const element in elements) {
    if (!elements[element]) continue;
    Item[element] = { S: elements[element] };
  }

  const params = {
    TableName: DB_NAME,
    Item,
  };

  return client.send(new PutItemCommand(params));
};

export const parseDynamoData = (dynamoData: Record<string, AttributeValue>[]) => {
  return dynamoData.map((data) => {
    const parsedData: Record<string, AttributeValue> = {};
    for (const property in data) {
      Object.assign(parsedData, {
        [property]: data[property]["S"] || data[property]["N"],
      });
    }
    return parsedData;
  });
};

export const getPagination = (Items: Record<string, AttributeValue>[], pageNumber: string) => {
  const page = Math.abs(+pageNumber) || DEFAULT_PAGE_NUMBER;
  let limit = 5;
  const skip = (page - 1) * limit;

  Items.sort((a, b) => +a.published - +b.published);
  if (Items.length < skip + limit) {
    limit = Items.length;
  }
  return Items.slice(skip, limit);
};
