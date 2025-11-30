import type { Comment } from '../types'
import { formatDateTime } from '../utils'

export interface CommentListProps {
  comments: Comment[]
  currentUserId: string
  articleAuthorId: string
  onDelete?: (commentId: string) => void
}

export const CommentList = ({
  comments,
  currentUserId,
  articleAuthorId,
  onDelete,
}: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="mb-8 text-center text-gray-500">
        <p>コメントはまだありません。</p>
      </div>
    )
  }

  return (
    <div className="mb-8 space-y-4">
      <h2 className="mb-4 text-xl font-bold text-gray-900">コメント ({comments.length})</h2>
      {comments.map((comment) => {
        const canDelete = comment.user.id === currentUserId || articleAuthorId === currentUserId

        return (
          <div key={comment.id} className="rounded-lg border border-gray-200 bg-white p-4">
            {/* コメントヘッダー */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* アバター */}
                {comment.user.avatar ? (
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-xs font-semibold text-gray-600">
                    {comment.user.name.charAt(0)}
                  </div>
                )}
                {/* 投稿者名と日時 */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{comment.user.name}</span>
                  <span className="text-xs text-gray-500">{formatDateTime(comment.createdAt)}</span>
                </div>
              </div>
              {/* 削除ボタン（権限がある場合のみ表示） */}
              {canDelete && onDelete && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className="text-xs text-red-600 hover:text-red-800 transition-colors"
                >
                  削除
                </button>
              )}
            </div>
            {/* コメント内容 */}
            <div className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</div>
          </div>
        )
      })}
    </div>
  )
}
