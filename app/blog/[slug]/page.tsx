//import CommentComponent2 from 'components/Comments/cc'
//import CommentComponent from 'components/Comments/cc'
import { Mdx } from 'components/mdx'
import { PageViews } from 'components/PageViews'
import { LoadingSpinner } from 'components/spinner'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import lazy from 'next/dynamic'
import { notFound } from 'next/navigation'
import { cache, Suspense } from 'react'
import Balancer from 'react-wrap-balancer'
import { api } from 'server/trpc/server-invoker'

export const dynamic = 'force-dynamic'

const getComments = cache(async (slug) => {
  const entries = await api.getBySlug.query({ slug })
  return entries
})

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const { title, date: publishedTime, summary: description, image, slug } = post
  const ogImage = image
    ? `http://localhost:3000${image}`
    : `http://localhost:3000/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `http://localhost:3000/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

function formatDate(date: string) {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${formattedDate})`
}

export default async function Blog({ params }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  //nst slug = post?.slug as string

  if (!post) {
    notFound()
  }

  const CommentComponent = lazy(() => import('components/Comments'), {
    ssr: false,
  })

  /*   const CommentComponent2 = lazy(() => import('components/Comments/cc'), {
    ssr: false,
  }) */

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}></script>
      <h1 className="font-semibold text-2xl tracking-tighter max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.date)}
        </p>
        <Suspense fallback={<p className="h-5" />}>
          <PageViews slug={post.slug} trackView />
        </Suspense>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <Mdx code={post.body.code} />
        <CommentComponent slug={post.slug} />
        {/*      <CommentComponent slug={post.slug} /> */}
      </Suspense>
    </section>
  )
}

/* async function Views({ slug }: { slug: string }) {
  let views
  try {
    views = await getViewsCount()
  } catch (error) {
    console.error(error)
  }

  return <ViewCounter allViews={views} slug={slug} trackView />
}
 */
