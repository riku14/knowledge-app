import { useNavigate } from 'react-router'
import { useCurrentPageName } from '../../hooks'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'

interface HeaderProps {
  onMenuClick: () => void
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate()
  const currentPageName = useCurrentPageName()

  const handleLogout = () => {
    // TODO:ログアウト実装
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shadow-sm">
      {/* ハンバーガーメニュー */}
      <button
        onClick={onMenuClick}
        className="mr-4 p-2 rounded text-gray-600 hover:bg-gray-100 lg:hidden"
        aria-label="メニューを開く"
      >
        <DensityMediumIcon className="h-6 w-6" />
      </button>

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
          className="px-4 py-2 rounded bg-gray-300 text-sm text-gray-700 hover:bg-gray-100"
        >
          ログアウト
        </button>
      </div>
    </header>
  )
}
