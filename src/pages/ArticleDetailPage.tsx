import { Navigate, useParams } from 'react-router'
import { getArticleById } from '../mockData'

export const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <Navigate to="/articles" replace />
  }

  // モックデータから記事を取得
  const article = getArticleById(id)

  // 記事が見つからない場合
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">記事が見つかりません</h1>
          <p className="text-gray-600">指定された記事は存在しないか、削除されました。</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-4">
        <h1>{article.title}</h1>
      </div>
      <div>
        <p>記事ID: {article.id}</p>
      </div>
    </div>
  )
}
