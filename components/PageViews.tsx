"use client"

import { pageCount } from "app/_actions"
import { fetcher } from "lib/fetcher"
import { Suspense, useEffect } from "react"
import useSWR from "swr"

import { LoadingSpinner } from "./spinner"

export type CounterProps = {
  slug?: string
  total?: number
  trackView: boolean
}

export const PageViews = ({ slug, trackView }: CounterProps) => {
  const { data, isLoading } = useSWR<CounterProps>(`/api/posts/${slug}`, fetcher)

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/posts/${slug}`, {
        method: "POST",
      })
    if (trackView) {
      registerView()
    }
  }, [slug, trackView])

  return  isLoading ? <LoadingSpinner/> :`${data?.total} views`
  
}

export const TotalViews = () => {
  const { data, isLoading } = useSWR<CounterProps>(`/api/posts`, fetcher)
  return isLoading ? <LoadingSpinner/> :`${data?.total} views`

  
}