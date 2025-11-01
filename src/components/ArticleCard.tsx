import type { Article } from '../types'

export interface ArticleCardProps {
  article: Article
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  // TODO:カテゴリの色分け
  const getCategoryColor = (): string => {
    return 'bg-blue-100 text-blue-800'
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-3">
      {/* カテゴリ + タグ */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {/* カテゴリ */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
          {article.category.name}
        </span>
        {/* タグ */}
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag.id} className="px-2 bg-gray-100 text-gray-700 rounded text-xs">
            #{tag.name}
          </span>
        ))}
        {article.tags.length > 3 && (
          <span className="text-xs text-gray-500">+{article.tags.length - 3}</span>
        )}
      </div>

      {/* タイトル */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>

      {/* 本文 */}
      <p className="text-sm text-gray-600">{article.content}</p>
    </div>
  )
}
