import { useNavigate } from 'react-router'
import type { Article } from '../types'
import { getCategoryColor, formatDate } from '../utils'

export interface ArticleCardProps {
  article: Article
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const navigate = useNavigate()

  // 記事詳細画面遷移ハンドラー関数
  const handleCardClick = () => {
    navigate(`/articles/${article.id}`)
  }

  return (
    <div
      className="mb-3 p-6 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 duration-300"
      onClick={handleCardClick}
    >
      {/* カテゴリ + タグ */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* カテゴリ */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category.id)}`}
        >
          {article.category.name}
        </span>
        {/* タグ */}
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag.id} className="px-2 rounded bg-gray-100 text-xs text-gray-700">
            #{tag.name}
          </span>
        ))}
        {article.tags.length > 3 && (
          <span className="text-xs text-gray-500">+{article.tags.length - 3}</span>
        )}
      </div>

      {/* タイトル */}
      <h3 className="mb-2 text-lg font-bold text-gray-900">{article.title}</h3>

      {/* 本文 */}
      <p className="mb-3 text-sm text-gray-600">{article.content}</p>

      {/* 投稿者情報 */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {/* アバター */}
        {article.author.avatar ? (
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-xs font-semibold text-gray-600">
            {article.author.name.charAt(0)}
          </div>
        )}

        {/* 投稿者 + 日付 */}
        <span className="font-medium">{article.author.name}</span>
        <span>・</span>
        <span>{formatDate(article.createdAt)}</span>
      </div>
    </div>
  )
}
