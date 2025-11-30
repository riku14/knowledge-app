import type { ArticleScope } from '../constants'

/**
 * 公開範囲バッジコンポーネント
 */
export interface ScopeBadgeProps {
  /** 公開範囲 */
  scope: ArticleScope
  /** チーム名（チーム限定の場合のみ） */
  teamName?: string
}

export const ScopeBadge = ({ scope, teamName }: ScopeBadgeProps) => {
  if (scope === 'public') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M15 11a3 3 0 11-6 0m6 0a3 3 0 10-6 0m6 0h.01M21 11a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        全体公開
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {teamName ? `チーム: ${teamName}` : 'チーム限定'}
    </span>
  )
}
