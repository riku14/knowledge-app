import { useState } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { getCategories, getFilteredArticles, mockTags } from '../mockData'

export const ArticlesPage = () => {
  // フィルター状態
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'updated' | 'popular'>('newest')

  // データ取得
  const categories = getCategories()
  const articles = getFilteredArticles(selectedCategory, selectedTag, sortBy)
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* カテゴリフィルター */}
          <div>
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
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
          </div>

          {/* タグフィルター */}
          <div>
            <label htmlFor="tag-filter" className="mb-2 block text-sm font-medium text-gray-700">
              タグ
            </label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:inset-ring-indigo-500"
            >
              <option value="all">すべて</option>
              {mockTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          {/* ソート */}
          <div>
            <label htmlFor="tag-filter" className="mb-2 block text-sm font-medium text-gray-700">
              並び替え
            </label>
            <select
              id="sort-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'updated' | 'popular')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:inset-ring-indigo-500"
            >
              <option value="newest">新着順</option>
              <option value="oldest">古い順</option>
              <option value="updated">更新日順</option>
              <option value="popular">人気順</option>
            </select>
          </div>
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
