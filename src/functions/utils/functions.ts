import { APIGatewayProxyEvent } from "aws-lambda";

export const slugifyTitle = (title: string) => {
  if (!title) return;
  const slug = title
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-")
    .toLowerCase();
  return slug;
};

export const getPublishedDate = (date: string) => {
  return date.length ? new Date(+date).getTime().toString() : new Date().getTime().toString();
};

export const getMatching = (str: string, regex: RegExp) => {
  if (!str) return;
  const match = str.match(regex);
  if (!match) return;
  return match[1].trim();
};

export const decodeEvent = (event: any) => {
  const decodedBody = Buffer.from(event.body, "base64").toString();
  return {
    ...event,
    body: decodedBody,
    isBase64Encoded: false,
  };
};
