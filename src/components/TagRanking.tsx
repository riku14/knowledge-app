import { useNavigate } from 'react-router'
import type { Tag } from '../types'

export interface TagRankingProps {
  tags: Tag[]
}

export const TagRanking = ({ tags }: TagRankingProps) => {
  const navigate = useNavigate()

  const handleViewAll = () => {
    navigate('/tags')
  }

  return (
    <div className="rounded-lg bg-gradient-to-bl from-violet-500 to-fuchsia-500 p-4 shadow-md">
      {/* タイトル */}
      <h3 className="mb-4 text-lg font-bold text-gray-900">人気のタグ</h3>
      {/* タグリスト */}
      <ul className="space-y-2">
        {tags.map((tag, index) => (
          <li key={tag.id}>
            <div className="flex items-center gap-2">
              {/* ランキング番号 */}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                {index + 1}
              </span>
              {/* タグ名 */}
              <span className="text-sm text-gray-700">#{tag.name}</span>
              {/* 使用件数 */}
              <span className="ml-auto text-xs text-gray-700">{tag.count}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* すべて見るボタン → タグ一覧画面に遷移 */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleViewAll}
          className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
        >
          すべて見る →
        </button>
      </div>
    </div>
  )
}
