import { JSONResponses } from "@libs/api-gateway";
import { getAllImages, postImages } from "./service";
import { IPostImages } from "./schema";

export const getAllImagesHandler = async () => {
  try {
    const data = await getAllImages();
    return JSONResponses.ok(data);
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred getting the images." });
  }
};

export const postImagesHandler = async (event: IPostImages) => {
  try {
    await postImages(event);
    return JSONResponses.ok();
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred uploading the images." });
  }
};

export const postAboutImagesHandler = async (event: IPostImages) => {
  try {
    const about = true;
    await postImages(event, about);
    return JSONResponses.ok();
  } catch (err) {
    console.error(err);
    return JSONResponses.badRequest({ message: "An error occurred uploading the images." });
  }
};
