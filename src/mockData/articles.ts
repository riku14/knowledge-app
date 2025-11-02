import type { Article } from '../types'

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
    status: 'published',
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
    status: 'published',
  },
]

export const getRecentArticles = (limit: number = 10): Article[] => {
  return [...mockArticles]
    .filter((article) => article.status === 'published' || !article.status)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })
    .slice(0, limit)
}
