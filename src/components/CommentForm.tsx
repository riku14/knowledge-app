import { useState } from 'react'

/**
 * コメント投稿フォームコンポーネント
 */
export interface CommentFormProps {
  /** コメント投稿時のコールバック */
  onSubmit: (content: string) => void
}

const MAX_COMMENT_LENGTH = 1000

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
  // 【追加】コメント内容の状態管理
  const [content, setContent] = useState('')
  // 【追加】送信中の状態管理
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 【追加】コメントが有効かどうか（空文字でなく、文字数制限内）
  const isValid = content.trim().length > 0 && content.length <= MAX_COMMENT_LENGTH

  // 【追加】入力値変更時の処理
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    // 文字数制限を超えないように制御
    if (value.length <= MAX_COMMENT_LENGTH) {
      setContent(value)
    }
  }

  // 【追加】送信ボタンクリック時の処理
  const handleSubmit = async () => {
    if (!isValid || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    try {
      // コールバックを呼び出してコメントを投稿
      onSubmit(content.trim())
      // 投稿成功後、入力欄をクリア
      setContent('')
    } catch (error) {
      console.error('コメント投稿エラー:', error)
      // TODO: エラーメッセージを表示
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-900">コメントを投稿</h2>

      {/* コメント入力欄 */}
      <div className="mb-4">
        <textarea
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={4}
          placeholder="コメントを入力してください..."
          value={content}
          onChange={handleChange}
        />
        {/* 【追加】文字数カウント表示 */}
        <div className="mt-1 flex justify-end">
          <span
            className={`text-xs ${
              content.length > MAX_COMMENT_LENGTH
                ? 'text-red-500'
                : content.length > MAX_COMMENT_LENGTH * 0.9
                  ? 'text-yellow-600'
                  : 'text-gray-500'
            }`}
          >
            {content.length} / {MAX_COMMENT_LENGTH}
          </span>
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
          className={`rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isValid && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? '投稿中...' : '投稿'}
        </button>
      </div>
    </div>
  )
}
