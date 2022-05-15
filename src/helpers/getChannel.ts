import { formatImageArray } from "./formatImageArray";

export const getChannel = async (slug: string) => {
  try {
    const res = await fetch(`https://api.are.na/v2/channels/${slug}?per=50`);
    const data = await res.json();
    const { contents } = data;

    const images = contents.filter((content: any) => content.class === "Image");
    return formatImageArray(images);
  } catch (error) {
    // Fail silently
    console.error(error);
  }
};
