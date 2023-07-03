import { JSONResponses } from "@libs/api-gateway";
import { IPutAboutText } from "./schema";
import { getAbout, putAboutText } from "./service";

export const getAboutHandler = async () => {
  try {
    const data = await getAbout();
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred getting the about page." });
  }
};

export const putAboutTextHandler = async (event: IPutAboutText) => {
  const { title, content }: IPutAboutText["body"] = JSON.parse(event.body as unknown as string);
  try {
    const data = await putAboutText(title, content);
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred posting to the about page." });
  }
};
