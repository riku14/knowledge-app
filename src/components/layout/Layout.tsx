import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* サイドバー */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <Header />

        {/* ページコンポーネント */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
