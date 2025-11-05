import type { ArticleStatus } from '../constants'

/**
 * 記事カードの型
 */
export interface Article {
  /** 記事ID */
  id: string
  /** 記事タイトル */
  title: string
  /** 記事コンテンツ */
  content: string
  /** カテゴリ */
  category: {
    /** カテゴリID */
    id: string
    /** カテゴリ名 */
    name: string
  }
  /** タグ */
  tags: Array<{
    /** タグID */
    id: string
    /** タグ名 */
    name: string
  }>
  /** 投稿者情報 */
  author: {
    /** 投稿者ID */
    id: string
    /** 投稿者名 */
    name: string
    /** 投稿者プロフィール画像パス */
    avatar?: string
  }
  /** 作成日 */
  createdAt: string
  /** 更新日 */
  updatedAt?: string
  /** いいね数 */
  favoriteCount?: number
  /** ステータス */
  status?: ArticleStatus
}
