import { useMemo, useState } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { getCategories, getFilteredArticles, mockTags } from '../mockData'
import { FILTER_ALL, SortType } from '../constants'
import { calculatePagination } from '../utils'
import { Pagination } from '../components/Pagination'

export const ArticlesPage = () => {
  // フィルター状態
  const [selectedCategory, setSelectedCategory] = useState<string>(FILTER_ALL)
  const [selectedTag, setSelectedTag] = useState<string>(FILTER_ALL)
  const [sortBy, setSortBy] = useState<SortType>(SortType.NEWEST)

  // ページネーション状態
  const [currentPage, setCurrentPage] = useState<number>(1)

  // データ取得
  const categories = getCategories()
  const allArticles = getFilteredArticles(selectedCategory, selectedTag, sortBy)
  const articleCount = allArticles.length
  // const articles = getRecentArticles(100)

  // ページネーション計算
  const ITEMS_PER_PAGE = 10
  const paginationInfo = useMemo(
    () => calculatePagination(articleCount, currentPage, ITEMS_PER_PAGE),
    [articleCount, currentPage]
  )

  // 現在のページに表示する記事を取得
  const displayedArticles = useMemo(() => {
    return allArticles.slice(paginationInfo.startIndex, paginationInfo.endIndex)
  }, [allArticles, paginationInfo.startIndex, paginationInfo.endIndex])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    setCurrentPage(1)
  }
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
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:inset-ring-indigo-500"
            >
              <option value={FILTER_ALL}>すべて</option>
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
              onChange={(e) => handleTagChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:inset-ring-indigo-500"
            >
              <option value={FILTER_ALL}>すべて</option>
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
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:inset-ring-indigo-500"
            >
              <option value={SortType.NEWEST}>新着順</option>
              <option value={SortType.OLDEST}>古い順</option>
              <option value={SortType.UPDATED}>更新日順</option>
              <option value={SortType.POPULAR}>人気順</option>
            </select>
          </div>
        </div>
      </div>

      {/* 記事カード */}
      <div className="space-y-4">
        {displayedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* ページネーション */}
      <Pagination
        currentPage={paginationInfo.currentPage}
        totalPages={paginationInfo.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
