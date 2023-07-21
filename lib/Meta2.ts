import lqip, { LqipOptions } from "lqip-modern";
import { visit } from "unist-util-visit";
import { join } from "node:path";
import { cwd } from "node:process";
import fs from "node:fs/promises";
import pMemoize from "p-memoize";
import { nanoid } from "nanoid";
import { get, set } from "./redis/db";
import pMap from "p-map";
import { concurrency } from "sharp";
import got from "got";

type ImageNode = {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
    height?: number;
    width?: number;
    blurDataURL?: string;
  };
};

function isImageNode(node) {
  const img = node as unknown as ImageNode;
  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
}

async function createPreviewImage(
  node: ImageNode,
  { cacheKey }: { cacheKey: string },
) {
  let result;
  const url = node.properties.src;
  console.log(url);
  //const id = sha256(url)
  const ext_img = url.startsWith("http");
  const local_img = join(cwd(), "./public", url);

  try {
    if (!ext_img) {
      result = await lqip(local_img);
    } else {
      // const { body } = await got(result, { responseType: 'buffer' });
      const body = await fetch(url).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );
      result = await lqip(body);
    }

    //const result = await getPlaiceholder(result, { size: 10 });
    //console.log('lqip', { ...result.metadata, cacheKey });

    if (!result) throw Error(`Invalid image with src "${url}"`);
    (node.properties.width = result.metadata.originalWidth || 768),
      (node.properties.height = result.metadata.originalHeight || 432),
      (node.properties.blurDataURL = result.metadata.dataURIBase64);
    console.log("lqip", { result, cacheKey, url });

    /*     try {
      await set(cacheKey, previewImage);
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error set "${url}"`, err.message);
    }

    return previewImage; */
  } catch (err) {
    console.warn("failed to create preview image", url, err.message);
    return null;
  }
}

const getPreviewImage = pMemoize(createPreviewImage);

const imageMetadata = () => {
  return async function transformer(tree: any) {
    const images: ImageNode[] = [];

    visit(tree, "element", (node) => {
      if (isImageNode(node)) {
        images.push(node);
      }
    });

    for (const image of images) {
      const cacheKey = nanoid(6);
      await getPreviewImage(image, { cacheKey });
    }

    return tree;
  };
};

export default imageMetadata;
