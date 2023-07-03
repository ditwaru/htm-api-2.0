import { DynamoDB, TransactWriteItemsCommand, TransactWriteItemsCommandInput } from "@aws-sdk/client-dynamodb";
import { getCommonQuery } from "@functions/common/service";

import { ABOUT } from "@functions/utils/globals";
const client = new DynamoDB({ region: process.env.REGION });
const DB_NAME = process.env.DB_NAME;

export const getAbout = async () => {
  return getCommonQuery(ABOUT);
};

export const putAboutText = async (title: string, content: string) => {
  const params: TransactWriteItemsCommandInput = {
    TransactItems: [
      { Put: { TableName: DB_NAME, Item: { category: { S: ABOUT }, id: { S: "title" }, title: { S: title } } } },
      {
        Put: { TableName: DB_NAME, Item: { category: { S: ABOUT }, id: { S: "content" }, content: { S: content } } },
      },
    ],
  };

  return client.send(new TransactWriteItemsCommand(params));
};
