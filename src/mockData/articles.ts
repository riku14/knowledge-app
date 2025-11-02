import type { Article } from '../types'
import { SortType, FILTER_ALL, ArticleStatus } from '../constants'

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'テスト記事',
    content: 'これはテスト記事の内容です。',
    category: {
      id: '1',
      name: '技術ドキュメント',
    },
    tags: [
      { id: '1', name: 'JavaScript' },
      { id: '2', name: 'Java' },
      { id: '3', name: 'TypeScript' },
    ],
    author: {
      id: '1',
      name: '山田 太郎',
      avatar: undefined,
    },
    createdAt: '2025-12-22T10:00:00Z',
    updatedAt: '2025-12-22T15:30:00Z',
    favoriteCount: 12,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '2',
    title: 'テスト記事',
    content: 'これはテスト記事の内容です。',
    category: {
      id: '2',
      name: '開発関連',
    },
    tags: [
      { id: '4', name: 'API' },
      { id: '5', name: 'バックエンド' },
      { id: '6', name: 'データベース' },
      { id: '7', name: 'Node.js' },
    ],
    author: {
      id: '2',
      name: '山本 花子',
      avatar: 'https://via.placeholder.com/40',
    },
    createdAt: '2025-12-22T10:00:00Z',
    updatedAt: '2025-12-25T15:30:00Z',
    favoriteCount: 5,
    status: ArticleStatus.DRAFT,
  },
]

// ホーム画面用：最新の10件取得
export const getRecentArticles = (limit: number = 10): Article[] => {
  return [...mockArticles]
    .filter((article) => article.status === ArticleStatus.PUBLISHED || !article.status)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })
    .slice(0, limit)
}

// すべての記事を取得
export const getAllArticles = (): Article[] => {
  return [...mockArticles].filter(
    (article) => article.status === ArticleStatus.PUBLISHED || !article.status
  )
}

// カテゴリ一覧を取得
export const getCategories = () => {
  const categoriesMap = new Map<string, { id: string; name: string }>()

  mockArticles.forEach((article) => {
    if (!categoriesMap.has(article.category.id)) {
      categoriesMap.set(article.category.id, article.category)
    }
  })

  return Array.from(categoriesMap.values())
}

// フィルターとソート
export const getFilteredArticles = (
  categoryId?: string,
  tagId?: string,
  sortBy: SortType = SortType.NEWEST
): Article[] => {
  let filtered = getAllArticles()

  // カテゴリフィルター
  if (categoryId && categoryId !== FILTER_ALL) {
    filtered = filtered.filter((article) => article.category.id === categoryId)
  }

  // タグフィルター
  if (tagId && tagId !== FILTER_ALL) {
    filtered = filtered.filter((article) => article.tags.some((tag) => tag.id === tagId))
  }

  // ソート
  filtered.sort((a, b) => {
    if (sortBy === SortType.NEWEST) {
      // 新着順: 作成日の降順
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    } else if (sortBy === SortType.OLDEST) {
      // 古い順: 作成日の昇順
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateA - dateB
    } else if (sortBy === SortType.UPDATED) {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime()
      const dateB = new Date(b.updatedAt || b.createdAt).getTime()
      return dateB - dateA
    } else if (sortBy === SortType.POPULAR) {
      // 人気順: お気に入り数の降順
      const countA = a.favoriteCount || 0
      const countB = b.favoriteCount || 0
      return countB - countA
    }
    return 0
  })

  return filtered
}
