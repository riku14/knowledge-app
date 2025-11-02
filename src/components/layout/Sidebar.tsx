import { useNavigate, useLocation } from 'react-router'
import { menuItems } from '../../constants'
import CloseIcon from '@mui/icons-material/Close'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

export const Sidebar = ({ isOpen, onClose, onToggle }: SidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {/* PCサイドバー */}
      <aside
        className={`hidden lg:flex lg:flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 transition-all ${
          isOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="flex items-center">
          <h1 className="p-2 text-xl font-bold text-gray-800">ナレッジ共有サイト</h1>
          <button
            onClick={onToggle}
            className="p-2 rouded text-gray-600 hover:bg-gray-100"
            aria-label="サイドバーを閉じる"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    location.pathname === item.path
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* PC版：サイドバーが閉じている時のアイコンのみ表示 */}
      {!isOpen && (
        <div className="hidden lg:flex fixed left-0 top-0 h-full w-12 items-start pt-4 bg-gray-50 border-r border-gray-200 z-30">
          <button
            onClick={onToggle}
            className="p-2 rounded text-gray-600 hover:bg-gray-100"
            aria-label="サイドバーを開く"
          >
            <ViewSidebarIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* モバイル：モーダル表示（ハンバーガーメニュー） */}
      <aside
        className={` fixed left-0 top-0 z-50 h-full w-64 transform overflow-y-auto border-r border-gray-200 bg-gray-50 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-800">ナレッジ共有サイト</h1>
          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            className="p-2 rounded text-gray-600 hover:bg-gray-100"
            aria-label="メニューを閉じる"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    location.pathname === item.path
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>{' '}
      </aside>
    </>
  )
}
