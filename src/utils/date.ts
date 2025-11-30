/**
 * 日付を日本語形式でフォーマットする関数
 * @param dateString - ISO形式の日付文字列
 * @returns フォーマットされた日付文字列（例: "2025年12月22日"）
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * 日付と時刻を日本語形式でフォーマットする関数
 * @param dateString - ISO形式の日付文字列
 * @returns フォーマットされた日時文字列（例: "2025年12月22日 10:00"）
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}