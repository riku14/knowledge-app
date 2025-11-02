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
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '3',
    title: 'React Hooks入門',
    content: 'React Hooksを使った関数コンポーネントの実装方法について説明します。useState、useEffect、カスタムフックなど、実践的な使い方を学びましょう。',
    category: {
      id: '1',
      name: '技術ドキュメント',
    },
    tags: [
      { id: '1', name: 'JavaScript' },
      { id: '3', name: 'TypeScript' },
      { id: '8', name: 'React' },
      { id: '9', name: 'フロントエンド' },
    ],
    author: {
      id: '3',
      name: '佐藤 健一',
      avatar: undefined,
    },
    createdAt: '2025-12-20T09:15:00Z',
    updatedAt: '2025-12-21T14:20:00Z',
    favoriteCount: 28,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '4',
    title: 'データベース設計のベストプラクティス',
    content: '効率的なデータベース設計のための重要な原則とパターンについて解説します。正規化、インデックス設計、パフォーマンス最適化のポイントを学びます。',
    category: {
      id: '2',
      name: '開発関連',
    },
    tags: [
      { id: '6', name: 'データベース' },
      { id: '10', name: 'SQL' },
      { id: '11', name: '設計' },
    ],
    author: {
      id: '1',
      name: '山田 太郎',
      avatar: undefined,
    },
    createdAt: '2025-12-18T11:30:00Z',
    updatedAt: '2025-12-19T16:45:00Z',
    favoriteCount: 45,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '5',
    title: 'RESTful API設計ガイド',
    content: 'RESTful APIを設計する際のベストプラクティスをまとめました。エンドポイントの命名規則、HTTPメソッドの適切な使用、エラーハンドリングなどについて説明します。',
    category: {
      id: '3',
      name: 'API設計',
    },
    tags: [
      { id: '4', name: 'API' },
      { id: '5', name: 'バックエンド' },
      { id: '12', name: 'REST' },
      { id: '13', name: '設計' },
    ],
    author: {
      id: '2',
      name: '山本 花子',
      avatar: 'https://via.placeholder.com/40',
    },
    createdAt: '2025-12-15T13:20:00Z',
    updatedAt: '2025-12-16T10:10:00Z',
    favoriteCount: 67,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '6',
    title: 'TypeScriptの型安全性を活かす',
    content: 'TypeScriptの型システムを最大限に活用するためのテクニックを紹介します。型ガード、ジェネリクス、ユーティリティ型など、実践的な型定義の方法を学びます。',
    category: {
      id: '1',
      name: '技術ドキュメント',
    },
    tags: [
      { id: '3', name: 'TypeScript' },
      { id: '1', name: 'JavaScript' },
      { id: '14', name: '型定義' },
    ],
    author: {
      id: '4',
      name: '鈴木 美咲',
      avatar: 'https://via.placeholder.com/40',
    },
    createdAt: '2025-12-12T08:45:00Z',
    updatedAt: '2025-12-14T17:30:00Z',
    favoriteCount: 34,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '7',
    title: 'マイクロサービスのアーキテクチャパターン',
    content: 'マイクロサービスアーキテクチャを構築する際の主要なパターンについて説明します。サービス間通信、データ管理、デプロイメント戦略などの観点から解説します。',
    category: {
      id: '2',
      name: '開発関連',
    },
    tags: [
      { id: '5', name: 'バックエンド' },
      { id: '15', name: 'マイクロサービス' },
      { id: '16', name: 'アーキテクチャ' },
      { id: '17', name: '分散システム' },
    ],
    author: {
      id: '1',
      name: '山田 太郎',
      avatar: undefined,
    },
    createdAt: '2025-12-10T15:00:00Z',
    updatedAt: '2025-12-11T11:25:00Z',
    favoriteCount: 52,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '8',
    title: 'Gitのブランチ戦略まとめ',
    content: 'Gitのブランチ戦略について、Git Flow、GitHub Flow、Trunk Based Developmentなどの主要な戦略を比較・解説します。プロジェクトの規模に応じた適切な選択方法も説明します。',
    category: {
      id: '4',
      name: '開発ツール',
    },
    tags: [
      { id: '18', name: 'Git' },
      { id: '19', name: 'バージョン管理' },
      { id: '20', name: 'CI/CD' },
    ],
    author: {
      id: '3',
      name: '佐藤 健一',
      avatar: undefined,
    },
    createdAt: '2025-12-08T10:20:00Z',
    updatedAt: '2025-12-09T09:15:00Z',
    favoriteCount: 19,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '9',
    title: 'パフォーマンス最適化の実践',
    content: 'Webアプリケーションのパフォーマンスを向上させるための具体的な手法を紹介します。コード分割、レイジーローディング、キャッシング、画像最適化などのテクニックを解説します。',
    category: {
      id: '1',
      name: '技術ドキュメント',
    },
    tags: [
      { id: '9', name: 'フロントエンド' },
      { id: '8', name: 'React' },
      { id: '21', name: 'パフォーマンス' },
      { id: '22', name: '最適化' },
    ],
    author: {
      id: '4',
      name: '鈴木 美咲',
      avatar: 'https://via.placeholder.com/40',
    },
    createdAt: '2025-12-05T14:30:00Z',
    updatedAt: undefined,
    favoriteCount: 41,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '10',
    title: 'Docker入門ガイド',
    content: 'Dockerの基本概念から実践的な使い方まで、ステップバイステップで学べる入門ガイドです。コンテナの作成、イメージの管理、Docker Composeの活用方法を説明します。',
    category: {
      id: '4',
      name: '開発ツール',
    },
    tags: [
      { id: '23', name: 'Docker' },
      { id: '24', name: 'コンテナ' },
      { id: '25', name: 'インフラ' },
      { id: '26', name: 'DevOps' },
    ],
    author: {
      id: '2',
      name: '山本 花子',
      avatar: 'https://via.placeholder.com/40',
    },
    createdAt: '2025-12-03T09:00:00Z',
    updatedAt: '2025-12-04T13:40:00Z',
    favoriteCount: 73,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '11',
    title: '認証・認可の実装方法',
    content: 'Webアプリケーションにおける認証と認可の実装方法について、JWT、OAuth、セッション管理などの技術を比較しながら解説します。セキュリティのベストプラクティスも含みます。',
    category: {
      id: '3',
      name: 'API設計',
    },
    tags: [
      { id: '4', name: 'API' },
      { id: '5', name: 'バックエンド' },
      { id: '27', name: 'セキュリティ' },
      { id: '28', name: '認証' },
    ],
    author: {
      id: '1',
      name: '山田 太郎',
      avatar: undefined,
    },
    createdAt: '2025-12-01T11:15:00Z',
    updatedAt: '2025-12-02T16:50:00Z',
    favoriteCount: 56,
    status: ArticleStatus.PUBLISHED,
  },
  {
    id: '12',
    title: 'テスト戦略と実装',
    content: '効果的なテスト戦略の立て方と、ユニットテスト、統合テスト、E2Eテストの実装方法について解説します。Jest、React Testing Library、Cypressなどのツールの使い方も含みます。',
    category: {
      id: '2',
      name: '開発関連',
    },
    tags: [
      { id: '29', name: 'テスト' },
      { id: '30', name: '品質保証' },
      { id: '8', name: 'React' },
      { id: '1', name: 'JavaScript' },
    ],
    author: {
      id: '3',
      name: '佐藤 健一',
      avatar: undefined,
    },
    createdAt: '2025-11-28T13:45:00Z',
    updatedAt: '2025-11-30T10:20:00Z',
    favoriteCount: 38,
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
