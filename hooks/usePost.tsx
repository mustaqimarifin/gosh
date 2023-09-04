"use client"

import { CompleteComment } from "prisma/ZOD"
import { useMemo } from "react"
import { api } from "server/trpc/query_client"
import type { Comment } from "types/index"

export interface PostProps {
  slug: string
}

export const usePost = (slug: string) => {
  const { data: post } = api.getBySlug.useQuery({ slug })

  const commentsByParentId = useMemo(() => {
    const group: { [key: string]: Comment[] } = {}
    post?.comments?.forEach((c) => {
      group[c.parentId!] ||= []
      //@ts-ignore
      group[c.parentId!].push(c)
    })

    return group
  }, [post?.comments])

  const getReplies = (parentId: string): Comment[] => {
    return commentsByParentId?.[parentId] || []
  }

  return {
    post,
    rootComments: commentsByParentId["null"] || [],
    getReplies,
  }
}
