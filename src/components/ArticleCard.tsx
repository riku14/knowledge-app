import type { Article } from '../types'

export interface ArticleCardProps {
  article: Article
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  // TODO:カテゴリの色分け
  const getCategoryColor = (): string => {
    return 'bg-blue-100 text-blue-800'
  }

  // 日付フォーマット関数
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return (
    <div className="mb-3 p-6 bg-white rounded-lg shadow-md">
      {/* カテゴリ + タグ */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* カテゴリ */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
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
