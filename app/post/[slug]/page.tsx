//import CommentComponent from "components/Comments"
import ViewCounter from "app/view-counter"
import { MDX } from "components/mdx"
import { PageViews } from "components/PageViews"
import { allPosts } from "contentlayer/generated"
//import { PostCounter } from "lib/metrics"
import type { Metadata } from "next"
import lazy from "next/dynamic"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Balancer } from "react-wrap-balancer"

import { PostCounter } from "./PostCounter"

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const { title, date: publishedTime, summary: description, image, slug } = post
  const ogImage = image
    ? `https://leerob.io${image}`
    : `https://leerob.io/api/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://leerob.io/post/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)

  const CommentComponent = lazy(() => import("components/Comments"), {
    ssr: false,
  })
  /*   const views = await apiRPC.post.addViewCount.mutate({ slug })
  const total = views?.total?.count */

  if (!post) notFound()
  return (
    <section>
      <h1 className="max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center font-mono text-sm">
        <div className="rounded-md bg-neutral-100 px-2 py-1 tracking-tighter dark:bg-neutral-800">
          {post.date}
        </div>
        <PageViews slug={post.slug} trackView />
      </div>
      <article className="prose prose-neutral prose-quoteless dark:prose-invert">
        <MDX code={post.body.code} />

        <Suspense fallback={<>Loading...</>}>
          <CommentComponent slug={post.slug} />
        </Suspense>
      </article>
    </section>
  )
}
