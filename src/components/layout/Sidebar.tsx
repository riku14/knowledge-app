import { useNavigate, useLocation } from 'react-router'
import { menuItems } from '../../constants'

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800 p-2">ナレッジ共有サイト</h1>
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
  )
}
