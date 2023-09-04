"use server"

import { LoadingSpinner } from "components/spinner"
import { Suspense } from "react"
import { api } from "server/trpc/rpc_client"

/*  const slug = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  )  */

export async function BatchCounter({ slug }: { slug: string }) {
  try {
    const allViews = await api.viewsBySlug.query({ slug })
    //console.log(allViews)
    //const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
    // const number = new Number(viewsForSlug?.count || 0)
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <p className=" flex-none text-sm font-semibold tracking-tighter text-red-400 ">
          {`${allViews?.toString()} views`}
        </p>
      </Suspense>
    )
  } catch (err) {
    console.log(err)
  }
}

export async function FullCounter() {
  try {
    const views = await api.totalViews.query()
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <p className=" flex-none text-sm font-semibold tracking-tighter text-red-400 ">
          {`${views} views`}
        </p>
      </Suspense>
    )
  } catch (error) {
    console.log(error)
  }
}
