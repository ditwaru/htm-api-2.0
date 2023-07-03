import { getMatching } from "@functions/utils/functions";
import { APIGatewayProxyEvent } from "aws-lambda";

interface IBufferReturn {
  fileName?: string;
  contentType?: string;
  buffer?: Buffer;
  title?: string;
  content?: string;
  published?: number;
  date?: number;
}
interface IParsedMultiPart {
  title?: string;
  content?: string;
  file?: string;
  fileName?: string;
  contentType?: string;
}

const getBoundary = (event: APIGatewayProxyEvent) => {
  let contentType = event.headers["Content-Type"];
  const contentTypeArray = contentType.split(";").map((item) => item.trim());
  const boundaryPrefix = "boundary=";
  let boundary = contentTypeArray.find((item) => item.startsWith(boundaryPrefix));
  if (!boundary) return null;
  return boundary.slice(boundaryPrefix.length);
};

const getEventBody = (event: APIGatewayProxyEvent) => {
  if (event.isBase64Encoded) {
    return decodeBase64MultiPart(event.body);
  }
  return event.body;
};

const decodeBase64MultiPart = (str: string): string => {
  const buffer = Buffer.from(str, "base64");
  return buffer.toString("binary");
};

const findImageFromMultiPart = (str: string) => {
  const contentType = getMatching(str, /(?:Content-Type:)(.*?)(?:\r\n)/);
  const regexContentType = contentType?.replace(/\//g, "\\/");
  const regexFile = new RegExp(`(${regexContentType}\\r\\n)([\\S\\s]*)(?:--)`);
  const file = str.match(regexFile)?.[2]?.trim();
  const fileName = getMatching(str, /(?:filename=")(.*?)(?:")/)?.replace(/ /g, "_");
  if (contentType && !contentType.startsWith("image")) {
    throw new Error("Incorrect file format");
  }

  if (file) return { file, fileName, contentType };
};

const formWithMultipleImagesToJSON = (formData: string[]) =>
  formData.reduce((acc, curr) => {
    const found = findImageFromMultiPart(curr);
    if (found) acc.push(found);
    return acc;
  }, []);

const formPartsToJSON = (formData: string[], propertiesToExtract: string[]): IParsedMultiPart => {
  return formData.reduce((acc, curr) => {
    if (!acc["file"]) {
      const fileParts = findImageFromMultiPart(curr);
      if (fileParts) {
        const { file, fileName, contentType } = fileParts;
        return { ...acc, file, fileName, contentType };
      }
    }

    for (const property of propertiesToExtract) {
      if (acc[property]) continue;
      const match = getMatching(curr, RegExp(`(?:name="${property}")([\\s\\S]*?)(?:--)`))?.trim();
      if (match) return { ...acc, [property]: match };
    }
    return acc;
  }, {});
};

const splitEventBody = (event: APIGatewayProxyEvent) => {
  const boundary = getBoundary(event);
  const eventBody = getEventBody(event);
  return eventBody.split(boundary);
};

export const getPartsFromFormData = (event: APIGatewayProxyEvent, partsToExtract: string[]): IBufferReturn => {
  const formParts = splitEventBody(event);
  const { file, ...everythingElse } = formPartsToJSON(formParts, partsToExtract);
  const buffer = Buffer.from(file, "binary");

  return { buffer, ...everythingElse };
};

export const getMultipleImagesFromFormData = (event: APIGatewayProxyEvent) => {
  const formParts = splitEventBody(event);
  const images = formWithMultipleImagesToJSON(formParts);
  return images.map(({ file, fileName, contentType }) => ({
    buffer: Buffer.from(file, "binary"),
    fileName,
    contentType,
  }));
};
