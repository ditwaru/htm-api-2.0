import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

import { getPartsFromFormData } from "./parts";
import { getMultipleImagesFromFormData } from "./parts";

const { BUCKET_NAME, REGION } = process.env;

export const processMultiPartForm = async (event: APIGatewayProxyEvent, partsToExtract: string[]) => {
  const { fileName, buffer, contentType, ...everythingElse } = getPartsFromFormData(event, partsToExtract);
  const id = uuid();
  const key = `images/posts/${id}-${fileName}`;

  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    const upload = new Upload({
      client: new S3Client({ region: REGION }),
      params,
    });
    await upload.done();
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
  console.log({ event });
  const images = getMultipleImagesFromFormData(event);
  return Promise.all(
    images.map(async ({ fileName, contentType, buffer }) => {
      const id = uuid();
      const path = about ? "about" : "posts";
      const key = `images/${path}/${id}-${fileName}`;
      const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      };

      const upload = new Upload({
        client: new S3Client({ region: REGION }),
        params,
      });
      await upload.done();
      return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
    })
  );
};

//TODO IMAGE COMPRESSION
