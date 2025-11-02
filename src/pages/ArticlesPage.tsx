import { useState } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { getCategories, getFilteredArticles } from '../mockData'

export const ArticlesPage = () => {
  // フィルター状態
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // データ取得
  const categories = getCategories()
  const articles = getFilteredArticles(selectedCategory, 'newest')
  const articleCount = articles.length
  // const articles = getRecentArticles(100)

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* タイトル & 件数 */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">全体記事</h1>
        <p className="text-sm text-gray-600">{articleCount}件の記事</p>
      </div>

      {/* フィルターエリア */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="grig grid-cols-1 gap-4 md:grid-cols-3">
          {/* カテゴリフィルター */}
          <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-gray-700">
            カテゴリ
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:inset-ring-indigo-500"
          >
            <option value="all">すべて</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* TODO:タグフィルター */}
          {/* TODO:並び替え */}
        </div>
      </div>

      {/* 記事カード */}
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
