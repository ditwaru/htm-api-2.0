import { APIGatewayProxyEvent } from "aws-lambda";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import {
  DynamoDB,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
  TransactWriteItemsCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";
import { processBulkImages } from "@functions/utils/formHandler/formHandler";
import { ABOUT } from "@functions/utils/globals";

const { BUCKET_NAME, DB_NAME, REGION } = process.env;

export const getAllImages = async () => {
  const client = new S3Client({});
  const command: ListObjectsV2Command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
  });

  let isTruncated = true;
  const contents = [];
  while (isTruncated) {
    const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
    Contents?.forEach((c) => contents.push(c.Key));
    isTruncated = IsTruncated;
    command.input.ContinuationToken = NextContinuationToken;
  }
  return contents;
};

export const postImages = async (event: APIGatewayProxyEvent, about = false) => {
  const imageUrlArray = await processBulkImages(event, about); // posts to S3

  if (about) {
    // post to dynamo
    const client = new DynamoDB({ region: REGION });
    const params: TransactWriteItemsCommandInput = {
      TransactItems: imageUrlArray.map((url) => ({
        Put: {
          TableName: DB_NAME,
          Item: {
            category: { S: ABOUT },
            id: { S: `image-${uuid()}` },
            imageUrl: { S: url },
          },
        },
      })),
    };
    await client.send(new TransactWriteItemsCommand(params));
  }
};
