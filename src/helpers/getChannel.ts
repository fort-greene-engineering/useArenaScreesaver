import { Image } from "../types";
import { formatImageArray } from "./formatImageArray";

export const getChannel = async (slug: string): Promise<Image[] | null> => {
  return fetch(`https://api.are.na/v2/channels/${slug}?per=50`)
    .then((response) => {
      return response
        .json()
        .then((data) => {
          const { contents } = data;
          const images = contents.filter(
            (content: any) => content.class === "Image"
          );
          return formatImageArray(images);
        })
        .catch((_) => null);
    })
    .catch((_) => null);
};
