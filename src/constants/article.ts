// ソートタイプ
export const SortType = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  UPDATED: 'updated',
  POPULAR: 'popular',
} as const

export type SortType = (typeof SortType)[keyof typeof SortType]

// フィルター値
export const FILTER_ALL = 'all' as const

export const ArticleStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const

export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus]
