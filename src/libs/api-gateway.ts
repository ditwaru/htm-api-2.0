const formatJSONResponse = (statusCode: number, response?: unknown) => {
  const returnObj = {
    statusCode,
  };
  if (response) {
    Object.assign(returnObj, {
      body: JSON.stringify(response),
    });
  }
  return returnObj;
};

interface IJsonResponses {
  [key: string]: (response?: unknown, headers?: { headers: { [key: string]: string } }) => {};
}
export const JSONResponses: IJsonResponses = {
  ok: (response) => formatJSONResponse(200, response),
  badRequest: (response) => formatJSONResponse(400, response),
  notFound: (response) => formatJSONResponse(404, response),
  unauthorized: (response) => formatJSONResponse(401, response),
  forbidden: (response) => formatJSONResponse(403, response),
};
