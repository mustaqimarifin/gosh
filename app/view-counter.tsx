"use client"

import { useEffect } from "react"
import { useAction } from "trpc-api"

import { pageCount } from "./_actions"

export default function ViewCounter({
  slug,
  allViews,
  trackView,
}: {
  slug: string
  allViews?: {
    slug: string
    count: bigint
  }[]
  trackView?: boolean
}) {
  const mutation = useAction(pageCount)

  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const number = new Number(viewsForSlug?.count || 0)
  console.log(number)
  useEffect(() => {
    if (trackView) {
      mutation.mutate({ slug })
    }
  }, [slug])

  return (
    <p className="text-neutral-600 dark:text-neutral-400">
      {`${number.toLocaleString()} views`}
    </p>
  )
}
