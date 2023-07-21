import { allPosts } from "contentlayer/generated";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `https://leerob.io/post/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = [
    "",
    "/about",
    "/post",
    "/scribbles",
    "/guestbook",
    "/uses",
  ].map((route) => ({
    url: `https://leerob.io${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
