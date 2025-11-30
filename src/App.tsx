import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { Layout } from './components/layout/Layout'
import { ArticlesPage } from './pages/ArticlesPage'
import { ArticleDetailPage } from './pages/ArticleDetailPage'
import { ArticleCreatePage } from './pages/ArticleCreatePage'
import { ArticleEditPage } from './pages/ArticleEditPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログインページ */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* すべての画面で共通レイアウトを適用 */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/new" element={<ArticleCreatePage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/articles/:id/edit" element={<ArticleEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
