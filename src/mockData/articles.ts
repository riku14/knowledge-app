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
  },
]
