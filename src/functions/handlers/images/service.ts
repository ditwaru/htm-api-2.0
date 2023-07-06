import { APIGatewayProxyEvent } from "aws-lambda";
import { S3Client, ListObjectsV2Command, PutObjectCommandInput, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDB, TransactWriteItemsCommand, TransactWriteItemsCommandInput } from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";
import { ABOUT } from "@functions/utils/globals";
import { decodeEvent } from "@functions/utils/functions";

const { BUCKET_NAME, DB_NAME, REGION } = process.env;

const s3Client = new S3Client({ region: REGION });
const dynamoDbClient = new DynamoDB({ region: REGION });

export const getAllImages = async () => {
  const command: ListObjectsV2Command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
  });

  let isTruncated = true;
  const contents = [];
  while (isTruncated) {
    const { Contents, IsTruncated, NextContinuationToken } = await s3Client.send(command);
    Contents?.forEach((c) => contents.push(c.Key));
    isTruncated = IsTruncated;
    command.input.ContinuationToken = NextContinuationToken;
  }
  return contents;
};

export const postImages = async (possiblyEncodedEvent: APIGatewayProxyEvent, about = false) => {
  let event = possiblyEncodedEvent;
  if (possiblyEncodedEvent.isBase64Encoded) {
    event = decodeEvent(possiblyEncodedEvent);
  }
  const eventBody: { images: { imageFile: string; fileName: string; contentType: string }[] } = JSON.parse(event.body);
  const imageUrlArray = await Promise.all(
    eventBody.images.map(async ({ imageFile, fileName, contentType }) => {
      return await uploadImageToS3(imageFile, fileName, contentType, about);
    })
  );

  if (about) {
    // post to dynamo
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
    await dynamoDbClient.send(new TransactWriteItemsCommand(params));
  }
};

export const uploadImageToS3 = async (
  imageFile: string,
  fileName: string,
  contentType: string,
  about: boolean = false
) => {
  if (!imageFile) return null;
  const id = uuid();
  const key = `images/${about ? "about" : "posts"}/${id}-${fileName}`;

  const buffer = Buffer.from(imageFile, "base64");

  const params: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };

  await s3Client.send(new PutObjectCommand(params));
  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
};
