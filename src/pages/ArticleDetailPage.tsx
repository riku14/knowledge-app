import { useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router'
import { getArticleById } from '../mockData'
import { getCategoryColor, markdownToHtml, formatDate } from '../utils'
import { CommentList } from '../components/CommentList'
import 'prismjs/themes/prism-tomorrow.css'

export const ArticleDetailPage = () => {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

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

  // TODO: 後でAuthContextから取得するように変更
  const getCurrentUserId = (): string => {
    // 仮のユーザーID（後で認証機能実装時に置き換え）
    return '1' // 例: 山田太郎のID
  }
  const currentUserId = getCurrentUserId()
  const isAuthor = article.author.id === currentUserId

  // お気に入りトグル処理
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    // TODO: 後でAPI呼び出しに変更
    console.log(isFavorite ? 'お気に入りを削除' : 'お気に入りを追加')
  }

  // 編集ボタン処理
  const handleEdit = () => {
    navigate(`/articles/${article.id}/edit`)
  }

  // 削除ボタン処理
  const handleDelete = () => {
    if (window.confirm('この記事を削除してもよろしいですか？\nこの操作は取り消せません。')) {
      // TODO: 後でAPI呼び出しに変更
      console.log('記事を削除:', article.id)
      // 削除後、記事一覧画面へ遷移
      navigate('/articles')
    }
  }
  // 【追加】コメント削除処理
  const handleDeleteComment = (commentId: string) => {
    // TODO: 後でAPI呼び出しに変更
    console.log('コメントを削除:', commentId)
    // モックデータから削除する処理（後で実装）
  }

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

      {/* ボタンエリア */}
      <div className="mb-6 flex items-center gap-3">
        {/* お気に入りボタン */}
        <button
          onClick={handleFavoriteToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            isFavorite
              ? 'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'fill-yellow-500' : 'fill-none stroke-gray-500'}`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span className="text-sm font-medium">
            {isFavorite ? 'お気に入り済み' : 'お気に入り'}
          </span>
        </button>

        {/* 編集ボタン */}
        {isAuthor && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-green-300 bg-white text-green-700 hover:bg-green-50 transition-colors"
          >
            <svg
              className="w-5 h-5 stroke-green-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-sm font-medium">編集</span>
          </button>
        )}

        {/* 削除ボタン */}
        {isAuthor && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 bg-white text-red-700 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5 stroke-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="text-sm font-medium">削除</span>
          </button>
        )}
      </div>

      {/* 本文エリア（後でMarkdownレンダリングを追加） */}
      <div
        className="mb-8 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>

      {/* コメント一覧 */}
      <CommentList
        comments={article.comments || []}
        currentUserId={currentUserId}
        articleAuthorId={article.author.id}
        onDelete={handleDeleteComment}
      />
    </div>
  )
}
