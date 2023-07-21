import type { Metadata } from "next";
import Link from "next/link";
import { PageViews } from "components/PageViews";
import { allPosts } from "contentlayer/generated";

export const metadata: Metadata = {
  title: "Post",
  description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
  return (
    <>
      <section>
        <h1 className="font-bold text-3xl font-serif mb-5"></h1>
        {allPosts
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/post/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <div>{post.title}</div>
              </div>
              <PageViews slug={post.slug} trackView={false} />
            </Link>
          ))}
      </section>
    </>
  );
}
