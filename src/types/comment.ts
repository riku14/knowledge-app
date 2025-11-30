/**
 * コメントの型
 */
export interface Comment {
  /** コメントID */
  id: string
  /** 記事ID */
  articleId: string
  /** 投稿者情報 */
  user: {
    /** 投稿者ID */
    id: string
    /** 投稿者名 */
    name: string
    /** 投稿者プロフィール画像パス */
    avatar?: string
  }
  /** コメント内容 */
  content: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt?: string
}