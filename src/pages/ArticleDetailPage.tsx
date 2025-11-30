import { Navigate, useParams } from 'react-router'
import { getArticleById } from '../mockData'
import { getCategoryColor, markdownToHtml } from '../utils'
import 'prismjs/themes/prism-tomorrow.css'

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

  // 日付フォーマット関数
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // 日時フォーマット関数
  // const formatDateTime = (dateString: string): string => {
  //   const date = new Date(dateString)
  //   return date.toLocaleString('ja-JP', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   })
  // }

  const htmlContent = markdownToHtml(article.content)

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* カテゴリバッジ */}
      <div className="mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category.id)}`}
        >
          {article.category.name}
        </span>
      </div>

      {/* タグ一覧 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {article.tags.map((tag) => (
          <span key={tag.id} className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-700">
            #{tag.name}
          </span>
        ))}
      </div>

      {/* タイトル */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
      </div>

      {/* 投稿者情報 */}
      <div className="mb-6 flex items-center gap-3 text-sm text-gray-600">
        {/* アバター */}
        {article.author.avatar ? (
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-sm font-semibold text-gray-600">
            {article.author.name.charAt(0)}
          </div>
        )}

        {/* 投稿者名と日時 */}
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{article.author.name}</span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>投稿: {formatDate(article.createdAt)}</span>
            {article.updatedAt && article.updatedAt !== article.createdAt && (
              <>
                <span>・</span>
                <span>更新: {formatDate(article.updatedAt)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 本文エリア（後でMarkdownレンダリングを追加） */}
      <div
        className="mb-8 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </div>
  )
}
