import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Balancer } from 'react-wrap-balancer';
import { PageViews } from 'components/PageViews';
import { MDX } from 'components/mdx';
import { allPosts } from 'contentlayer/generated';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CommentComponent = dynamic(() => import('components/Comments'), {
  ssr: false,
});
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    date: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://leerob.io${image}`
    : `https://leerob.io/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://leerob.io/post/${slug}`,
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
  };
}

export default async function Blog({ params }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
          {post.date}
        </div>
        <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
        <PageViews slug={post.slug} trackView />
      </div>
      {/*       <Modal /> */}
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <MDX code={post.body.code} />

        <Suspense fallback={<>Loading...</>}>
          <CommentComponent slug={post.slug} />
        </Suspense>
      </article>
    </section>
  );
}
