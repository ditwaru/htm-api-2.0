import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

import { getPartsFromFormData } from "./parts";
import { getMultipleImagesFromFormData } from "./parts";

const { BUCKET_NAME, REGION } = process.env;
const client = new S3Client({ region: REGION });

export const processMultiPartForm = async (event: APIGatewayProxyEvent, partsToExtract: string[]) => {
  const { fileName, buffer, contentType, ...everythingElse } = getPartsFromFormData(event, partsToExtract);
  const id = uuid();
  const key = `images/posts/${id}-${fileName}`;

  try {
    const params: PutObjectCommandInput = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    // await client.send(new PutObjectCommand(params));
    const imageUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;

    return {
      imageUrl,
      ...everythingElse,
    };
  } catch (error) {
    console.error({ error });
  }
};

export const processBulkImages = async (event: APIGatewayProxyEvent, about = false) => {
  const images = getMultipleImagesFromFormData(event);
  return Promise.all(
    images.map(async ({ fileName, contentType, buffer }) => {
      const id = uuid();
      const path = about ? "about" : "posts";
      const key = `images/${path}/${id}-${fileName}`;
      const params: PutObjectCommandInput = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      };

      await client.send(new PutObjectCommand(params));
      return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
    })
  );
};

//TODO IMAGE COMPRESSION
