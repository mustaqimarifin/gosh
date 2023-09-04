import {
  type ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import imageMetadata from "./lib/Meta2"

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  /*   tweetIds: {
    type: "list",
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(/<MeatTweet\sid="[0-9]+"\s\/>/g);
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
    },
  }, */
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
}

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

const options: Options = {
  theme: "one-dark-pro",
  keepBackground: false,
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties?.className?.push("line--highlighted")
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word--highlighted"]
  },
}

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
  computedFields,
}))

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      imageMetadata,
      [rehypePrettyCode, options],
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
})
