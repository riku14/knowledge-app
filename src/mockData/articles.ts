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
  },
  {
    id: '2',
    title: 'テスト記事',
    content: 'これはテスト記事の内容です。',
    category: {
      id: '1',
      name: '技術ドキュメント',
    },
  },
]
