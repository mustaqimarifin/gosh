import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import imageMetadata from "./lib/Meta2";

const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  tweetIds: {
    type: "list",
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(/<MDXTweet\sid="[0-9]+"\s\/>/g);
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
    },
  },
  /*   blurIDs: {
    type: 'list',
    resolve: (doc) => {
      const blurMatches = doc.body.raw.match(/<Image\sid="[0-9]+"\s\/>/g);
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
    },
  }, */
  /*   structuredData: {
    type: 'json',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.date,
      description: doc.summary,
      image: doc.image
        ? `https://leerob.io${doc.image}`
        : `https://leerob.io/api/og?title=${doc.title}`,
      url: `https://leerob.io/blog/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: 'Lee Robinson',
      },
    }),
  }, */
};

/* const Image = defineNestedType(() => ({
  name: 'Image',
  fields: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    src: { type: 'string', required: true },
    width: { type: 'number' },
    height: { type: 'number' },
    hash: { type: 'string' },
  },
})); */

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  // @ts-ignore
  computedFields,
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      imageMetadata,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: false,
          filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),

          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
