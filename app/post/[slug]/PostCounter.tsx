"use client"

import { LoadingSpinner } from "components/spinner"
import { api } from "server/trpc/query_client"

export function PostCounter(opts: any) {
  try {
    const { data,isLoading } = api.addViewCount.useMutation(opts)
    return  isLoading? <LoadingSpinner/> :`${data?.total?.count} views`
  } catch (err) {
    console.log(err)
  }
}
