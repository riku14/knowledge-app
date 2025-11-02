import type { ArticleStatus } from '../constants'

// 記事投稿の型
export interface Article {
  id: string
  title: string
  content: string
  category: {
    id: string
    name: string
  }
  tags: Array<{
    id: string
    name: string
  }>
  author: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
  updatedAt?: string
  favoriteCount?: number
  status?: ArticleStatus
}
