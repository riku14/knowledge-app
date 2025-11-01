import type { Article } from '../types'

export interface ArticleCardProps {
  article: Article
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-3">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
      <p className="text-sm text-gray-600">{article.content}</p>
    </div>
  )
}
