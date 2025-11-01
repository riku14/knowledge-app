import { useNavigate } from 'react-router'
import { useCurrentPageName } from '../hooks'

export const Header = () => {
  const navigate = useNavigate()
  const currentPageName = useCurrentPageName()

  const handleLogout = () => {
    // TODO:ログアウト実装
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* 現在のページ名を表示 */}
      <h2 className="text-lg font-semibold text-gray-800">{currentPageName}</h2>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          {/* TODO:ユーザー名を表示 */}
          ユーザー名
        </div>

        {/* ログアウトボタン */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-300 hover:bg-gray-100 rounded"
        >
          ログアウト
        </button>
      </div>
    </header>
  )
}
