import { PageViews } from "components/PageViews"
import { LoadingSpinner } from "components/spinner"
import { allPosts } from "contentlayer/generated"
import { BatchCounter } from "lib/metrics"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { api } from "server/trpc/action_client"

//export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Post",
  description: "Read my thoughts on software development, design, and more.",
}

export default async function BlogPage() {
  return (
    <>
      <section>
        <h1 className="mb-5 font-serif text-3xl font-bold"></h1>
        {allPosts
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="mb-4 flex flex-col space-y-1"
              href={`/post/${post.slug}`}
            >
              <div className="flex w-full flex-col">
                <div>{post.title}</div>
              </div>
              <PageViews slug={post.slug} trackView={false} />
            </Link>
          ))}
      </section>
    </>
  )
}
